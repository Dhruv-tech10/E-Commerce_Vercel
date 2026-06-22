// src/Components/AllPage/ProductCard.jsx
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import { isInWishlist, toggleWishlist } from "../WishlistUtils";

function ProductCard({ product }) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    setIsWishlisted(isInWishlist(product.id));
    
    const handleWishlistUpdate = () => {
      setIsWishlisted(isInWishlist(product.id));
    };
    
    window.addEventListener('wishlistUpdated', handleWishlistUpdate);
    return () => window.removeEventListener('wishlistUpdated', handleWishlistUpdate);
  }, [product.id]);

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
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

  const discountPercent = product.price > product.offerPrice 
    ? Math.round(((product.price - product.offerPrice) / product.price) * 100) 
    : 0;

  return (
    <Link to={`/product/${product.id}`} className="block group">
      <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition duration-300 h-full flex flex-col relative">
        
        {/* Wishlist Button */}
        <button
          onClick={handleWishlistClick}
          className="absolute top-2 right-2 z-10 bg-white rounded-full p-1.5 shadow-md hover:shadow-lg transition-all duration-200"
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          {isWishlisted ? (
            <FavoriteOutlinedIcon className="text-red-500" style={{ fontSize: '20px' }} />
          ) : (
            <FavoriteBorderOutlinedIcon className="text-gray-600 hover:text-red-500" style={{ fontSize: '20px' }} />
          )}
        </button>
        
        {/* Image Container */}
        <div className="relative h-56 sm:h-64 bg-gray-100 flex-shrink-0">
          <img 
            src={product.image || `https://picsum.photos/500/700?random=${product.id}`}
            alt={product.name}
            className="w-full h-full object-contain p-2 group-hover:scale-105 transition duration-500"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = `https://picsum.photos/500/700?random=${product.id}`;
            }}
          />
          
          {discountPercent > 0 && (
            <div className="absolute top-2 left-2 bg-orange-600 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-lg z-10">
              {discountPercent}% OFF
            </div>
          )}
        </div>
        
        {/* Text Content */}
        <div className="p-3 flex-1 flex flex-col">
          <h3 className="font-semibold text-gray-800 text-sm line-clamp-2 min-h-[40px]">
            {product.name}
          </h3>
          
          <p className="text-gray-500 text-xs mt-1">{product.brand || 'Brand'}</p>
          
          <div className="flex items-center gap-2 mt-2">
            <span className="text-orange-600 font-bold text-sm">₹{product.offerPrice}</span>
            {product.price > product.offerPrice && (
              <span className="text-gray-400 line-through text-xs">₹{product.price}</span>
            )}
          </div>
          
          {discountPercent > 15 && (
            <p className="text-green-600 text-[10px] font-medium mt-1">
              ✨ Only for you!
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;