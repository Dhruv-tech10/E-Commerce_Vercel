// src/Components/Header/Cart/Cart.jsx
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Trash2, Plus, Minus, ShoppingBag, 
  ArrowLeft, CreditCard, Truck, 
  ShieldCheck, RotateCcw 
} from 'lucide-react';
import { useCart } from '../../../Context/CartContext';

export default function Cart() {
  const navigate = useNavigate();
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    clearCart,
    getCartTotal,
    getItemCount
  } = useCart();

  const [total, setTotal] = useState(0);
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    setTotal(getCartTotal());
    setItemCount(getItemCount());
  }, [cartItems, getCartTotal, getItemCount]);

  const handleQuantityChange = (productId, newQuantity, size) => {
    updateQuantity(productId, newQuantity, size);
  };

  const handleRemoveItem = (productId, size) => {
    removeFromCart(productId, size);
  };

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      clearCart();
    }
  };

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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-sm p-8 md:p-12 text-center border border-gray-100">
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center text-orange-500">
              <ShoppingBag className="w-12 h-12" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Cart is Empty</h2>
          <p className="text-gray-500 mb-8 text-sm">
            Looks like you haven't added anything yet. Explore our categories to find great deals!
          </p>
          <Link 
            to="/" 
            className="block w-full bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-orange-700 transition-colors shadow-sm"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex items-center justify-between border-b border-gray-200 pb-5 mt-3 !mb-0">
          <button 
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-orange-600 transition-colors"
          >
            <ArrowLeft size={18} />
            <span>Continue Shopping</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Cart Items List */}
          <div className="lg:col-span-8 space-y-4">
            
            {/* Desktop Table Headers */}
            <div className="hidden md:grid grid-cols-12 gap-4 !px-6 !py-3 bg-white rounded-xl border border-gray-200 text-xs font-bold uppercase tracking-wider text-gray-500 shadow-sm">
              <div className="col-span-6">Product Details</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-right">Total</div>
            </div>

            {/* Items Card Container */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm divide-y divide-gray-100 overflow-hidden">
              {cartItems.map((item) => {
                const itemTotal = item.offerPrice * item.quantity;
                const discountPercent = Math.round(((item.price - item.offerPrice) / item.price) * 100);

                return (
                  <div 
                    key={`${item.id}-${item.selectedSize || 'nosize'}`}
                    className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center p-4 md:p-6 hover:bg-gray-50/50 transition-colors"
                  >
                    {/* Product Info */}
                    <div className="col-span-1 md:col-span-6 flex gap-4">
                      <div className="w-20 h-20 md:w-24 md:h-24 bg-gray-50 rounded-xl border border-gray-100 flex-shrink-0 overflow-hidden">
                        <img 
                          src={item.image || `https://picsum.photos/100/100?random=${item.id}`}
                          alt={item.name}
                          className="w-full h-full object-cover object-top"
                          onError={(e) => {
                            e.target.src = `https://picsum.photos/100/100?random=${item.id}`;
                          }}
                        />
                      </div>
                      <div className="flex flex-col justify-center min-w-0">
                        <Link 
                          to={`/product/${item.id}`}
                          className="font-semibold text-gray-900 hover:text-orange-600 transition-colors text-base line-clamp-1 mb-0.5"
                        >
                          {item.name}
                        </Link>
                        <p className="! text-xs font-medium text-gray-400 uppercase tracking-wider">{item.brand || 'Brand'}</p>
                        
                        <div className="flex flex-wrap items-center gap-3 mt-1.5">
                          {item.selectedSize && (
                            <span className="inline-flex items-center !text-xs bg-gray-100 text-gray-700 !font-medium !px-2 !py-0.5 rounded-md">
                              Size: {item.selectedSize}
                            </span>
                          )}
                          {discountPercent > 0 && (
                            <span className="!text-xs text-green-600 !font-semibold bg-green-50 !px-2 !py-0.5 !rounded-md">
                              {discountPercent}% OFF
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Price column */}
                    <div className="col-span-1 md:col-span-2 flex md:flex-col items-center md:justify-center justify-between border-t md:border-0 pt-2 md:pt-0 border-gray-100">
                      <span className="md:hidden !text-sm font-medium text-gray-400">Price</span>
                      <div className="text-right md:text-center">
                        <span className="font-bold text-gray-900">{formatPrice(item.offerPrice)}</span>
                        {item.price > item.offerPrice && (
                          <p className="!text-xs text-gray-400 line-through !mt-0.5">{formatPrice(item.price)}</p>
                        )}
                      </div>
                    </div>

                    {/* Quantity Selector column */}
                    <div className="col-span-1 md:col-span-2 flex md:justify-center items-center justify-between">
                      <span className="md:hidden text-sm font-medium text-gray-400">Quantity</span>
                      <div className="flex items-center border border-gray-300 rounded-lg bg-white shadow-sm h-9">
                        <button 
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1, item.selectedSize)}
                          className="w-8 h-full flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-30"
                          disabled={item.quantity <= 1}
                        >
                          <Minus size={14} className="text-gray-600" strokeWidth={3} />
                        </button>
                        <span className="w-10 text-center font-bold text-gray-800 text-sm">
                          {item.quantity}
                        </span>
                        <button 
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1, item.selectedSize)}
                          className="w-8 h-full flex items-center justify-center hover:bg-gray-50 transition-colors"
                        >
                          <Plus size={14} className="text-gray-600" strokeWidth={3} />
                        </button>
                      </div>
                    </div>

                    {/* Total & Action column */}
                    <div className="col-span-1 md:col-span-2 flex md:flex-row items-center justify-between md:justify-end gap-4 border-t md:border-0 pt-3 md:pt-0 border-gray-100">
                      <span className="md:hidden text-sm font-medium text-gray-400">Total</span>
                      <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                        <span className="font-extrabold text-orange-600 text-base md:text-right">{formatPrice(itemTotal)}</span>
                        <button 
                          onClick={() => handleRemoveItem(item.id, item.selectedSize)}
                          className="text-gray-400 hover:text-red-500 transition-colors p-1.5 hover:bg-red-50 rounded-lg ml-2"
                          aria-label="Remove item"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Sticky Order Summary Card */}
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm !p-6">
              <h2 className="!text-2xl font-bold text-gray-900 mb-5 !pb-3 border-b border-gray-100">
                Order Summary
              </h2>
              
              <div className="space-y-4 border-b border-gray-100 !pb-5 !text-sm">
                <div className="flex justify-between items-center text-gray-600">
                  <span className="!font-medium !text-sm">Items ({itemCount})</span>
                  <span className="font-semibold text-gray-900">{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="!font-medium !text-sm text-gray-600">Shipping Charges</span>
                  <span className="text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded text-xs">FREE</span>
                </div>
                <div className="flex justify-between items-center text-gray-600">
                  <span className="!font-medium !text-sm">Estimated Tax</span>
                  <span className="font-medium text-gray-500 italic text-xs">Included</span>
                </div>
              </div>

              <div className="flex justify-between items-baseline py-5">
                <span className="!text-base !font-bold text-gray-900">Total Amount</span>
                <span className="!text-2xl font-black text-orange-600 tracking-tight">{formatPrice(total)}</span>
              </div>

              <div className="space-y-3">
                <button 
                  className="w-full bg-orange-600 text-white !py-3.5 rounded-xl font-bold hover:bg-orange-700 transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow active:scale-[0.99]"
                  onClick={() => navigate('/checkout')}
                >
                  <CreditCard size={18} />
                  Proceed to Checkout
                </button>
                
                <Link 
                  to="/" 
                  className="block w-full text-center !no-underline !text-sm text-gray-500 hover:text-orange-600 font-semibold transition-colors pt-2"
                >
                  Continue Shopping
                </Link>
              </div>

              {/* Trust Features badges */}
              <div className="mt-6 pt-5 border-t border-gray-100 grid grid-cols-3 gap-2">
                <div className="text-center">
                  <Truck className="mx-auto text-gray-400 mb-1" size={16} />
                  <p className="!text-[13px] text-gray-500 !font-semibold leading-tight">Free Delivery</p>
                </div>
                <div className="text-center">
                  <RotateCcw className="mx-auto text-gray-400 mb-1" size={16} />
                  <p className="!text-[13px] text-gray-500 !font-semibold leading-tight">7-Day Returns</p>
                </div>
                <div className="text-center">
                  <ShieldCheck className="mx-auto text-gray-400 mb-1" size={16} />
                  <p className="!text-[13px] text-gray-500 !font-semibold leading-tight">Secure Pay</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}