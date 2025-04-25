import React, { useState } from 'react';

function Offers() {
  const [activeTab, setActiveTab] = useState('current');
  
  // Regular offers data
  const currentOffers = [
    {
      id: 1,
      title: "Student Special",
      discount: "15% OFF",
      description: "Show your valid student ID to receive 15% off your entire order. Perfect for lunch breaks or study sessions!",
      code: "STUDENT15",
      validUntil: "No expiration",
      image: "https://images.unsplash.com/photo-1551326844-4df70f78d0e9",
      conditions: ["Valid student ID required", "Dine-in only", "Cannot be combined with other offers", "Not valid on weekends"],
      badgeText: "Popular"
    },
    {
      id: 2,
      title: "Lunch Set Menu",
      discount: "$9.99",
      description: "Enjoy a hearty ramen bowl, side dish, and a soft drink for a special price. Available weekdays between 11AM and 2PM.",
      code: "No code needed",
      validUntil: "Ongoing",
      image: "https://images.unsplash.com/photo-1557872943-16a5ac26437e",
      conditions: ["Monday to Friday, 11AM-2PM", "Dine-in only", "Selected ramen varieties only"],
      badgeText: "Best Value"
    },
    {
      id: 3,
      title: "Family Bundle",
      discount: "Save 20%",
      description: "Feed the whole family with our special bundle: 4 ramen bowls, 2 side dishes, and 4 drinks at a discounted price.",
      code: "FAMILY20",
      validUntil: "Ongoing",
      image: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1",
      conditions: ["Valid for groups of 4 or more", "Available all week", "Advance reservation recommended"],
      badgeText: null
    },
    {
      id: 4,
      title: "Happy Hour",
      discount: "Buy 1 Get 1 Free",
      description: "Buy one appetizer, get one free during our happy hour. Plus, enjoy discounted drinks and exclusive small plates!",
      code: "No code needed",
      validUntil: "Ongoing",
      image: "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d",
      conditions: ["Monday to Thursday, 4PM-6PM", "Equal or lesser value item free", "Dine-in only", "Selected appetizers only"],
      badgeText: "Limited Time"
    }
  ];
  
  // Seasonal limited-time offers
  const seasonalOffers = [
    {
      id: 5,
      title: "Cherry Blossom Special",
      discount: "New Item",
      description: "Celebrate spring with our limited-time Sakura ramen, featuring delicate cherry blossom-infused broth and special toppings.",
      code: "No code needed",
      validUntil: "April 30, 2025",
      image: "https://images.unsplash.com/photo-1522784081430-8ac6a122cbc8",
      conditions: ["Available for a limited time only", "While supplies last", "Cannot be combined with other offers"],
      badgeText: "Seasonal"
    },
    {
      id: 6,
      title: "Anniversary Celebration",
      discount: "30% OFF",
      description: "Help us celebrate our 5th anniversary with a special discount on all signature ramen bowls! Join the party!",
      code: "ANNIVERSARY5",
      validUntil: "May 15, 2025",
      image: "https://images.unsplash.com/photo-1617196034183-421b4917c92d",
      conditions: ["Valid only on signature bowls", "One discount per table", "Cannot be combined with other offers"],
      badgeText: "Limited Time"
    }
  ];
  
  // Loyalty program benefits
  const loyaltyBenefits = [
    {
      id: "bronze",
      tier: "Bronze",
      requirements: "Join the program",
      benefits: ["5% off every order", "Birthday special surprise", "Early access to seasonal menus"]
    },
    {
      id: "silver",
      tier: "Silver",
      requirements: "5+ visits in 3 months",
      benefits: ["10% off every order", "Free appetizer with ramen purchase", "Priority seating", "Exclusive tasting events"]
    },
    {
      id: "gold",
      tier: "Gold",
      requirements: "12+ visits in 3 months",
      benefits: ["15% off every order", "Free premium topping on every visit", "Reservations priority", "Seasonal gift box", "Invitation to chef's table events"]
    }
  ];
  
  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen text-white">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-red-500 blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-yellow-500 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 rounded-full bg-orange-400 blur-3xl"></div>
      </div>
      
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-16 max-w-7xl mx-auto">
        {/* Offers Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 bg-red-600/20 border border-red-500/30 text-red-400 rounded-full text-sm font-medium mb-3">
            Special Deals
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold">
            Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-red-500">Offers</span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-gray-400 text-base sm:text-lg">
            Enjoy special discounts, seasonal promotions, and exclusive deals to enhance your ramen experience.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-red-500 mx-auto mt-4"></div>
        </div>
        
        {/* Tab Navigation */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1 rounded-lg bg-gray-800 shadow-lg">
            <button 
              onClick={() => setActiveTab('current')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                activeTab === 'current' 
                  ? 'bg-gradient-to-r from-yellow-500 to-red-500 text-white shadow-md' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Current Offers
            </button>
            <button 
              onClick={() => setActiveTab('seasonal')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                activeTab === 'seasonal' 
                  ? 'bg-gradient-to-r from-yellow-500 to-red-500 text-white shadow-md' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Seasonal Specials
            </button>
            <button 
              onClick={() => setActiveTab('loyalty')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                activeTab === 'loyalty' 
                  ? 'bg-gradient-to-r from-yellow-500 to-red-500 text-white shadow-md' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Loyalty Program
            </button>
          </div>
        </div>
        
        {/* Current Offers Tab */}
        {activeTab === 'current' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {currentOffers.map((offer) => (
              <div 
                key={offer.id}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 shadow-lg hover:shadow-xl transition duration-300 group"
              >
                <div className="flex flex-col h-full">
                  {/* Offer Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={offer.image} 
                      alt={offer.title} 
                      className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-70"></div>
                    
                    {/* Discount Label */}
                    <div className="absolute top-4 right-4 bg-yellow-500 text-yellow-900 font-bold px-3 py-1 rounded-md">
                      {offer.discount}
                    </div>
                    
                    {/* Badge if applicable */}
                    {offer.badgeText && (
                      <span className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                        {offer.badgeText}
                      </span>
                    )}
                    
                    <h3 className="absolute bottom-4 left-4 text-xl text-white font-bold">{offer.title}</h3>
                  </div>
                  
                  {/* Offer Content */}
                  <div className="p-5 flex flex-col flex-grow">
                    <p className="text-gray-300 mb-4">{offer.description}</p>
                    
                    <div className="mt-auto">
                      <div className="flex justify-between items-center mb-3">
                        <div>
                          <span className="text-gray-400 text-sm">Promo Code:</span>
                          <span className="ml-2 text-yellow-400 font-mono font-semibold">{offer.code}</span>
                        </div>
                        <div className="text-gray-400 text-sm">
                          Valid until: <span className="text-gray-300">{offer.validUntil}</span>
                        </div>
                      </div>
                      
                      {/* Conditions */}
                      <div className="mt-3 pt-3 border-t border-gray-700">
                        <p className="text-gray-400 text-sm mb-1">Conditions:</p>
                        <ul className="text-gray-300 text-sm space-y-1">
                          {offer.conditions.map((condition, index) => (
                            <li key={index} className="flex items-start">
                              <span className="text-yellow-500 mr-2">•</span>
                              {condition}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <button className="mt-4 w-full bg-gradient-to-r from-yellow-500 to-red-500 hover:from-yellow-600 hover:to-red-600 text-white font-semibold py-2 px-4 rounded-lg transition transform hover:-translate-y-1">
                        Claim Offer
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Seasonal Offers Tab */}
        {activeTab === 'seasonal' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {seasonalOffers.map((offer) => (
              <div 
                key={offer.id}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 shadow-lg hover:shadow-xl transition duration-300 group"
              >
                <div className="flex flex-col h-full">
                  {/* Offer Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={offer.image} 
                      alt={offer.title} 
                      className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-70"></div>
                    
                    {/* Discount Label */}
                    <div className="absolute top-4 right-4 bg-yellow-500 text-yellow-900 font-bold px-3 py-1 rounded-md">
                      {offer.discount}
                    </div>
                    
                    {/* Badge if applicable */}
                    {offer.badgeText && (
                      <span className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                        {offer.badgeText}
                      </span>
                    )}
                    
                    <h3 className="absolute bottom-4 left-4 text-xl text-white font-bold">{offer.title}</h3>
                  </div>
                  
                  {/* Offer Content */}
                  <div className="p-5 flex flex-col flex-grow">
                    <p className="text-gray-300 mb-4">{offer.description}</p>
                    
                    <div className="mt-auto">
                      <div className="flex justify-between items-center mb-3">
                        <div>
                          <span className="text-gray-400 text-sm">Promo Code:</span>
                          <span className="ml-2 text-yellow-400 font-mono font-semibold">{offer.code}</span>
                        </div>
                        <div className="text-gray-400 text-sm">
                          Valid until: <span className="text-red-400 font-semibold">{offer.validUntil}</span>
                        </div>
                      </div>
                      
                      {/* Conditions */}
                      <div className="mt-3 pt-3 border-t border-gray-700">
                        <p className="text-gray-400 text-sm mb-1">Conditions:</p>
                        <ul className="text-gray-300 text-sm space-y-1">
                          {offer.conditions.map((condition, index) => (
                            <li key={index} className="flex items-start">
                              <span className="text-yellow-500 mr-2">•</span>
                              {condition}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <button className="mt-4 w-full bg-gradient-to-r from-yellow-500 to-red-500 hover:from-yellow-600 hover:to-red-600 text-white font-semibold py-2 px-4 rounded-lg transition transform hover:-translate-y-1">
                        Claim Offer
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Loyalty Program Tab */}
        {activeTab === 'loyalty' && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 shadow-lg p-6 md:p-8 mb-8">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <div className="bg-gradient-to-br from-yellow-500/20 to-red-500/20 p-4 rounded-lg text-yellow-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-3">Ramen Paradise Loyalty Program</h2>
                  <p className="text-gray-300 mb-4">
                    Join our loyalty program and earn rewards with every visit! The more you dine with us, the more benefits you unlock. 
                    Points are earned for every dollar spent and can be redeemed for special offers, free items, and exclusive experiences.
                  </p>
                  <button className="px-6 py-2 bg-gradient-to-r from-yellow-500 to-red-500 hover:from-yellow-600 hover:to-red-600 text-white font-semibold rounded-lg transition transform hover:-translate-y-1">
                    Join Now
                  </button>
                </div>
              </div>
            </div>
            
            {/* Loyalty Tiers */}
            <h3 className="text-xl font-semibold text-white mb-6 text-center">Membership Tiers & Benefits</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {loyaltyBenefits.map((tier) => (
                <div 
                  key={tier.id}
                  className={`bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border shadow-lg hover:shadow-xl transition duration-300 ${
                    tier.id === 'bronze' ? 'border-yellow-700/50' :
                    tier.id === 'silver' ? 'border-gray-400/50' :
                    'border-yellow-500/50'
                  }`}
                >
                  <div className={`h-2 w-full ${
                    tier.id === 'bronze' ? 'bg-yellow-700' :
                    tier.id === 'silver' ? 'bg-gray-400' :
                    'bg-yellow-500'
                  }`}></div>
                  <div className="p-6">
                    <h4 className={`text-lg font-bold mb-1 ${
                      tier.id === 'bronze' ? 'text-yellow-700' :
                      tier.id === 'silver' ? 'text-gray-400' :
                      'text-yellow-500'
                    }`}>
                      {tier.tier} Tier
                    </h4>
                    <p className="text-gray-400 text-sm mb-4">
                      Requirements: {tier.requirements}
                    </p>
                    <div>
                      <p className="text-white font-medium mb-2">Benefits:</p>
                      <ul className="text-gray-300 text-sm space-y-2">
                        {tier.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start">
                            <svg className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Subscribe to Offers */}
        <div className="mt-16 bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-gray-700">
          <div className="p-8 md:p-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="md:w-2/3">
                <h2 className="text-2xl font-bold text-white mb-3">Stay Updated with New Offers</h2>
                <p className="text-gray-300">
                  Subscribe to our newsletter to receive the latest promotions, seasonal specials, and exclusive offers directly to your inbox.
                </p>
              </div>
              <div className="w-full md:w-1/3">
                <div className="flex">
                  <input 
                    type="email" 
                    placeholder="Your email address" 
                    className="flex-grow px-4 py-3 bg-gray-700 rounded-l-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 border border-gray-600"
                  />
                  <button className="px-4 py-3 bg-gradient-to-r from-yellow-500 to-red-500 hover:from-yellow-600 hover:to-red-600 text-white font-semibold rounded-r-lg transition">
                    Subscribe
                  </button>
                </div>
                <p className="text-gray-400 text-xs mt-2">
                  We respect your privacy and will never share your information.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Offers;