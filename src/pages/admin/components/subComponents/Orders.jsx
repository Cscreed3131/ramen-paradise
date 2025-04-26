import React, { useState } from 'react';

function Orders() {
  // Sample orders data - replace with actual data from your backend
  const [orders, setOrders] = useState([
    {
      id: "ORD-10001",
      customer: {
        name: "Emily Johnson",
        email: "emily.j@example.com",
        phone: "+1 (555) 123-4567",
        avatar: "https://randomuser.me/api/portraits/women/12.jpg"
      },
      status: "delivered",
      total: 49.98,
      items: [
        { id: 1, name: "Tonkotsu Ramen", quantity: 2, price: 14.99 },
        { id: 2, name: "Gyoza", quantity: 1, price: 8.99 },
        { id: 3, name: "Green Tea", quantity: 2, price: 3.50 }
      ],
      date: "2025-04-20T14:48:00",
      paymentMethod: "Credit Card",
      deliveryAddress: "123 Main St, New York, NY 10001",
      notes: "Please leave at the door"
    },
    {
      id: "ORD-10002",
      customer: {
        name: "Hiroshi Tanaka",
        email: "h.tanaka@example.com",
        phone: "+81 90-1234-5678",
        avatar: "https://randomuser.me/api/portraits/men/42.jpg"
      },
      status: "processing",
      total: 68.45,
      items: [
        { id: 4, name: "Spicy Miso Ramen", quantity: 2, price: 15.99 },
        { id: 5, name: "California Roll", quantity: 2, price: 12.99 },
        { id: 6, name: "Sake", quantity: 1, price: 10.50 }
      ],
      date: "2025-04-24T10:15:00",
      paymentMethod: "PayPal",
      deliveryAddress: "456 Cherry Blossom St, Tokyo",
      notes: ""
    },
    {
      id: "ORD-10003",
      customer: {
        name: "Sofia Rodriguez",
        email: "sofia.r@example.com",
        phone: "+1 (555) 987-6543",
        avatar: "https://randomuser.me/api/portraits/women/45.jpg"
      },
      status: "pending",
      total: 35.97,
      items: [
        { id: 7, name: "Shoyu Ramen", quantity: 1, price: 13.99 },
        { id: 8, name: "Edamame", quantity: 1, price: 5.99 },
        { id: 9, name: "Matcha Ice Cream", quantity: 1, price: 6.99 },
        { id: 10, name: "Jasmine Tea", quantity: 2, price: 4.50 }
      ],
      date: "2025-04-24T12:33:00",
      paymentMethod: "Credit Card",
      deliveryAddress: "789 Palm Ave, Miami, FL 33101",
      notes: "Extra chopsticks please"
    },
    {
      id: "ORD-10004",
      customer: {
        name: "James Wilson",
        email: "james.w@example.com",
        phone: "+1 (555) 456-7890",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg"
      },
      status: "cancelled",
      total: 41.97,
      items: [
        { id: 11, name: "Vegetable Ramen", quantity: 2, price: 12.99 },
        { id: 12, name: "Mochi", quantity: 4, price: 3.99 }
      ],
      date: "2025-04-19T18:22:00",
      paymentMethod: "Credit Card",
      deliveryAddress: "101 Lake St, Chicago, IL 60601",
      notes: ""
    },
    {
      id: "ORD-10005",
      customer: {
        name: "Yuki Sato",
        email: "yuki.s@example.com",
        phone: "+81 80-9876-5432",
        avatar: "https://randomuser.me/api/portraits/women/65.jpg"
      },
      status: "delivered",
      total: 76.94,
      items: [
        { id: 13, name: "Tonkotsu Ramen", quantity: 2, price: 14.99 },
        { id: 14, name: "Dragon Roll", quantity: 1, price: 16.99 },
        { id: 15, name: "Tempura", quantity: 1, price: 12.99 },
        { id: 16, name: "Sake", quantity: 1, price: 10.50 },
        { id: 17, name: "Mochi", quantity: 2, price: 3.99 }
      ],
      date: "2025-04-17T19:05:00",
      paymentMethod: "Credit Card",
      deliveryAddress: "202 Sakura Blvd, Osaka",
      notes: ""
    },
    {
      id: "ORD-10006",
      customer: {
        name: "Michael Brown",
        email: "m.brown@example.com",
        phone: "+1 (555) 789-0123",
        avatar: "https://randomuser.me/api/portraits/men/55.jpg"
      },
      status: "pending",
      total: 27.98,
      items: [
        { id: 18, name: "Miso Ramen", quantity: 1, price: 13.99 },
        { id: 19, name: "Gyoza", quantity: 1, price: 8.99 },
        { id: 20, name: "Green Tea", quantity: 1, price: 3.50 }
      ],
      date: "2025-04-24T09:45:00",
      paymentMethod: "PayPal",
      deliveryAddress: "303 Hollywood Blvd, Los Angeles, CA 90028",
      notes: "Allergic to sesame"
    }
  ]);
  
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter orders
  const filteredOrders = orders.filter(order => {
    // Apply status filter
    if (statusFilter !== 'all' && order.status !== statusFilter) {
      return false;
    }
    
    // Apply date filter
    if (dateFilter !== 'all') {
      const orderDate = new Date(order.date);
      const today = new Date();
      
      if (dateFilter === 'today') {
        // Check if order is from today
        return orderDate.toDateString() === today.toDateString();
      } else if (dateFilter === 'week') {
        // Check if order is from this week
        const weekAgo = new Date();
        weekAgo.setDate(today.getDate() - 7);
        return orderDate >= weekAgo;
      } else if (dateFilter === 'month') {
        // Check if order is from this month
        const monthAgo = new Date();
        monthAgo.setMonth(today.getMonth() - 1);
        return orderDate >= monthAgo;
      }
    }
    
    // Apply search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        order.id.toLowerCase().includes(searchLower) ||
        order.customer.name.toLowerCase().includes(searchLower) ||
        order.customer.email.toLowerCase().includes(searchLower)
      );
    }
    
    return true;
  });
  
  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };
  
  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleString(undefined, options);
  };
  
  // Get status badge styling
  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'processing':
        return 'bg-blue-500/20 text-blue-400';
      case 'delivered':
        return 'bg-green-500/20 text-green-400';
      case 'cancelled':
        return 'bg-red-500/20 text-red-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };
  
  // View order details
  const viewOrderDetails = (order) => {
    setSelectedOrder(order);
  };
  
  // Update order status
  const updateOrderStatus = (orderId, newStatus) => {
    const updatedOrders = orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
    
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };
  
  // Calculate totals
  const calculateTotals = () => {
    return {
      totalOrders: filteredOrders.length,
      pending: filteredOrders.filter(o => o.status === 'pending').length,
      processing: filteredOrders.filter(o => o.status === 'processing').length,
      delivered: filteredOrders.filter(o => o.status === 'delivered').length,
      cancelled: filteredOrders.filter(o => o.status === 'cancelled').length,
      revenue: filteredOrders
        .filter(o => o.status !== 'cancelled')
        .reduce((sum, order) => sum + order.total, 0)
    };
  };
  
  const totals = calculateTotals();

  return (
    <div className='flex flex-col space-y-6'>
      {/* Header */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 shadow-lg overflow-hidden">
        <div className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Order <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-red-500">Management</span>
              </h2>
              <p className="text-gray-400">
                Track and manage customer orders
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-red-500 mt-4"></div>
            </div>
            
            <div className="mt-4 md:mt-0 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search orders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full lg:w-60 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>
              
              <div className="flex space-x-2">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  <option value="all">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                
                <select
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  <option value="all">All Time</option>
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Order Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Total Orders */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 shadow-lg overflow-hidden">
          <div className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 text-sm">Total Orders</p>
                <h3 className="text-2xl font-bold text-white">{totals.totalOrders}</h3>
              </div>
              <div className="h-10 w-10 bg-purple-500/20 rounded-lg flex items-center justify-center text-purple-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        {/* Pending Orders */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 shadow-lg overflow-hidden">
          <div className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 text-sm">Pending</p>
                <h3 className="text-2xl font-bold text-white">{totals.pending}</h3>
              </div>
              <div className="h-10 w-10 bg-yellow-500/20 rounded-lg flex items-center justify-center text-yellow-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        {/* Processing Orders */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 shadow-lg overflow-hidden">
          <div className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 text-sm">Processing</p>
                <h3 className="text-2xl font-bold text-white">{totals.processing}</h3>
              </div>
              <div className="h-10 w-10 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        {/* Delivered Orders */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 shadow-lg overflow-hidden">
          <div className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 text-sm">Delivered</p>
                <h3 className="text-2xl font-bold text-white">{totals.delivered}</h3>
              </div>
              <div className="h-10 w-10 bg-green-500/20 rounded-lg flex items-center justify-center text-green-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        {/* Total Revenue */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 shadow-lg overflow-hidden">
          <div className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 text-sm">Revenue</p>
                <h3 className="text-2xl font-bold text-white">{formatCurrency(totals.revenue)}</h3>
              </div>
              <div className="h-10 w-10 bg-green-500/20 rounded-lg flex items-center justify-center text-green-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Orders Table and Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Orders Table */}
        <div className={`${selectedOrder ? 'lg:col-span-2' : 'lg:col-span-3'}`}>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 shadow-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-700 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-white">Orders List</h3>
              <span className="text-gray-400 text-sm">
                {filteredOrders.length} {filteredOrders.length === 1 ? 'order' : 'orders'} found
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-700/50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Order ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Total</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {filteredOrders.length > 0 ? (
                    filteredOrders.map((order, index) => (
                      <tr key={order.id} className={index % 2 === 0 ? 'bg-gray-800/30' : 'bg-gray-800/10'}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                          {order.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-8 w-8 rounded-full flex-shrink-0 overflow-hidden">
                              <img 
                                src={order.customer.avatar} 
                                alt={order.customer.name} 
                                className="h-8 w-8 object-cover"
                              />
                            </div>
                            <div className="ml-3">
                              <div className="text-sm font-medium text-white">{order.customer.name}</div>
                              <div className="text-sm text-gray-400">{order.customer.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          {formatDate(order.date)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          {formatCurrency(order.total)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(order.status)} capitalize`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button 
                            onClick={() => viewOrderDetails(order)}
                            className="text-blue-400 hover:text-blue-300 transition duration-150 mr-4"
                          >
                            View
                          </button>
                          <div className="relative inline-block text-left">
                            <select 
                              className="bg-gray-700 text-gray-300 text-xs rounded-lg py-1 px-2 border border-gray-600 focus:outline-none focus:ring-1 focus:ring-yellow-500"
                              value={order.status}
                              onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                            >
                              <option value="pending">Pending</option>
                              <option value="processing">Processing</option>
                              <option value="delivered">Delivered</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="px-6 py-10 text-center text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto text-gray-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                        </svg>
                        <p className="text-lg">No orders found</p>
                        <p className="text-sm mt-1">Try adjusting your search or filter criteria</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-4 bg-gray-800/20 border-t border-gray-700">
              <p className="text-sm text-gray-400">
                Showing {filteredOrders.length} {filteredOrders.length === 1 ? 'order' : 'orders'} 
                {statusFilter !== 'all' ? ` with status "${statusFilter}"` : ''} 
                {dateFilter !== 'all' ? ` from ${dateFilter === 'today' ? 'today' : dateFilter === 'week' ? 'this week' : 'this month'}` : ''}
                {searchTerm ? ` matching "${searchTerm}"` : ''}
              </p>
            </div>
          </div>
        </div>
        
        {/* Order Details */}
        {selectedOrder && (
          <div className="lg:col-span-1">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 shadow-lg overflow-hidden sticky top-6">
              <div className="px-6 py-4 border-b border-gray-700 flex justify-between items-center">
                <h3 className="text-lg font-semibold text-white">Order Details</h3>
                <button 
                  onClick={() => setSelectedOrder(null)}
                  className="text-gray-400 hover:text-white transition duration-150"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h4 className="text-xl font-semibold text-white">{selectedOrder.id}</h4>
                    <p className="text-gray-400 mt-1">{formatDate(selectedOrder.date)}</p>
                  </div>
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusBadge(selectedOrder.status)} capitalize`}>
                    {selectedOrder.status}
                  </span>
                </div>
                
                <div className="mb-6">
                  <h5 className="text-sm font-medium text-gray-400 mb-2">CUSTOMER INFO</h5>
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full overflow-hidden">
                      <img 
                        src={selectedOrder.customer.avatar} 
                        alt={selectedOrder.customer.name} 
                        className="h-10 w-10 object-cover" 
                      />
                    </div>
                    <div className="ml-3">
                      <p className="text-white font-medium">{selectedOrder.customer.name}</p>
                      <p className="text-gray-400 text-sm">{selectedOrder.customer.email}</p>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm mt-2">{selectedOrder.customer.phone}</p>
                </div>
                
                <div className="mb-6">
                  <h5 className="text-sm font-medium text-gray-400 mb-2">DELIVERY ADDRESS</h5>
                  <p className="text-gray-300 text-sm">{selectedOrder.deliveryAddress}</p>
                </div>
                
                {selectedOrder.notes && (
                  <div className="mb-6">
                    <h5 className="text-sm font-medium text-gray-400 mb-2">ORDER NOTES</h5>
                    <p className="text-gray-300 text-sm">{selectedOrder.notes}</p>
                  </div>
                )}
                
                <div className="mb-6">
                  <h5 className="text-sm font-medium text-gray-400 mb-2">PAYMENT METHOD</h5>
                  <p className="text-gray-300 text-sm">{selectedOrder.paymentMethod}</p>
                </div>
                
                <div className="mb-6">
                  <h5 className="text-sm font-medium text-gray-400 mb-2">ORDER ITEMS</h5>
                  <div className="bg-gray-700/30 rounded-lg overflow-hidden">
                    <div className="divide-y divide-gray-700">
                      {selectedOrder.items.map((item) => (
                        <div key={item.id} className="p-3 flex justify-between">
                          <div>
                            <p className="text-white text-sm font-medium">{item.name}</p>
                            <p className="text-gray-400 text-xs mt-1">Qty: {item.quantity}</p>
                          </div>
                          <p className="text-gray-300 text-sm">
                            {formatCurrency(item.price * item.quantity)}
                          </p>
                        </div>
                      ))}
                    </div>
                    <div className="p-3 border-t border-gray-700 flex justify-between">
                      <p className="text-white font-medium">Total</p>
                      <p className="text-white font-medium">{formatCurrency(selectedOrder.total)}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <button className="flex-1 px-4 py-2 bg-gradient-to-r from-yellow-500 to-red-500 hover:from-yellow-600 hover:to-red-600 text-white font-medium rounded-lg transition duration-300 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                    </svg>
                    Print Receipt
                  </button>
                  <select 
                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    value={selectedOrder.status}
                    onChange={(e) => updateOrderStatus(selectedOrder.id, e.target.value)}
                  >
                    <option value="pending">Mark as Pending</option>
                    <option value="processing">Mark as Processing</option>
                    <option value="delivered">Mark as Delivered</option>
                    <option value="cancelled">Mark as Cancelled</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Orders;