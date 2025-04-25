import React from 'react';

function Location() {
  const operatingHours = [
    { day: 'Monday', hours: '11:00 AM - 10:00 PM' },
    { day: 'Tuesday', hours: '11:00 AM - 10:00 PM' },
    { day: 'Wednesday', hours: '11:00 AM - 10:00 PM' },
    { day: 'Thursday', hours: '11:00 AM - 10:00 PM' },
    { day: 'Friday', hours: '11:00 AM - 11:00 PM' },
    { day: 'Saturday', hours: '12:00 PM - 11:00 PM' },
    { day: 'Sunday', hours: '12:00 PM - 10:00 PM' },
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
        {/* Location Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 bg-red-600/20 border border-red-500/30 text-red-400 rounded-full text-sm font-medium mb-3">
            Find Us
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold">
            Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-red-500">Location</span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-gray-400 text-base sm:text-lg">
            Visit us in the heart of the city to experience authentic Japanese ramen in a warm, inviting atmosphere.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-red-500 mx-auto mt-4"></div>
        </div>
        
        {/* Two-column layout for map and info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Map Section */}
          <div className="h-full">
            <div className="relative bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 shadow-lg h-full">
              {/* Placeholder for actual map integration */}
              <div className="aspect-video w-full lg:h-full bg-gray-800 relative overflow-hidden">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12962.244666694765!2d139.7671248!3d35.68139!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188bfbd891936f%3A0x51a75203f467fb0!2sTokyo%20Station!5e0!3m2!1sen!2sus!4v1682464125889!5m2!1sen!2sus" 
                  className="absolute inset-0 w-full h-full border-0" 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade">
                </iframe>
                <div className="absolute inset-0 pointer-events-none border-4 border-yellow-500/20 rounded-xl"></div>
              </div>
            </div>
          </div>
          
          {/* Location Info */}
          <div className="flex flex-col h-full">
            {/* Address Card */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 shadow-lg mb-6">
              <div className="flex flex-row gap-4 items-start">
                <div className="bg-gradient-to-br from-yellow-500/20 to-red-500/20 p-3 rounded-lg text-yellow-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Our Address</h3>
                  <p className="text-gray-300">
                    123 Noodle Street<br />
                    Ramen District<br />
                    Tokyo, Japan 100-0005
                  </p>
                  
                  <div className="mt-4">
                    <a 
                      href="https://goo.gl/maps/1JnnsGxARL3rMuKH8" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-block px-4 py-2 bg-gradient-to-r from-yellow-500 to-red-500 text-white font-semibold rounded-lg hover:from-yellow-600 hover:to-red-600 transition"
                    >
                      Get Directions
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Card */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 shadow-lg mb-6">
              <div className="flex flex-row gap-4 items-start">
                <div className="bg-gradient-to-br from-yellow-500/20 to-red-500/20 p-3 rounded-lg text-yellow-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Contact Us</h3>
                  <p className="text-gray-300 mb-2">
                    <span className="text-yellow-400 font-semibold">Phone:</span> (123) 456-7890
                  </p>
                  <p className="text-gray-300 mb-2">
                    <span className="text-yellow-400 font-semibold">Email:</span> info@ramenparadise.com
                  </p>
                  <p className="text-gray-300">
                    <span className="text-yellow-400 font-semibold">Reservations:</span> reservations@ramenparadise.com
                  </p>
                </div>
              </div>
            </div>
            
            {/* Hours Card */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 shadow-lg flex-grow">
              <div className="flex flex-row gap-4 items-start">
                <div className="bg-gradient-to-br from-yellow-500/20 to-red-500/20 p-3 rounded-lg text-yellow-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-4">Operating Hours</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {operatingHours.map((item, index) => (
                      <div 
                        key={index} 
                        className="py-2 border-b border-gray-700 last:border-0 sm:last:border-b sm:even:border-0"
                      >
                        <p className="text-yellow-400 font-semibold">{item.day}</p>
                        <p className="text-gray-300">{item.hours}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Transportation Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            Getting <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-red-500">Here</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Public Transit */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-white">Public Transit</h3>
              </div>
              <ul className="text-gray-300 space-y-2 text-sm">
                <li>• 2 minute walk from Tokyo Station (Marunouchi Exit)</li>
                <li>• Yamanote Line: Tokyo Station</li>
                <li>• Marunouchi Line: Tokyo Station</li>
                <li>• Chiyoda Line: Tokyo Station</li>
              </ul>
            </div>
            
            {/* Parking */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-white">Parking</h3>
              </div>
              <ul className="text-gray-300 space-y-2 text-sm">
                <li>• Limited street parking available</li>
                <li>• Paid parking lot next door (¥300/hour)</li>
                <li>• Validated parking for customers (2 hours)</li>
                <li>• Weekend parking: ¥1500 flat rate</li>
              </ul>
            </div>
            
            {/* Accessibility */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-white">Accessibility</h3>
              </div>
              <ul className="text-gray-300 space-y-2 text-sm">
                <li>• Wheelchair accessible entrance</li>
                <li>• Elevator access available</li>
                <li>• Accessible bathroom facilities</li>
                <li>• Service animals welcome</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Location;