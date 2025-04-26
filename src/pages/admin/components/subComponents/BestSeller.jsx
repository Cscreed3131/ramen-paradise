import React, { useState } from 'react';

function BestSeller() {
  // Sample bestseller products data - in a real app, this would come from your backend
  const [bestSellers, setBestSellers] = useState([
    {
      id: 1,
      name: "Tonkotsu Ramen",
      image: "https://images.unsplash.com/photo-1614563637806-1d0e645e0940?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      price: 14.99,
      sales: 342,
      revenue: 5127.58,
      rating: 4.8,
      category: "ramen",
      growth: 24,
    },
    {
      id: 2,
      name: "Spicy Miso Ramen",
      image: "https://images.unsplash.com/photo-1591814468924-caf88d1232e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      price: 15.99,
      sales: 287,
      revenue: 4589.13,
      rating: 4.7,
      category: "ramen",
      growth: 18,
    },
    {
      id: 3,
      name: "Dragon Roll",
      image: "https://images.unsplash.com/photo-1617196034288-de201c5939cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      price: 12.99,
      sales: 253,
      revenue: 3286.47,
      rating: 4.6,
      category: "sushi",
      growth: -5,
    },
    {
      id: 4,
      name: "Gyoza",
      image: "https://images.unsplash.com/photo-1626845357008-01fe606c2cf6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      price: 8.99,
      sales: 241,
      revenue: 2166.59,
      rating: 4.5,
      category: "appetizers",
      growth: 32,
    },
    {
      id: 5,
      name: "Matcha Green Tea",
      image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      price: 4.99,
      sales: 224,
      revenue: 1117.76,
      rating: 4.4,
      category: "drinks",
      growth: 15,
    }
  ]);

  // Filter options
  const [timeRange, setTimeRange] = useState('month');
  const [sortBy, setSortBy] = useState('sales');
  const [category, setCategory] = useState('all');

  // Sort and filter the bestsellers
  const filteredBestSellers = () => {
    let filtered = [...bestSellers];
    
    // Apply category filter
    if (category !== 'all') {
      filtered = filtered.filter(item => item.category === category);
    }
    
    // Apply sorting
    filtered.sort((a, b) => {
      if (sortBy === 'sales') return b.sales - a.sales;
      if (sortBy === 'revenue') return b.revenue - a.revenue;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'growth') return b.growth - a.growth;
      return 0;
    });
    
    return filtered;
  };

  const getTotalStats = () => {
    const filtered = filteredBestSellers();
    return {
      totalSales: filtered.reduce((sum, item) => sum + item.sales, 0),
      totalRevenue: filtered.reduce((sum, item) => sum + item.revenue, 0),
      averageRating: (filtered.reduce((sum, item) => sum + item.rating, 0) / filtered.length).toFixed(1)
    };
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  };

  const getGrowthColor = (growth) => {
    if (growth > 0) return 'text-green-500';
    if (growth < 0) return 'text-red-500';
    return 'text-gray-400';
  };

  const getGrowthIcon = (growth) => {
    if (growth > 0) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      );
    }
    if (growth < 0) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0v-8m0 8l-8-8-4 4-6-6" />
        </svg>
      );
    }
    return (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" />
      </svg>
    );
  };

  const { totalSales, totalRevenue, averageRating } = getTotalStats();

  return (
    <div className='flex flex-col space-y-6'>
      {/* Header */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 shadow-lg overflow-hidden">
        <div className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Best <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-red-500">Sellers</span>
              </h2>
              <p className="text-gray-400">
                Track your top performing products and sales data
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-red-500 mt-4"></div>
            </div>
            
            <div className="mt-4 md:mt-0 flex items-center">
              <div className="bg-gray-700 rounded-lg p-1 flex space-x-1">
                <button 
                  onClick={() => setTimeRange('week')}
                  className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                    timeRange === 'week' 
                      ? 'bg-gradient-to-r from-yellow-500 to-red-500 text-white' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  Week
                </button>
                <button 
                  onClick={() => setTimeRange('month')}
                  className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                    timeRange === 'month' 
                      ? 'bg-gradient-to-r from-yellow-500 to-red-500 text-white' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  Month
                </button>
                <button 
                  onClick={() => setTimeRange('year')}
                  className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                    timeRange === 'year' 
                      ? 'bg-gradient-to-r from-yellow-500 to-red-500 text-white' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  Year
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Sales */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 shadow-lg overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 text-sm mb-1">Total Sales</p>
                <h3 className="text-2xl font-bold text-white">{totalSales}</h3>
                <p className="text-gray-400 text-sm mt-1">Products sold this {timeRange}</p>
              </div>
              <div className="h-12 w-12 bg-yellow-500/20 rounded-lg flex items-center justify-center text-yellow-500">
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
                <h3 className="text-2xl font-bold text-white">{formatCurrency(totalRevenue)}</h3>
                <p className="text-gray-400 text-sm mt-1">Revenue this {timeRange}</p>
              </div>
              <div className="h-12 w-12 bg-green-500/20 rounded-lg flex items-center justify-center text-green-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        {/* Average Rating */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 shadow-lg overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 text-sm mb-1">Average Rating</p>
                <h3 className="text-2xl font-bold text-white">{averageRating} / 5</h3>
                <p className="text-gray-400 text-sm mt-1">From customer reviews</p>
              </div>
              <div className="h-12 w-12 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.915a1 1 0 00.95-.69l1.519-4.674z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and sorting */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 shadow-lg overflow-hidden">
        <div className="p-6">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="w-full md:w-1/2 lg:w-1/4">
              <label className="block text-gray-400 text-sm mb-2">Filter by Category</label>
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                <option value="all">All Categories</option>
                <option value="ramen">Ramen</option>
                <option value="sushi">Sushi</option>
                <option value="appetizers">Appetizers</option>
                <option value="desserts">Desserts</option>
                <option value="drinks">Drinks</option>
              </select>
            </div>
            
            <div className="w-full md:w-1/2 lg:w-1/4">
              <label className="block text-gray-400 text-sm mb-2">Sort by</label>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                <option value="sales">Most Sales</option>
                <option value="revenue">Highest Revenue</option>
                <option value="rating">Best Rating</option>
                <option value="growth">Growth Rate</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Bestsellers table */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 shadow-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-700">
          <h3 className="text-lg font-semibold text-white">Top 5 Bestselling Products</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Sales</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Revenue</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Rating</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Growth</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredBestSellers().map((product, index) => (
                <tr key={product.id} className={index % 2 === 0 ? 'bg-gray-800/30' : 'bg-gray-800/10'}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0 rounded-md overflow-hidden">
                        <img className="h-10 w-10 object-cover" src={product.image} alt={product.name} />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-white">{product.name}</div>
                        <div className="text-sm text-gray-400">#{product.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-700 text-gray-300 capitalize">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {formatCurrency(product.price)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {product.sales} units
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {formatCurrency(product.revenue)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="ml-1 text-sm text-gray-300">{product.rating.toFixed(1)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`flex items-center ${getGrowthColor(product.growth)}`}>
                      {getGrowthIcon(product.growth)}
                      <span className="ml-1 text-sm">{product.growth > 0 ? '+' : ''}{product.growth}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 bg-gray-800/20 border-t border-gray-700">
          <p className="text-sm text-gray-400">
            Showing top {filteredBestSellers().length} products by {sortBy === 'sales' ? 'sales' : 
            sortBy === 'revenue' ? 'revenue' : 
            sortBy === 'rating' ? 'rating' : 'growth rate'} for the {timeRange}
          </p>
        </div>
      </div>
      
      {/* Export and report section */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 shadow-lg overflow-hidden">
        <div className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Generate Reports</h3>
              <p className="text-gray-400 text-sm">Export your bestseller data for further analysis</p>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-4">
              <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition duration-300 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                CSV
              </button>
              <button className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-red-500 hover:from-yellow-600 hover:to-red-600 text-white font-medium rounded-lg transition duration-300 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                PDF Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BestSeller;