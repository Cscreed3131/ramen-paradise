import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import orderService from '../firebase/OrderService';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems = [], total = 0 } = location.state || {};
  const auth = useSelector((state) => state.auth);
  const user = auth.userData;

  const [isProcessing, setIsProcessing] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [orderType, setOrderType] = useState('delivery');
  const [orderTime, setOrderTime] = useState('asap');
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [showReturnDialog, setShowReturnDialog] = useState(false);

  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
    setValue,
    watch
  } = useForm({
    defaultValues: {
      fullName: user?.displayName || '',
      email: user?.email || '',
      phone: user?.phoneNumber || '',
      address: '',
      city: '',
      zipCode: '',
      cardNumber: '',
      cardExpiry: '',
      cardCVC: '',
      scheduledTime: '',
      notes: '',
      tableNumber: '',
      partySize: '1'
    }
  });

  const watchedScheduledTime = watch('scheduledTime');

  useEffect(() => {
    if (!cartItems || cartItems.length === 0) {
      navigate('/order');
    }
  }, [cartItems, navigate]);

  const handleOptionChange = (field, value) => {
    if (field === 'orderType') setOrderType(value);
    if (field === 'orderTime') setOrderTime(value);
    if (field === 'paymentMethod') setPaymentMethod(value);
  };

  const onSubmit = async (data) => {
  setIsProcessing(true);
  
  try {
    const orderData = orderService.formatOrderForSubmission(
      { ...data, orderType, orderTime, paymentMethod },
      cartItems,
      user,
      total
    );
    
    // Create the order in Firebase
    const orderId = await orderService.createOrder(orderData);
    
    // Update order ID state to show confirmation
    setOrderId(orderId);
    setIsSubmitted(true);
    
    // Clear the cart (if you're using Redux)
    // dispatch(clearCart());
    
  } catch (error) {
    console.error('Order submission failed:', error);
    // Handle error state
  } finally {
    setIsProcessing(false);
  }
};

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

  const handleReturnClick = () => {
    const formValues = Object.values(watch());
    // Check if any fields have been filled in
    const hasFilledData = formValues.some(value => 
      typeof value === 'string' && value.trim() !== '' && 
      !['fullName', 'email', 'phone'].includes(value) // Exclude auto-filled fields
    );
    
    if (hasFilledData) {
      setShowReturnDialog(true);
    } else {
      navigate('/order');
    }
  };

  const subtotal = total;
  const taxRate = 0.0825; // 8.25% sales tax
  const tax = subtotal * taxRate;
  const deliveryFee = orderType === 'delivery' ? 3.99 : 0;
  const serviceFee = orderType === 'dine-in' ? subtotal * 0.10 : 0;
  const orderTotal = subtotal + tax + deliveryFee + serviceFee;

  if (isSubmitted && orderId) {
    const formData = {
      orderType,
      orderTime,
      address: watch('address'),
      city: watch('city'),
      zipCode: watch('zipCode'),
      scheduledTime: watch('scheduledTime'),
      tableNumber: watch('tableNumber'),
      partySize: watch('partySize')
    };

    return (
      <div className="min-h-screen bg-gray-900 text-white py-12 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800 rounded-xl border border-gray-700 shadow-lg overflow-hidden"
          >
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full mx-auto flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              <h2 className="text-3xl font-bold text-white mb-2">Order Confirmed!</h2>
              <p className="text-gray-400 mb-6">Thank you for your order. We've received your request and are preparing it now.</p>
              
              <div className="bg-gray-700/50 rounded-lg p-4 mb-6">
                <h3 className="text-lg font-medium text-white mb-2">Order #{orderId}</h3>
                <div className="text-sm text-gray-300">
                  {formData.orderType === 'delivery' ? (
                    <>
                      <p>Delivery • {formData.orderTime === 'asap' ? 'As soon as possible' : formData.scheduledTime}</p>
                      <p className="mt-1">{formData.address}, {formData.city}, {formData.zipCode}</p>
                    </>
                  ) : formData.orderType === 'pickup' ? (
                    <p>Pickup • {formData.orderTime === 'asap' ? 'As soon as possible' : formData.scheduledTime}</p>
                  ) : (
                    <>
                      <p>Dine In • {formData.orderTime === 'asap' ? 'Right now' : formData.scheduledTime}</p>
                      {formData.tableNumber && <p className="mt-1">Table: {formData.tableNumber} • Party size: {formData.partySize}</p>}
                    </>
                  )}
                </div>
              </div>
              
              <div className="mb-8">
                <div className="w-full bg-gray-700 rounded-full h-2 mb-1">
                  <div className="bg-gradient-to-r from-yellow-500 to-red-500 h-2 rounded-full w-1/4"></div>
                </div>
                <p className="text-sm text-gray-400">Your order is being prepared. You'll receive updates on your email.</p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => navigate('/orders')}
                  className="px-6 py-3 bg-gray-700 hover:bg-gray-600 transition-colors rounded-lg text-white font-medium"
                >
                  Track Your Order
                </button>
                <button
                  onClick={() => navigate('/home')}
                  className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-red-500 hover:from-yellow-600 hover:to-red-600 transition-colors rounded-lg text-white font-medium"
                >
                  Return to Home
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white py-8 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white">Checkout</h1>
          <p className="text-gray-400">Complete your order in just a few steps</p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left column - Form */}
          <div className="w-full lg:w-2/3">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="bg-gray-800 rounded-xl border border-gray-700 shadow-lg overflow-hidden mb-6">
                <div className="p-6 border-b border-gray-700">
                  <h2 className="text-xl font-bold text-white mb-1">Contact Information</h2>
                  <p className="text-sm text-gray-400">We'll use this info to keep you updated about your order</p>
                </div>
                
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="col-span-2">
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
                    <input
                      type="text"
                      id="fullName"
                      {...register('fullName', { required: 'Name is required' })}
                      className={`w-full bg-gray-700 border ${errors.fullName ? 'border-red-500' : 'border-gray-600'} rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500`}
                      placeholder="Enter your full name"
                    />
                    {errors.fullName && <p className="mt-1 text-sm text-red-500">{errors.fullName.message}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      {...register('email', { 
                        required: 'Email is required',
                        pattern: {
                          value: /^\S+@\S+\.\S+$/,
                          message: 'Invalid email format'
                        }
                      })}
                      className={`w-full bg-gray-700 border ${errors.email ? 'border-red-500' : 'border-gray-600'} rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500`}
                      placeholder="your@email.com"
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      {...register('phone', { required: 'Phone number is required' })}
                      className={`w-full bg-gray-700 border ${errors.phone ? 'border-red-500' : 'border-gray-600'} rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500`}
                      placeholder="(123) 456-7890"
                    />
                    {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>}
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-800 rounded-xl border border-gray-700 shadow-lg overflow-hidden mb-6">
                <div className="p-6 border-b border-gray-700">
                  <h2 className="text-xl font-bold text-white mb-1">Order Options</h2>
                  <p className="text-sm text-gray-400">Choose how you want to enjoy your meal</p>
                </div>
                
                <div className="p-6">
                  <div className="mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Delivery Option */}
                      <div 
                        className={`border ${orderType === 'delivery' ? 'border-yellow-500 bg-gray-700' : 'border-gray-700 bg-gray-800'} rounded-lg p-4 cursor-pointer`}
                        onClick={() => handleOptionChange('orderType', 'delivery')}
                      >
                        <div className="flex items-center mb-2">
                          <div className={`w-5 h-5 rounded-full ${orderType === 'delivery' ? 'bg-yellow-500' : 'bg-gray-600'} flex items-center justify-center`}>
                            {orderType === 'delivery' && (
                              <div className="w-2 h-2 rounded-full bg-white"></div>
                            )}
                          </div>
                          <span className="ml-2 font-medium text-white">Delivery</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-400">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M19 10a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>30-45 minutes</span>
                        </div>
                        <p className="text-sm text-gray-400 mt-1">
                          Delivered to your address
                        </p>
                      </div>
                      
                      {/* Pickup Option */}
                      <div 
                        className={`border ${orderType === 'pickup' ? 'border-yellow-500 bg-gray-700' : 'border-gray-700 bg-gray-800'} rounded-lg p-4 cursor-pointer`}
                        onClick={() => handleOptionChange('orderType', 'pickup')}
                      >
                        <div className="flex items-center mb-2">
                          <div className={`w-5 h-5 rounded-full ${orderType === 'pickup' ? 'bg-yellow-500' : 'bg-gray-600'} flex items-center justify-center`}>
                            {orderType === 'pickup' && (
                              <div className="w-2 h-2 rounded-full bg-white"></div>
                            )}
                          </div>
                          <span className="ml-2 font-medium text-white">Pickup</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-400">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>15-20 minutes</span>
                        </div>
                        <p className="text-sm text-gray-400 mt-1">
                          Ready for pickup at restaurant
                        </p>
                      </div>
                      
                      {/* Dine-In Option */}
                      <div 
                        className={`border ${orderType === 'dine-in' ? 'border-yellow-500 bg-gray-700' : 'border-gray-700 bg-gray-800'} rounded-lg p-4 cursor-pointer`}
                        onClick={() => handleOptionChange('orderType', 'dine-in')}
                      >
                        <div className="flex items-center mb-2">
                          <div className={`w-5 h-5 rounded-full ${orderType === 'dine-in' ? 'bg-yellow-500' : 'bg-gray-600'} flex items-center justify-center`}>
                            {orderType === 'dine-in' && (
                              <div className="w-2 h-2 rounded-full bg-white"></div>
                            )}
                          </div>
                          <span className="ml-2 font-medium text-white">Dine In</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-400">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          <span>Served immediately</span>
                        </div>
                        <p className="text-sm text-gray-400 mt-1">
                          Enjoy at our restaurant
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {orderType === 'delivery' && (
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-300 mb-1">Delivery Address</label>
                        <input
                          type="text"
                          id="address"
                          {...register('address', { 
                            required: orderType === 'delivery' ? 'Address is required' : false
                          })}
                          className={`w-full bg-gray-700 border ${errors.address ? 'border-red-500' : 'border-gray-600'} rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500`}
                          placeholder="Enter your street address"
                        />
                        {errors.address && <p className="mt-1 text-sm text-red-500">{errors.address.message}</p>}
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="city" className="block text-sm font-medium text-gray-300 mb-1">City</label>
                          <input
                            type="text"
                            id="city"
                            {...register('city', { 
                              required: orderType === 'delivery' ? 'City is required' : false
                            })}
                            className={`w-full bg-gray-700 border ${errors.city ? 'border-red-500' : 'border-gray-600'} rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500`}
                          />
                          {errors.city && <p className="mt-1 text-sm text-red-500">{errors.city.message}</p>}
                        </div>
                        
                        <div>
                          <label htmlFor="zipCode" className="block text-sm font-medium text-gray-300 mb-1">ZIP Code</label>
                          <input
                            type="text"
                            id="zipCode"
                            {...register('zipCode', { 
                              required: orderType === 'delivery' ? 'ZIP code is required' : false
                            })}
                            className={`w-full bg-gray-700 border ${errors.zipCode ? 'border-red-500' : 'border-gray-600'} rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500`}
                          />
                          {errors.zipCode && <p className="mt-1 text-sm text-red-500">{errors.zipCode.message}</p>}
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {orderType === 'dine-in' && (
                    <div className="space-y-4 bg-gray-700/50 p-4 rounded-lg">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="tableNumber" className="block text-sm font-medium text-gray-300 mb-1">Table Number (if seated)</label>
                          <input
                            type="text"
                            id="tableNumber"
                            {...register('tableNumber')}
                            className="w-full bg-gray-700 border border-gray-600 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            placeholder="Optional"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="partySize" className="block text-sm font-medium text-gray-300 mb-1">Party Size</label>
                          <select
                            id="partySize"
                            {...register('partySize')}
                            className="w-full bg-gray-700 border border-gray-600 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                          >
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                              <option key={num} value={num}>{num} {num === 1 ? 'person' : 'people'}</option>
                            ))}
                            <option value="more">More than 10</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="mt-6 bg-gray-700/50 rounded-lg p-4">
                    <div className="flex gap-4">
                      <div 
                        className={`flex-1 border ${orderTime === 'asap' ? 'border-yellow-500 bg-gray-700' : 'border-gray-700 bg-gray-800'} rounded-lg p-3 cursor-pointer`}
                        onClick={() => handleOptionChange('orderTime', 'asap')}
                      >
                        <div className="flex items-center">
                          <div className={`w-4 h-4 rounded-full ${orderTime === 'asap' ? 'bg-yellow-500' : 'bg-gray-600'} flex items-center justify-center`}>
                            {orderTime === 'asap' && (
                              <div className="w-2 h-2 rounded-full bg-white"></div>
                            )}
                          </div>
                          <span className="ml-2 font-medium text-sm text-white">
                            {orderType === 'dine-in' ? 'Right now' : 'As soon as possible'}
                          </span>
                        </div>
                      </div>
                      
                      <div 
                        className={`flex-1 border ${orderTime === 'scheduled' ? 'border-yellow-500 bg-gray-700' : 'border-gray-700 bg-gray-800'} rounded-lg p-3 cursor-pointer`}
                        onClick={() => handleOptionChange('orderTime', 'scheduled')}
                      >
                        <div className="flex items-center">
                          <div className={`w-4 h-4 rounded-full ${orderTime === 'scheduled' ? 'bg-yellow-500' : 'bg-gray-600'} flex items-center justify-center`}>
                            {orderTime === 'scheduled' && (
                              <div className="w-2 h-2 rounded-full bg-white"></div>
                            )}
                          </div>
                          <span className="ml-2 font-medium text-sm text-white">Schedule for later</span>
                        </div>
                      </div>
                    </div>
                    
                    {orderTime === 'scheduled' && (
                      <div className="mt-3">
                        <label htmlFor="scheduledTime" className="block text-sm font-medium text-gray-300 mb-1">Select Time</label>
                        <input
                          type="datetime-local"
                          id="scheduledTime"
                          {...register('scheduledTime', { 
                            required: orderTime === 'scheduled' ? 'Please select a time' : false
                          })}
                          min={new Date().toISOString().slice(0, 16)}
                          className={`w-full bg-gray-700 border ${errors.scheduledTime ? 'border-red-500' : 'border-gray-600'} rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500`}
                        />
                        {errors.scheduledTime && <p className="mt-1 text-sm text-red-500">{errors.scheduledTime.message}</p>}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-800 rounded-xl border border-gray-700 shadow-lg overflow-hidden mb-6">
                <div className="p-6 border-b border-gray-700">
                  <h2 className="text-xl font-bold text-white mb-1">Payment Method</h2>
                  <p className="text-sm text-gray-400">All transactions are secure and encrypted</p>
                </div>
                
                <div className="p-6">
                  <div className="grid grid-cols-1 gap-4 mb-6">
                    <div 
                      className={`border ${paymentMethod === 'credit-card' ? 'border-yellow-500 bg-gray-700' : 'border-gray-700 bg-gray-800'} rounded-lg p-4 cursor-pointer`}
                      onClick={() => handleOptionChange('paymentMethod', 'credit-card')}
                    >
                      <div className="flex items-center">
                        <div className={`w-5 h-5 rounded-full ${paymentMethod === 'credit-card' ? 'bg-yellow-500' : 'bg-gray-600'} flex items-center justify-center`}>
                          {paymentMethod === 'credit-card' && (
                            <div className="w-2 h-2 rounded-full bg-white"></div>
                          )}
                        </div>
                        <span className="ml-2 font-medium text-white">Credit / Debit Card</span>
                        <div className="ml-auto flex space-x-1">
                          <div className="w-8 h-5 bg-gray-600 rounded"></div>
                          <div className="w-8 h-5 bg-gray-600 rounded"></div>
                          <div className="w-8 h-5 bg-gray-600 rounded"></div>
                        </div>
                      </div>
                    </div>
                    
                    <div 
                      className={`border ${paymentMethod === 'cash' ? 'border-yellow-500 bg-gray-700' : 'border-gray-700 bg-gray-800'} rounded-lg p-4 cursor-pointer`}
                      onClick={() => handleOptionChange('paymentMethod', 'cash')}
                    >
                      <div className="flex items-center">
                        <div className={`w-5 h-5 rounded-full ${paymentMethod === 'cash' ? 'bg-yellow-500' : 'bg-gray-600'} flex items-center justify-center`}>
                          {paymentMethod === 'cash' && (
                            <div className="w-2 h-2 rounded-full bg-white"></div>
                          )}
                        </div>
                        <span className="ml-2 font-medium text-white">Cash on {orderType === 'delivery' ? 'Delivery' : 'Pickup'}</span>
                      </div>
                    </div>
                  </div>
                  
                  {paymentMethod === 'credit-card' && (
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-300 mb-1">Card Number</label>
                        <input
                          type="text"
                          id="cardNumber"
                          {...register('cardNumber', { 
                            required: paymentMethod === 'credit-card' ? 'Card number is required' : false
                          })}
                          placeholder="1234 5678 9012 3456"
                          className={`w-full bg-gray-700 border ${errors.cardNumber ? 'border-red-500' : 'border-gray-600'} rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500`}
                        />
                        {errors.cardNumber && <p className="mt-1 text-sm text-red-500">{errors.cardNumber.message}</p>}
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="cardExpiry" className="block text-sm font-medium text-gray-300 mb-1">Expiration Date</label>
                          <input
                            type="text"
                            id="cardExpiry"
                            {...register('cardExpiry', { 
                              required: paymentMethod === 'credit-card' ? 'Expiration date is required' : false
                            })}
                            placeholder="MM/YY"
                            className={`w-full bg-gray-700 border ${errors.cardExpiry ? 'border-red-500' : 'border-gray-600'} rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500`}
                          />
                          {errors.cardExpiry && <p className="mt-1 text-sm text-red-500">{errors.cardExpiry.message}</p>}
                        </div>
                        
                        <div>
                          <label htmlFor="cardCVC" className="block text-sm font-medium text-gray-300 mb-1">CVC</label>
                          <input
                            type="text"
                            id="cardCVC"
                            {...register('cardCVC', { 
                              required: paymentMethod === 'credit-card' ? 'CVC is required' : false
                            })}
                            placeholder="123"
                            className={`w-full bg-gray-700 border ${errors.cardCVC ? 'border-red-500' : 'border-gray-600'} rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500`}
                          />
                          {errors.cardCVC && <p className="mt-1 text-sm text-red-500">{errors.cardCVC.message}</p>}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="bg-gray-800 rounded-xl border border-gray-700 shadow-lg overflow-hidden mb-6">
                <div className="p-6">
                  <label htmlFor="notes" className="block text-sm font-medium text-gray-300 mb-1">Additional Notes (Optional)</label>
                  <textarea
                    id="notes"
                    {...register('notes')}
                    rows="3"
                    className="w-full bg-gray-700 border border-gray-600 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    placeholder="Special instructions for your order..."
                  ></textarea>
                </div>
              </div>
              
              {errors.root?.serverError && (
                <div className="mb-6 p-4 bg-red-500/20 border border-red-500 rounded-lg">
                  <p className="text-red-500">{errors.root.serverError.message}</p>
                </div>
              )}
              
              <div className="mb-6 lg:hidden">
                <button
                  type="submit"
                  disabled={isProcessing}
                  className={`w-full py-4 px-8 text-white font-bold rounded-lg transition-colors ${
                    isProcessing ? 'bg-gray-600 cursor-not-allowed' : 'bg-gradient-to-r from-yellow-500 to-red-500 hover:from-yellow-600 hover:to-red-600'
                  }`}
                >
                  {isProcessing ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Processing...</span>
                    </div>
                  ) : `Place Order - ${formatCurrency(orderTotal)}`}
                </button>
              </div>
            </form>
          </div>
          
          {/* Right column - Order Summary */}
          <div className="w-full lg:w-1/3">
            <div className="bg-gray-800 rounded-xl border border-gray-700 shadow-lg overflow-hidden sticky top-8">
              <div className="p-6 border-b border-gray-700">
                <h2 className="text-xl font-bold text-white">Order Summary</h2>
              </div>
              
              <div className="p-6">
                <div className="max-h-60 overflow-y-auto mb-6">
                  {cartItems.map((item, index) => (
                    <div key={`${item.id}-${index}`} className="flex gap-3 mb-4 pb-4 border-b border-gray-700 last:border-b-0 last:mb-0 last:pb-0">
                      <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                        <img
                          src={item.image || `https://source.unsplash.com/100x100/?food,${item.name.toLowerCase()}`}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h3 className="font-medium text-white">{item.name}</h3>
                          <span className="text-yellow-500 font-bold">{formatCurrency(item.totalPrice)}</span>
                        </div>
                        <p className="text-sm text-gray-400">
                          Qty: {item.quantity}
                          {item.toppings?.length > 0 && ` • With: ${item.toppings.map(t => t.name).join(', ')}`}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-400">
                    <span>Subtotal</span>
                    <span>{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Tax</span>
                    <span>{formatCurrency(tax)}</span>
                  </div>
                  {orderType === 'delivery' && (
                    <div className="flex justify-between text-gray-400">
                      <span>Delivery Fee</span>
                      <span>{formatCurrency(deliveryFee)}</span>
                    </div>
                  )}
                  {orderType === 'dine-in' && (
                    <div className="flex justify-between text-gray-400">
                      <span>Service Fee (10%)</span>
                      <span>{formatCurrency(serviceFee)}</span>
                    </div>
                  )}
                  <div className="border-t border-gray-700 pt-3 flex justify-between">
                    <span className="font-bold text-white">Total</span>
                    <span className="font-bold text-yellow-500">
                      {formatCurrency(orderTotal)}
                    </span>
                  </div>
                </div>
                
                <div className="hidden lg:block">
                  <button
                    type="submit"
                    onClick={handleSubmit(onSubmit)}
                    disabled={isProcessing}
                    className={`w-full py-4 px-8 text-white font-bold rounded-lg transition-colors ${
                      isProcessing ? 'bg-gray-600 cursor-not-allowed' : 'bg-gradient-to-r from-yellow-500 to-red-500 hover:from-yellow-600 hover:to-red-600'
                    }`}
                  >
                    {isProcessing ? (
                      <div className="flex items-center justify-center">
                        <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Processing...</span>
                      </div>
                    ) : `Place Order - ${formatCurrency(orderTotal)}`}
                  </button>
                </div>
              </div>
              
              <div className="bg-gray-700/50 p-4">
                <div className="flex items-center justify-center text-sm text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span>Secure Checkout</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={handleReturnClick}
          className="mt-3 flex items-center text-yellow-500 hover:text-yellow-400 transition-colors"
        >
          {/* Icon here */}
          <span>Return to order page</span>
        </button>
        {showReturnDialog && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-gray-800 rounded-lg max-w-md w-full p-6 border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4">Return to Order Page?</h3>
              <p className="text-gray-400 mb-6">
                If you go back, your checkout information might be lost. Do you want to continue?
              </p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowReturnDialog(false)}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 transition-colors rounded text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={() => navigate('/order')}
                  className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-red-500 hover:from-yellow-600 hover:to-red-600 transition-colors rounded text-white"
                >
                  Return
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;