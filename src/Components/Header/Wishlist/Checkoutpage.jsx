import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, ShieldCheck, Truck, ShoppingBag } from 'lucide-react';
import { useCart } from '../../../Context/CartContext';

export default function Checkoutpage() {
  const navigate = useNavigate();
  
  const { cartItems, cartTotal, cartCount } = useCart();

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    country: 'India',
    state: '',
    city: '',
    pincode: '',
    saveAddress: true
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const subtotal = cartTotal;
  const shippingCharge = subtotal > 2000 ? 0 : 99;
  const estimatedTax = Math.round(subtotal * 0.18);
  const grandTotal = subtotal + shippingCharge + estimatedTax;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[calc(100vh-160px)] bg-gray-50 flex items-center justify-center py-8 px-4">
        <div className="max-w-sm w-full bg-white rounded-2xl shadow-sm p-6 text-center border border-gray-100">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center text-orange-500">
              <ShoppingBag className="w-8 h-8" />
            </div>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-1">No items for checkout</h2>
          <p className="text-gray-500 text-sm mb-5">Add products to your cart before proceeding.</p>
          <button 
            onClick={() => navigate('/cart')}
            className="w-full bg-orange-600 text-white font-semibold text-sm py-2.5 rounded-xl hover:bg-orange-700 transition"
          >
            Go to Cart
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/60 py-8 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-white p-5 md:p-8 rounded-2xl shadow-sm border border-gray-200/80">
          
          <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
            <h2 className="text-xl font-extrabold text-gray-900 tracking-tight">Secure Checkout</h2>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest bg-gray-50 px-2.5 py-1 rounded-lg border border-gray-100">
              Step 1 of 3
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT SECTION: Shipping Info Form */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="grid grid-cols-3 gap-2 pb-2">
                <div className="flex items-center gap-2 border-b-2 border-orange-600 pb-2">
                  <div className="w-5 h-5 rounded-full bg-orange-600 text-white flex items-center justify-center text-[10px] font-black">1</div>
                  <span className="font-bold text-gray-900 text-xs md:text-sm">Shipping</span>
                </div>
                <div className="flex items-center gap-2 border-b-2 border-gray-100 pb-2 opacity-50">
                  <div className="w-5 h-5 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center text-[10px] font-bold">2</div>
                  <span className="font-semibold text-gray-500 text-xs md:text-sm">Payment</span>
                </div>
                <div className="flex items-center gap-2 border-b-2 border-gray-100 pb-2 opacity-50">
                  <div className="w-5 h-5 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center text-[10px] font-bold">3</div>
                  <span className="font-semibold text-gray-500 text-xs md:text-sm">Review</span>
                </div>
              </div>

              <div>
                <h3 className="text-base font-bold text-gray-900 mb-4 tracking-tight border-b border-gray-50 pb-1.5">Delivery Address</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  <div>
                    <label className="block text-gray-700 text-xs font-bold uppercase tracking-wide mb-1">Full Name</label>
                    <input 
                      type="text" 
                      name="fullName" 
                      value={formData.fullName} 
                      onChange={handleChange}
                      placeholder="Dhruvkumar Patel"
                      className="w-full border-2 border-gray-100 rounded-xl px-3.5 py-2.5 text-sm font-medium focus:outline-none focus:border-orange-500 transition-colors bg-gray-50/50 text-gray-800 placeholder:text-gray-400"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 text-xs font-bold uppercase tracking-wide mb-1">Phone Number</label>
                    <input 
                      type="text" 
                      name="phone" 
                      value={formData.phone} 
                      onChange={handleChange}
                      placeholder="76****-****37"
                      className="w-full border-2 border-gray-100 rounded-xl px-3.5 py-2.5 text-sm font-medium focus:outline-none focus:border-orange-500 transition-colors bg-gray-50/50 text-gray-800 placeholder:text-gray-400"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-gray-700 text-xs font-bold uppercase tracking-wide mb-1">Email Address</label>
                    <input 
                      type="email" 
                      name="email" 
                      value={formData.email} 
                      onChange={handleChange}
                      placeholder="Dhruvpatel11@gmail.com"
                      className="w-full border-2 border-gray-100 rounded-xl px-3.5 py-2.5 text-sm font-medium focus:outline-none focus:border-orange-500 transition-colors bg-gray-50/50 text-gray-800 placeholder:text-gray-400"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-gray-700 text-xs font-bold uppercase tracking-wide mb-1">Address Line</label>
                    <input 
                      type="text" 
                      name="address" 
                      value={formData.address} 
                      onChange={handleChange}
                      placeholder="Enter your full address"
                      className="w-full border-2 border-gray-100 rounded-xl px-3.5 py-2.5 text-sm font-medium focus:outline-none focus:border-orange-500 transition-colors bg-gray-50/50 text-gray-800 placeholder:text-gray-400"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 text-xs font-bold uppercase tracking-wide mb-1">Country</label>
                    <div className="relative">
                      <select 
                        name="country" 
                        value={formData.country} 
                        onChange={handleChange} 
                        className="w-full border-2 border-gray-100 rounded-xl px-3.5 py-2.5 text-sm font-medium bg-gray-50/50 focus:outline-none focus:border-orange-500 text-gray-800 appearance-none cursor-pointer"
                      >
                        <option>India</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none text-gray-400 text-[10px]">
                        ▼
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 text-xs font-bold uppercase tracking-wide mb-1">State</label>
                    <input 
                      type="text" 
                      name="state" 
                      value={formData.state} 
                      onChange={handleChange}
                      placeholder="Enter your state"
                      className="w-full border-2 border-gray-100 rounded-xl px-3.5 py-2.5 text-sm font-medium focus:outline-none focus:border-orange-500 transition-colors bg-gray-50/50 text-gray-800 placeholder:text-gray-400"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 text-xs font-bold uppercase tracking-wide mb-1">City</label>
                    <input 
                      type="text" 
                      name="city" 
                      value={formData.city} 
                      onChange={handleChange}
                      placeholder="Enter your city"
                      className="w-full border-2 border-gray-100 rounded-xl px-3.5 py-2.5 text-sm font-medium focus:outline-none focus:border-orange-500 transition-colors bg-gray-50/50 text-gray-800 placeholder:text-gray-400"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 text-xs font-bold uppercase tracking-wide mb-1">Pincode</label>
                    <input 
                      type="text" 
                      name="pincode" 
                      value={formData.pincode} 
                      onChange={handleChange}
                      placeholder="Enter your pincode"
                      className="w-full border-2 border-gray-100 rounded-xl px-3.5 py-2.5 text-sm font-medium focus:outline-none focus:border-orange-500 transition-colors bg-gray-50/50 text-gray-800 placeholder:text-gray-400"
                    />
                  </div>

                </div>

                <div className="mt-5 flex items-center select-none">
                  <input 
                    type="checkbox" 
                    id="saveAddress" 
                    name="saveAddress"
                    checked={formData.saveAddress}
                    onChange={handleChange}
                    className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500 accent-orange-600 cursor-pointer"
                  />
                  <label htmlFor="saveAddress" className="ml-2 text-xs font-semibold text-gray-500 cursor-pointer">
                    Save this address for future checkouts
                  </label>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 pt-5 border-t border-gray-100">
                  <button 
                    onClick={() => navigate('/cart')}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 text-xs font-bold text-gray-500 rounded-xl border border-gray-200/60 hover:bg-gray-100 hover:text-gray-700 transition-colors w-full sm:w-auto justify-center"
                    type="button"
                  >
                    <ArrowLeft size={13} className="stroke-[3]" /> Back to Cart
                  </button>
                  <button 
                    className="bg-orange-600 text-white font-bold text-sm px-8 py-3 rounded-xl hover:bg-orange-700 transition-all duration-300 shadow-md shadow-orange-600/10 hover:shadow-lg hover:shadow-orange-600/20 active:scale-[0.99] w-full sm:w-auto flex items-center justify-center gap-2"
                    type="submit"
                  >
                    <CreditCard size={15} /> Continue to Payment
                  </button>
                </div>

              </div>
            </div>

            {/* RIGHT SECTION: Order Summary */}
            <div className="lg:col-span-5 bg-gray-50/50 border border-gray-200/60 rounded-2xl p-4 md:p-5">
              <h3 className="text-base font-bold text-gray-900 mb-4 tracking-tight border-b border-gray-200/40 pb-2 flex items-center justify-between">
                <span>Order Summary</span>
                <span className="text-xs font-bold bg-white px-2 py-0.5 rounded-lg border border-gray-200 text-gray-500">
                  {cartCount} {cartCount > 1 ? 'Items' : 'Item'}
                </span>
              </h3>

              <div className="space-y-3 border-b border-gray-200/60 pb-4 max-h-[240px] overflow-y-auto pr-1">
                {cartItems.map((item) => (
                  <div key={`${item.id}-${item.selectedSize || 'nosize'}`} className="flex justify-between items-center gap-3 bg-white p-2 rounded-xl border border-gray-100 shadow-sm">
                    <div className="flex items-center min-w-0">
                      <div className="w-10 h-10 bg-gray-50 border border-gray-100 rounded-lg mr-2.5 overflow-hidden flex-shrink-0">
                        <img 
                          src={item.image || `https://picsum.photos/100/100?random=${item.id}`} 
                          alt={item.name} 
                          className="w-full h-full object-cover object-top" 
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-gray-800 line-clamp-1">{item.name}</p>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-0.5">
                          {item.brand || 'Brand'} {item.selectedSize ? `• Size: ${item.selectedSize}` : ''}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="text-[10px] font-bold text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded">x{item.quantity}</span>
                      <span className="text-xs font-extrabold text-gray-800">
                        {formatPrice((item.offerPrice || item.price) * item.quantity)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="py-4 space-y-2.5 border-b border-gray-200/60 text-sm">
                <div className="flex justify-between items-center text-gray-500">
                  <span className="font-semibold text-xs">Subtotal</span>
                  <span className="font-bold text-gray-700 text-sm">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between items-center text-gray-500">
                  <span className="font-semibold text-xs">Shipping</span>
                  {shippingCharge === 0 ? (
                    <span className="text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded-lg text-[10px] border border-green-100/40">FREE</span>
                  ) : (
                    <span className="font-bold text-gray-700 text-sm">{formatPrice(shippingCharge)}</span>
                  )}
                </div>
                <div className="flex justify-between items-center text-gray-500">
                  <span className="font-semibold text-xs">GST (18%)</span>
                  <span className="font-bold text-gray-700 text-sm">{formatPrice(estimatedTax)}</span>
                </div>
              </div>

              <div className="py-4 flex justify-between items-center">
                <span className="text-sm font-bold text-gray-900">Grand Total</span>
                <span className="text-xl font-black text-orange-600 tracking-tight">{formatPrice(grandTotal)}</span>
              </div>

              <div className="mt-2 flex items-center gap-2 text-[10px] font-bold text-orange-600 bg-orange-50/70 px-3 py-2 rounded-xl border border-orange-100 w-full justify-center shadow-sm">
                <ShieldCheck size={14} className="stroke-[2.5]" />
                <span>100% SECURE SSL CHECKOUT TRANSACTION</span>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}