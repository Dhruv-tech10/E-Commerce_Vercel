// src/Components/Sellers/Sellers.jsx
import { useState, useEffect, useCallback, useMemo } from 'react';
import StarIcon from '@mui/icons-material/Star';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import FirstSellers from '../../assets/Img/Sellers/FirstSellers.png';
import SecondSellers from '../../assets/Img/Sellers/SecondSellers.png';
import ThreeSellers from '../../assets/Img/Sellers/ThreeSellers.png';
import FourSellers from '../../assets/Img/Sellers/FourSellers.png';
import FirstCard from '../../assets/Img/CardImg/FirstCard.png';
import SecondCard from '../../assets/Img/CardImg/SecondCard.png';
import { isInWishlist, toggleWishlist } from '../WishlistUtils';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
const Sellers = () => {
    const [wishlistStatus, setWishlistStatus] = useState({});

    // ✅ MOVE Arrivals OUTSIDE component or use useMemo
    // Option 1: Move outside component (Recommended)
    // Option 2: Use useMemo
    const Arrivals = useMemo(() => [
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
        {
            id: 105,
            image: FourSellers,
            title: "Knitted Polo T-Shirt",
            price: "₹999",
            originalPrice: "₹1,299",
            discount: "38% OFF",
            rating: "4.4",
            reviews: "60",
            brand: "Polo"
        },
        {
            id: 106,
            image: FourSellers,
            title: "Knitted Polo T-Shirt",
            price: "₹999",
            originalPrice: "₹1,299",
            discount: "38% OFF",
            rating: "4.4",
            reviews: "60",
            brand: "Polo"
        },
        {
            id: 107,
            image: FourSellers,
            title: "Knitted Polo T-Shirt",
            price: "₹999",
            originalPrice: "₹1,299",
            discount: "38% OFF",
            rating: "4.4",
            reviews: "60",
            brand: "Polo"
        },
        {
            id: 108,
            image: FourSellers,
            title: "Knitted Polo T-Shirt",
            price: "₹999",
            originalPrice: "₹1,299",
            discount: "38% OFF",
            rating: "4.4",
            reviews: "60",
            brand: "Polo"
        },
    ], []); // ✅ Empty dependency array - created once

    // ✅ useCallback with proper dependencies
    const updateWishlistStatus = useCallback(() => {
        const status = {};
        Arrivals.forEach(product => {
            status[product.id] = isInWishlist(product.id);
        });
        setWishlistStatus(status);
    }, [Arrivals]); // ✅ Arrivals is stable now

    // ✅ useEffect with proper dependencies
    useEffect(() => {
        // Initial load - ek baar update karo
        updateWishlistStatus();

        // Event listener - jab wishlist update ho toh status refresh karo
        const handleWishlistUpdate = () => {
            updateWishlistStatus();
        };

        window.addEventListener('wishlistUpdated', handleWishlistUpdate);

        // Cleanup
        return () => {
            window.removeEventListener('wishlistUpdated', handleWishlistUpdate);
        };
    }, [updateWishlistStatus]); // ✅ updateWishlistStatus is stable now

    // Wishlist click handler
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
        // Optimistic update - instantly UI update karo
        setWishlistStatus(prev => ({ ...prev, [product.id]: newStatus }));
    };

    const cardData = useMemo(() => [
        {
            id: 1,
            tag: "Summer Collection",
            title: "Fresh Styles New Vibes.",
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
    ], []); // ✅ Memoized

    return (
        <div>
            <div className='Sellers mx-4 my-3'>
                <div className="flex items-center justify-between !px-5 !py-1">
                    <h3 className="text-[32px] font-bold text-black">
                        Best Sellers
                    </h3>
                </div>

                <div className="Sellers-container w-full py-3 px-3 md:px-12">
                    <div className="Sellers-row w-full">
                        <Swiper
                            modules={[Autoplay]}
                            spaceBetween={24}
                            slidesPerView={1}
                            loop={true}
                            autoplay={{
                                delay: 2000,
                                disableOnInteraction: false,
                            }}
                            // 🛠️ પોઈન્ટ વાળી વેલ્યુ કાઢીને પૂરા આખા નંબર સેટ કર્યા, જેથી અડધું કાર્ડ ગાયબ થઈ જશે
                            breakpoints={{
                                360: { slidesPerView: 1 },   // મોબાઈલમાં પૂરો ૧ કાર્ડ
                                540: { slidesPerView: 2 },   // સ્મોલ સ્ક્રીન પર ૨ કાર્ડ
                                768: { slidesPerView: 2 },   // ટેબ્લેટ પર ૩ કાર્ડ
                                1024: { slidesPerView: 4 },  // લેપટોપ પર ૪ કાર્ડ
                                1440: { slidesPerView: 4 },  // મોટી સ્ક્રીન પર પૂરા ૫ કાર્ડ
                                1920: { slidesPerView: 5 }   // ૨૫૬૦px અલ્ટ્રા-વાઈડ પર પણ પૂરા ૫ કાર્ડ ફિક્સ દેખાશે
                            }}
                            className="pb-4"
                        >
                            {Arrivals.map((item) => (
                                <SwiperSlide key={item.id}>
                                    <div className='main-card flex-shrink-0 w-full'>
                                        <div className='card relative flex flex-col gap-4 rounded-[16px] border border-[#ececec] bg-white p-3 shadow-[0_4px_20px_rgba(0,0,0,0.05)]'>

                                            <div className="img-sec relative w-full overflow-hidden rounded-[14px] bg-[#f3f3f3]">
                                                <img src={item.image} alt={item.title} className="w-full h-auto object-cover" />
                                                {item.badge && (
                                                    <span className="absolute left-4 top-4 rounded-md bg-[#0c7a33] px-4 py-[6px] text-[14px] font-bold tracking-wide text-white shadow-sm z-10">
                                                        {item.badge}
                                                    </span>
                                                )}
                                            </div>

                                            <div className='text-sec mt-1'>
                                                <button
                                                    onClick={(e) => handleWishlistClick(e, item)}
                                                    // 🛠️ અહીં !right-2 અને !top-1 આપવાથી ટાઈટલની બાજુમાં આવી જશે અને ઉપર-જમણેથી પ્રોપર સ્પેસ પણ મળી જશે
                                                    className="absolute !right-6 !top-6 text-[#222] transition hover:text-red-500 z-10"
                                                >
                                                    {wishlistStatus[item.id] ? (
                                                        <FavoriteOutlinedIcon style={{ width: "28px", height: "28px", color: "#ef4444" }} />
                                                    ) : (
                                                        <FavoriteBorderOutlinedIcon style={{ width: "28px", height: "28px" }} />
                                                    )}
                                                </button>

                                                <h2 className="!text-[20px] xl:text-[22px] font-semibold leading-snug text-[#222222] mb-3">
                                                    {item.title}
                                                </h2>

                                                <div className="flex flex-wrap items-baseline gap-3 mb-3">
                                                    <span className="text-[22px] xl:text-[24px] font-bold text-[#111]">
                                                        {item.price}
                                                    </span>
                                                    <del className="text-[17px] text-[#9a9a9a] line-through">
                                                        {item.originalPrice}
                                                    </del>
                                                    <span className="text-[17px] font-semibold text-[#ef6b63]">
                                                        {item.discount}
                                                    </span>
                                                </div>

                                                <div className="flex items-center gap-2 mt-2">
                                                    <StarIcon style={{ width: "22px", height: "22px" }} className='text-[#f4b400]' />
                                                    <span className="text-[16px] xl:text-[18px] font-semibold text-[#444]">
                                                        {item.rating}
                                                    </span>
                                                    <span className="text-[16px] text-[#8a8a8a]">
                                                        ({item.reviews} reviews)
                                                    </span>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </div>

            <div className="w-full px-2 sm:px-4 py-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                    {cardData.map((card) => (
                        <div
                            key={card.id}
                            className="relative rounded-[16px] sm:rounded-[20px] overflow-hidden w-full aspect-[16/10] sm:aspect-[16/9] md:aspect-[16/7] min-h-[200px] sm:min-h-[300px]"
                        >
                            {/* Background Image */}
                            <img
                                src={card.image}
                                alt={card.altText}
                                className="absolute inset-0 w-full h-full object-cover object-center"
                            />

                            {/* Content Overlay */}
                            <div className="absolute inset-0 flex flex-col justify-center items-start pl-4 sm:pl-10 md:pl-12 pr-2 max-w-[65%] sm:max-w-[55%] z-10">
                                {/* Tag */}
                                <p className="text-[#1A1A1A] text-[9px] sm:text-xs md:text-sm font-semibold tracking-wider uppercase mb-0.5 sm:mb-1">
                                    {card.tag}
                                </p>

                                {/* Title */}
                                <h2 className="text-[14px] sm:text-2xl md:text-3xl lg:text-[40px] font-serif font-bold text-[#1A1A1A] leading-tight mb-1 sm:mb-2">
                                    {card.title}
                                </h2>

                                {/* Description */}
                                <p className="text-gray-600 text-[9px] sm:text-xs md:text-sm mb-2 sm:mb-4 line-clamp-2 sm:line-clamp-none">
                                    {card.description}
                                </p>

                                {/* Button */}
                                <button className="bg-[#111111] !rounded-[4px] sm:rounded-[10px] text-white !px-4 !py-2 sm:px-5 sm:py-2.5 !text-[14px] sm:text-xs font-semibold tracking-wider uppercase hover:bg-black transition-colors">
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