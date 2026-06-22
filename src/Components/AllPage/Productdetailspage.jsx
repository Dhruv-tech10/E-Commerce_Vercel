// src/Components/AllPage/Productdetailspage.jsx
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { 
  Minus, Plus, ShoppingCart, Heart, Truck, 
  RotateCcw, ShieldCheck, ChevronRight, Star, 
  Share2, ChevronLeft, CheckCircle 
} from "lucide-react";
import ProductCard from "./ProductCard";
import { getProductById, getRelatedProducts } from "./ProductsData";
import { isInWishlist, toggleWishlist } from '../WishlistUtils';
// ✅ Sahi path - CartContext import karein (src/Context folder se)
import { useCart } from "../../Context/CartContext";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  // ✅ Cart functions use karein
  const { addToCart, isInCart } = useCart();
  
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [isWishlist, setIsWishlist] = useState(false);
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [showAddedToCart, setShowAddedToCart] = useState(false);

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      const productData = getProductById(id);
      if (productData) {
        setProduct(productData);
        const related = getRelatedProducts(productData.category, id);
        setRelatedProducts(related);
        if (productData.sizes && productData.sizes.length > 0) {
          setSelectedSize(productData.sizes[0]);
        }
        setIsWishlist(isInWishlist(id));
      }
      setLoading(false);
    };
    loadProduct();

    const handleWishlistUpdate = () => {
      setIsWishlist(isInWishlist(id));
    };
    window.addEventListener('wishlistUpdated', handleWishlistUpdate);
    return () => window.removeEventListener('wishlistUpdated', handleWishlistUpdate);
  }, [id]);

  // ✅ Add to Cart handler
  const handleAddToCart = () => {
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      const toastEvent = new CustomEvent('showToast', {
        detail: {
          message: 'Please select a size first!',
          type: 'warning'
        }
      });
      window.dispatchEvent(toastEvent);
      return;
    }

    if (product) {
      addToCart(product, quantity, selectedSize);
      setShowAddedToCart(true);
      setTimeout(() => {
        setShowAddedToCart(false);
      }, 3000);
    }
  };

  // ✅ Buy Now handler
  const handleBuyNow = () => {
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      const toastEvent = new CustomEvent('showToast', {
        detail: {
          message: 'Please select a size first!',
          type: 'warning'
        }
      });
      window.dispatchEvent(toastEvent);
      return;
    }

    if (product) {
      addToCart(product, quantity, selectedSize);
      navigate('/checkout');
    }
  };

  const handleWishlistToggle = () => {
    if (product) {
      const newStatus = toggleWishlist(product);
      setIsWishlist(newStatus);
      
      const toastEvent = new CustomEvent('showToast', {
        detail: {
          message: newStatus ? `${product.name} added to wishlist!` : `${product.name} removed from wishlist!`,
          type: newStatus ? 'success' : 'info'
        }
      });
      window.dispatchEvent(toastEvent);
    }
  };

  const handleQuantityChange = (type) => {
    if (type === "increment") setQuantity(prev => prev + 1);
    else if (quantity > 1) setQuantity(prev => prev - 1);
  };

  // Check if item is already in cart
  const itemInCart = product ? isInCart(product.id, selectedSize) : false;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h2>
          <Link to="/" className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const sizes = product.sizes || ["S", "M", "L", "XL"];
  const discountPercent = Math.round(((product.price - product.offerPrice) / product.price) * 100);
  const savedAmount = product.price - product.offerPrice;

  const fallbackImage = `https://picsum.photos/500/700?random=${product.id}`;
  const productImage = product.image || fallbackImage;

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-500 flex-wrap">
            <Link to="/" className="hover:text-orange-600">Home</Link>
            <ChevronRight size={14} />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* LEFT SIDE - PRODUCT IMAGE */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-xl shadow-md overflow-hidden sticky top-20">
              {!imageLoaded && !imageError && (
                <div className="w-full h-96 flex items-center justify-center bg-gray-100">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
                </div>
              )}
              <img 
                src={productImage}
                alt={product.name}
                className={`w-full h-auto object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0 absolute'}`}
                onLoad={() => setImageLoaded(true)}
                onError={(e) => {
                  console.error(`Image failed to load: ${productImage}`);
                  setImageError(true);
                  e.target.src = fallbackImage;
                  e.target.onerror = null;
                }}
              />
            </div>
          </div>

          {/* RIGHT SIDE - PRODUCT DETAILS */}
          <div className="lg:w-1/2">
            {/* Brand and Category */}
            <div className="flex items-center gap-2 text-sm text-gray-500 !mb-2">
              <span className="!font-medium !text-gray-700">{product.brand}</span>
              <span>—</span>
              <span>{product.category}</span>
            </div>
            
            {/* Product Name */}
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{product.name}</h1>
            
            {/* Rating */}
            {product.rating && (
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center gap-1 bg-green-600 text-white px-2 py-0.5 rounded text-xs">
                  <span>{product.rating}</span>
                  <span>★</span>
                </div>
                <span className="text-gray-500 !text-sm">(150 ratings)</span>
              </div>
            )}

            {/* Price Section */}
            <div className="mt-4">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="!text-2xl !font-bold !text-orange-600">₹{product.offerPrice}</span>
                <span className="!text-gray-400 !line-through !text-sm">₹{product.price}</span>
                <span className="bg-green-100 text-green-700 !text-xs !px-2 !py-1 rounded !font-medium">
                  {discountPercent}% off
                </span>
                <span className="!text-green-700 !text-xs !font-medium">Limited time deal</span>
              </div>
              <p className="text-gray-500 !text-sm !mt-1">Inclusive of all taxes</p>
            </div>

            {/* Save Amount */}
            <div className="!mt-2 text-green-600 !text-sm !font-medium">
              Save ₹{savedAmount}
            </div>

            {/* Description */}
            <div className="mt-4">
              <p className="!text-gray-600 !text-sm !leading-relaxed">{product.description}</p>
            </div>

            {/* Select Size */}
            <div className="mt-6">
              <h3 className="!font-semibold !text-gray-800 !mb-2">Select Size</h3>
              <div className="flex flex-wrap gap-3">
                {sizes.map((size, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 !rounded-lg border !font-semibold transition ${
                      selectedSize === size
                        ? 'bg-orange-600 !text-white border-orange-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-orange-600'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="!mt-6 !mb-6">
              <h3 className="!font-semibold !text-gray-800 !mb-2">Quantity</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center border !border-gray-300 !rounded-lg">
                  <button onClick={() => handleQuantityChange('decrement')} className="px-4 py-2 hover:bg-gray-100">
                    <Minus size={18} />
                  </button>
                  <span className="!px-6 !py-2 border-x border-gray-300 min-w-[50px] text-center">{quantity}</span>
                  <button onClick={() => handleQuantityChange('increment')} className="px-4 py-2 hover:bg-gray-100">
                    <Plus size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* ✅ ACTION BUTTONS - Updated with Add to Cart */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              {/* Buy Now Button */}
              <button 
                onClick={handleBuyNow}
                className="flex-1 bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition flex items-center justify-center gap-2"
              >
                <ShoppingCart size={20} /> Buy Now
              </button>
              
              {/* ✅ Add to Cart Button */}
              <button 
                onClick={handleAddToCart}
                className={`flex-1 py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2 ${
                  itemInCart 
                    ? 'bg-green-600 text-white hover:bg-green-700' 
                    : 'border-2 border-orange-600 text-orange-600 hover:bg-orange-50'
                }`}
              >
                {itemInCart ? (
                  <>
                    <CheckCircle size={20} /> In Cart
                  </>
                ) : (
                  <>
                    <ShoppingCart size={20} /> Add to Cart
                  </>
                )}
              </button>
              
              {/* Wishlist Button */}
              <button 
                onClick={handleWishlistToggle}
                className={`p-3 border rounded-lg transition ${
                  isWishlist ? 'bg-red-500 text-white border-red-500' : 'border-gray-300 hover:border-orange-600'
                }`}
              >
                <Heart size={20} fill={isWishlist ? 'white' : 'none'} />
              </button>
            </div>

            {/* ✅ Added to Cart Success Message */}
            {showAddedToCart && (
              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 animate-fadeIn">
                <CheckCircle className="text-green-600" size={20} />
                <span className="text-green-700 font-medium">
                  {product.name} added to cart successfully!
                </span>
              </div>
            )}

            {/* Features Section */}
            <div className="mt-8 grid grid-cols-3 gap-4 py-4 border-t border-b border-gray-200">
              <div className="text-center">
                <Truck className="mx-auto text-orange-600 mb-1" size={22} />
                <p className="font-semibold !text-xs mb-2">Free Shipping</p>
                <p className="text-gray-500 !text-[13px]">On ₹799+</p>
              </div>
              <div className="text-center">
                <RotateCcw className="mx-auto text-orange-600 mb-1" size={22} />
                <p className="font-semibold !text-xs mb-2">Easy Returns</p>
                <p className="text-gray-500 !text-[13px]">7 days return</p>
              </div>
              <div className="text-center">
                <ShieldCheck className="mx-auto text-orange-600 mb-1" size={22} />
                <p className="font-semibold !text-xs mb-2">Secure Payment</p>
                <p className="text-gray-500 !text-[13px]">100% safe</p>
              </div>
            </div>

            {/* Product Features List */}
            {product.features && product.features.length > 0 && (
              <div className="mt-4">
                <h3 className="font-semibold text-gray-900 mb-2">Product Details</h3>
                <ul className="space-y-1">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 bg-orange-600 rounded-full"></span> {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-bold text-gray-900 mt-5 !mb-3">You may also like</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {relatedProducts.slice(0, 5).map(related => (
                <ProductCard key={related.id} product={related} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDetails;