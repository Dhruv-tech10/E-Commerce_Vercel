// 🟢 FINAL UPDATED ProductDetails.js - GLASSMORPHISM BREADCRUMB + IMAGE FILLS CARD + WORKING WISHLIST
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useParams, Link, useNavigate } from "react-router-dom";
import { 
  Minus, Plus, ShoppingCart, Heart, Truck, 
  RotateCcw, ShieldCheck, ChevronRight, Star, 
  Share2, CheckCircle, Send
} from "lucide-react";
import ProductCard from "./ProductCard";
import { getProductByIdWithLiveStats, getRelatedProducts, submitProductReview } from "./ProductsData";
import { isInWishlist, toggleWishlist } from '../WishlistUtils';
import { useAuth } from '../../Context/AuthContext';
import { useCart } from '../../Context/CartContext';
// 🟢 ISE COPY-PASTE KARLO (Line 14 par):
// 🟢 Badalkar yeh kar do (Capital 'I' ke saath ImageService):
import { getProductImages, prefetchProductImages } from "../Services/ImageService";
// ============================================
// 📦 CUSTOM HOOKS
// ============================================

const useProductData = (id) => {
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [wishlist, setWishlist] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      
      const data = getProductByIdWithLiveStats(id);
      
      if (data) {
        try {
          const apiImages = await getProductImages(data.name, data.category);
          data.images = apiImages;
        } catch (err) {
          console.error("Error generating images", err);
          data.images = [
            `https://picsum.photos/seed/${data.name}-0/400/500`,
            `https://picsum.photos/seed/${data.name}-1/400/500`,
            `https://picsum.photos/seed/${data.name}-2/400/500`
          ];
        }

        setProduct(data);
        setRelated(getRelatedProducts(data.category, id));
        setReviews(JSON.parse(localStorage.getItem(`reviews-${id}`)) || []);
        
        const wishlistStatus = isInWishlist(id);
        setWishlist(wishlistStatus);
      }
      
      setLoading(false);
    };
    
    loadData();

    const handler = () => {
      setWishlist(isInWishlist(id));
    };
    window.addEventListener('wishlistUpdated', handler);
    return () => window.removeEventListener('wishlistUpdated', handler);
  }, [id]);

  return { 
    product, 
    setProduct, 
    related, 
    loading, 
    reviews, 
    setReviews, 
    wishlist, 
    setWishlist 
  };
};

// ============================================
// 🎨 UI COMPONENTS
// ============================================

// 🟢 GLASSMORPHISM STYLE BREADCRUMB - UPDATED
const Breadcrumb = ({ product }) => {
  return (
    <div className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 shadow-lg shadow-gray-100/50">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center gap-2 text-sm flex-wrap">
          
          {/* Home */}
          <Link 
            to="/" 
            className="group flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold text-xs rounded-lg shadow-md shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 hover:scale-105 transition-all duration-300 no-underline"
          >
            <svg className="w-3.5 h-3.5 group-hover:rotate-[-10deg] transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Home
          </Link>

          {/* Separator with Dot */}
          <span className="flex items-center gap-2 text-gray-400">
            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
          </span>

          {/* Category - Glass Effect */}
          <span className="flex items-center gap-1.5 px-3 py-1.5 bg-white/80 backdrop-blur-sm text-gray-700 font-medium text-xs rounded-lg border border-gray-200/80 shadow-sm hover:shadow-md transition-all duration-300">
            <svg className="w-3.5 h-3.5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            {product?.category || 'Products'}
          </span>

          {/* Separator with Dot */}
          <span className="flex items-center gap-2 text-gray-400">
            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
          </span>

          {/* Product Name - Gradient Text */}
          <span className="flex items-center gap-1.5 px-3 py-1.5 font-bold text-xs">
            <span className="bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
              {product?.name}
            </span>
            <span className="text-gray-300">•</span>
            <span className="text-gray-400 text-[10px] font-normal">#{product?.id?.slice(0, 6) || '001'}</span>
          </span>

        
        </div>
      </div>
    </div>
  );
};

// 🟢 FIXED ProductImages - IMAGE PROPERLY FILLS THE CARD
const ProductImages = ({ images, name, discount, wishlist, onWishlist }) => {
  const [active, setActive] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const handleThumbnailClick = (index) => {
    if (active !== index) {
      setLoaded(false);
      setActive(index);
    }
  };

  return (
    <div className="lg:w-[45%]">
      <div className="sticky top-16 flex flex-col-reverse md:flex-row gap-2">
        
        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="flex md:flex-col gap-1.5 overflow-x-auto md:overflow-x-visible pb-1.5 md:pb-0 md:w-14 flex-shrink-0">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => handleThumbnailClick(i)}
                onMouseEnter={() => handleThumbnailClick(i)}
                className={`flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                  active === i ? 'border-orange-500 shadow-md shadow-orange-500/20 scale-105' : 'border-gray-200 hover:border-gray-400'
                }`}
              >
                <img 
                  src={img} 
                  alt={`${name} - Thumb ${i+1}`} 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        )}

        {/* ✅ MAIN IMAGE - PROPERLY FILLS THE CARD */}
        <div className="flex-1 bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
          <div className="relative w-full" style={{ paddingBottom: '100%' }}>
            {!loaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-50 z-10">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600" />
              </div>
            )}
            <img 
              key={active}
              src={images[active] || images[0]} 
              alt={name}
              className={`absolute inset-0 w-full h-full transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
              style={{ objectFit: 'cover' }}
              onLoad={() => setLoaded(true)}
              onError={(e) => { 
                e.target.src = `https://picsum.photos/seed/${name}-${active}/400/500`; 
                setLoaded(true);
              }}
              decoding="async"
            />
            {discount > 0 && (
              <div className="absolute top-2 left-2 bg-gradient-to-r from-red-500 to-orange-500 text-white px-2 py-0.5 rounded-full text-[10px] font-bold shadow-lg z-20">
                {discount}% OFF
              </div>
            )}
            
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onWishlist();
              }}
              className={`absolute top-2 right-2 p-1.5 rounded-full shadow-lg transition-all duration-300 z-20 ${
                wishlist ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-white text-gray-600 hover:bg-gray-50 hover:scale-110'
              }`}
            >
              <Heart size={14} fill={wishlist ? 'white' : 'none'} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

const SizeSelector = ({ sizes, selected, onChange }) => (
  <div className="mt-2">
    <div className="flex items-center justify-between mb-1.5">
      <h3 className="font-semibold text-xs text-gray-800">Select Size</h3>
      <button className="text-[10px] text-orange-600 font-medium hover:underline">Size Guide</button>
    </div>
    <div className="flex flex-wrap gap-1.5">
      {sizes?.map((size) => (
        <button
          key={size}
          onClick={() => onChange(size)}
          className={`w-8 h-8 rounded-lg border-2 font-semibold text-[10px] transition-all duration-300 ${
            selected === size
              ? 'bg-orange-600 text-white border-orange-600 shadow-lg shadow-orange-600/20 scale-105'
              : 'bg-white text-gray-700 border-gray-200 hover:border-orange-400 hover:bg-orange-50'
          }`}
        >
          {size}
        </button>
      ))}
    </div>
  </div>
);

const QuantitySelector = ({ quantity, onChange }) => (
  <div className="mt-2">
    <h3 className="font-semibold text-xs text-gray-800 mb-1.5">Quantity</h3>
    <div className="flex items-center">
      <div className="flex items-center border-2 border-gray-200 rounded-lg overflow-hidden bg-white">
        <button 
          onClick={() => onChange(Math.max(1, quantity - 1))} 
          className="px-2.5 py-1 hover:bg-gray-50 transition disabled:opacity-50 flex items-center justify-center"
          disabled={quantity <= 1}
          type="button"
        >
          <Minus size={12} className="text-gray-600" />
        </button>
        <span className="w-10 text-center font-semibold text-xs text-gray-800 select-none">
          {quantity}
        </span>
        <button 
          onClick={() => onChange(quantity + 1)} 
          className="px-2.5 py-1 hover:bg-gray-50 transition flex items-center justify-center"
          type="button"
        >
          <Plus size={12} className="text-gray-600" />
        </button>
      </div>
      <span className="ml-2 text-[10px] text-gray-500 font-medium">
        {quantity} item{quantity > 1 ? 's' : ''}
      </span>
    </div>
  </div>
);

const ActionButtons = ({ onBuy, onAdd, inCart }) => (
  <div className="mt-3 flex flex-col sm:flex-row gap-1.5">
    <button 
      onClick={onBuy}
      className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white py-2 rounded-lg font-semibold text-xs hover:from-orange-600 hover:to-orange-700 transition-all duration-300 flex items-center justify-center gap-1.5 shadow-lg shadow-orange-500/25 hover:shadow-xl hover:shadow-orange-500/30 active:scale-[0.98]"
    >
      <ShoppingCart size={13} /> Buy Now
    </button>
    <button 
      onClick={onAdd}
      className={`flex-1 py-2 rounded-lg font-semibold text-xs transition-all duration-300 flex items-center justify-center gap-1.5 ${
        inCart 
          ? 'bg-green-600 text-white hover:bg-green-700 shadow-lg shadow-green-500/25' 
          : 'bg-white text-orange-600 border-2 border-orange-600 hover:bg-orange-50 hover:shadow-lg hover:shadow-orange-500/10'
      }`}
    >
      {inCart ? (
        <><CheckCircle size={13} /> In Cart</>
      ) : (
        <><ShoppingCart size={13} /> Add to Cart</>
      )}
    </button>
  </div>
);

