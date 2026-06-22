import { useState } from 'react';

const Checkoutpage = () => {
  // State to handle form inputs
  const [formData, setFormData] = useState({
    fullName: 'Rahul Sharma',
    phone: '+91 98765 43210',
    email: 'rahulsharma@gmail.com',
    address: '123, Park Street, New City Mall',
    country: 'India',
    state: 'Gujarat',
    city: 'Ahmedabad',
    pincode: '380001',
    saveAddress: true
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Top Navbar */}
      {/* <nav className="bg-white border-b border-gray-100 px-6 py-4 flex items-center gap-6 text-sm font-medium text-gray-600">
        <a href="#home" className="hover:text-blue-900 transition-colors">Home</a>
        <a href="#wishlist" className="hover:text-blue-900 transition-colors">Wishlist</a>
        <a href="#checkout" className="text-blue-700 flex items-center gap-1 font-bold">
          🛒 Checkout
        </a>
      </nav> */}

      <div className="max-w-6xl mx-auto !p-4 !md:p-8">
        <div className="bg-white !p-7 md:p-8 rounded-xl shadow-sm border border-gray-100">
          
          {/* Main Title */}
          <h2 className="!text-3xl !font-bold text-gray-800 !mb-6">06. Proceed to Checkout (Address)</h2>

          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* LEFT SECTION: Shipping & Progress */}
            <div className="w-full lg:w-2/3">
              
              {/* Progress Steps */}
              <div className="mb-8 flex flex-col gap-4 border-b border-gray-100 !pb-5">
                <div className="flex items-center gap-3">
                  <div className="!w-8 !h-8 !rounded-full bg-blue-900 !text-white flex items-center justify-center text-xs font-bold">1</div>
                  <span className="!font-semibold text-blue-900 !text-base">Shipping Address</span>
                </div>
                <div className="flex items-center gap-3 opacity-40">
                  <div className="!w-8 !h-8 !rounded-full bg-gray-200 text-gray-600 flex items-center justify-center text-xs font-bold">2</div>
                  <span className="!font-semibold text-gray-600 !text-base">Payment Method</span>
                </div>
                <div className="flex items-center gap-3 opacity-40">
                  <div className="!w-8 !h-8 !rounded-full bg-gray-200 text-gray-600 flex items-center justify-center text-xs font-bold">3</div>
                  <span className="!font-semibold text-gray-600 !text-base">Order Summary</span>
                </div>
              </div>

              {/* Shipping Address Form */}
              <div>
                <h3 className="!text-2xl !font-bold text-gray-800 mb-4">Shipping Address</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  
                  <div>
                    <label className="block !text-black !text-sm !font-medium text-gray-400 !mb-1">Full Name</label>
                    <input 
                      type="text" 
                      name="fullName" 
                      value={formData.fullName} 
                      onChange={handleChange}
                      className="w-full  border border-gray-200 !rounded-lg !px-3.5 !py-2.5 !text-sm focus:outline-none focus:border-blue-900 focus:ring-1 focus:ring-blue-900 text-gray-700"
                    />
                  </div>
                  
                  <div>
                    <label className="block !text-black !text-sm !font-medium text-gray-400 !mb-1">Phone Number</label>
                    <input 
                      type="text" 
                      name="phone" 
                      value={formData.phone} 
                      onChange={handleChange}
                      className="w-full  border border-gray-200 !rounded-lg !px-3.5 !py-2.5 !text-sm focus:outline-none focus:border-blue-900 focus:ring-1 focus:ring-blue-900 text-gray-700"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block !text-black !text-sm !font-medium text-gray-400 !mb-1">Email Address</label>
                    <input 
                      type="email" 
                      name="email" 
                      value={formData.email} 
                      onChange={handleChange}
                      className="w-full  border border-gray-200 !rounded-lg !px-3.5 !py-2.5 !text-sm focus:outline-none focus:border-blue-900 focus:ring-1 focus:ring-blue-900 text-gray-700"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block !text-black !text-sm !font-medium text-gray-400 !mb-1">Address</label>
                    <input 
                      type="text" 
                      name="address" 
                      value={formData.address} 
                      onChange={handleChange}
                      className="w-full border border-gray-200 !rounded-lg !px-3.5 !py-2.5 !text-sm focus:outline-none focus:border-blue-900 focus:ring-1 focus:ring-blue-900 text-gray-700"
                    />
                  </div>

                  <div>
                    <label className="block !text-black !text-sm !font-medium text-gray-400 !mb-1">Country</label>
                    <div className="relative">
                      <select 
                        name="country" 
                        value={formData.country} 
                        onChange={handleChange} 
                        className="w-full border border-gray-200 !rounded-lg !px-3.5 !py-2.5 !text-sm bg-white focus:outline-none focus:border-blue-900 focus:ring-1 focus:ring-blue-900 text-gray-700 appearance-none"
                      >
                        <option>India</option>
                        <option>USA</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400 text-xs">
                        ▼
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block !text-black !text-sm !font-medium text-gray-400 !mb-1">State</label>
                    <input 
                      type="text" 
                      name="state" 
                      value={formData.state} 
                      onChange={handleChange}
                      className="w-full border border-gray-200 !rounded-lg !px-3.5 !py-2.5 !text-sm focus:outline-none focus:border-blue-900 focus:ring-1 focus:ring-blue-900 text-gray-700"
                    />
                  </div>

                  <div>
                    <label className="block !text-black !text-sm !font-medium text-gray-400 !mb-1">City</label>
                    <input 
                      type="text" 
                      name="city" 
                      value={formData.city} 
                      onChange={handleChange}
                      className="w-full border border-gray-200 !rounded-lg !px-3.5 !py-2.5 !text-sm focus:outline-none focus:border-blue-900 focus:ring-1 focus:ring-blue-900 text-gray-700"
                    />
                  </div>

                  <div>
                    <label className="block !text-black !text-sm !font-medium text-gray-400 !mb-1">Pincode</label>
                    <input 
                      type="text" 
                      name="pincode" 
                      value={formData.pincode} 
                      onChange={handleChange}
                      className="w-full border border-gray-200 !rounded-lg !px-3.5 !py-2.5 !text-sm focus:outline-none focus:border-blue-900 focus:ring-1 focus:ring-blue-900 text-gray-700"
                    />
                  </div>

                </div>

                {/* Checkbox */}
                <div className="mt-5 flex items-center">
                  <input 
                    type="checkbox" 
                    id="saveAddress" 
                    name="saveAddress"
                    checked={formData.saveAddress}
                    onChange={handleChange}
                    className="!w-4 !h-4 text-blue-900 border-gray-300 rounded focus:ring-blue-950 accent-blue-900 cursor-pointer"
                  />
                  <label htmlFor="saveAddress" className="!ml-2 !text-sm text-gray-600 select-none cursor-pointer">
                    Save this address for future use
                  </label>
                </div>

                {/* Action Buttons */}
                <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-50">
                  <button className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors">
                    <span className="!mr-1.5">←</span> Back to Cart
                  </button>
                  <button className="bg-blue-900 text-white !px-10 !py-3 rounded-lg text-sm font-semibold hover:bg-blue-950 transition-colors w-full sm:w-auto shadow-sm">
                    Continue to Payment
                  </button>
                </div>

              </div>
            </div>

            {/* RIGHT SECTION: Order Summary */}
            <div className="w-full lg:w-1/3 border-t lg:border-t-0 lg:border-l pt-8 lg:pt-0 lg:pl-10 border-gray-100">
              <h3 className="text-lg font-bold text-gray-800 mb-5">Order Summary</h3>

              {/* Product List */}
              <div className="space-y-4 border-b border-gray-100 pb-5">
                {/* Item 1 */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-100 border border-gray-200 rounded-lg mr-3 overflow-hidden flex items-center justify-center flex-shrink-0 text-xl">
                      👕
                    </div>
                    <span className="text-xs font-medium text-gray-700">Classic Denim Shirt</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">x1</span>
                    <span className="text-xs font-bold text-gray-800">₹1,299</span>
                  </div>
                </div>

                {/* Item 2 */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-100 border border-gray-200 rounded-lg mr-3 overflow-hidden flex items-center justify-center flex-shrink-0 text-xl">
                      👖
                    </div>
                    <span className="text-xs font-medium text-gray-700">Blue Denim Jeans</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">x1</span>
                    <span className="text-xs font-bold text-gray-800">₹1,799</span>
                  </div>
                </div>

                 {/* Item 3 */}
                 <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-100 border border-gray-200 rounded-lg mr-3 overflow-hidden flex items-center justify-center flex-shrink-0 text-xl">
                      👟
                    </div>
                    <span className="text-xs font-medium text-gray-700">Sneakers Shoes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">x1</span>
                    <span className="text-xs font-bold text-gray-800">₹3,499</span>
                  </div>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="py-4 space-y-2.5 border-b border-gray-100 text-sm">
                <div className="flex justify-between text-gray-500">
                  <span>Subtotal</span>
                  <span className="font-medium text-gray-700">₹6,597</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Shipping</span>
                  <span className="font-medium text-gray-700">₹50</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>GST (18%)</span>
                  <span className="font-medium text-gray-700">₹1,216</span>
                </div>
              </div>

              {/* Total */}
              <div className="py-5 flex justify-between items-center">
                <span className="font-bold text-gray-800">Total</span>
                <span className="font-extrabold text-xl text-gray-900">₹6,863</span>
              </div>

              {/* Secure Checkout Badge */}
              <div className="mt-2 flex items-center gap-2 text-xs font-medium text-emerald-600 bg-emerald-50 px-3 py-2 rounded-lg w-fit">
                <span>🔒</span>
                <span>100% Secure Checkout</span>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkoutpage;