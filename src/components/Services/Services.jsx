import React from 'react';

function Services() {
  // Services data
  const services = [
    {
      id: 1,
      title: 'Dine-In Experience',
      description: 'Immerse yourself in our authentic Japanese atmosphere while enjoying freshly made ramen. Our restaurant features traditional decor and comfortable seating.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v13m0-13V6a4 4 0 118 0v7M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v7a2 2 0 002 2h10a2 2 0 002-2V8" />
        </svg>
      ),
      features: [
        'Comfortable seating for groups and couples',
        'Watch our chefs prepare your ramen',
        'Traditional Japanese decor and ambiance',
        'Full service with trained staff'
      ]
    },
    {
      id: 2,
      title: 'Takeout & Delivery',
      description: 'Enjoy our delicious ramen in the comfort of your own home. We offer quick takeout and delivery services with special packaging to keep your ramen hot and fresh.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      features: [
        'Specialized packaging to keep broth hot',
        'Noodles packed separately to maintain texture',
        'Easy online ordering system',
        'Delivery within 3 miles radius'
      ]
    },
    {
      id: 3,
      title: 'Catering Services',
      description: 'Make your event special with our catering services. From small gatherings to large corporate events, we offer customized ramen bars and Japanese cuisine.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      features: [
        'Custom ramen stations for events',
        'Professional staff to serve guests',
        'Menu customization options',
        'Equipment and setup included'
      ]
    },
    {
      id: 4,
      title: 'Ramen Making Classes',
      description: 'Learn the art of ramen making from our expert chefs. Our classes cover everything from making noodles from scratch to preparing the perfect broth.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      features: [
        'Hands-on experience with professional equipment',
        'Small class sizes for personalized attention',
        'Take home recipes and techniques',
        'Includes meal and sake tasting'
      ]
    }
  ];

  // Special offers
  const specialOffers = [
    {
      id: 'student',
      title: 'Student Discount',
      discount: '15% OFF',
      description: 'Valid student ID required. Available for dine-in only.',
      color: 'from-blue-500 to-purple-500'
    },
    {
      id: 'lunch',
      title: 'Lunch Special',
      discount: '$9.99',
      description: 'Monday-Friday, 11AM-2PM. Includes ramen and a drink.',
      color: 'from-yellow-500 to-red-500'
    },
    {
      id: 'happy',
      title: 'Happy Hour',
      discount: '2 for 1',
      description: 'Appetizers and drinks, Monday-Thursday, 4PM-6PM.',
      color: 'from-green-500 to-teal-500'
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
        {/* Services Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 bg-red-600/20 border border-red-500/30 text-red-400 rounded-full text-sm font-medium mb-3">
            What We Offer
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold">
            Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-red-500">Services</span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-gray-400 text-base sm:text-lg">
            Experience the authentic taste of Japan with our premium services tailored to enhance your ramen journey.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-red-500 mx-auto mt-4"></div>
        </div>
        
        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {services.map((service) => (
            <div 
              key={service.id}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 shadow-lg hover:shadow-xl transition duration-300"
            >
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start">
                <div className="bg-gradient-to-br from-yellow-500/20 to-red-500/20 p-3 rounded-lg text-yellow-400">
                  {service.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                  <p className="text-gray-400 mb-4">{service.description}</p>
                  
                  <ul className="space-y-2">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <svg className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Special Offers Section */}
        <div className="my-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold">
              Special <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-red-500">Offers</span>
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-yellow-400 to-red-500 mx-auto mt-3"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {specialOffers.map((offer) => (
              <div 
                key={offer.id}
                className="relative overflow-hidden rounded-xl border border-gray-700 shadow-lg group"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${offer.color} opacity-90 transition-opacity group-hover:opacity-100`}></div>
                <div className="relative p-6 flex flex-col h-full z-10">
                  <h3 className="text-xl font-bold text-white mb-1">{offer.title}</h3>
                  <div className="text-3xl font-extrabold text-white mb-3">{offer.discount}</div>
                  <p className="text-white/80 text-sm mb-4">{offer.description}</p>
                  <button className="mt-auto py-2 px-4 bg-white/20 hover:bg-white/30 transition text-white font-semibold rounded-lg">
                    Claim Offer
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Reservation CTA */}
        <div className="my-16 rounded-2xl overflow-hidden relative">
          <div className="absolute inset-0 bg-black opacity-60"></div>
          <img 
            src="https://images.unsplash.com/photo-1590846406792-0adc7f938f1d" 
            alt="Restaurant interior" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="relative p-8 sm:p-12 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
              Reserve Your Experience
            </h2>
            <p className="text-gray-200 max-w-2xl mx-auto mb-8">
              Whether it's a special occasion or a casual meal, we're here to provide you with an exceptional ramen experience. Book your table now.
            </p>
            <button className="px-8 py-3 bg-gradient-to-r from-yellow-500 to-red-500 text-white font-bold rounded-lg hover:from-yellow-600 hover:to-red-600 transition shadow-lg transform hover:-translate-y-1">
              Make a Reservation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Services;