import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import orderService from '../firebase/OrderService';

const PreviousOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('active');
  
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!auth.status) {
      navigate('/auth/signin', { state: { from: '/your-orders' } });
      return;
    }
    
    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        const userOrders = await orderService.getOrdersByUser(auth.userData?.uid);
        setOrders(userOrders);
        setError(null);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError('Failed to load your orders. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchOrders();
  }, [auth.isLoggedIn, auth.userData?.uid, navigate]);
  
  const activeOrders = orders.filter(order => 
    ['pending', 'confirmed', 'preparing', 'ready', 'out-for-delivery'].includes(order.status)
  );
  
  const pastOrders = orders.filter(order => 
    ['delivered', 'completed', 'canceled'].includes(order.status)
  );
  
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };
  
 const formatDate = (date) => {
  if (!date) return 'N/A';
  const d = new Date(date);
  const options = { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  };
  return d.toLocaleString('en-US', options);
};
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500';
      case 'confirmed': return 'bg-blue-500';
      case 'preparing': return 'bg-indigo-500';
      case 'ready': return 'bg-green-500';
      case 'out-for-delivery': return 'bg-purple-500';
      case 'delivered':
      case 'completed': return 'bg-green-700';
      case 'canceled': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };
  
  const getStatusLabel = (status) => {
    switch (status) {
      case 'pending': return 'Pending';
      case 'confirmed': return 'Confirmed';
      case 'preparing': return 'Preparing';
      case 'ready': return 'Ready';
      case 'out-for-delivery': return 'Out for Delivery';
      case 'delivered': return 'Delivered';
      case 'completed': return 'Completed';
      case 'canceled': return 'Canceled';
      default: return status.charAt(0).toUpperCase() + status.slice(1);
    }
  };
  
  const getProgressPercentage = (status) => {
    const statusMap = {
      'pending': 10,
      'confirmed': 25,
      'preparing': 50,
      'ready': 75,
      'out-for-delivery': 90,
      'delivered': 100,
      'completed': 100,
      'canceled': 100
    };
    
    return statusMap[status] || 0;
  };
  
  const handleReorder = (order) => {
    const cartItems = order.items.map(item => ({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      totalPrice: item.totalPrice,
      toppings: item.toppings || []
    }));
    
    navigate('/checkout', { 
      state: { 
        cartItems, 
        total: order.financials.subtotal,
        reordering: true,
        orderType: order.orderType
      } 
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white py-8 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-3xl font-bold text-white">Your Orders</h1>
            <Link
              to="/"
              className="flex items-center text-yellow-500 hover:text-yellow-400 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              Return to Home
            </Link>
          </div>
          <p className="text-gray-400">Track current orders and view your order history</p>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-500/20 border border-red-500 rounded-lg p-4 mb-6">
            <p className="text-red-400">{error}</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-gray-800 rounded-xl border border-gray-700 shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-gray-700 rounded-full mx-auto flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-white mb-2">No Orders Yet</h2>
            <p className="text-gray-400 mb-6">You haven't placed any orders yet.</p>
            <Link 
              to="/order" 
              className="inline-block px-6 py-3 bg-gradient-to-r from-yellow-500 to-red-500 hover:from-yellow-600 hover:to-red-600 transition-colors rounded-lg text-white font-medium"
            >
              Order Now
            </Link>
          </div>
        ) : (
          <>
            {/* Tabs */}
            <div className="flex border-b border-gray-700 mb-6">
              <button
                className={`py-3 px-6 font-medium text-sm focus:outline-none ${
                  activeTab === 'active' 
                    ? 'text-yellow-500 border-b-2 border-yellow-500' 
                    : 'text-gray-400 hover:text-gray-200'
                }`}
                onClick={() => setActiveTab('active')}
              >
                Active Orders ({activeOrders.length})
              </button>
              <button
                className={`py-3 px-6 font-medium text-sm focus:outline-none ${
                  activeTab === 'past' 
                    ? 'text-yellow-500 border-b-2 border-yellow-500' 
                    : 'text-gray-400 hover:text-gray-200'
                }`}
                onClick={() => setActiveTab('past')}
              >
                Order History ({pastOrders.length})
              </button>
            </div>
            
            {/* Orders list */}
            <div className="space-y-6">
              {(activeTab === 'active' ? activeOrders : pastOrders).length > 0 ? (
                (activeTab === 'active' ? activeOrders : pastOrders).map((order) => (
                  <div 
                    key={order.id}
                    className="bg-gray-800 rounded-xl border border-gray-700 shadow-lg overflow-hidden"
                  >
                    {/* Order header */}
                    <div className="p-6 border-b border-gray-700 flex flex-col md:flex-row md:justify-between md:items-center">
                      <div>
                        <div className="flex items-center mb-2">
                          <span className="text-gray-400 text-sm">Order #{order.id}</span>
                          <span className={`ml-3 px-2 py-1 text-xs font-medium text-white rounded-full ${getStatusColor(order.status)}`}>
                            {getStatusLabel(order.status)}
                          </span>
                        </div>
                        <p className="text-gray-300 text-sm">
                          Placed on {formatDate(order.createdAt)}
                        </p>
                      </div>
                      <div className="mt-3 md:mt-0 flex items-center">
                        <span className="text-white font-bold">
                          {formatCurrency(order.financials.total)}
                        </span>
                        
                        {activeTab === 'past' && order.status !== 'canceled' && (
                          <button 
                            onClick={() => handleReorder(order)}
                            className="ml-4 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 rounded-lg text-sm font-medium"
                          >
                            Reorder
                          </button>
                        )}
                      </div>
                    </div>
                    
                    {/* Order details */}
                    <div className="p-6 border-b border-gray-700">
                      {/* Order type and details */}
                      <div className="flex items-start gap-6 mb-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-500 to-red-500 flex items-center justify-center flex-shrink-0">
                          {order.orderType === 'delivery' ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                            </svg>
                          ) : order.orderType === 'pickup' ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                          )}
                        </div>
                        
                        <div className="flex-1">
                          <h3 className="font-medium text-white mb-1 capitalize">
                            {order.orderType === 'delivery' ? 'Delivery' : 
                              order.orderType === 'pickup' ? 'Pickup' : 'Dine-in'}
                          </h3>
                          
                          <div className="text-sm text-gray-400">
                            {order.orderType === 'delivery' && order.deliveryInfo && (
                              <p className="mb-1">
                                {order.deliveryInfo.address}, {order.deliveryInfo.city}, {order.deliveryInfo.zipCode}
                              </p>
                            )}
                            
                            {order.orderType === 'dine-in' && order.dineInInfo && (
                              <p className="mb-1">
                                Table: {order.dineInInfo.tableNumber} • Party size: {order.dineInInfo.partySize}
                              </p>
                            )}
                            
                            <p>
                              {order.orderTime === 'asap' 
                                ? 'As soon as possible' 
                                : `Scheduled for ${formatDate(order.scheduledTime)}`
                              }
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Order progress (for active orders) */}
                      {activeTab === 'active' && order.status !== 'canceled' && (
                        <div className="mb-6">
                          <div className="flex justify-between text-xs text-gray-400 mb-1">
                            <span>Order received</span>
                            <span>Delivered</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <div 
                              className={`${getStatusColor(order.status)} h-2 rounded-full`}
                              style={{ width: `${getProgressPercentage(order.status)}%` }}
                            ></div>
                          </div>
                          <p className="text-sm text-gray-400 mt-2">
                            {order.status === 'pending' && 'Your order has been received and is awaiting confirmation.'}
                            {order.status === 'confirmed' && 'Your order has been confirmed and will be prepared soon.'}
                            {order.status === 'preparing' && 'Your delicious ramen is being prepared by our chefs.'}
                            {order.status === 'ready' && (order.orderType === 'pickup' 
                              ? 'Your order is ready for pickup!' 
                              : 'Your order is ready and waiting to be served.')}
                            {order.status === 'out-for-delivery' && 'Your food is on its way to you!'}
                          </p>
                        </div>
                      )}
                      
                      {/* Order items */}
                      <div className="space-y-3">
                        <h4 className="font-medium text-gray-300 text-sm mb-2">Order Items</h4>
                        <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                          {order.items.map((item, index) => (
                            <div key={`${item.id}-${index}`} className="flex justify-between text-sm">
                              <div>
                                <span className="text-white">{item.quantity}x {item.name}</span>
                                {item.toppings && item.toppings.length > 0 && (
                                  <p className="text-gray-400 text-xs ml-4">
                                    {item.toppings.map(topping => topping.name).join(', ')}
                                  </p>
                                )}
                              </div>
                              <span className="text-gray-400">{formatCurrency(item.totalPrice)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    {/* Order summary */}
                    <div className="p-6 bg-gray-800/50">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-400">Subtotal</p>
                          <p className="text-gray-400">Tax</p>
                          {order.financials.deliveryFee > 0 && (
                            <p className="text-gray-400">Delivery Fee</p>
                          )}
                          {order.financials.serviceFee > 0 && (
                            <p className="text-gray-400">Service Fee</p>
                          )}
                          <p className="font-medium text-white mt-2">Total</p>
                        </div>
                        <div className="text-right">
                          <p className="text-gray-400">{formatCurrency(order.financials.subtotal)}</p>
                          <p className="text-gray-400">{formatCurrency(order.financials.tax)}</p>
                          {order.financials.deliveryFee > 0 && (
                            <p className="text-gray-400">{formatCurrency(order.financials.deliveryFee)}</p>
                          )}
                          {order.financials.serviceFee > 0 && (
                            <p className="text-gray-400">{formatCurrency(order.financials.serviceFee)}</p>
                          )}
                          <p className="font-medium text-white mt-2">{formatCurrency(order.financials.total)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-gray-800 rounded-xl border border-gray-700 shadow-lg p-8 text-center">
                  <h3 className="text-xl font-bold text-white mb-2">
                    {activeTab === 'active' ? 'No Active Orders' : 'No Past Orders'}
                  </h3>
                  <p className="text-gray-400 mb-6">
                    {activeTab === 'active' 
                      ? 'You don\'t have any active orders at the moment.' 
                      : 'Your order history is currently empty.'}
                  </p>
                  {activeTab === 'active' && (
                    <Link 
                      to="/order" 
                      className="inline-block px-6 py-3 bg-gradient-to-r from-yellow-500 to-red-500 hover:from-yellow-600 hover:to-red-600 transition-colors rounded-lg text-white font-medium"
                    >
                      Place New Order
                    </Link>
                  )}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PreviousOrdersPage;