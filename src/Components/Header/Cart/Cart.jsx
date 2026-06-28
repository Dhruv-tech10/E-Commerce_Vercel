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
    cartTotal,
    cartCount
  } = useCart();

  const total = cartTotal;
  const itemCount = cartCount;

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

  // 1. Empty Cart UI: Link replaced with an elegant button look
  if (cartItems.length === 0) {
    return (
      <div className="min-h-[calc(100vh-160px)] bg-gray-50 flex items-center justify-center py-8 px-4">
        <div className="max-w-sm w-full bg-white rounded-2xl shadow-sm p-6 md:p-8 text-center border border-gray-100/80">
          <div className="flex justify-center mb-5">
            <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center text-orange-500 shadow-inner">
              <ShoppingBag className="w-10 h-10" />
            </div>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-1.5 tracking-tight">Your Cart is Empty</h2>
          <p className="text-gray-500 text-sm mb-6 max-w-[280px] mx-auto">
            Looks like you haven't added anything yet. Let's find something special!
          </p>
          <Link 
            to="/" 
            className="block w-full bg-orange-600 text-white text-center font-semibold text-sm px-4 py-3 rounded-xl hover:bg-orange-700 transition-all duration-300 shadow-md shadow-orange-600/10 hover:shadow-lg hover:shadow-orange-600/20 active:scale-[0.99]"
            style={{ textDecoration: 'none', color: '#ffffff' }}
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/60 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section - Modern Breadcrumb style buttons */}
        <div className="flex items-center justify-between border-b border-gray-200/80 pb-4 mb-6">
          <button 
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-white text-xs font-semibold text-gray-600 rounded-xl border border-gray-200 shadow-sm hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200 transition-all duration-300"
          >
            <ArrowLeft size={14} className="stroke-[2.5]" />
            <span>Continue Shopping</span>
          </button>
          
          {cartItems.length > 0 && (
            <button 
              onClick={handleClearCart}
              className="px-3 py-1.5 text-xs text-red-600 font-semibold bg-red-50 hover:bg-red-100 rounded-xl border border-red-100 transition-all duration-300"
            >
              Clear Cart
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Block: Cart Items List */}
          <div className="lg:col-span-8 space-y-4">
            
            {/* Desktop Table Headers */}
            <div className="hidden md:grid grid-cols-12 gap-3 px-5 py-3 bg-white rounded-xl border border-gray-200 text-[11px] font-bold uppercase tracking-wider text-gray-400 shadow-sm">
              <div className="col-span-6">Product</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-center">Qty</div>
              <div className="col-span-2 text-right">Total</div>
            </div>

            {/* Items Card Container */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm divide-y divide-gray-100 overflow-hidden">
              {cartItems.map((item) => {
                const itemTotal = (item.offerPrice || item.price) * item.quantity;
                const discountPercent = item.price > item.offerPrice 
                  ? Math.round(((item.price - item.offerPrice) / item.price) * 100) 
                  : 0;

                return (
                  <div 
                    key={`${item.id}-${item.selectedSize || 'nosize'}`}
                    className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center p-4 md:p-5 hover:bg-gray-50/40 transition-colors duration-200"
                  >
                    
                    {/* Product Info Segment */}
                    <div className="col-span-1 md:col-span-6 flex gap-4">
                      <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-50 rounded-xl border border-gray-100 flex-shrink-0 overflow-hidden shadow-inner">
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
                        {/* ⚡ Title Link fixed with inline CSS for slate-black text and no underline */}
                        <Link 
                          to={`/product/${item.id}`}
                          className="font-bold hover:text-orange-600 transition-colors text-sm md:text-base line-clamp-1"
                          style={{ textDecoration: 'none', color: '#1f2937' }}
                        >
                          {item.name}
                        </Link>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">{item.brand || 'Brand'}</p>
                        
                        <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
                          {item.selectedSize && (
                            <span className="inline-flex items-center text-[10px] bg-gray-100 text-gray-700 font-semibold px-2 py-0.5 rounded-lg border border-gray-200/40">
                              Size: {item.selectedSize}
                            </span>
                          )}
                          {discountPercent > 0 && (
                            <span className="text-[10px] text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded-lg border border-green-100/50">
                              {discountPercent}% OFF
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Price Segment */}
                    <div className="col-span-1 md:col-span-2 flex md:flex-col items-center md:justify-center justify-between border-t md:border-0 pt-2 md:pt-0 border-gray-100">
                      <span className="md:hidden text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Price</span>
                      <div className="text-right md:text-center">
                        <span className="font-bold text-gray-900 text-sm md:text-base">{formatPrice(item.offerPrice || item.price)}</span>
                        {item.price > item.offerPrice && (
                          <p className="text-[11px] text-gray-400 line-through mt-0.5">{formatPrice(item.price)}</p>
                        )}
                      </div>
                    </div>

                    {/* Quantity Selector Segment */}
                    <div className="col-span-1 md:col-span-2 flex md:justify-center items-center justify-between">
                      <span className="md:hidden text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Qty</span>
                      <div className="flex items-center border border-gray-200 rounded-xl bg-white h-9 shadow-sm overflow-hidden">
                        <button 
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1, item.selectedSize)}
                          className="w-8 h-full flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-30"
                          disabled={item.quantity <= 1}
                        >
                          <Minus size={11} className="text-gray-600" strokeWidth={3} />
                        </button>
                        <span className="w-8 text-center font-bold text-gray-800 text-xs select-none">
                          {item.quantity}
                        </span>
                        <button 
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1, item.selectedSize)}
                          className="w-8 h-full flex items-center justify-center hover:bg-gray-50 transition-colors"
                        >
                          <Plus size={11} className="text-gray-600" strokeWidth={3} />
                        </button>
                      </div>
                    </div>

                    {/* Total & Action Segment */}
                    <div className="col-span-1 md:col-span-2 flex md:flex-row items-center justify-between md:justify-end gap-3 border-t md:border-0 pt-2 md:pt-0 border-gray-100">
                      <span className="md:hidden text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Total</span>
                      <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
                        <span className="font-extrabold text-orange-600 text-sm md:text-base">{formatPrice(itemTotal)}</span>
                        <button 
                          onClick={() => handleRemoveItem(item.id, item.selectedSize)}
                          className="text-gray-400 hover:text-red-500 transition-all p-1.5 hover:bg-red-50 rounded-xl border border-transparent hover:border-red-100"
                          aria-label="Remove item"
                        >
                          <Trash2 size={14} className="stroke-[2.5]" />
                        </button>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Block: Sticky Order Summary */}
          <div className="lg:col-span-4 lg:sticky lg:top-24">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
              <h2 className="text-base font-bold text-gray-900 mb-4 pb-2.5 border-b border-gray-100 tracking-tight">
                Order Summary
              </h2>
              
              <div className="space-y-3 border-b border-gray-100 pb-4 text-sm">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-xs text-gray-500">Items ({itemCount})</span>
                  <span className="font-bold text-gray-900 text-sm">{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-xs text-gray-500">Shipping</span>
                  <span className="text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded-lg text-[10px] border border-green-100/50">FREE</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-xs text-gray-500">Tax</span>
                  <span className="font-bold text-gray-400 text-[10px] bg-gray-50 px-1.5 py-0.5 rounded">INCLUDED</span>
                </div>
              </div>

              <div className="flex justify-between items-baseline py-4">
                <span className="text-sm font-bold text-gray-900">Grand Total</span>
                <span className="text-2xl font-black text-orange-600 tracking-tight">{formatPrice(total)}</span>
              </div>

              <div className="space-y-3">
                <button 
                  className="w-full bg-orange-600 text-white py-3 rounded-xl font-bold text-sm hover:bg-orange-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-md shadow-orange-600/10 hover:shadow-lg hover:shadow-orange-600/20 active:scale-[0.99]"
                  onClick={() => navigate('/checkout')}
                >
                  <CreditCard size={16} className="stroke-[2.5]" />
                  Proceed to Checkout
                </button>
                
                {/* 2. Bottom Continue Shopping Link Fixed with Inline Style */}
                <Link 
                  to="/" 
                  className="block w-full text-center text-xs hover:text-orange-600 font-bold tracking-wide transition-all py-2 bg-gray-50 hover:bg-orange-50 rounded-xl border border-transparent hover:border-orange-100"
                  style={{ textDecoration: 'none', color: '#6b7280' }}
                >
                  Continue Shopping
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="mt-5 pt-4 border-t border-gray-100 grid grid-cols-3 gap-2">
                <div className="text-center group">
                  <div className="p-2 bg-gray-50 rounded-xl mb-1 group-hover:bg-orange-50 transition-colors">
                    <Truck className="mx-auto text-gray-400 group-hover:text-orange-500 transition-colors" size={14} />
                  </div>
                  <p className="text-[10px] text-gray-500 font-bold leading-tight">Free Delivery</p>
                </div>
                <div className="text-center group">
                  <div className="p-2 bg-gray-50 rounded-xl mb-1 group-hover:bg-orange-50 transition-colors">
                    <RotateCcw className="mx-auto text-gray-400 group-hover:text-orange-500 transition-colors" size={14} />
                  </div>
                  <p className="text-[10px] text-gray-500 font-bold leading-tight">7-Day Returns</p>
                </div>
                <div className="text-center group">
                  <div className="p-2 bg-gray-50 rounded-xl mb-1 group-hover:bg-orange-50 transition-colors">
                    <ShieldCheck className="mx-auto text-gray-400 group-hover:text-orange-500 transition-colors" size={14} />
                  </div>
                  <p className="text-[10px] text-gray-500 font-bold leading-tight">Secure Pay</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}