const Features = () => (
  <div className="mt-3 grid grid-cols-3 gap-1.5 py-2.5 border-t border-b border-gray-200">
    {[
      { icon: Truck, label: 'Free Shipping', sub: '₹799+' },
      { icon: RotateCcw, label: 'Easy Returns', sub: '7 days' },
      { icon: ShieldCheck, label: 'Secure Payment', sub: '100% safe' }
    ].map(({ icon: Icon, label, sub }) => (
      <div key={label} className="text-center">
        <div className="w-6 h-6 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-0.5">
          <Icon className="text-orange-600" size={13} />
        </div>
        <p className="font-semibold text-[10px] text-gray-800">{label}</p>
        <p className="text-gray-500 text-[8px]">{sub}</p>
      </div>
    ))}
  </div>
);

// Review hook
const useReviews = (productId, product, setProduct, reviews, setReviews) => {
  const { isAuthenticated, openAuthModal } = useAuth();
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const submit = useCallback(async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      openAuthModal('login');
      return;
    }
    if (!comment.trim()) {
      window.dispatchEvent(new CustomEvent('showToast', {
        detail: { message: 'Please enter a comment!', type: 'warning' }
      }));
      return;
    }

    setSubmitting(true);
    const result = submitProductReview(productId, rating, comment, 'Verified Buyer');
    if (result) {
      setProduct(prev => ({ 
        ...prev, 
        rating: result.updatedStats.rating, 
        reviews: result.updatedStats.reviews 
      }));
      setReviews(result.updatedReviews);
      setComment('');
      setRating(5);
      window.dispatchEvent(new CustomEvent('showToast', {
        detail: { message: 'Thank you! Review added.', type: 'success' }
      }));
    }
    setSubmitting(false);
  }, [isAuthenticated, productId, rating, comment, openAuthModal, setProduct, setReviews]);

  return { 
    rating, setRating, hover, setHover, comment, setComment, 
    submitting, submit 
  };
};

