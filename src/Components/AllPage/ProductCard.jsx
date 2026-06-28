import { Link } from 'react-router-dom';
import { useState, useEffect, useMemo } from 'react';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import { ShoppingCart, Eye, Shield, Star } from 'lucide-react';
import { isInWishlist, toggleWishlist } from "../WishlistUtils";
import { useAuth } from '../../Context/AuthContext';
import { useCart } from '../../Context/CartContext';

function ProductCard({ product }) {
  const { isAuthenticated, openAuthModal } = useAuth();
  const { addToCart } = useCart();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const productId = useMemo(() => product?.id, [product?.id]);

  useEffect(() => {
    if (!productId) return;
    
    setIsWishlisted(isInWishlist(productId));
    
    const handleWishlistUpdate = () => {
      setIsWishlisted(isInWishlist(productId));
    };
    
    window.addEventListener('wishlistUpdated', handleWishlistUpdate);
    return () => window.removeEventListener('wishlistUpdated', handleWishlistUpdate);
  }, [productId]);

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAuthenticated) {
      openAuthModal('login');
      return;
    }
    
    const newStatus = toggleWishlist(product);
    setIsWishlisted(newStatus);
    
    const toastEvent = new CustomEvent('showToast', {
      detail: {
        message: newStatus ? `${product.name} added to wishlist!` : `${product.name} removed from wishlist!`,
        type: newStatus ? 'success' : 'info'
      }
    });
    window.dispatchEvent(toastEvent);
  };

  // ✅ FIXED: Add to cart with proper parameters and error handling
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAuthenticated) {
      openAuthModal('login');
      return;
    }
    
    // ✅ Safe check for sizes
    const firstSize = product?.sizes && Array.isArray(product.sizes) && product.sizes.length > 0 
      ? product.sizes[0] 
      : null;
    
    console.log('Adding to cart:', { product: product.name, size: firstSize });
    addToCart(product, 1, firstSize);
    
    const toastEvent = new CustomEvent('showToast', {
      detail: {
        message: `${product.name} added to cart!`,
        type: 'success'
      }
    });
    window.dispatchEvent(toastEvent);
  };

  const discountPercent = useMemo(() => {
    if (product.price > product.offerPrice) {
      return Math.round(((product.price - product.offerPrice) / product.price) * 100);
    }
    return 0;
  }, [product.price, product.offerPrice]);

  if (!product) {
    return null;
  }

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={12}
        className={i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
        fill={i < Math.floor(rating) ? 'currentColor' : 'none'}
      />
    ));
  };

  return (
    <Link 
      to={`/product/${product.id}`} 
      className="block group"
      style={{ textDecoration: 'none', color: 'inherit' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 h-full flex flex-col relative border border-gray-100 hover:border-orange-200">
        
        {/* Image Section */}
        <div className="relative h-60 sm:h-72 bg-gradient-to-b from-gray-50 to-gray-100 flex-shrink-0 overflow-hidden">
          {!imageLoaded && (
            <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200" />
          )}
          
          <img 
            src={product.image || `https://picsum.photos/500/700?random=${product.id}`}
            alt={product.name || 'Product'}
            className={`w-full h-full object-contain p-4 transition-all duration-700 ${
              isHovered ? 'scale-105' : 'scale-100'
            } ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = `https://picsum.photos/500/700?random=${product.id}`;
            }}
          />
          
          {product.brand && (
            <div className="absolute top-3 left-3 z-10">
              <span className="bg-black/70 backdrop-blur-sm text-white text-[10px] font-medium px-3 py-1 rounded-full shadow-lg flex items-center gap-1.5">
                <Shield size={10} className="text-orange-400" />
                {product.brand}
              </span>
            </div>
          )}
          
          {discountPercent > 0 && (
            <div className={`absolute top-3 right-12 z-10 transition-all duration-300 ${
              isHovered ? 'scale-105 -translate-y-0.5' : ''
            }`}>
              <div className="relative">
                <span className="inline-block bg-gradient-to-r from-red-500 to-orange-500 text-white text-[11px] font-bold px-2.5 py-1 rounded-lg shadow-lg shadow-orange-500/30">
                  {discountPercent}% OFF
                </span>
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-1 bg-orange-500/30 blur-sm rounded-full" />
              </div>
            </div>
          )}
          
          <button
            onClick={handleWishlistClick}
            className={`absolute top-3 right-3 z-20 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg transition-all duration-300 ${
              isWishlisted ? 'scale-110 shadow-red-200' : 'hover:scale-110 hover:shadow-md'
            } ${isHovered ? 'opacity-100' : 'opacity-90'}`}
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            {isWishlisted ? (
              <FavoriteOutlinedIcon sx={{ fontSize: 18, color: '#ef4444' }} />
            ) : (
              <FavoriteBorderOutlinedIcon sx={{ fontSize: 18, color: '#6b7280' }} />
            )}
          </button>

          <div className={`absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`} />
          
          <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
            isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
          }`}>
            <div className="bg-white rounded-full p-3.5 shadow-2xl hover:bg-orange-50 transition-all duration-300 hover:scale-110 cursor-pointer border border-orange-200">
              <Eye size={20} className="text-gray-700" />
            </div>
          </div>
        </div>
        
        {/* Content Section */}
        <div className="p-4 flex-1 flex flex-col">
          
          {/* Product Name Section */}
          <div className="border-b-2 border-orange-200/60 pb-2.5">
            <h3 
              className="font-semibold text-gray-800 text-sm line-clamp-2 group-hover:text-orange-500 transition-colors duration-300 leading-relaxed"
              style={{ textDecoration: 'none' }}
            >
              {product.name || 'Product Name'}
            </h3>
          </div>
          
          {/* Rating */}
          {product.rating && (
            <div className="flex items-center gap-1.5 mt-2">
              <div className="flex items-center gap-0.5">
                {renderStars(product.rating)}
              </div>
              <span className="text-[10px] text-gray-400 font-medium">({product.reviews || 0})</span>
            </div>
          )}
          
          {/* Price Section */}
          <div className="mt-2.5 pt-2.5 border-t-2 border-orange-200/40 pb-2.5 border-b-2 border-orange-200/40">
            <div className="flex items-end gap-2">
              <span className="text-orange-600 font-bold text-lg leading-none">₹{product.offerPrice}</span>
              {product.price > product.offerPrice && (
                <span className="text-gray-400 line-through text-sm leading-none">₹{product.price}</span>
              )}
              {discountPercent > 0 && (
                <span className="text-green-600 text-[10px] font-bold bg-green-50 px-2 py-0.5 rounded-full leading-none">
                  {discountPercent}% off
                </span>
              )}
            </div>
            
            {discountPercent > 20 && (
              <div className="mt-1.5 flex items-center gap-1.5">
                <span className="inline-flex items-center gap-1 text-green-600 text-[9px] font-medium bg-green-50 px-2 py-0.5 rounded-full">
                  <span className="text-[10px] animate-pulse">⚡</span>
                  Best Price Deal
                </span>
                <span className="text-gray-300 text-[9px]">•</span>
                <span className="text-gray-400 text-[9px]">Limited time</span>
              </div>
            )}
          </div>

          {/* Add to Cart Button */}
          <div className="mt-3 pt-2.5 border-t-2 border-orange-200/40">
            <button
              onClick={handleAddToCart}
              className={`w-full py-2.5 rounded-xl font-semibold text-xs transition-all duration-300 flex items-center justify-center gap-2 ${
                isAuthenticated 
                  ? isHovered 
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/30 scale-[1.02]' 
                    : 'bg-orange-500 text-white hover:bg-orange-600'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
              disabled={!isAuthenticated}
            >
              <ShoppingCart size={15} className={isHovered && isAuthenticated ? 'animate-bounce-once' : ''} />
              {isAuthenticated ? 'Add to Cart' : 'Login to Add'}
            </button>
          </div>

          {/* Login Badge */}
          {!isAuthenticated && (
            <div 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                openAuthModal('login');
              }}
              className="mt-2 text-center cursor-pointer group/login"
            >
              <span className="inline-flex items-center gap-1.5 text-[10px] text-orange-500 font-medium bg-orange-50 px-3 py-1 rounded-full transition-all duration-300 hover:bg-orange-100 hover:shadow-sm">
                <span className="text-[11px]">🔐</span>
                Login to unlock best prices
                <span className="text-orange-400 group-hover/login:translate-x-0.5 transition-transform duration-200">→</span>
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;