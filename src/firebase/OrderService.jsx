import { 
  collection, 
  addDoc, 
  doc, 
  getDoc, 
  getDocs, 
  updateDoc, 
  query, 
  where, 
  orderBy, 
  serverTimestamp,
  Timestamp,
  limit
} from 'firebase/firestore';
import { db } from '../firebase';

class OrderService {
  async createOrder(orderData) {
    try {
      const orderWithMetadata = {
        ...orderData,
        status: 'pending', 
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      const docRef = await addDoc(collection(db, 'orders'), orderWithMetadata);
      return docRef.id;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  }

  async getOrderById(orderId) {
    try {
      const orderDoc = await getDoc(doc(db, 'orders', orderId));
      if (!orderDoc.exists()) {
        throw new Error('Order not found');
      }

      const orderData = orderDoc.data();
      return {
        ...orderData,
        id: orderId,
        createdAt: orderData.createdAt?.toDate() || null,
        updatedAt: orderData.updatedAt?.toDate() || null,
        scheduledTime: orderData.scheduledTime instanceof Timestamp 
          ? orderData.scheduledTime.toDate() 
          : orderData.scheduledTime
      };
    } catch (error) {
      console.error('Error retrieving order:', error);
      throw error;
    }
  }

  async getOrdersByUser(userId, maxResults = 50) {
    try {
      const q = query(
        collection(db, 'orders'),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc'),
        limit(maxResults)
      );

      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => {
        const orderData = doc.data();
        return {
          ...orderData,
          id: doc.id,
          createdAt: orderData.createdAt?.toDate() || null,
          updatedAt: orderData.updatedAt?.toDate() || null,
          scheduledTime: orderData.scheduledTime instanceof Timestamp 
            ? orderData.scheduledTime.toDate() 
            : orderData.scheduledTime
        };
      });
    } catch (error) {
      console.error('Error retrieving user orders:', error);
      throw error;
    }
  }

  async updateOrderStatus(orderId, status) {
    try {
      const validStatuses = ['pending', 'confirmed', 'preparing', 'ready', 'out-for-delivery', 'delivered', 'completed', 'canceled'];
      if (!validStatuses.includes(status)) {
        throw new Error(`Invalid status: ${status}`);
      }
      await updateDoc(doc(db, 'orders', orderId), {
        status,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error updating order status:', error);
      throw error;
    }
  }

  async cancelOrder(orderId, reason = '') {
    try {
      await updateDoc(doc(db, 'orders', orderId), {
        status: 'canceled',
        cancellationReason: reason,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error canceling order:', error);
      throw error;
    }
  }

  async getPendingOrders() {
    try {
      const inProgressStatuses = ['pending', 'confirmed', 'preparing', 'ready', 'out-for-delivery'];

      const q = query(
        collection(db, 'orders'),
        where('status', 'in', inProgressStatuses),
        orderBy('createdAt', 'asc')
      );

      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => {
        const orderData = doc.data();
        return {
          ...orderData,
          id: doc.id,
          createdAt: orderData.createdAt?.toDate() || null,
          updatedAt: orderData.updatedAt?.toDate() || null,
          scheduledTime: orderData.scheduledTime instanceof Timestamp 
            ? orderData.scheduledTime.toDate() 
            : orderData.scheduledTime
        };
      });
    } catch (error) {
      console.error('Error getting pending orders:', error);
      throw error;
    }
  }

  async getOrdersByDateRange(startDate, endDate) {
    try {
      const startTimestamp = Timestamp.fromDate(startDate);
      const endTimestamp = Timestamp.fromDate(endDate);

      const q = query(
        collection(db, 'orders'),
        where('createdAt', '>=', startTimestamp),
        where('createdAt', '<=', endTimestamp),
        orderBy('createdAt', 'desc')
      );

      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => {
        const orderData = doc.data();
        return {
          ...orderData,
          id: doc.id,
          createdAt: orderData.createdAt?.toDate() || null,
          updatedAt: orderData.updatedAt?.toDate() || null,
          scheduledTime: orderData.scheduledTime instanceof Timestamp 
            ? orderData.scheduledTime.toDate() 
            : orderData.scheduledTime
        };
      });
    } catch (error) {
      console.error('Error getting orders by date range:', error);
      throw error;
    }
  }

  async getEstimatedTime(orderType) {
    try {
      const pendingOrders = await OrderService.getPendingOrders();
      const baseTimes = {
        'delivery': 30,
        'pickup': 15,
        'dine-in': 10
      };
      const additionalTime = Math.min(pendingOrders.length * 2, 20); // Max 20 min additional
      return baseTimes[orderType] + additionalTime;
    } catch (error) {
      console.error('Error calculating estimated time:', error);
      const defaultTimes = {
        'delivery': 45,
        'pickup': 20,
        'dine-in': 15
      };
      return defaultTimes[orderType] || 30;
    }
  }

  formatOrderForSubmission(checkoutData, cartItems, user, total) {
    const {
      fullName,
      email,
      phone,
      address,
      city,
      zipCode,
      notes,
      tableNumber,
      partySize,
      scheduledTime
    } = checkoutData;

    const taxRate = 0.0825; // 8.25%
    const tax = total * taxRate;
    const deliveryFee = checkoutData.orderType === 'delivery' ? 3.99 : 0;
    const serviceFee = checkoutData.orderType === 'dine-in' ? total * 0.10 : 0;
    const orderTotal = total + tax + deliveryFee + serviceFee;

    const items = cartItems.map(item => ({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      totalPrice: item.totalPrice,
      toppings: item.toppings || []
    }));

    const order = {
      userId: user?.uid || null,
      customerInfo: {
        fullName,
        email,
        phone
      },
      orderType: checkoutData.orderType,
      items,
      paymentMethod: checkoutData.paymentMethod,
      financials: {
        subtotal: total,
        tax,
        deliveryFee,
        serviceFee,
        total: orderTotal
      },
      notes,
      orderTime: checkoutData.orderTime,
      scheduledTime: scheduledTime ? new Date(scheduledTime) : null
    };

    if (checkoutData.orderType === 'delivery') {
      order.deliveryInfo = {
        address,
        city,
        zipCode
      };
    } else if (checkoutData.orderType === 'dine-in') {
      order.dineInInfo = {
        tableNumber: tableNumber || 'Not assigned',
        partySize
      };
    }
    return order;
  }
}

const orderService = new OrderService();

export default orderService;
