import { useState, useEffect } from 'react';
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

    const categoriesData = [
        { id: 1, name: "Men", image: FirstCategory },
        { id: 2, name: "Women", image: SecondCategory },
        { id: 3, name: "Kids", image: ThreeCategory },
        { id: 4, name: "Footwear", image: FourCategory },
        { id: 5, name: "Bags", image: FiveCategory },
        { id: 6, name: "Watches", image: SixCategory },
        { id: 7, name: "Accessories", image: SevenCategory },
        { id: 8, name: "Home & Living", image: EightCategory },
        { id: 9, name: "Beauty", image: NineCategory }
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

            <div className='Category mx-4 my-4'>
                <div className='title-category text-center'>
                    <h3 className='!font-bold !text-[32px] mt-3 mb-4'>Shop By Category</h3>
                </div>

                <div className='main-Category flex justify-center gap-x-[20px] '>
                    {categoriesData.map((category) => (
                        <div className='img-Category !w-[15%] text-center' key={category.id}>
                            <img src={category.image} className='rounded-[30px] w-full' alt="" />
                            <h5 className="!text-[19px] font-medium">{category.name}</h5>
                        </div>
                    ))}
                </div>
            </div>


            <div className='product mx-4 my-6'>
                {/* Header Title */}
                <div className="flex items-center justify-between px-5 py-1">
                    <h3 className="text-[32px] font-bold text-black">
                        Featured Products
                    </h3>

                    {/* <div className="flex items-center gap-2 cursor-pointer text-black">
                    <span className="text-[16px] font-medium">View All</span>
                    <ArrowForwardIcon sx={{ fontSize: 20 }} />
                </div> */}
                </div>

                {/* Swiper Slider with Product Map */}
                <div className="main-card mb-3 mt-3 px-4 relative">
                    <Swiper
                        modules={[Navigation, Autoplay]}
                        navigation={{
                            nextEl: '.swiper-button-next-custom',
                            prevEl: '.swiper-button-prev-custom',
                        }}
                        autoplay={{
                            // delay: 3000,
                            // disableOnInteraction: false,
                            // pauseOnMouseEnter: true,
                        }}
                        loop={true}
                        spaceBetween={20}
                        slidesPerView={3}
                        breakpoints={{
                            320: { slidesPerView: 1 },
                            768: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 },
                        }}
                    >
                        {products.map((product) => (
                            <SwiperSlide key={product.id}>
                                <div className="w-full flex justify-center">
                                    <div className="relative flex w-full max-w-[480px] min-h-[250px] items-center gap-3 rounded-[22px] border border-[#ececec] bg-white p-3 shadow-[0_2px_12px_rgba(0,0,0,0.06)] ">

                                        {/* Left Side: Product Image & Badge */}
                                        <div className="relative h-[220px] w-[140px] flex-shrink-0 overflow-hidden rounded-[14px] bg-[#f3f3f3]">
                                            <img
                                                src={product.image}
                                                alt={product.title}
                                                className="h-full w-full object-cover"
                                            />
                                            <span className="absolute left-2 top-2 rounded-md bg-[#0c7a33] px-3 py-[4px] text-[12px] font-bold tracking-wide text-white shadow-sm">
                                                {product.badge}
                                            </span>
                                        </div>

                                        {/* Right Side: Product Details */}
                                        <div className="flex flex-1 flex-col justify-center pr-10">

                                            <button
                                                onClick={(e) => handleWishlistClick(e, product)}
                                                className="absolute right-5 top-5 text-[#222] transition hover:text-red-500 z-10"
                                            >
                                                {wishlistStatus[product.id] ? (
                                                    <FavoriteOutlinedIcon style={{ width: "24px", height: "24px", color: "#ef4444" }} />
                                                ) : (
                                                    <FavoriteBorderOutlinedIcon style={{ width: "24px", height: "24px" }} />
                                                )}
                                            </button>
                                            {/* Product Title */}
                                            <h2 className="!text-[20px] font-medium leading-snug text-[#222222] mb-2">
                                                {product.title}
                                            </h2>

                                            {/* Price Section */}
                                            <div className="flex flex-wrap items-baseline gap-2 mb-2">
                                                <span className="text-[18px] font-semibold">
                                                    {product.price}
                                                </span>
                                                <del className="text-[14px] text-[#9a9a9a] line-through">
                                                    {product.originalPrice}
                                                </del>
                                                <span className="text-[14px] font-medium text-[#ef6b63]">
                                                    {product.discount}
                                                </span>
                                            </div>

                                            {/* Rating Section */}
                                            <div className="flex items-center gap-1.5">
                                                <StarIcon style={{ width: "18px", height: "18px" }} className='text-[#f4b400]' />
                                                <span className="text-[15px] font-medium text-[#444]">
                                                    {product.rating}
                                                </span>
                                                <span className="text-[15px] text-[#8a8a8a]">
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
                    <button className="swiper-button-prev-custom absolute left-1 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-white !rounded-full shadow-lg hover:bg-gray-50 hover:shadow-xl transition-all duration-200 border border-gray-200 -ml-4">
                        <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button className="swiper-button-next-custom absolute right-1 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-white !rounded-full shadow-lg hover:bg-gray-50 hover:shadow-xl transition-all duration-200 border border-gray-200 -mr-4">
                        <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>
        </>
    )
}

export default Category;


