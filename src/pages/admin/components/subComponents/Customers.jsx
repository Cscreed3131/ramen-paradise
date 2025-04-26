import React, { useState } from 'react';

function Customers() {
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: "Emily Johnson",
      email: "emily.j@example.com",
      phone: "+1 (555) 123-4567",
      orders: 12,
      totalSpent: 458.97,
      lastOrder: "2025-04-10T14:48:00",
      status: "active",
      joinDate: "2024-09-15T09:30:00",
      avatar: "https://randomuser.me/api/portraits/women/12.jpg",
      location: "New York, USA"
    },
    {
      id: 2,
      name: "Hiroshi Tanaka",
      email: "h.tanaka@example.com",
      phone: "+81 90-1234-5678",
      orders: 24,
      totalSpent: 892.50,
      lastOrder: "2025-04-22T18:23:00",
      status: "active",
      joinDate: "2024-06-05T11:45:00",
      avatar: "https://randomuser.me/api/portraits/men/42.jpg",
      location: "Tokyo, Japan"
    },
    {
      id: 3,
      name: "Sofia Rodriguez",
      email: "sofia.r@example.com",
      phone: "+1 (555) 987-6543",
      orders: 8,
      totalSpent: 215.75,
      lastOrder: "2025-04-15T12:10:00",
      status: "active",
      joinDate: "2024-10-20T15:20:00",
      avatar: "https://randomuser.me/api/portraits/women/45.jpg",
      location: "Miami, USA"
    },
    {
      id: 4,
      name: "James Wilson",
      email: "james.w@example.com",
      phone: "+1 (555) 456-7890",
      orders: 5,
      totalSpent: 157.34,
      lastOrder: "2025-03-28T09:15:00",
      status: "inactive",
      joinDate: "2024-11-10T14:30:00",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      location: "Chicago, USA"
    },
    {
      id: 5,
      name: "Yuki Sato",
      email: "yuki.s@example.com",
      phone: "+81 80-9876-5432",
      orders: 18,
      totalSpent: 612.42,
      lastOrder: "2025-04-18T20:05:00",
      status: "active",
      joinDate: "2024-07-25T08:15:00",
      avatar: "https://randomuser.me/api/portraits/women/65.jpg",
      location: "Osaka, Japan"
    },
    {
      id: 6,
      name: "Michael Brown",
      email: "m.brown@example.com",
      phone: "+1 (555) 789-0123",
      orders: 3,
      totalSpent: 78.95,
      lastOrder: "2025-02-10T11:30:00",
      status: "inactive",
      joinDate: "2025-01-05T16:45:00",
      avatar: "https://randomuser.me/api/portraits/men/55.jpg",
      location: "Los Angeles, USA"
    },
    {
      id: 7,
      name: "Keiko Yamamoto",
      email: "k.yamamoto@example.com",
      phone: "+81 70-1122-3344",
      orders: 15,
      totalSpent: 487.25,
      lastOrder: "2025-04-05T13:20:00",
      status: "active",
      joinDate: "2024-08-12T10:10:00",
      avatar: "https://randomuser.me/api/portraits/women/76.jpg",
      location: "Kyoto, Japan"
    },
    {
      id: 8,
      name: "David Martinez",
      email: "david.m@example.com",
      phone: "+1 (555) 234-5678",
      orders: 9,
      totalSpent: 345.80,
      lastOrder: "2025-03-22T15:40:00",
      status: "active",
      joinDate: "2024-09-30T09:00:00",
      avatar: "https://randomuser.me/api/portraits/men/67.jpg",
      location: "San Francisco, USA"
    }
  ]);

  const [search, setSearch] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortField, setSortField] = useState('lastOrder');
  const [sortDirection, setSortDirection] = useState('desc');

  // Filter and sort customers
  const filteredCustomers = () => {
    return customers
      .filter(customer => {
        // Apply search filter
        const searchLower = search.toLowerCase();
        const matchesSearch = 
          customer.name.toLowerCase().includes(searchLower) ||
          customer.email.toLowerCase().includes(searchLower) ||
          customer.location.toLowerCase().includes(searchLower);
        
        // Apply status filter
        const matchesStatus = statusFilter === 'all' || customer.status === statusFilter;
        
        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        // Sort by selected field
        if (sortField === 'name') {
          return sortDirection === 'asc' 
            ? a.name.localeCompare(b.name) 
            : b.name.localeCompare(a.name);
        }
        
        if (sortField === 'joinDate') {
          return sortDirection === 'asc' 
            ? new Date(a.joinDate) - new Date(b.joinDate) 
            : new Date(b.joinDate) - new Date(a.joinDate);
        }
        
        if (sortField === 'lastOrder') {
          return sortDirection === 'asc' 
            ? new Date(a.lastOrder) - new Date(b.lastOrder) 
            : new Date(b.lastOrder) - new Date(a.lastOrder);
        }
        
        if (sortField === 'orders') {
          return sortDirection === 'asc' 
            ? a.orders - b.orders 
            : b.orders - a.orders;
        }
        
        if (sortField === 'totalSpent') {
          return sortDirection === 'asc' 
            ? a.totalSpent - b.totalSpent 
            : b.totalSpent - a.totalSpent;
        }
        
        return 0;
      });
  };

  // Handle sort toggle
  const toggleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  // Handle viewing customer details
  const viewCustomerDetails = (customer) => {
    setSelectedCustomer(customer);
  };

  // Format date to readable string
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Format time ago from date
  const timeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);
    
    let interval = seconds / 31536000; // 60 * 60 * 24 * 365
    if (interval > 1) {
      return Math.floor(interval) + " years ago";
    }
    interval = seconds / 2592000; // 60 * 60 * 24 * 30
    if (interval > 1) {
      return Math.floor(interval) + " months ago";
    }
    interval = seconds / 86400; // 60 * 60 * 24
    if (interval > 1) {
      return Math.floor(interval) + " days ago";
    }
    interval = seconds / 3600; // 60 * 60
    if (interval > 1) {
      return Math.floor(interval) + " hours ago";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes ago";
    }
    return Math.floor(seconds) + " seconds ago";
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

  // Calculate total metrics
  const calculateMetrics = () => {
    const filtered = filteredCustomers();
    
    return {
      totalCustomers: filtered.length,
      activeCustomers: filtered.filter(c => c.status === 'active').length,
      totalOrders: filtered.reduce((sum, c) => sum + c.orders, 0),
      totalRevenue: filtered.reduce((sum, c) => sum + c.totalSpent, 0)
    };
  };

  const metrics = calculateMetrics();

  return (
    <div className='flex flex-col space-y-6'>
      {/* Header */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 shadow-lg overflow-hidden">
        <div className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Customer <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-red-500">Management</span>
              </h2>
              <p className="text-gray-400">
                View and manage your customer base
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-red-500 mt-4"></div>
            </div>
            
            <div className="mt-4 md:mt-0">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search customers..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full lg:w-64 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Customers */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 shadow-lg overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 text-sm mb-1">Total Customers</p>
                <h3 className="text-2xl font-bold text-white">{metrics.totalCustomers}</h3>
              </div>
              <div className="h-12 w-12 bg-purple-500/20 rounded-lg flex items-center justify-center text-purple-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        {/* Active Customers */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 shadow-lg overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 text-sm mb-1">Active Customers</p>
                <h3 className="text-2xl font-bold text-white">{metrics.activeCustomers}</h3>
                <p className="text-green-400 text-sm mt-1">
                  {Math.round((metrics.activeCustomers / metrics.totalCustomers) * 100)}% active rate
                </p>
              </div>
              <div className="h-12 w-12 bg-green-500/20 rounded-lg flex items-center justify-center text-green-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        {/* Total Orders */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 shadow-lg overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 text-sm mb-1">Total Orders</p>
                <h3 className="text-2xl font-bold text-white">{metrics.totalOrders}</h3>
                <p className="text-gray-400 text-sm mt-1">
                  Avg. {(metrics.totalOrders / metrics.totalCustomers).toFixed(1)} per customer
                </p>
              </div>
              <div className="h-12 w-12 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        {/* Total Revenue */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 shadow-lg overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 text-sm mb-1">Total Revenue</p>
                <h3 className="text-2xl font-bold text-white">{formatCurrency(metrics.totalRevenue)}</h3>
                <p className="text-gray-400 text-sm mt-1">
                  Avg. {formatCurrency(metrics.totalRevenue / metrics.totalCustomers)} per customer
                </p>
              </div>
              <div className="h-12 w-12 bg-yellow-500/20 rounded-lg flex items-center justify-center text-yellow-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter options */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 shadow-lg overflow-hidden">
        <div className="p-6">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="w-full md:w-1/3">
              <label className="block text-gray-400 text-sm mb-2">Filter by Status</label>
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                <option value="all">All Customers</option>
                <option value="active">Active Customers</option>
                <option value="inactive">Inactive Customers</option>
              </select>
            </div>
            
            <div className="w-full md:w-1/3">
              <label className="block text-gray-400 text-sm mb-2">Sort by</label>
              <select 
                value={sortField}
                onChange={(e) => {
                  setSortField(e.target.value);
                  setSortDirection('desc');
                }}
                className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                <option value="lastOrder">Last Order Date</option>
                <option value="joinDate">Join Date</option>
                <option value="orders">Number of Orders</option>
                <option value="totalSpent">Total Spent</option>
                <option value="name">Customer Name</option>
              </select>
            </div>
            
            <div className="w-full md:w-1/3">
              <label className="block text-gray-400 text-sm mb-2">Order</label>
              <select 
                value={sortDirection}
                onChange={(e) => setSortDirection(e.target.value)}
                className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                <option value="desc">Descending</option>
                <option value="asc">Ascending</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main content - Customers list and details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Customer list */}
        <div className={`${selectedCustomer ? 'lg:col-span-2' : 'lg:col-span-3'}`}>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 shadow-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-700 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-white">Customer List</h3>
              <span className="text-gray-400 text-sm">
                {filteredCustomers().length} {filteredCustomers().length === 1 ? 'customer' : 'customers'} found
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-700/50">
                  <tr>
                    <th 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer"
                      onClick={() => toggleSort('name')}
                    >
                      <div className="flex items-center">
                        Customer
                        {sortField === 'name' && (
                          <svg xmlns="http://www.w3.org/2000/svg" className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={sortDirection === 'asc' ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
                          </svg>
                        )}
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Location</th>
                    <th 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer"
                      onClick={() => toggleSort('joinDate')}
                    >
                      <div className="flex items-center">
                        Joined
                        {sortField === 'joinDate' && (
                          <svg xmlns="http://www.w3.org/2000/svg" className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={sortDirection === 'asc' ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
                          </svg>
                        )}
                      </div>
                    </th>
                    <th 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer"
                      onClick={() => toggleSort('orders')}
                    >
                      <div className="flex items-center">
                        Orders
                        {sortField === 'orders' && (
                          <svg xmlns="http://www.w3.org/2000/svg" className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={sortDirection === 'asc' ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
                          </svg>
                        )}
                      </div>
                    </th>
                    <th 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer"
                      onClick={() => toggleSort('totalSpent')}
                    >
                      <div className="flex items-center">
                        Total Spent
                        {sortField === 'totalSpent' && (
                          <svg xmlns="http://www.w3.org/2000/svg" className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={sortDirection === 'asc' ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
                          </svg>
                        )}
                      </div>
                    </th>
                    <th 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer"
                      onClick={() => toggleSort('lastOrder')}
                    >
                      <div className="flex items-center">
                        Last Order
                        {sortField === 'lastOrder' && (
                          <svg xmlns="http://www.w3.org/2000/svg" className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={sortDirection === 'asc' ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
                          </svg>
                        )}
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {filteredCustomers().map((customer, index) => (
                    <tr key={customer.id} className={index % 2 === 0 ? 'bg-gray-800/30' : 'bg-gray-800/10'}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0 rounded-full overflow-hidden">
                            <img className="h-10 w-10 object-cover" src={customer.avatar} alt={customer.name} />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-white">{customer.name}</div>
                            <div className="text-sm text-gray-400">{customer.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {customer.location}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {formatDate(customer.joinDate)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {customer.orders}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {formatCurrency(customer.totalSpent)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {timeAgo(customer.lastOrder)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          customer.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'
                        }`}>
                          {customer.status === 'active' ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button 
                          onClick={() => viewCustomerDetails(customer)}
                          className="text-blue-400 hover:text-blue-300 transition duration-150"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}

                  {filteredCustomers().length === 0 && (
                    <tr>
                      <td colSpan="8" className="px-6 py-10 text-center text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto text-gray-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <p className="text-lg">No customers found</p>
                        <p className="text-sm mt-1">Try adjusting your search or filter criteria</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-4 bg-gray-800/20 border-t border-gray-700">
              <p className="text-sm text-gray-400">
                Showing {filteredCustomers().length} {filteredCustomers().length === 1 ? 'customer' : 'customers'} 
                {statusFilter !== 'all' ? ` with status "${statusFilter}"` : ''} 
                {search ? ` matching "${search}"` : ''}
              </p>
            </div>
          </div>
        </div>
        
        {/* Customer details */}
        {selectedCustomer && (
          <div className="lg:col-span-1">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 shadow-lg overflow-hidden sticky top-6">
              <div className="px-6 py-4 border-b border-gray-700 flex justify-between items-center">
                <h3 className="text-lg font-semibold text-white">Customer Details</h3>
                <button 
                  onClick={() => setSelectedCustomer(null)}
                  className="text-gray-400 hover:text-white transition duration-150"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="p-6">
                <div className="flex flex-col items-center mb-6">
                  <div className="h-24 w-24 rounded-full overflow-hidden mb-4">
                    <img className="h-24 w-24 object-cover" src={selectedCustomer.avatar} alt={selectedCustomer.name} />
                  </div>
                  <h4 className="text-xl font-semibold text-white">{selectedCustomer.name}</h4>
                  <p className="text-gray-400 mt-1">{selectedCustomer.email}</p>
                  <span className={`mt-3 px-3 py-1 text-xs font-medium rounded-full ${
                    selectedCustomer.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'
                  }`}>
                    {selectedCustomer.status === 'active' ? 'Active Customer' : 'Inactive Customer'}
                  </span>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span className="text-white">{selectedCustomer.phone}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-white">{selectedCustomer.location}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-white">Joined {formatDate(selectedCustomer.joinDate)}</span>
                  </div>
                </div>
                
                <div className="bg-gray-700/30 rounded-xl p-4 mb-6">
                  <h5 className="text-white font-medium mb-3">Order Statistics</h5>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-400 text-sm">Total Orders</p>
                      <p className="text-xl font-semibold text-white">{selectedCustomer.orders}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Total Spent</p>
                      <p className="text-xl font-semibold text-white">{formatCurrency(selectedCustomer.totalSpent)}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Avg. Order Value</p>
                      <p className="text-xl font-semibold text-white">
                        {formatCurrency(selectedCustomer.totalSpent / selectedCustomer.orders)}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Last Order</p>
                      <p className="text-xl font-semibold text-white">{timeAgo(selectedCustomer.lastOrder)}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <button className="flex-1 px-4 py-2 bg-gradient-to-r from-yellow-500 to-red-500 hover:from-yellow-600 hover:to-red-600 text-white font-medium rounded-lg transition duration-300 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Contact
                  </button>
                  <button className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition duration-300 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    Orders
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Customers;