
// import FacebookIcon from '@mui/icons-material/Facebook';
// import InstagramIcon from '@mui/icons-material/Instagram';
// import YouTubeIcon from '@mui/icons-material/YouTube';
// import TwitterIcon from '@mui/icons-material/Twitter';
// import { SiVisa, SiMastercard, SiPaypal, SiGooglepay, SiApplepay } from 'react-icons/si';

// // 1. Sara Data yaha alag se define kar diya (Ab koi bhi yaha se links change kar sakta hai)
// const FOOTER_DATA = {
//   shop: ["Men", "Women", "Kids", "Bags & Accessories", "Footwear", "Home & Living", "Beauty"],
//   help: ["Fidelity", "Shopping & Delivery", "Routers & Rebuilds", "Trekki Order", "Sex Guides", "Connect Us"],
//   company: ["About Us", "Cookies", "Our Sales", "Privacy Policy", "Terms & Conditions"],
//   socials: [
//     { icon: <InstagramIcon />, link: "#" },
//     { icon: <FacebookIcon />, link: "#" },
//     { icon: <TwitterIcon />, link: "#" },
//     { icon: <YouTubeIcon />, link: "#" },
//   ],
//   payments: [
//     { icon: <SiVisa className="text-blue-800" />},
//     { icon: <SiMastercard className="text-red-600" />},
//     { icon: <SiPaypal className="text-blue-600" />},
//     { icon: <SiGooglepay className="text-blue-500" />},
//     { icon: <SiApplepay className="text-gray-800" />},
//   ]
// };

// // 2. Chhota Helper Component links render karne ke liye
// const FooterColumn = ({ title, links }) => (
//   <div>
//     <h3 className="font-semibold text-gray-900 text-sm md:text-base mb-2 md:mb-3">{title}</h3>
//     <ul className="space-y-1 md:space-y-2 text-gray-600 text-[11px] md:text-sm">
//       {links.map((link) => (
//         <li key={link}><a href="#" className="hover:text-orange-600 transition">{link}</a></li>
//       ))}
//     </ul>
//   </div>
// );

// function Footer() {
//   return (
//     <footer className="bg-white border-t border-gray-200 pt-8 md:pt-12 pb-6">
//       <div className="max-w-6xl mx-auto px-3 md:px-4">
        
//         {/* Newsletter Section */}

//         {/* Footer Grid */}
//         <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8 mb-8">
          
//           {/* Brand Info */}
//           <div className="col-span-2 sm:col-span-2 md:col-span-1">
//             <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 md:mb-3">Desine</h2>
//             <p className="text-gray-600 text-xs md:text-sm mb-3 md:mb-4">Timeless fashion and lifestyle essentials, crafted for you.</p>
//             <div className="flex gap-3">
//               {FOOTER_DATA.socials.map((social, index) => (
//                 <a key={index} href={social.link} className="text-black hover:text-orange-600 transition">{social.icon}</a>
//               ))}
//             </div>
//           </div>

//           {/* Dynamic Columns */}
//           <FooterColumn title="Shop" links={FOOTER_DATA.shop}  />
//           <FooterColumn title="Help" links={FOOTER_DATA.help} />
//           <FooterColumn title="Company" links={FOOTER_DATA.company} />

//           {/* Payment Section */}
//           <div className="col-span-2 sm:col-span-2 md:col-span-1">
//             <h3 className="!font-semibold text-gray-900 text-sm md:text-base mb-2 md:mb-3">Payment Methods</h3>
//             <div className="flex flex-wrap items-center gap-3">
//               {FOOTER_DATA.payments.map((p, idx) => (
//                 <div key={idx} className="flex flex-col items-center">
//                   <span className="text-xl md:text-2xl">{p.icon}</span>
//                   {/* <span className="text-[9px] md:text-xs text-gray-500 mt-0.5">{p.name}</span> */}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Copyright */}
//         <div className="border-t border-gray-200 pt-3 md:pt-6 text-center text-gray-500 text-[10px] md:text-sm">
//           <p>© 2024 Desina. All rights reserved.</p>
//         </div>
//       </div>
//     </footer>
//   );
// }

// export default Footer;









import { FaInstagram, FaFacebookF, FaPinterestP, FaYoutube } from 'react-icons/fa';
import Visa from '../../assets/Img/Fotter/Visa.png';
import Master from '../../assets/Img/Fotter/Master.png';
import Lipi from '../../assets/Img/Fotter/Lipi.png';
import paytm from '../../assets/Img/Fotter/paytm.png';
import Rupay from '../../assets/Img/Fotter/Rupay.png';
const Footer = () => {
  return (
    // overflow-x-hidden ઉમેર્યું છે જેથી આડી સ્ક્રોલ ન આવે
    <footer className="w-full bg-[#fcfcfc] text-[#111111] font-sans !pt-3 !pb-2 !px-[6%] md:px-[8%] overflow-x-hidden">
      {/* grid-cols-2 અને md:grid-cols-5 કર્યું જેથી મોબાઇલ સ્ક્રીન પર પણ પ્રોપર સેટ થાય */}
      <div className="max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-5 gap-8">
        
        {/* બ્રાન્ડ સેક્શન */}
        <div className="flex flex-col gap-2 col-span-2 md:col-span-1">
          <h2 className="text-3xl m-0 !font-semibold tracking-wide" style={{ fontFamily: 'serif' }}>
            Velora Hub  
          </h2>
          <p className="text-[15px] mb-2 text-[#555555] leading-relaxed max-w-[220px]">
            Timeless fashion and lifestyle essentials, crafted for you.
          </p>
          <div className="flex gap-[18px] text-base">
            <a href="#" className="text-black !text-[20px]"><FaInstagram /></a>
            <a href="#" className="text-black !text-[20px]"><FaFacebookF /></a>
            <a href="#" className="text-black !text-[20px]"><FaPinterestP /></a>
            <a href="#" className="text-black !text-[20px]"><FaYoutube /></a>
          </div>
        </div>

        {/* શોપ સેક્શન */}
        <div>
          <h3 className="!text-[27px] !font-medium mb-3 !ml-7">Shop</h3>
          <ul className="flex flex-col gap-1 text-[17px] text-[#555555]">
            <li><a href="#" className="!no-underline text-black font-medium">Men</a></li>
            <li><a href="#" className="!no-underline text-black font-medium">Women</a></li>
            <li><a href="#" className="!no-underline text-black font-medium">Kids</a></li>
            <li><a href="#" className="!no-underline text-black font-medium">Bags & Accessories</a></li>
            <li><a href="#" className="!no-underline text-black font-medium">Footwear</a></li>
            <li><a href="#" className="!no-underline text-black font-medium">Home & Living</a></li>
            <li><a href="#" className="!no-underline text-black font-medium">Beauty</a></li>
          </ul>
        </div>

        {/* હેલ્પ સેક્શન */}
        <div>
          <h3 className="!text-[27px] !font-medium mb-3 !ml-7">Help</h3>
          <ul className="flex flex-col  gap-1 text-[17px] text-[#555555]">
            <li><a href="#" className="!no-underline text-black font-medium">FAQs</a></li>
            <li><a href="#" className="!no-underline text-black font-medium">Shipping & Delivery</a></li>
            <li><a href="#" className="!no-underline text-black font-medium">Returns & Refunds</a></li>
            <li><a href="#" className="!no-underline text-black font-medium">Track Order</a></li>
            <li><a href="#" className="!no-underline text-black font-medium">Size Guide</a></li>
            <li><a href="#" className="!no-underline text-black font-medium">Contact Us</a></li>
          </ul>
        </div>

        {/* કંપની સેક્શન */}
        <div>
          <h3 className="!text-[27px] !font-medium mb-3 !ml-7">Company</h3>
          <ul className="flex flex-col  gap-1 text-[17px] text-[#555555]">
            <li><a href="#" className="!no-underline text-black font-medium">About Us</a></li>
            <li><a href="#" className="!no-underline text-black font-medium">Careers</a></li>
            <li><a href="#" className="!no-underline text-black font-medium">Our Stores</a></li>
            <li><a href="#" className="!no-underline text-black font-medium">Privacy Policy</a></li>
            <li><a href="#" className="!no-underline text-black font-medium">Terms & Conditions</a></li>
          </ul>
        </div>

        {/* પેમેન્ટ મેથડ સેક્શન - અહિયાંથી મિનિમમ વિડ્થ હટાવી દીધી છે */}
        <div className="col-span-2 md:col-span-1">
          <h3 className="!text-[27px] !font-medium mb-3">Payment Methods</h3>
          <div className="flex flex-wrap gap-2">
            
            <div className="bg-white border  rounded-[4px] w-[60px] h-[40px] flex items-center justify-center p-1">
              <img src={Visa} alt="Visa" className="max-w-full max-h-full object-contain" />
            </div>
            
            <div className="bg-white border border-[#e5e5e5] rounded-[4px] w-[60px] h-[35px] flex items-center justify-center p-1">
              <img src={Master} alt="Mastercard" className="max-w-full max-h-full object-contain" />
            </div>
            
            <div className="bg-white border border-[#e5e5e5] rounded-[4px] w-[60px] h-[35px] flex items-center justify-center p-1">
              <img src={Lipi} alt="UPI" className="max-w-full max-h-full object-contain" />
            </div>
            
            <div className="bg-white border border-[#e5e5e5] rounded-[4px] w-[60px] h-[35px] flex items-center justify-center p-1">
              <img src={paytm} alt="Paytm" className="max-w-full max-h-full object-contain" />
            </div>
            
            <div className="bg-white border border-[#e5e5e5] rounded-[4px] w-[60px] h-[35px] flex items-center justify-center p-1">
              <img src={Rupay} alt="RuPay" className="max-w-full max-h-full object-contain" />
            </div>

          </div>
        </div>

      </div>

      {/* નીચેનું કોપીરાઈટ સેક્શન */}
      <div className="max-w-[1400px] mx-auto  text-left">
        <p className="text-[15px] text-[#777777] pt-3 pb-3 m-0">&copy; 2024 Desine. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;