import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import LoopOutlinedIcon from '@mui/icons-material/LoopOutlined';
import HeadsetMicOutlinedIcon from '@mui/icons-material/HeadsetMicOutlined';
import FirstCategory from '../../assets/Img/Category/FirstCategory.png';
import SecondCategory from '../../assets/Img/Category/SecondCategory.png';
import ThreeCategory from '../../assets/Img/Category/ThreeCategory.png';
import FourCategory from '../../assets/Img/Category/FourCategory.png';
import FiveCategory from '../../assets/Img/Category/FiveCategory.png';
import SixCategory from '../../assets/Img/Category/SixCategory.png';
import SevenCategory from '../../assets/Img/Category/SevenCategory.png';
import EightCategory from '../../assets/Img/Category/EightCategory.png';
import NineCategory from '../../assets/Img/Category/NineCategory.png';
import TenCategory from '../../assets/Img/Category/TenCategory.png';
import FirstProduct from '../../assets/Img/Product/FirstProduct.png';
import SecondProduct from '../../assets/Img/Product/SecondProduct.png';
import ThreeProduct from '../../assets/Img/Product/ThreeProduct.png';
import FourProduct from '../../assets/Img/Product/FourProduct.png';
import FiveProduct from '../../assets/Img/Product/FiveProduct.png';
import SixProduct from '../../assets/Img/Product/SixProduct.png'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import StarIcon from '@mui/icons-material/Star';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { isInWishlist, toggleWishlist } from "../WishlistUtils";
import { Navigation, Autoplay } from "swiper/modules";