const ReviewSection = ({ product, reviews, setReviews, setProduct }) => {
  const { isAuthenticated, openAuthModal } = useAuth();
  const { rating, setRating, hover, setHover, comment, setComment, submitting, submit } = 
    useReviews(product.id, product, setProduct, reviews, setReviews);

  const renderStars = (count, interactive = false) => {
    const display = interactive ? (hover || rating) : count;
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={interactive ? 20 : 10}
        className={`cursor-pointer transition-all duration-200 ${
          i < display ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
        } ${interactive ? 'hover:scale-110' : ''}`}
        onClick={() => interactive && setRating(i + 1)}
        onMouseEnter={() => interactive && setHover(i + 1)}
        onMouseLeave={() => interactive && setHover(0)}
        fill={i < display ? 'currentColor' : 'none'}
      />
    ));
  };

  return (
    <div className="mt-8">
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="p-3 border-b border-gray-100">
          <h2 className="text-base font-bold text-gray-900">Customer Reviews</h2>
          <p className="text-gray-500 text-[10px] mt-0.5">
            {product.reviews || 0} reviews • {product.rating || 0} avg
          </p>
        </div>

        <div className="p-3 bg-gradient-to-r from-orange-50 to-yellow-50 border-b border-orange-100">
          <h3 className="font-semibold text-xs text-gray-800 mb-1.5">Write a Review</h3>
          <form onSubmit={submit}>
            <div className="flex items-center gap-1.5 mb-1.5">
              <span className="text-[10px] font-medium text-gray-700">Rating:</span>
              <div className="flex items-center gap-0.5">{renderStars(0, true)}</div>
              <span className="text-[10px] text-gray-500 ml-1">{hover || rating} / 5</span>
            </div>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your experience..."
              className="w-full px-2.5 py-1.5 text-xs border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none resize-none bg-white"
              rows="2"
              disabled={!isAuthenticated}
            />
            <div className="flex items-center justify-between mt-1.5">
              {!isAuthenticated ? (
                <button 
                  type="button" 
                  onClick={() => openAuthModal('login')} 
                  className="text-[10px] text-orange-600 font-semibold hover:underline"
                >
                  🔒 Login to review
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={submitting || !comment.trim()}
                  className={`px-3 py-1 rounded-lg font-semibold text-[10px] transition-all duration-300 flex items-center gap-1 ${
                    submitting || !comment.trim()
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-orange-600 text-white hover:bg-orange-700 shadow-lg shadow-orange-500/25'
                  }`}
                >
                  {submitting ? (
                    <><div className="animate-spin rounded-full h-2.5 w-2.5 border-b-2 border-white" /> Submitting...</>
                  ) : (
                    <><Send size={10} /> Submit</>
                  )}
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="p-3 max-h-[250px] overflow-y-auto">
          {reviews.length === 0 ? (
            <div className="text-center py-3">
              <p className="text-gray-500 text-xs">No reviews yet. Be the first!</p>
            </div>
          ) : (
            <div className="space-y-2.5">
              {reviews.map((review) => (
                <div key={review.id} className="border-b border-gray-100 last:border-0 pb-2.5 last:pb-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-[8px]">
                        {review.username?.charAt(0) || 'U'}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 text-[10px]">{review.username || 'Anonymous'}</p>
                        <div className="flex items-center gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              size={8} 
                              className={i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'} 
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <span className="text-[8px] text-gray-400">{review.date}</span>
                  </div>
                  <p className="text-gray-600 text-[10px] mt-0.5">{review.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ============================================
// 🚀 MAIN COMPONENT
// ============================================

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, openAuthModal } = useAuth();
  
  const { 
    product, 
    setProduct, 
    related, 
    loading, 
    reviews, 
    setReviews, 
    wishlist, 
    setWishlist 
  } = useProductData(id);
  
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const { addToCart, isInCart, cartItems } = useCart();

  const discount = useMemo(() => {
    if (!product) return 0;
    return Math.round(((product.price - product.offerPrice) / product.price) * 100);
  }, [product]);

  const images = useMemo(() => {
    if (!product) return [];
    if (product.images && product.images.length > 0) {
      return product.images;
    }
    return [
      `https://picsum.photos/seed/${product.name}-0/400/500`,
      `https://picsum.photos/seed/${product.name}-1/400/500`,
      `https://picsum.photos/seed/${product.name}-2/400/500`
    ];
  }, [product]);

  useEffect(() => {
    if (product && product.sizes && Array.isArray(product.sizes) && product.sizes.length > 0) {
      if (!selectedSize || !product.sizes.includes(selectedSize)) {
        setSelectedSize(product.sizes[0]);
      }
    }
  }, [product, selectedSize]);

  useEffect(() => {
    if (related && related.length > 0) {
      prefetchProductImages(related)
        .then(() => console.log('✅ Related products images pre-fetched successfully'))
        .catch((err) => console.warn('⚠️ Error pre-fetching related product images:', err));
    }
  }, [related]);

  const inCart = useMemo(() => {
    if (!product) return false;
    return isInCart(product.id, selectedSize);
  }, [product, selectedSize, cartItems]);

  // ✅ WISHLIST TOGGLE - WORKING
  const handleWishlistToggle = () => {
    if (!isAuthenticated) {
      openAuthModal('login');
      return;
    }
    
    if (!product) return;
    
    const newStatus = toggleWishlist(product);
    setWishlist(newStatus);
    
    window.dispatchEvent(new CustomEvent('wishlistUpdated'));
    
    window.dispatchEvent(new CustomEvent('showToast', {
      detail: {
        message: newStatus ? `${product.name} added to wishlist!` : `${product.name} removed from wishlist!`,
        type: newStatus ? 'success' : 'info'
      }
    }));
  };

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      openAuthModal('login');
      return;
    }
    
    if (product?.sizes && Array.isArray(product.sizes) && product.sizes.length > 0 && !selectedSize) {
      window.dispatchEvent(new CustomEvent('showToast', {
        detail: { message: 'Please select a size first!', type: 'warning' }
      }));
      return;
    }
    
    addToCart(product, quantity, selectedSize);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
    
    window.dispatchEvent(new CustomEvent('showToast', {
      detail: { message: `${product.name} added to cart!`, type: 'success' }
    }));
  };

  const handleBuyNow = () => {
    if (!isAuthenticated) {
      openAuthModal('login');
      return;
    }
    
    if (product?.sizes && Array.isArray(product.sizes) && product.sizes.length > 0 && !selectedSize) {
      window.dispatchEvent(new CustomEvent('showToast', {
        detail: { message: 'Please select a size first!', type: 'warning' }
      }));
      return;
    }
    
    addToCart(product, quantity, selectedSize);
    navigate('/cart');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-4 border-orange-600 mx-auto" />
          <p className="mt-2 text-gray-500 text-xs font-medium">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center bg-white p-6 rounded-2xl shadow-lg max-w-sm">
          <h2 className="text-lg font-bold text-gray-800 mb-1.5">Product Not Found</h2>
          <p className="text-gray-500 text-xs mb-3">The product you're looking for doesn't exist.</p>
          <Link to="/" className="inline-block bg-orange-600 text-white px-5 py-1.5 rounded-lg font-semibold text-xs hover:bg-orange-700 transition shadow-lg shadow-orange-600/20">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const sizes = product.sizes || ["Free Size"];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* 🟢 GLASSMORPHISM BREADCRUMB */}
      <Breadcrumb product={product} />

      <div className="max-w-6xl mx-auto px-3 py-3">
        <div className="flex flex-col lg:flex-row gap-4">
          
          <ProductImages 
            images={images} 
            name={product.name} 
            discount={discount} 
            wishlist={wishlist} 
            onWishlist={handleWishlistToggle}
          />

          <div className="lg:w-[55%]">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="text-[10px] font-semibold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">
                {product.brand || 'Brand'}
              </span>
              <span className="text-[10px] text-gray-400">•</span>
              <span className="text-[10px] text-gray-500">{product.category}</span>
            </div>

            <h1 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight">
              {product.name}
            </h1>

            {product.rating && (
              <div className="flex items-center gap-1.5 mt-1.5">
                <div className="flex items-center gap-0.5 bg-green-600 text-white px-1.5 py-0.5 rounded-lg text-[10px] font-semibold">
                  <span>{product.rating}</span>
                  <Star size={8} fill="white" />
                </div>
                <span className="text-gray-500 text-[10px]">
                  ({product.reviews || 0} ratings) • 1.2k+ sold
                </span>
              </div>
            )}

            <div className="mt-2 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-2.5 border border-orange-100">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xl font-bold text-orange-600">₹{product.offerPrice}</span>
                <span className="text-sm text-gray-400 line-through">₹{product.price}</span>
                <span className="bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full text-[10px] font-semibold">
                  {discount}% off
                </span>
              </div>
              <p className="text-[10px] text-gray-500 mt-0.5">Inclusive of all taxes • Free shipping on ₹799+</p>
              <div className="mt-0.5 text-green-600 text-[10px] font-medium">
                🎯 You save ₹{product.price - product.offerPrice} on this purchase!
              </div>
            </div>

            <p className="mt-2 text-gray-600 text-[11px] leading-relaxed">
              {product.description || 'Premium quality product designed for comfort and style.'}
            </p>

            <SizeSelector 
              sizes={sizes} 
              selected={selectedSize} 
              onChange={setSelectedSize} 
            />

            <QuantitySelector 
              quantity={quantity} 
              onChange={setQuantity} 
            />
            
            <ActionButtons 
              onBuy={handleBuyNow} 
              onAdd={handleAddToCart} 
              inCart={inCart} 
            />

            {!isAuthenticated && (
              <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded-lg flex items-center gap-1.5">
                <span className="text-yellow-500 text-sm">🔒</span>
                <div>
                  <p className="text-yellow-800 font-medium text-[10px]">
                    Login to add items to cart or wishlist
                  </p>
                  <button 
                    onClick={() => openAuthModal('login')} 
                    className="text-orange-600 text-[10px] font-semibold hover:underline mt-0.5"
                  >
                    Sign in now →
                  </button>
                </div>
              </div>
            )}

            {showSuccess && (
              <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded-lg flex items-center gap-1.5 animate-fadeIn">
                <CheckCircle className="text-green-600" size={14} />
                <div>
                  <p className="text-green-800 font-medium text-[10px]">
                    {product.name} added to cart!
                  </p>
                  <Link to="/cart" className="text-orange-600 text-[10px] font-semibold hover:underline">
                    View Cart →
                  </Link>
                </div>
              </div>
            )}

            <Features />

            <button className="mt-2 flex items-center gap-1 text-gray-500 hover:text-orange-600 transition text-[10px] font-medium">
              <Share2 size={11} /> Share this product
            </button>
          </div>
        </div>

        <ReviewSection 
          product={product} 
          reviews={reviews} 
          setReviews={setReviews} 
          setProduct={setProduct} 
        />

        {related.length > 0 && (
          <div className="mt-8">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h2 className="text-lg font-bold text-gray-900">You May Also Like</h2>
                <p className="text-gray-500 text-[10px] mt-0.5">Products similar to this one</p>
              </div>
              <Link to="/" className="text-orange-600 font-semibold hover:underline text-[10px] flex items-center gap-1">
                View All <ChevronRight size={12} />
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {related.slice(0, 5).map(item => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDetails;