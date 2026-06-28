import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FirstInst from '../../assets/Img/Instagram/FirstInst.png';
import SecondInst from '../../assets/Img/Instagram/SecondInst.png';
import ThreeInst from '../../assets/Img/Instagram/ThreeInst.png';
import FourInst from '../../assets/Img/Instagram/FourInst.png';
import FiveInst from '../../assets/Img/Instagram/FiveInst.png';
import SixInst from '../../assets/Img/Instagram/SixInst.png';
import SevenInst from '../../assets/Img/Instagram/SevenInst.png';
import StarIcon from '@mui/icons-material/Star';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const Instagram = () => {
    const reviewsData = [
        {
            id: 1,
            name: "Rahul Mehta",
            review: "Amazing collection and super smooth shopping experience. Highly recommend!",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
            rating: 5
        },
        {
            id: 2,
            name: "Anjali Patel",
            review: "The quality of the clothes is top-notch. Will definitely buy again!",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
            rating: 5
        },
        {
            id: 3,
            name: "Vikram Shah",
            review: "Fast delivery and great customer support. Perfect fit!",
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop",
            rating: 4
        },
        {
            id: 4,
            name: "Priya Sharma",
            review: "Beautiful designs and excellent fabric quality. My new favorite store!",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop",
            rating: 5
        },
        {
            id: 5,
            name: "Arjun Singh",
            review: "Great prices and quick delivery. The products match the description perfectly.",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop",
            rating: 4
        },
        {
            id: 6,
            name: "Sneha Reddy",
            review: "Love the variety and quality. Customer service is very responsive!",
            avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?q=80&w=150&auto=format&fit=crop",
            rating: 5
        }
    ];

    const instagramImages = [
        FirstInst,
        SecondInst,
        ThreeInst,
        FourInst,
        FiveInst,
        SixInst,
        SevenInst,
    ];

    return (
        <>
            {/* Reviews Section */}
            <div className="w-full py-6">
                <h1 className='flex items-center text-[30px] mt-4 font-semibold mb-6 px-4 md:px-8 lg:px-12'>
                    What Our Customers Say
                </h1>
                
                <div className="main-card mb-3 mt-3 px-4 md:px-8 lg:px-12">
                    <Swiper
                        modules={[Autoplay, Pagination]}
                        pagination={{
                            clickable: true,
                            dynamicBullets: false,
                        }}
                        autoplay={{
                            delay: 2000,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true,
                        }}
                        loop={true}
                        spaceBetween={20}
                        slidesPerView={3}
                        breakpoints={{
                            320: { slidesPerView: 1, spaceBetween: 0 },
                            768: { slidesPerView: 2, spaceBetween: 20 },
                            1024: { slidesPerView: 3, spaceBetween: 20 },
                        }}
                        className="pb-12 [&_.swiper-pagination]:relative [&_.swiper-pagination]:mt-5 [&_.swiper-pagination-bullet]:w-2.5 [&_.swiper-pagination-bullet]:h-2.5 [&_.swiper-pagination-bullet]:bg-gray-300 [&_.swiper-pagination-bullet]:opacity-100 [&_.swiper-pagination-bullet-active]:bg-black [&_.swiper-pagination-bullet-active]:w-[30px] [&_.swiper-pagination-bullet-active]:rounded-[5px] [&_.swiper-pagination-bullet]:transition-all [&_.swiper-pagination-bullet]:duration-300"
                    >
                        {reviewsData.map((item) => (
                            <SwiperSlide key={item.id}>
                                <div className="w-full bg-white border border-gray-200 rounded-[16px] p-5 md:p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                                    <p className="text-[#1A1A1A] text-sm md:text-base font-normal leading-relaxed mb-2 min-h-[70px]">
                                        "{item.review}"
                                    </p>

                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                                            <img
                                                src={item.avatar}
                                                alt={item.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        <div className="flex flex-col gap-1">
                                            <h4 className="text-sm md:text-base font-semibold text-[#111111] leading-none">
                                                {item.name}
                                            </h4>

                                            <div className="flex items-center gap-0.5">
                                                {[...Array(5)].map((_, index) => (
                                                    <StarIcon 
                                                        key={index}
                                                        className={`w-3.5 h-3.5 ${index < item.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                                        sx={{ fontSize: 14 }}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>

            {/* Newsletter Section */}
            <div className="bg-[#fff3ee] rounded-lg mb-6 mx-4 md:mx-8 lg:mx-12 p-4 md:p-6 flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4">
                <div className="text-center md:text-left">
                    <h3 className="text-base md:text-lg font-bold text-gray-900">Join Our Newsletter</h3>
                    <p className="text-gray-600 text-xs md:text-sm">Get updates on new arrivals, offers & more.</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                    <input 
                        type="email" 
                        placeholder="Enter your email" 
                        className="w-full sm:w-auto flex-1 md:w-64 px-3 md:px-4 py-2 border border-[#1E2D42] rounded-lg text-sm focus:outline-none focus:border-[#1E2D42]" 
                    />
                    <button className="bg-[#1E2D42] text-white px-4 md:px-6 py-2 rounded-lg transition text-sm font-semibold hover:bg-[#152232]">
                        SUBSCRIBE
                    </button>
                </div>
            </div>

            {/* Instagram Section (Full Width Layout Fix) */}
            <div className="w-full px-4 md:px-8 lg:px-12 pt-4">
                <h3 className="text-2xl md:text-[32px] font-bold text-black tracking-wide mb-4">
                    Follow Us On Instagram
                </h3>
            </div>

            {/* Instagram Images Grid Container */}
            <div className="w-full px-4 md:px-8 lg:px-12 mb-8">
                <div className="main-img flex gap-4 overflow-x-auto select-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    {instagramImages.map((img, index) => (
                        <div 
                            key={index} 
                            className="w-[140px] h-[140px] sm:w-[150px] sm:h-[150px] md:w-[170px] md:h-[170px] lg:w-[185px] lg:h-[185px] flex-shrink-0 rounded-[12px] overflow-hidden cursor-pointer"
                        >
                            <img
                                src={img}
                                alt={`Instagram ${index + 1}`}
                                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Instagram;