const Category = () => {
    const navigate = useNavigate();
    const [wishlistStatus, setWishlistStatus] = useState({});

    const products = [
        {
            id: 1,
            title: "Men Pure Cotton Shirt",
            price: "₹799",
            originalPrice: "₹1,299",
            discount: "38% OFF",
            rating: "4.3",
            reviews: "120",
            badge: "NEW",
            badgeColor: "bg-[#0c7a33]",
            image: FirstProduct,
            brand: "Roadster"
        },
        {
            id: 2,
            title: "Floral Midi Dress",
            price: "₹1,499",
            originalPrice: "₹1,999",
            discount: "25% OFF",
            rating: "4.6",
            reviews: "89",
            badge: "-25%",
            badgeColor: "bg-[#ef6b63]",
            image: SecondProduct,
            brand: "Zara"
        },
        {
            id: 3,
            title: "Classic White Sneakers",
            price: "₹1,299",
            originalPrice: "₹1,799",
            discount: "28% OFF",
            rating: "4.4",
            reviews: "150",
            badge: "NEW",
            badgeColor: "bg-[#0c7a33]",
            image: ThreeProduct,
            brand: "Nike"
        },
        {
            id: 4,
            title: "Casual Denim Jacket",
            price: "₹2,499",
            originalPrice: "₹3,999",
            discount: "38% OFF",
            rating: "4.5",
            reviews: "200",
            badge: "NEW",
            badgeColor: "bg-[#0c7a33]",
            image: FourProduct,
            brand: "Levis"
        },
        {
            id: 5,
            title: "Slim Fit Jeans",
            price: "₹1,299",
            originalPrice: "₹2,299",
            discount: "43% OFF",
            rating: "4.3",
            reviews: "180",
            badge: "NEW",
            badgeColor: "bg-[#0c7a33]",
            image: FiveProduct,
            brand: "Flying Machine"
        },
        {
            id: 6,
            title: "Woolen Sweater",
            price: "₹1,899",
            originalPrice: "₹3,499",
            discount: "46% OFF",
            rating: "4.6",
            reviews: "95",
            badge: "NEW",
            badgeColor: "bg-[#0c7a33]",
            image: SixProduct,
            brand: "US Polo"
        },
    ];

    useEffect(() => {
        const status = {};
        products.forEach(product => {
            status[product.id] = isInWishlist(product.id);
        });
        setWishlistStatus(status);

        const handleUpdate = () => {
            const newStatus = {};
            products.forEach(product => {
                newStatus[product.id] = isInWishlist(product.id);
            });
            setWishlistStatus(newStatus);
        };

        window.addEventListener('wishlistUpdated', handleUpdate);
        return () => window.removeEventListener('wishlistUpdated', handleUpdate);
    }, []);

    const handleWishlistClick = (e, product) => {
        e.preventDefault();
        e.stopPropagation();

        const priceNum = parseInt(product.price.replace('₹', ''));

        const productToSave = {
            id: product.id,
            name: product.title,
            price: parseInt(product.originalPrice.replace('₹', '')),
            offerPrice: priceNum,
            image: product.image,
            brand: product.brand || "Brand",
            category: "Featured"
        };

        const newStatus = toggleWishlist(productToSave);
        setWishlistStatus(prev => ({ ...prev, [product.id]: newStatus }));

        const toastEvent = new CustomEvent('showToast', {
            detail: {
                message: newStatus ? `${product.title} added to wishlist!` : `${product.title} removed from wishlist!`,
                type: newStatus ? 'success' : 'info'
            }
        });
        window.dispatchEvent(toastEvent);
    };

    // ✅ UPDATED: Category click handler - Sabhi categories ke liye
    // ✅ UPDATED: Category click handler - Sabhi categories ke liye
const handleCategoryClick = (categoryName) => {
    const categoryMap = {
        'Men': '/men-collection',
        'Women': '/women-collection',    // ✅ Women ka route
        'Kids': '/kids-collection',
        'Footwear': '/footwear-collection',
        'Bags': '/bags-collection',
        'Watches': '/watches-collection',
        'Accessories': '/accessories-collection',
        'Home & Living': '/home-living-collection',
        'Beauty': '/beauty-collection',
        'Grocery': '/grocery-collection'  // ✅ Grocery નું નવું પેજ અહીં ઉમેરી દીધું છે
    };

    const path = categoryMap[categoryName];
    if (path) {
        navigate(path);
    } else {
        navigate(`/category/${categoryName.toLowerCase()}`);
    }
};

    const categoriesData = [
        { id: 1, name: "Men", image: FirstCategory },
        { id: 2, name: "Women", image: SecondCategory },
        { id: 3, name: "Kids", image: ThreeCategory },
        { id: 4, name: "Footwear", image: FourCategory },
        { id: 5, name: "Bags", image: FiveCategory },
        { id: 6, name: "Watches", image: SixCategory },
        { id: 7, name: "Accessories", image: SevenCategory },
        { id: 8, name: "Home & Living", image: EightCategory },
        { id: 9, name: "Beauty", image: NineCategory },
        { id: 10, name: "Grocery", image: TenCategory }
    ];

    const featuresData = [
        {
            id: 1,
            icon: LocalShippingOutlinedIcon,
            title: "Free Shipping",
            subtitle: "On orders above ₹999"
        },
        {
            id: 2,
            icon: VerifiedUserOutlinedIcon,
            title: "Secure Payment",
            subtitle: "Safe & trusted payments"
        },
        {
            id: 3,
            icon: LoopOutlinedIcon,
            title: "Easy Returns",
            subtitle: "3 days easy return"
        },
        {
            id: 4,
            icon: HeadsetMicOutlinedIcon,
            title: "24/7 Support",
            subtitle: "We're here to help"
        }
    ];

    return (
        <>
            <div className='grid grid-cols-2 lg:flex lg:justify-between gap-4 px-3 py-3 bg-gray-50 md:bg-transparent'>
                {featuresData.map((feature) => (
                    <div key={feature.id} className="flex items-center gap-3 px-4 py-3 w-fit bg-white">
                        <feature.icon className="text-black w-6 h-6 !text-[47px] !font-normal" />
                        <div className="leading-tight">
                            <p className="text-[17px] font-normal text-black mb-1">{feature.title}</p>
                            <p className="text-[15px] text-gray-500 mb-1">{feature.subtitle}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className='Category mx-4 my-8'>
                <div className='title-category text-center'>
                    <h3 className='!font-bold !text-[32px] !mt-3 !mb-6'>Shop By Category</h3>
                </div>
                <div className='main-Category grid grid-cols-2 sm:grid-cols-5 xl:grid-cols-10 justify-center justify-items-center !gap-[10px] sm:gap-[20px] md:gap-[30px] w-full overflow-hidden mx-auto max-w-[1400px] px-3 md:px-8 py-3'>
                    {categoriesData.map((category) => (
                        <div
                            className='img-Category text-center cursor-pointer hover:scale-105 transition-transform duration-300 w-full max-w-[110px] sm:max-w-[130px] md:max-w-[150px] lg:max-w-[160px]'
                            key={category.id}
                            onClick={() => handleCategoryClick(category.name)}
                        >
                            <img
                                src={category.image}
                                className='rounded-full w-full aspect-square object-cover'
                                alt={category.name}
                                loading="lazy"
                            />
                            <h5 className="text-[12px] sm:text-[14px] lg:text-[16px] font-medium mt-3 text-gray-800 truncate px-1">
                                {category.name}
                            </h5>
                        </div>
                    ))}
                </div>
            </div>
            <div className='product mx-4 my-6'>
                <div className="flex items-center justify-between px-5 py-1">
                    <h3 className="text-[32px] font-bold text-black">
                        Featured Products
                    </h3>
                </div>

                <div className="main-card mb-3 mt-3 px-4 relative w-full overflow-hidden">
                    <Swiper
                        modules={[Navigation, Autoplay]}
                        navigation={{
                            nextEl: '.swiper-button-next-custom',
                            prevEl: '.swiper-button-prev-custom',
                        }}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true,
                        }}
                        loop={true}
                        spaceBetween={16}
                        slidesPerView={1}
                        breakpoints={{
                            320: { slidesPerView: 1, spaceBetween: 15 },
                            640: { slidesPerView: 1.5, spaceBetween: 15 },
                            768: { slidesPerView: 2, spaceBetween: 16 },   // Tablets
                            1024: { slidesPerView: 3, spaceBetween: 14 },   // 1024px Laptops
                            1280: { slidesPerView: 3, spaceBetween: 20 },   // Medium Desktops
                            1600: { slidesPerView: 4, spaceBetween: 24 },
                            2560: { slidesPerView: 5, spaceBetween: 25 },
                        }}
                        className="w-full"
                    >
                        {products.map((product) => (
                            <SwiperSlide key={product.id} className="!h-auto flex">
                                <div className="w-full flex justify-center p-1 h-full">

                                    {/* Main Card */}
                                    <div className="relative flex flex-col lg:flex-row w-full max-w-[400px] md:max-w-[340px] lg:max-w-[440px] xl:max-w-[520px] h-full min-h-[350px] lg:min-h-[200px] justify-between lg:justify-start items-center gap-3 lg:gap-4 rounded-[22px] border border-[#ececec] bg-white p-3 lg:p-4 shadow-[0_2px_12px_rgba(0,0,0,0.06)] transition-all duration-200">

                                        {/* Left Side: Product Image & Badge */}
                                        <div className="relative h-[170px] lg:h-[170px] w-full lg:w-[110px] xl:w-[140px] flex-shrink-0 overflow-hidden rounded-[14px] bg-[#f3f3f3]">
                                            <img
                                                src={product.image}
                                                alt={product.title}
                                                className="h-full w-full object-cover"
                                            />
                                            <span className="absolute left-2 top-2 rounded-md bg-[#0c7a33] px-2 py-[3px] text-[10px] lg:text-[11px] font-bold tracking-wide text-white shadow-sm">
                                                {product.badge}
                                            </span>
                                        </div>

                                        {/* Right Side: Product Details */}
                                        <div className="flex flex-1 flex-col w-full pr-1 lg:pr-2 text-left relative h-full flex-grow overflow-hidden">

                                            {/* Wishlist Button */}
                                            <button
                                                onClick={(e) => handleWishlistClick(e, product)}
                                                className="absolute right-0 top-0 text-[#222] transition hover:text-red-500 z-10"
                                            >
                                                {wishlistStatus[product.id] ? (
                                                    <FavoriteOutlinedIcon sx={{ fontSize: 20, color: "#ef4444" }} />
                                                ) : (
                                                    <FavoriteBorderOutlinedIcon sx={{ fontSize: 20 }} />
                                                )}
                                            </button>

                                            {/* Top Content: Title & Price */}
                                            <div className="w-full">
                                                {/* Product Title - અહીં max-w અને break-words એડ કર્યું છે જેથી ટેક્સ્ટ બહાર ના જાય */}
                                                <h2 className="!text-[24px] !lg:text-[14px] !xl:text-[18px] font-semibold leading-tight text-[#222222] mt-2 lg:mt-0 max-w-[calc(100%-24px)] block break-words line-clamp-2 min-h-[38px] lg:min-h-[40px]">
                                                    {product.title}
                                                </h2>

                                                {/* Price Section */}
                                                <div className="flex flex-wrap items-baseline gap-1.5 mb-1.5">
                                                    <span className="text-[15px] lg:text-[14px] xl:text-[17px] font-bold text-[#222]">
                                                        {product.price}
                                                    </span>
                                                    <del className="text-[12px] text-[#9a9a9a] line-through">
                                                        {product.originalPrice}
                                                    </del>
                                                    <span className="text-[11px] font-medium text-[#ef6b63]">
                                                        {product.discount}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Rating Section */}
                                            <div className="flex items-center gap-1.5 mt-1">
                                                <StarIcon sx={{ fontSize: 18 }} className='text-[#f4b400]' />
                                                <span className="text-[14px] lg:text-[13px] xl:text-[15px] font-medium text-[#444]">
                                                    {product.rating}
                                                </span>
                                                <span className="text-[14px] lg:text-[13px] xl:text-[15px] text-[#8a8a8a]">
                                                    ({product.reviews})
                                                </span>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Custom Navigation Buttons */}
                    <button className="swiper-button-prev-custom hidden sm:flex absolute left-1 top-1/2 -translate-y-1/2 z-10 w-9 h-9 items-center justify-center bg-white !rounded-full shadow-lg border border-gray-200 -ml-4">
                        <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button className="swiper-button-next-custom hidden sm:flex absolute right-1 top-1/2 -translate-y-1/2 z-10 w-9 h-9 items-center justify-center bg-white !rounded-full shadow-lg border border-gray-200 -mr-4">
                        <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>
        </>
    )
}

export default Category;