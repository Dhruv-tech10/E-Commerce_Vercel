// src/Components/Sellers/Sellers.jsx
import { useState, useEffect, useCallback } from 'react';
import StarIcon from '@mui/icons-material/Star';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import FirstSellers from '../../assets/Img/Sellers/FirstSellers.png';
import SecondSellers from '../../assets/Img/Sellers/SecondSellers.png';
import ThreeSellers from '../../assets/Img/Sellers/ThreeSellers.png';
import FourSellers from '../../assets/Img/Sellers/FourSellers.png';
import FirstCard from '../../assets/Img/CardImg/FirstCard.png';
import SecondCard from '../../assets/Img/CardImg/SecondCard.png';
import { isInWishlist, toggleWishlist } from '../WishlistUtils';

const Sellers = () => {
    const [wishlistStatus, setWishlistStatus] = useState({});
    
    const Arrivals =  [
        {
            id: 101,
            image: FirstSellers,
            title: "Knitted Polo T-Shirt",
            price: "₹999",
            originalPrice: "₹1,299",
            discount: "38% OFF",
            rating: "4.4",
            reviews: "60",
            brand: "Polo"
        },
        {
            id: 102,
            image: SecondSellers,
            badge: "NEW",
            title: "Knitted Polo T-Shirt",
            price: "₹999",
            originalPrice: "₹1,299",
            discount: "38% OFF",
            rating: "4.4",
            reviews: "60",
            brand: "Polo"
        },
        {
            id: 103,
            image: ThreeSellers,
            title: "Knitted Polo T-Shirt",
            price: "₹999",
            originalPrice: "₹1,299",
            discount: "38% OFF",
            rating: "4.4",
            reviews: "60",
            brand: "Polo"
        },
        {
            id: 104,
            image: FourSellers,
            title: "Knitted Polo T-Shirt",
            price: "₹999",
            originalPrice: "₹1,299",
            discount: "38% OFF",
            rating: "4.4",
            reviews: "60",
            brand: "Polo"
        },
    ];

    // ✅ 1. useCallback use karein - function memoize ho jayega
    const updateWishlistStatus = useCallback(() => {
        const status = {};
        Arrivals.forEach(product => {
            status[product.id] = isInWishlist(product.id);
        });
        setWishlistStatus(status);
    }, [Arrivals]); // ✅ Dependency: Arrivals

    // ✅ 2. useEffect - sirf event listener setup ke liye
    useEffect(() => {
        // ✅ Initial load - ek baar update karo
        updateWishlistStatus();

        // ✅ Event listener - jab wishlist update ho toh status refresh karo
        const handleWishlistUpdate = () => {
            updateWishlistStatus();
        };
        
        window.addEventListener('wishlistUpdated', handleWishlistUpdate);
        
        // ✅ Cleanup
        return () => {
            window.removeEventListener('wishlistUpdated', handleWishlistUpdate);
        };
    }, [updateWishlistStatus]); // ✅ Dependency: updateWishlistStatus

    // ✅ Wishlist click handler
    const handleWishlistClick = (e, product) => {
        e.preventDefault();
        e.stopPropagation();
        
        const priceNum = parseInt(product.price.replace('₹', ''));
        const originalPriceNum = parseInt(product.originalPrice.replace('₹', ''));
        
        const productToSave = {
            id: product.id,
            name: product.title,
            price: originalPriceNum,
            offerPrice: priceNum,
            image: product.image,
            brand: product.brand || "Brand",
            category: "Best Seller"
        };
        
        const newStatus = toggleWishlist(productToSave);
        // ✅ Optimistic update - instantly UI update karo
        setWishlistStatus(prev => ({ ...prev, [product.id]: newStatus }));
    };

    const cardData = [
        {
            id: 1,
            tag: "Summer Collection",
            title: <>Fresh Styles.<br />New Vibes.</>,
            description: "Discover our latest summer arrivals.",
            buttonText: "EXPLORE NOW",
            image: FirstCard,
            altText: "Summer Collection"
        },
        {
            id: 2,
            tag: "Accessories",
            title: "The Finishing Touch.",
            description: "Complete your look with our trending accessories.",
            buttonText: "SHOP ACCESSORIES",
            image: SecondCard,
            altText: "Accessories"
        }
    ];

    return (
        <div>
            <div className='Sellers mx-4 my-3'>
                <div className="flex items-center justify-between !px-5 !py-1">
                    <h3 className="text-[32px] font-bold text-black">
                        Best Sellers
                    </h3>

                    <div className="flex items-center gap-2 cursor-pointer text-black">
                        <span className="text-[16px] font-medium">View All</span>
                        <ArrowForwardIcon sx={{ fontSize: 20 }} />
                    </div>
                </div>
                
                <div className="Sellers-row flex gap-4 overflow-x-auto py-3 px-3 mx-3">
                    {Arrivals.map((item) => (
                        <div className='main-card flex-shrink-0 w-[270px]' key={item.id}>
                            <div className='card relative flex flex-col gap-3 rounded-[14px] border border-[#ececec] bg-white p-3 !shadow-[0_2px_12px_rgba(0,0,0,0.06)]'>
                                <div className="img-sec relative w-full overflow-hidden rounded-[14px] bg-[#f3f3f3]">
                                    <img src={item.image} alt={item.title} className="w-full h-auto" />
                                    {item.badge && (
                                        <span className="absolute left-3 top-3 rounded-md bg-[#0c7a33] px-3 py-[4px] text-[12px] font-bold tracking-wide text-white shadow-sm">
                                            {item.badge}
                                        </span>
                                    )}
                                </div>
                                
                                <div className='text-sec'>
                                    <button 
                                        onClick={(e) => handleWishlistClick(e, item)}
                                        className="absolute right-6 top-5 text-[#222] transition hover:text-red-500 z-10"
                                    >
                                        {wishlistStatus[item.id] ? (
                                            <FavoriteOutlinedIcon style={{ width: "24px", height: "24px", color: "#ef4444" }} />
                                        ) : (
                                            <FavoriteBorderOutlinedIcon style={{ width: "24px", height: "24px" }} />
                                        )}
                                    </button>

                                    <h2 className="!text-[18px] font-medium leading-snug text-[#222222] mb-2">
                                        {item.title}
                                    </h2>
                                    
                                    <div className="flex flex-wrap items-baseline gap-2 mb-2">
                                        <span className="text-[18px] font-semibold">
                                            {item.price}
                                        </span>
                                        <del className="text-[14px] text-[#9a9a9a] !line-through">
                                            {item.originalPrice}
                                        </del>
                                        <span className="text-[14px] font-medium text-[#ef6b63]">
                                            {item.discount}
                                        </span>
                                    </div>
                                    
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

            <div className="w-full px-4 py-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {cardData.map((card) => (
                        <div key={card.id} className="relative rounded-[20px] overflow-hidden aspect-[16/7] w-full min-h-[250px] md:min-h-[320px]">
                            <img
                                src={card.image}
                                alt={card.altText}
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 flex flex-col justify-center items-start !pl-8 md:pl-12 pr-6 max-w-[55%]">
                                <p className="text-[#1A1A1A] !text-[16px] md:text-sm font-medium tracking-wider !mb-2">
                                    {card.tag}
                                </p>
                                <h2 className="text-2xl md:text-4xl lg:text-[40px] font-serif font-semibold text-[#1A1A1A] leading-tight mb-3">
                                    {card.title}
                                </h2>
                                <p className="text-gray-600 text-xs md:text-sm mb-6 hidden sm:block">
                                    {card.description}
                                </p>
                                <button className="bg-[#111111] !rounded-[10px] text-white !px-5 !py-2.5 rounded-md text-xs font-semibold tracking-wider uppercase hover:bg-black transition-colors">
                                    {card.buttonText}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Sellers;