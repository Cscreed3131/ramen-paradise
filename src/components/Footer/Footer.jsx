import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="relative overflow-hidden py-12 bg-gray-900 border-t border-yellow-600/30">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute bottom-0 left-10 w-40 h-40 rounded-full bg-red-500 blur-3xl"></div>
        <div className="absolute top-10 right-10 w-32 h-32 rounded-full bg-yellow-500 blur-3xl"></div>
      </div>
      
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="-m-6 flex flex-wrap">
          <div className="w-full p-6 md:w-1/2 lg:w-5/12">
            <div className="flex h-full flex-col justify-between">
              <div className="mb-6">
                <Link to='/' className="flex items-center">
                  {/* Logo styled div to match header */}
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-500 to-red-500 flex items-center justify-center text-white font-bold text-xl">R</div>
                  <span className="ml-2 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-red-500">Ramen Paradise</span>
                </Link>
                <p className="mt-4 text-gray-400 text-sm sm:text-base">
                  Serving authentic Japanese ramen with love and passion. Our restaurant brings the taste of Tokyo to your neighborhood with carefully crafted bowls of noodle perfection.
                </p>
              </div>
              <div className="mt-6 flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-yellow-400 transition">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-yellow-400 transition">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-yellow-400 transition">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <div className="h-full">
              <h3 className="tracking-px mb-5 text-sm font-semibold uppercase text-yellow-500">
                Menu
              </h3>
              <ul>
                <li className="mb-3">
                  <Link
                    className="text-gray-300 font-medium text-sm sm:text-base hover:text-yellow-400 transition"
                    to="/menu"
                  >
                    Ramen Bowls
                  </Link>
                </li>
                <li className="mb-3">
                  <Link
                    className="text-gray-300 font-medium text-sm sm:text-base hover:text-yellow-400 transition"
                    to="/menu"
                  >
                    Side Dishes
                  </Link>
                </li>
                <li className="mb-3">
                  <Link
                    className="text-gray-300 font-medium text-sm sm:text-base hover:text-yellow-400 transition"
                    to="/menu"
                  >
                    Beverages
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-gray-300 font-medium text-sm sm:text-base hover:text-yellow-400 transition"
                    to="/menu"
                  >
                    Desserts
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <div className="h-full">
              <h3 className="tracking-px mb-5 text-sm font-semibold uppercase text-yellow-500">
                Contact
              </h3>
              <ul>
                <li className="mb-3">
                  <Link
                    className="text-gray-300 font-medium text-sm sm:text-base hover:text-yellow-400 transition"
                    to="/services"
                  >
                    Reservations
                  </Link>
                </li>
                <li className="mb-3">
                  <Link
                    className="text-gray-300 font-medium text-sm sm:text-base hover:text-yellow-400 transition"
                    to="/services"
                  >
                    Catering
                  </Link>
                </li>
                <li className="mb-3">
                  <Link
                    className="text-gray-300 font-medium text-sm sm:text-base hover:text-yellow-400 transition"
                    to="/services"
                  >
                    Delivery
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-gray-300 font-medium text-sm sm:text-base hover:text-yellow-400 transition"
                    to="/location"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="w-full p-6 md:w-1/2 lg:w-3/12">
            <div className="h-full">
              <h3 className="tracking-px mb-5 text-sm font-semibold uppercase text-yellow-500">
                Visit Us
              </h3>
              <p className="text-gray-300 mb-4 text-sm sm:text-base">
                123 Noodle Street<br />
                Ramen District<br />
                Tokyo, Japan
              </p>
              <p className="text-gray-300 mb-4 text-sm sm:text-base">
                <strong className="text-yellow-400">Phone:</strong> (123) 456-7890
              </p>
              <p className="text-gray-300 text-sm sm:text-base">
                <strong className="text-yellow-400">Hours:</strong><br />
                Mon-Fri: 11AM - 10PM<br />
                Sat-Sun: 12PM - 11PM
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-10 pt-6 border-t border-gray-800">
          <p className="text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Ramen Paradise. All Rights Reserved.
          </p>
        </div>
      </div>
      
      {/* Decorative bottom border */}
      {/* <div className="h-1 w-full bg-gradient-to-r from-yellow-400 via-red-500 to-yellow-400 mt-6"></div> */}
    </footer>
  )
}

export default Footer