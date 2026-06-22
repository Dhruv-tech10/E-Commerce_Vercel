import  { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// Import images
import JeansImg from '../../../assets/Img/Wishlist/JeansImg.jpg';
import TshirtImg from '../../../assets/Img/Wishlist/TshirtImg.jpg';
import WatchImg from '../../../assets/Img/Wishlist/WatchImg.jpg';
import BoysImg from '../../../assets/Img/Wishlist/BoysImg.jpg';

function Wishlist1() {
    const navigate = useNavigate();
    const [wishlistItems, setWishlistItems] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    // Product data
    const products = [
        { id: 1, name: "Jeans", price: 49.99, image: JeansImg, icon: "👖", category: "Mens Clothing" },
        { id: 2, name: "T-Shirt", price: 19.99, image: TshirtImg, icon: "👕", category: "Mens Clothing" },
        { id: 3, name: "Watch", price: 29.99, image: WatchImg, icon: "⌚", category: "Accessories" },
        { id: 4, name: "Boys Clothing", price: 39.99, image: BoysImg, icon: "👦", category: "Kids Clothing" }
    ];

    // ✅ Load wishlist from localStorage
    useEffect(() => {
        const loadWishlist = () => {
            try {
                const savedWishlist = localStorage.getItem('userWishlist');
                if (savedWishlist && savedWishlist !== 'undefined' && savedWishlist !== 'null') {
                    const ids = JSON.parse(savedWishlist);
                    if (Array.isArray(ids)) {
                        const items = ids.map(id => products.find(p => p.id === id)).filter(p => p);
                        setWishlistItems(items);
                    } else {
                        setWishlistItems([]);
                    }
                } else {
                    setWishlistItems([]);
                }
            } catch (e) {
                console.log("Error loading wishlist:", e);
                setWishlistItems([]);
            }
            setIsLoading(false);
        };
        
        loadWishlist();
    }, []);

    // ✅ Listen for changes from main page
    useEffect(() => {
        const handleStorageChange = () => {
            try {
                const savedWishlist = localStorage.getItem('userWishlist');
                if (savedWishlist && savedWishlist !== 'undefined' && savedWishlist !== 'null') {
                    const ids = JSON.parse(savedWishlist);
                    if (Array.isArray(ids)) {
                        const items = ids.map(id => products.find(p => p.id === id)).filter(p => p);
                        setWishlistItems(items);
                    } else {
                        setWishlistItems([]);
                    }
                } else {
                    setWishlistItems([]);
                }
            } catch (e) {}
        };
        
        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    const addToCart = (product) => {
        setCartItems([...cartItems, product]);
        setToastMessage(`✅ ${product.name} added to cart!`);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2000);
    };

    const removeFromWishlist = (productId) => {
        try {
            const savedWishlist = localStorage.getItem('userWishlist');
            if (savedWishlist) {
                const ids = JSON.parse(savedWishlist);
                const updatedIds = ids.filter(id => id !== productId);
                localStorage.setItem('userWishlist', JSON.stringify(updatedIds));
                const items = updatedIds.map(id => products.find(p => p.id === id)).filter(p => p);
                setWishlistItems(items);
                setToastMessage(`💔 Removed from wishlist!`);
                setShowToast(true);
                setTimeout(() => setShowToast(false), 2000);
            }
        } catch (e) {
            console.log("Error removing from wishlist:", e);
        }
    };

    const goBackToProducts = () => {
        navigate('/');
    };

    if (isLoading) {
        return <div style={{ textAlign: 'center', padding: '50px' }}>Loading...</div>;
    }

    return (
        <div style={{ padding: '40px 20px', background: '#f8f9fa', minHeight: '100vh' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '30px',
                    flexWrap: 'wrap',
                    gap: '15px'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <button
                            onClick={goBackToProducts}
                            style={{
                                background: '#e74c3c',
                                padding: '10px 24px',
                                borderRadius: '30px',
                                border: 'none',
                                cursor: 'pointer',
                                color: 'white',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                fontSize: '16px',
                                fontWeight: '600'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.background = '#c0392b'}
                            onMouseLeave={(e) => e.currentTarget.style.background = '#e74c3c'}
                        >
                            ← Back to Products
                        </button>
                        <h2 style={{ color: '#333', margin: 0, fontSize: '28px' }}>
                            ❤️ My Wishlist
                        </h2>
                    </div>
                </div>

                {wishlistItems.length === 0 ? (
                    <div style={{
                        textAlign: 'center',
                        padding: '80px 20px',
                        background: 'white',
                        borderRadius: '20px',
                        boxShadow: '0 5px 20px rgba(0,0,0,0.1)'
                    }}>
                        <div style={{ fontSize: '80px', marginBottom: '20px' }}>💔</div>
                        <h3 style={{ color: '#333', marginBottom: '10px' }}>Your wishlist is empty</h3>
                        <p style={{ color: '#666', marginBottom: '20px' }}>
                            Click on the heart icon ❤️ on products to add them here
                        </p>
                        <button
                            onClick={goBackToProducts}
                            style={{
                                background: '#1a1a1a',
                                color: 'white',
                                padding: '12px 30px',
                                borderRadius: '30px',
                                border: 'none',
                                cursor: 'pointer'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.background = '#e74c3c'}
                            onMouseLeave={(e) => e.currentTarget.style.background = '#1a1a1a'}
                        >
                            🛍️ Browse Products
                        </button>
                    </div>
                ) : (
                    <>
                        <div style={{
                            background: 'white',
                            borderRadius: '15px',
                            padding: '15px 20px',
                            marginBottom: '30px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                            gap: '15px',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                        }}>
                            <span style={{ fontSize: '18px', fontWeight: '600' }}>
                                📦 Total Items: {wishlistItems.length}
                            </span>
                            <span style={{ fontSize: '18px', fontWeight: '600', color: '#e74c3c' }}>
                                💰 Total: ${wishlistItems.reduce((sum, item) => sum + item.price, 0).toFixed(2)}
                            </span>
                        </div>

                        <div className="container" style={{ padding: 0 }}>
                            <div className="row g-4">
                                {wishlistItems.map((product) => (
                                    <div key={product.id} className="col-md-3 col-sm-6 mb-4">
                                        <div style={{
                                            background: 'white',
                                            borderRadius: '15px',
                                            overflow: 'hidden',
                                            boxShadow: '0 5px 20px rgba(0,0,0,0.1)',
                                            transition: 'all 0.3s ease',
                                            height: '100%',
                                            position: 'relative'
                                        }}>
                                            <div style={{
                                                position: 'absolute',
                                                top: '10px',
                                                right: '10px',
                                                zIndex: 10,
                                                background: 'white',
                                                borderRadius: '50%',
                                                width: '36px',
                                                height: '36px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                                            }}>
                                                <span style={{ fontSize: '22px', color: '#e74c3c' }}>❤️</span>
                                            </div>
                                            
                                            <img 
                                                src={product.image}
                                                alt={product.name}
                                                style={{ 
                                                    height: '250px', 
                                                    width: '100%', 
                                                    objectFit: 'cover',
                                                    background: '#f0f0f0'
                                                }}
                                            />
                                            
                                            <div style={{ padding: '20px' }}>
                                                <h5 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '10px', color: '#333' }}>
                                                    {product.name}
                                                </h5>
                                                <p style={{ fontSize: '22px', fontWeight: 'bold', color: '#e74c3c', marginBottom: '15px' }}>
                                                    ${product.price}
                                                </p>
                                                <button 
                                                    onClick={() => addToCart(product)}
                                                    style={{
                                                        width: '100%',
                                                        background: '#1a1a1a',
                                                        color: 'white',
                                                        border: 'none',
                                                        padding: '12px',
                                                        borderRadius: '30px',
                                                        cursor: 'pointer',
                                                        fontWeight: '600',
                                                        marginBottom: '10px'
                                                    }}
                                                    onMouseEnter={(e) => e.currentTarget.style.background = '#e74c3c'}
                                                    onMouseLeave={(e) => e.currentTarget.style.background = '#1a1a1a'}
                                                >
                                                    🛒 Add to Cart
                                                </button>
                                                <button 
                                                    onClick={() => removeFromWishlist(product.id)}
                                                    style={{
                                                        width: '100%',
                                                        background: 'transparent',
                                                        color: '#999',
                                                        border: '1px solid #ddd',
                                                        padding: '8px',
                                                        borderRadius: '30px',
                                                        cursor: 'pointer',
                                                        fontSize: '12px'
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        e.currentTarget.style.background = '#fee';
                                                        e.currentTarget.style.color = '#e74c3c';
                                                        e.currentTarget.style.borderColor = '#e74c3c';
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.currentTarget.style.background = 'transparent';
                                                        e.currentTarget.style.color = '#999';
                                                        e.currentTarget.style.borderColor = '#ddd';
                                                    }}
                                                >
                                                    ❌ Remove
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </div>

            {cartItems.length > 0 && (
                <div style={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    background: '#2ecc71',
                    color: 'white',
                    padding: '12px 24px',
                    borderRadius: '50px',
                    zIndex: 1000
                }}>
                    🛒 Cart: {cartItems.length} items
                </div>
            )}

            {showToast && (
                <div style={{
                    position: 'fixed',
                    bottom: '80px',
                    right: '20px',
                    background: '#2ecc71',
                    color: 'white',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    zIndex: 1000,
                    animation: 'slideIn 0.3s ease'
                }}>
                    {toastMessage}
                </div>
            )}

            <style>{`
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
            `}</style>
        </div>
    );
}

export default Wishlist1;