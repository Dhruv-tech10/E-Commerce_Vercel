// src/Components/Arrivals/Arrivals.jsx
import { useEffect, useState } from 'react';
import StarIcon from '@mui/icons-material/Star';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import toast from 'react-hot-toast';

// ✅ Sahi path - assets se import
import FirstArrivals from '../../assets/Img/Arrivals/FirstArrivals.png';
import SecondArrivals from '../../assets/Img/Arrivals/SecondArrivals.png';
import ThreeArrivals from '../../assets/Img/Arrivals/ThreeArrivals.png';
import FourArrivals from '../../assets/Img/Arrivals/FourArrivals.png';
import FiveArrivals from '../../assets/Img/Arrivals/FiveArrivals.png';
import FirstShop from '../../assets/Img/Shop/FirstShop.png';
import SecondShop from '../../assets/Img/Shop/SecondShop.png';
import ThreeShop from '../../assets/Img/Shop/ThreeShop.png';
import FourShop from '../../assets/Img/Shop/FourShop.png';
import FiveShop from '../../assets/Img/Shop/FiveShop.png';





// ✅ WishlistUtils import - sahi path
import { toggleWishlist, isInWishlist, getWishlist } from '../WishlistUtils';

const Arrivals = () => {
    const [wishlistItems, setWishlistItems] = useState([]);

    // Load wishlist on component mount
    useEffect(() => {
        setWishlistItems(getWishlist());
        
        // Listen for wishlist updates
        const handleWishlistUpdate = () => {
            setWishlistItems(getWishlist());
        };
        
        window.addEventListener('wishlistUpdated', handleWishlistUpdate);
        return () => window.removeEventListener('wishlistUpdated', handleWishlistUpdate);
    }, []);

    // ✅ UNIQUE IDs - 1001 se 1005
    const ArrivalsData = [
        {
            id: 1001,
            image: FirstArrivals,
            title: "Knitted Polo T-Shirt",
            price: "₹999",
            rating: "4.4",
            reviews: "60",
        },
        {
            id: 1002,
            image: SecondArrivals,
            badge: "NEW",
            title: "Knitted Polo T-Shirt",
            price: "₹999",
            rating: "4.4",
            reviews: "60",
        },
        {
            id: 1003,
            image: ThreeArrivals,
            title: "Knitted Polo T-Shirt",
            price: "₹999",
            rating: "4.4",
            reviews: "60",
        },
        {
            id: 1004,
            image: FourArrivals,
            title: "Knitted Polo T-Shirt",
            price: "₹999",
            rating: "4.4",
            reviews: "60",
        },
        {
            id: 1005,
            image: FiveArrivals,
            title: "Knitted Polo T-Shirt",
            price: "₹999",
            rating: "4.4",
            reviews: "60",
        },
    ];

    // ✅ Categories Data
    const categoriesData = [
        {
            id: 1,
            title: "Men",
            subtitle: "Casuals, Shirts & more",
            image: FirstShop,
        },
        {
            id: 2,
            title: "Women",
            subtitle: "Dresses, Tops & more",
            image: SecondShop,
        },
        {
            id: 3,
            title: "Bags",
            subtitle: "Totes, Sling Bags & more",
            image: ThreeShop,
        },
        {
            id: 4,
            title: "Footwear",
            subtitle: "Sneakers, Flats & more",
            image: FourShop,
        },
        {
            id: 5,
            title: "Home & Living",
            subtitle: "Decor, Essentials & more",
            image: FiveShop,
        }
    ];

    // Wishlist handler function
    const handleWishlistToggle = (product) => {
        const isAdded = toggleWishlist(product);
        // Update local state
        setWishlistItems(getWishlist());
        
        if (isAdded) {
            toast.success('Added to wishlist ❤️');
        } else {
            toast.success('Removed from wishlist');
        }
    };

    const checkIsInWishlist = (productId) => {
        return isInWishlist(productId);
    };

    return (
        <div>
            <div className='new-Arrivals mx-4 my-3'>
                <div className="flex items-center justify-between px-10 py-6 ">
                    <h3 className="text-[32px] font-bold text-black">
                        New-Arrivals
                    </h3>

                    <div className="flex items-center gap-2 cursor-pointer text-black">
                        <span className="text-[16px] font-medium">View All</span>
                        <ArrowForwardIcon sx={{ fontSize: 20 }} />
                    </div>
                </div>
                <div className="arrivals-row flex gap-4 overflow-x-auto py-3">
                    {ArrivalsData.map((item) => (
                        <div className='main-card flex-shrink-0 w-[220px]' key={item.id}>
                            <div className='card relative flex flex-col gap-3 rounded-[14px] border border-[#ececec] bg-white p-2 !shadow-[0_2px_12px_rgba(0,0,0,0.06)]'>
                                <div className="img-sec relative w-full overflow-hidden rounded-[14px] bg-[#f3f3f3]">
                                    <img src={item.image} alt={item.title} className="w-full h-auto" />
                                    {item.badge && (
                                        <span className="absolute left-2 top-2 rounded-md bg-[#0c7a33] px-3 py-[4px] text-[12px] font-bold tracking-wide text-white shadow-sm">
                                            {item.badge}
                                        </span>
                                    )}
                                </div>
                                <div className='text-sec'>
                                    {/* Wishlist Button */}
                                    <button 
                                        className="absolute right-4 top-3 text-[#222] transition hover:text-red-500"
                                        onClick={() => handleWishlistToggle(item)}
                                    >
                                        {checkIsInWishlist(item.id) ? (
                                            <FavoriteOutlinedIcon 
                                                style={{ width: "24px", height: "24px" }} 
                                                className="text-red-500"
                                            />
                                        ) : (
                                            <FavoriteBorderOutlinedIcon 
                                                style={{ width: "24px", height: "24px" }} 
                                            />
                                        )}
                                    </button>

                                    <h2 className="!text-[18px] font-medium leading-snug text-[#222222] mb-2">
                                        {item.title}
                                    </h2>
                                    <span className="text-[18px] font-semibold ">
                                        {item.price}
                                    </span>
                                    <div className="flex items-center gap-1.5 mt-1">
                                        <StarIcon style={{ width: "18px", height: "18px" }} className='text-[#f4b400]' />
                                        <span className="text-[15px] font-medium text-[#444]">
                                            {item.rating}
                                        </span>
                                        <span className="text-[15px] text-[#8a8a8a]">
                                            ({item.reviews})
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="w-full !px-4 !py-6 !pt-10 overflow-x-auto">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 min-w-[1200px] lg:min-w-auto">
                    {categoriesData.map((category) => (
                        <div
                            key={category.id}
                            className="relative w-full aspect-[3/4] rounded-[16px] overflow-hidden shadow-md group cursor-pointer"
                        >
                            <img
                                src={category.image}
                                alt={category.title}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                            <div className="absolute inset-0 flex flex-col justify-end p-3 text-white">
                                <h2 className="text-2xl md:text-3xl font-serif mb-1 tracking-wide font-medium">
                                    {category.title}
                                </h2>
                                <p className="text-xs md:text-sm text-gray-300 mb-4 font-light tracking-wide line-clamp-1">
                                    {category.subtitle}
                                </p>
                                <div className="flex items-center gap-1.5 text-[10px] md:text-xs font-semibold tracking-widest uppercase border-b border-white/40 pb-1 w-max transition-all duration-300 group-hover:border-white">
                                    <span>SHOP NOW</span>
                                    <ArrowForwardOutlinedIcon className="!w-3.5 !h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Arrivals;