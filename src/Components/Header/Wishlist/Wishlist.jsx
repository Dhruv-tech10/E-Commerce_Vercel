// src/Components/Header/Wishlist/Wishlist.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as WishlistUtils from '../../WishlistUtils';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import toast from 'react-hot-toast';

function Wishlist() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

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
      WishlistUtils.clearWishlist(); // ✅ Yeh call ho raha hai
      loadWishlist();
      toast.success('Wishlist cleared!');
    }
  };
  const handleAddToCart = (product) => {
    toast.success(`${product.title || product.name} added to cart!`);
  };

  const handleAddAllToCart = () => {
    if (items.length === 0) return;
    items.forEach(item => {
      handleAddToCart(item);
    });
    toast.success(`Added ${items.length} items to cart!`);
  };

  // ✅ Price formatter function - Safe way to handle price
  const formatPrice = (price) => {
    if (typeof price === 'number') {
      return `₹${price.toLocaleString()}`;
    }
    if (typeof price === 'string') {
      // Remove ₹ symbol if present and convert to number
      const numericPrice = parseFloat(price.replace(/[₹,]/g, ''));
      if (!isNaN(numericPrice)) {
        return `₹${numericPrice.toLocaleString()}`;
      }
      return price; // Return as is if can't parse
    }
    return '₹0'; // Default fallback
  };

  // ✅ Safe price parser for total calculation
  const parsePrice = (price) => {
    if (typeof price === 'number') {
      return price;
    }
    if (typeof price === 'string') {
      const numericPrice = parseFloat(price.replace(/[₹,]/g, ''));
      return isNaN(numericPrice) ? 0 : numericPrice;
    }
    return 0;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="bg-white rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6 shadow-lg">
            <FavoriteOutlinedIcon style={{ fontSize: 48 }} className="text-gray-300" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Your wishlist is empty</h2>
          <p className="text-gray-500 mb-6">Save your favorite items here and never lose them!</p>
          <Link 
            to="/" 
            className="inline-block bg-orange-600 text-white px-8 py-3 rounded-lg hover:bg-orange-700 transition shadow-md"
          >
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  // ✅ Calculate total safely
  const totalValue = items.reduce((sum, item) => {
    return sum + parsePrice(item.price);
  }, 0);

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
            <p className="text-gray-500 mt-1">{items.length} item{items.length !== 1 ? 's' : ''} saved</p>
          </div>
          <button 
            onClick={handleClearAll}
            className="text-red-500 hover:text-red-600 text-sm font-medium"
          >
            Clear All
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 mb-6 flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center gap-6">
            <div>
              <span className="text-gray-500 text-sm">Total Items:</span>
              <span className="ml-2 font-bold text-gray-800">{items.length}</span>
            </div>
            <div>
              <span className="text-gray-500 text-sm">Total Value:</span>
              <span className="ml-2 font-bold text-orange-600">
                {formatPrice(totalValue)}
              </span>
            </div>
          </div>
          <button 
            className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition flex items-center gap-2"
            onClick={handleAddAllToCart}
          >
            <ShoppingCartOutlinedIcon style={{ fontSize: 18 }} />
            Add All to Cart
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden group">
              <Link to={`/product/${product.id}`} className="block relative">
                <div className="relative h-64 bg-gray-100">
                  <img 
                    src={product.image || `https://picsum.photos/seed/${product.id}/400/400`}
                    alt={product.title || product.name}
                    className="w-full h-full object-contain p-4 group-hover:scale-105 transition duration-300"
                    onError={(e) => {
                      e.target.src = `https://picsum.photos/seed/${product.id}/400/400`;
                    }}
                  />
                </div>
              </Link>
              
              <div className="p-4">
                <Link to={`/product/${product.id}`}>
                  <h3 className="font-semibold text-gray-800 text-base line-clamp-2 min-h-[48px] hover:text-orange-600 transition">
                    {product.title || product.name}
                  </h3>
                </Link>
                
                <div className="flex items-center gap-2 mt-3">
                  <span className="text-orange-600 font-bold text-lg">
                    {formatPrice(product.price)}
                  </span>
                  {product.offerPrice && product.offerPrice < product.price && (
                    <span className="text-gray-400 line-through text-sm">
                      {formatPrice(product.price)}
                    </span>
                  )}
                </div>
                
                <div className="flex gap-3 mt-4">
                  <button 
                    className="flex-1 bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transition text-sm font-medium"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </button>
                  <button 
                    onClick={() => handleRemove(product.id, product.title || product.name)}
                    className="px-4 py-2 border border-red-300 text-red-500 rounded-lg hover:bg-red-50 transition"
                  >
                    <DeleteOutlineOutlinedIcon style={{ fontSize: 20 }} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Link to="/" className="text-orange-600 hover:text-orange-700 font-medium inline-flex items-center gap-2">
            ← Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Wishlist;