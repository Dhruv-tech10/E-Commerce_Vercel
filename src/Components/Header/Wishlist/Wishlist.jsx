import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as WishlistUtils from '../../WishlistUtils';
import { HeartCrack, Trash2, ShoppingCart, ArrowLeft, Layers3, ShoppingBag } from 'lucide-react';
import toast from 'react-hot-toast';
import { useCart } from '../../../Context/CartContext';

export default function Wishlist() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const loadWishlist = () => {
    const wishlist = WishlistUtils.getWishlist();
    setItems(wishlist);
    setLoading(false);
  };

  useEffect(() => {
    loadWishlist();

    const onUpdate = () => {
      loadWishlist();
    };

    window.addEventListener('wishlistUpdated', onUpdate);
    return () => window.removeEventListener('wishlistUpdated', onUpdate);
  }, []);

  const handleRemove = (productId, productName) => {
    WishlistUtils.removeFromWishlist(productId);
    loadWishlist();
    toast.success(`${productName} removed from wishlist!`);
  };

  const handleClearAll = () => {
    if (items.length === 0) return;
    if (window.confirm('Are you sure you want to clear your wishlist?')) {
      WishlistUtils.clearWishlist();
      loadWishlist();
      toast.success('Wishlist cleared!');
    }
  };

  const handleAddToCart = (product) => {
    const firstSize = product?.sizes && Array.isArray(product.sizes) && product.sizes.length > 0 
      ? product.sizes[0] 
      : null;
    addToCart(product, 1, firstSize);
    toast.success(`${product.title || product.name} added to cart!`);
  };

  const handleAddAllToCart = () => {
    if (items.length === 0) return;
    items.forEach(item => {
      const firstSize = item?.sizes && Array.isArray(item.sizes) && item.sizes.length > 0 
        ? item.sizes[0] 
        : null;
      addToCart(item, 1, firstSize);
    });
    toast.success(`Added ${items.length} items to cart!`);
  };

  const formatPrice = (price) => {
    if (typeof price === 'number') {
      return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(price);
    }
    if (typeof price === 'string') {
      const numericPrice = parseFloat(price.replace(/[₹,]/g, ''));
      if (!isNaN(numericPrice)) {
        return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(numericPrice);
      }
      return price;
    }
    return '₹0';
  };

  const parsePrice = (price) => {
    if (typeof price === 'number') return price;
    if (typeof price === 'string') {
      const numericPrice = parseFloat(price.replace(/[₹,]/g, ''));
      return isNaN(numericPrice) ? 0 : numericPrice;
    }
    return 0;
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-160px)] flex items-center justify-center bg-gray-50/40">
        <div className="animate-spin rounded-full h-10 w-10 border-2 border-orange-600 border-t-transparent"></div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="w-full min-h-[calc(100vh-160px)] flex items-center justify-center bg-gray-50/40 p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-sm p-8 md:p-10 text-center border border-gray-200/60">
          <div className="flex flex-col items-center justify-center">
            <div className="bg-orange-50 rounded-full w-20 h-20 flex items-center justify-center mb-5 border border-orange-100">
              <HeartCrack size={36} className="text-orange-500 stroke-[1.5]" />
            </div>
            <h2 className="text-xl font-black text-gray-900 tracking-tight mb-2">Your wishlist is empty</h2>
            <p className="text-xs font-medium text-gray-400 max-w-xs mb-6 leading-relaxed">
              Save your favorite trending design pieces here to build your personalized collections.
            </p>
           <button
  onClick={() => navigate('/')}
  className="w-full bg-orange-600 text-white text-xs font-bold px-6 py-3 rounded-xl tracking-wide transition-all hover:bg-orange-700 shadow-sm active:scale-[0.99]"
  style={{ textDecoration: 'none' }}
>
  Back To Home
