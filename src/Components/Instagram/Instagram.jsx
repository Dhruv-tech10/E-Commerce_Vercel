

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
        <div className="w-full py-6">
            <h1 className='flex items-center !text-[30px] mt-4 !font-semibold !mb-6 !ml-6'>
                What Our Customers Say
            </h1>
            
            <div className="main-card mb-3 mt-3 px-4">
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
                    className="pb-12"
                >
                    {reviewsData.map((item) => (
                        <SwiperSlide key={item.id}>
                                <div className="w-full bg-white border border-[#E5E7EB] rounded-[16px] p-5 md:p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">

                                    {/* Review Text */}
                                    <p className="text-[#1A1A1A] text-sm md:text-base font-normal leading-relaxed mb-2 min-h-[70px]">
                                        "{item.review}"
                                    </p>

                                    {/* User Info Section */}
                                    <div className="flex items-center gap-3">
                                        {/* Avatar Image */}
                                        <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                                            <img
                                                src={item.avatar}
                                                alt={item.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        {/* Name and Stars */}
                                        <div className="flex flex-col gap-1">
                                            <h4 className="text-sm md:text-base font-semibold text-[#111111] leading-none">
                                                {item.name}
                                            </h4>

                                            {/* Star Rating */}
                                            <div className="flex items-center gap-0.5">
                                                {[...Array(5)].map((_, index) => (
                                                    <StarIcon 
                                                        key={index}
                                                        className={`w-3.5 h-3.5 ${index < item.rating ? 'text-[#FBBF24]' : 'text-gray-300'}`}
                                                        style={{ fontSize: '14px' }}
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

            {/* Custom CSS for pagination dots */}
            <style jsx>{`
                .swiper-pagination {
                    position: relative !important;
                    bottom: 0 !important;
                    margin-top: 20px;
                }
                .swiper-pagination-bullet {
                    width: 10px;
                    height: 10px;
                    background: #D1D5DB;
                    opacity: 1;
                    transition: all 0.3s ease;
                }
                .swiper-pagination-bullet-active {
                    background: #000000;
                    width: 30px;
                    border-radius: 5px;
                }
            `}</style>
        </div>

            {/* Newsletter Section */}
            <div className="bg-[#fff3ee] rounded-lg mb-4 !mx-17 p-4 md:p-6 mb-6 md:mb-8 flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4">
                <div className="text-center md:text-left">
                    <h3 className="text-base md:text-lg font-bold text-gray-900">Join Our Newsletter</h3>
                    <p className="text-gray-600 text-xs md:text-sm">Get updates on new arrivals, offers & more.</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                    <input type="email" placeholder="Enter your email" className="w-full sm:w-auto flex-1 md:w-64 px-3 md:px-4 py-2 border !border-[#1E2D42] rounded-lg text-sm focus:outline-none focus:border-[#1E2D42]" />
                    <button className="bg-[#1E2D42] text-white px-4 md:px-6 py-2 rounded-lg  transition text-sm font-semibold">SUBSCRIBE</button>
                </div>
            </div>
            <div className="flex mb-2 mx-4 items-center justify-between px-10 py-6">
                <h3 className="text-[32px] font-bold text-black">
                    Follow Us On Instagram
                </h3>

                <div className="flex items-center gap-2 cursor-pointer text-black">
                    <span className="text-[16px] font-medium">View All</span>
                    <ArrowForwardIcon sx={{ fontSize: 20 }} />
                </div>
            </div>
            <div className='main-img flex gap-3 mx-4 mb-4'>
                {instagramImages.map((img, index) => (
                    <img
                        key={index}
                        src={img}
                        alt={`Instagram ${index + 1}`}
                        className="w-40 rounded-md cursor-pointer transition-transform duration-300 hover:scale-105"
                    />
                ))}
            </div>
</>
    );
};

export default Instagram;