</button>

          </div>
        </div>
      </div>
    );
  }

  const totalValue = items.reduce((sum, item) => {
    const finalPrice = item.offerPrice !== undefined ? item.offerPrice : item.price;
    return sum + parsePrice(finalPrice);
  }, 0);

  return (
    <div className="bg-gray-50/60 min-h-screen py-10 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header Tracking Panel */}
        <div className="mb-6 flex justify-between items-end border-b border-gray-200/40 pb-4">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">My Wishlist</h1>
            <p className="text-xs font-bold text-gray-400 mt-0.5 uppercase tracking-wider">
              {items.length} {items.length === 1 ? 'Item' : 'Items'} Curated
            </p>
          </div>
          <button
            onClick={handleClearAll}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-red-500 hover:text-red-600 bg-red-50 hover:bg-red-100/60 px-3 py-1.5 rounded-lg border border-red-100/50 transition-all duration-200"
          >
            <Trash2 size={13} /> Clear List
          </button>
        </div>

        {/* Floating Utility Panel Card */}
        <div className="bg-white rounded-2xl shadow-sm p-4 mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border border-gray-200/70">
          <div className="flex items-center gap-6 divide-x divide-gray-100">
            <div className="flex items-center gap-2">
              <Layers3 size={15} className="text-gray-400" />
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">Saved:</span>
              <span className="font-extrabold text-gray-800 text-sm bg-gray-50 px-2 py-0.5 rounded border border-gray-100">{items.length}</span>
            </div>
            <div className="pl-6 flex items-center gap-2">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">Estimated Value:</span>
              <span className="font-black text-orange-600 text-base">
                {formatPrice(totalValue)}
              </span>
            </div>
          </div>
          <button
            className="w-full sm:w-auto bg-orange-600 text-white text-xs font-bold px-5 py-2.5 rounded-xl hover:bg-orange-700 transition flex items-center justify-center gap-2 shadow-sm shadow-orange-600/15 tracking-wide active:scale-[0.99]"
            onClick={handleAddAllToCart}
          >
            <ShoppingCart size={14} className="stroke-[2.5]" />
            ADD ALL TO CART
          </button>
        </div>

        {/* Main Grid Responsive System Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((product) => (
            <div 
              key={product.id} 
              className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group border border-gray-200/60 flex flex-col justify-between"
            >
              <div>
                <Link to={`/product/${product.id}`} className="block relative">
                  <div className="relative h-64 bg-gray-50/50 flex items-center justify-center border-b border-gray-100/50 overflow-hidden">
                    <img
                      src={product.image || `https://picsum.photos/seed/${product.id}/400/400`}
                      alt={product.title || product.name}
                      className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition duration-500"
                      onError={(e) => {
                        e.target.src = `https://picsum.photos/seed/${product.id}/400/400`;
                      }}
                    />
                    {/* Discount Ribbon Tag */}
                    {product.offerPrice && product.offerPrice < product.price && (
                      <span className="absolute top-3 left-3 bg-orange-600 text-white font-black text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-md shadow-sm">
                        SALE
                      </span>
                    )}
                  </div>
                </Link>

               {/* Content Info Container */}
<div className="p-4 pb-1">
  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">
    {product.brand || 'Premium Wear'}
  </span>
  
  {/* ⚡ Link decoration hatane ke liye inline style lagaya hai */}
  <Link 
    to={`/product/${product.id}`} 
    className="block group-hover:text-orange-600 transition-colors duration-200"
    style={{ textDecoration: 'none', color: '#111827' }} 
  >
    <h3 className="font-bold text-xs line-clamp-2 min-h-[34px] leading-relaxed tracking-tight m-0">
      {product.title || product.name}
    </h3>
  </Link>

  <div className="flex items-baseline gap-2 mt-2">
    <span className="text-orange-600 font-extrabold text-base">
      {formatPrice(product.offerPrice !== undefined ? product.offerPrice : product.price)}
    </span>
    {product.offerPrice && product.offerPrice < product.price && (
      <span className="text-gray-400 line-through text-[11px] font-medium">
        {formatPrice(product.price)}
      </span>
    )}
  </div>
</div>
              </div>

              {/* Action Button Strip Bottom Layout */}
              <div className="p-4 pt-2">
                <div className="flex gap-2 mt-2">
                  <button
                    className="flex-1 bg-[#1E2D42] text-white py-2 rounded-xl hover:bg-[#2c3e56] transition text-xs font-bold tracking-wide flex items-center justify-center gap-1.5 active:scale-[0.99]"
                    onClick={() => handleAddToCart(product)}
                  >
                    <ShoppingBag size={13} /> Add to Cart
                  </button>
                  <button
                    onClick={() => handleRemove(product.id, product.title || product.name)}
                    className="px-3 py-2 bg-gray-50 border border-gray-200/80 text-gray-400 hover:text-red-500 hover:bg-red-50 hover:border-red-100 rounded-xl transition duration-200 flex items-center justify-center"
                    title="Remove from list"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Bottom Back Redirection Button Block */}
        <div className="text-center mt-12 mb-4">
          {/* Bottom Back Redirection Button Block */}
<div className="text-center mt-12 mb-4">
  <Link 
    to="/" 
    className="inline-flex items-center gap-2 bg-white border border-gray-200 px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-gray-50 hover:text-orange-600 hover:border-orange-500/60 transition-all duration-300 shadow-sm"
    style={{ textDecoration: 'none', color: '#4b5563' }} // ⚡ Underline block aur text color direct inline handle kiya
  >
    <ArrowLeft size={13} className="stroke-[3]" />
    CONTINUE SHOPPING
  </Link>
</div>
        </div>

      </div>
    </div>
  );
}