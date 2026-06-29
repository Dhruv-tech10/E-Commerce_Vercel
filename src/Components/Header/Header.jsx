// src/Components/Header/Header.jsx
import { useState, useEffect, useRef } from 'react';
import Logo from '../../assets/Img/Header/Logo.png';
import { Link, useNavigate } from "react-router-dom";
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useAuth } from '../../Context/AuthContext';
import { getWishlistCount } from '../WishlistUtils';
import { useCart } from '../../Context/CartContext';

export default function Header() {
  const { isAuthenticated, user, logout, openAuthModal } = useAuth();
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchContainerRef = useRef(null);
  const profileContainerRef = useRef(null);
  const [activeCategoryDropdown, setActiveCategoryDropdown] = useState(null);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(0);

  const navigate = useNavigate();
  const { cartCount } = useCart();

  const categories = [
    {
      name: "Home & Kitchen",
      dropdownData: [
        {
          title: "Home Decor",
          items: [
            { name: "Cover", path: "/home-kitchen/Cover" },
            { name: "Key Holders", path: "/home-kitchen/Key Holders" },
            { name: "Artificial Flowers", path: "/home-kitchen/Artificial Flowers" },
            { name: "Pooja Needs", path: "/home-kitchen/Pooja Needs" },
            { name: "Party Supplies", path: "/home-kitchen/Party Supplies" },
            { name: "Wallpapers & Stickers", path: "/home-kitchen/Wallpapers & Stickers" },
            { name: "Clocks & Wall Clocks", path: "/home-kitchen/Clocks & Wall Clocks" },
            { name: "Showpieces & Idols", path: "/home-kitchen/Showpieces & Idols" },
          ]
        },
        {
          title: "Kitchen Appliances",
          items: [
            { name: "Kitchen Linen", path: "/home-kitchen/Kitchen Linen" },
            { name: "Cookware", path: "/home-kitchen/Cookware" },
            { name: "Kitchen Tools", path: "/home-kitchen/Kitchen Tools" },
            { name: "Dinner Set", path: "/home-kitchen/Dinner Set" },
            { name: "Kitchen Appliances", path: "/home-kitchen/Kitchen Appliances" },
            { name: "Glasses & Barware", path: "/home-kitchen/Glasses & Barware" },
          ]
        },
        {
          title: "Furniture",
          items: [
            { name: "Cushions & Pillow", path: "/home-kitchen/Cushions & Pillow" },
            { name: "Sofas", path: "/home-kitchen/Sofas" },
            { name: "Mattresses", path: "/home-kitchen/Mattresses" },
            { name: "Study Table", path: "/home-kitchen/Study Table" },
            { name: "Hammock Swings", path: "/home-kitchen/Hammock Swings" },
          ]
        },
        {
          title: "Storage",
          items: [
            { name: "Boxes & Baskets", path: "/home-kitchen/Boxes & Baskets" },
            { name: "Wardrobes", path: "/home-kitchen/Wardrobes" },
            { name: "Storage Organizers", path: "/home-kitchen/Storage Organizers" },
            { name: "Food Storage", path: "/home-kitchen/Food Storage" },
            { name: "Storage Containers", path: "/home-kitchen/Storage Containers" },
            { name: "Drawer Organizers", path: "/home-kitchen/Drawer Organizers" },
            { name: "Water Bottle", path: "/home-kitchen/Water Bottle" },
          ]
        },
        {
          title: "Accessories",
          items: [
            { name: "Bathroom Accessiors", path: "/home-kitchen/Bathroom Accessiors" },
            { name: "Cleaning Supplies", path: "/home-kitchen/Cleaning Supplies" },
            { name: "Curtain Accessories", path: "/home-kitchen/Curtain Accessories" },
            { name: "Shop Bedsheets", path: "/home-kitchen/Shop Bedsheets" },
            { name: "Carpets & Doormats", path: "/home-kitchen/Carpets & Doormats" },
            { name: "Blankets & Comforters", path: "/home-kitchen/Blankets & Comforters" },
            { name: "Insect Protection", path: "/home-kitchen/Insect Protection" },
            { name: "Home Textiles", path: "/home-kitchen/Home Textiles" },
          ]
        },
      ]
    },
    {
      name: "Men Fashion",
      dropdownData: [
        {
          title: "Top Wear",
          items: [
            { name: "Shirt", path: "/men-fashion/Shirt" },
            { name: "T-Shirt", path: "/men-fashion/T-Shirt" },
            { name: "Jacket & Coat", path: "/men-fashion/Jacket & Coat" },
            { name: "Kurta", path: "/men-fashion/Kurta" },
          ]
        },
        {
          title: "Bottom Wear",
          items: [
            { name: "Jeans", path: "/men-fashion/Jeans" },
            { name: "Cargos", path: "/men-fashion/Cargos" },
            { name: "Trackpants", path: "/men-fashion/MenTrackpants" },
          ]
        },
        {
          title: "Inner Wear",
          items: [
            { name: "Verts", path: "/men-fashion/Verts" },
            { name: "Briefs", path: "/men-fashion/Briefs" },
            { name: "Trunks", path: "/men-fashion/Trunks" },
            { name: "Boxers", path: "/men-fashion/Boxers" },
          ]
        },
        {
          title: "Shoes",
          items: [
            { name: "Partywearshoes", path: "/men-fashion/MenPartywearshoes" },
            { name: "Sports Shoes", path: "/men-fashion/Sports Shoes" },
            { name: "Formall Shoes", path: "/men-fashion/Formall Shoes" },
            { name: "Party Wear", path: "/men-fashion/Party Wear" }
          ]
        },
        {
          title: "Sleep Wear",
          items: [
            { name: "NightShorts", path: "/men-fashion/NightShorts" },
            { name: "MenPyjamas", path: "/men-fashion/MenPyjamas" },
          ]
        },
        {
          title: "Health & Personal Care",
          items: [
            { name: "Condoms", path: "/men-fashion/Condoms" },
            { name: "Personal Lubricants", path: "/men-fashion/Personal Lubricants" },
            { name: "Delay Sprays", path: "/men-fashion/Delay Sprays" },
            { name: "Massage Oils", path: "/men-fashion/Massage Oils" },
          ]
        },
        {
          title: "Accessiors",
          items: [
            { name: "Watches", path: "/men-fashion/Watches" },
            { name: "Bags & Luggage", path: "/men-fashion/Bags & Luggage" },
            { name: "Sunglasses", path: "/men-fashion/Sunglasses" },
            { name: "Wallets", path: "/men-fashion/Wallets" },
            { name: "Belts", path: "/men-fashion/Belts" },
            { name: "Caps", path: "/men-fashion/Caps" },
            { name: "Jewellery", path: "/men-fashion/Jewellery" },
            { name: "Perfume", path: "/men-fashion/Perfume" },
            { name: "Facewash", path: "/men-fashion/Facewash" },
            { name: "Partywearshoes", path: "/men-fashion/MenPartywearshoes" },
            { name: "Sports Shoes", path: "/men-fashion/Sports Shoes" },
          ]
        },
      ]
    },
    {
      name: "Women Fashion",
      dropdownData: [
        {
          title: "Topwear",
          items: [
            { name: "T-Shirt", path: "/women-fashion/T-Shirt" },
            { name: "Tunic & Top", path: "/women-fashion/Tunic & Top" },
            { name: "Shirt", path: "/women-fashion/Shirt" },
            { name: "Dresses", path: "/women-fashion/Dresses" },
            { name: "Gowns", path: "/women-fashion/Gowns" },
            { name: "Dupatta", path: "/women-fashion/Dupatta" },
            { name: "Saree", path: "/women-fashion/Saree" },
            { name: "Jumpsuit", path: "/women-fashion/Jumpsuit" },
            { name: "Kurtie", path: "/women-fashion/Kurtie" },
            { name: "Blouses", path: "/women-fashion/Blouses" },
          ]
        },
        {
          title: "Bottom Wear",
          items: [
            { name: "Jeans & Jeggie", path: "/women-fashion/Jeans & Jeggie" },
            { name: "Legging", path: "/women-fashion/Legging" },
            { name: "Shorts & Skirt", path: "/women-fashion/Shorts & Skirt" },
            { name: "Palazzo", path: "/women-fashion/Palazzo" },
            { name: "Pants & Trouser", path: "/women-fashion/Pants & Trouser" }
          ]
        },
        {
          title: "Winter Wear",
          items: [
            { name: "Jackets", path: "/women-fashion/Jackets" },
            { name: "Sweaters", path: "/women-fashion/Sweaters" },
            { name: "Coats", path: "/women-fashion/Coats" },
            { name: "Blazers", path: "/women-fashion/Blazers" },
          ]
        },
        {
          title: "Inner Wear",
          items: [
            { name: "Women Bra", path: "/women-fashion/Women Bra" },
            { name: "Women Panties", path: "/women-fashion/Women Panties" },
            { name: "Sports Bra", path: "/women-fashion/Sports Bra" },
          ]
        },
        {
          title: "Sleep Wear",
          items: [
            { name: "Women NightDress", path: "/women-fashion/Women NightDress" },
            { name: "Women NightSuit", path: "/women-fashion/Women NightSuit" },
          ]
        },
        {
          title: "Accessiors",
          items: [
            { name: "Anklets", path: "/women-fashion/Anklets" },
            { name: "Bracelets", path: "/women-fashion/Bracelets" },
            { name: "Jwellery", path: "/women-fashion/Jwellery" },
            { name: "Earrings", path: "/women-fashion/Earrings" },
            { name: "Watch", path: "/women-fashion/Watch" },
            { name: "Necklace", path: "/women-fashion/Necklace" },
            { name: "Facewash", path: "/women-fashion/Facewash" },
            { name: "Perfumes", path: "/women-fashion/Perfumes" },
            { name: "SunGlasses", path: "/women-fashion/SunGlasses" },
          ]
        }
      ]
    },
    {
      name: "Kids & Toys",
      dropdownData: [
        {
          title: "Kids Clothing",
          items: [
            { name: "Boys", path: "/kids-toys/Boys" },
            { name: "Girls", path: "/kids-toys/Girls" },
            { name: "Babies", path: "/kids-toys/Babies" },
            { name: "Forks & Dresses", path: "/kids-toys/Forks & Dresses" },
            { name: "T-Shirt & Polos", path: "/kids-toys/T-Shirt & Polos" },
          ]
        },
        {
          title: "Health Care",
          items: [
            { name: "Soap", path: "/kids-toys/Soap" },
            { name: "Powder", path: "/kids-toys/Powder" },
            { name: "Shampoo", path: "/kids-toys/Shampoo" },
            { name: "Oil", path: "/kids-toys/Oil" },
            { name: "Diaper", path: "/kids-toys/Diaper" },
          ]
        },
        {
          title: "Fashion Kids",
          items: [
            { name: "Watches", path: "/kids-toys/Watches" },
            { name: "Shoes", path: "/kids-toys/Shoes" },
            { name: "Bags & Back pats", path: "/kids-toys/Bags & Back pats" },
            { name: "Goggles", path: "/kids-toys/Goggles" },
            { name: "Baby Blankets", path: "/kids-toys/Baby Blankets" },
          ]
        },
        {
          title: "Kids Toys",
          items: [
            { name: "Puzzle", path: "/kids-toys/Puzzle" },
            { name: "Toys & Games", path: "/kids-toys/Toys & Games" },
            { name: "Tick-Tak", path: "/kids-toys/Tick-Tak" },
            { name: "Ring", path: "/kids-toys/Ring" },
            { name: "Remote Control helecopers", path: "/kids-toys/Remote Control helecopers" },
            { name: "Summer Picks", path: "/kids-toys/Summer Picks" },
            { name: "Gears", path: "/kids-toys/Gears" },
            { name: "Cricket", path: "/kids-toys/Cricket" },
          ]
        },
        {
          title: "Baby Care",
          items: [
            { name: "Newborn Care", path: "/kids-toys/Newborn Care" },
            { name: "Mosquito nets", path: "/kids-toys/Mosquito nets" },
            { name: "Dry Sheets", path: "/kids-toys/Dry Sheets" },
            { name: "Bedding", path: "/kids-toys/Bedding" },
          ]
        }
      ]
    },
    {
      name: "Beauty & Care",
      dropdownData: [
        {
          title: "Makeup",
          items: [
            { name: "Lipstick", path: "/beauty-care/Lipstick" },
            { name: "Eye Shadow", path: "/beauty-care/Eye Shadow" },
            { name: "Face Makup", path: "/beauty-care/Face Makup" },
            { name: "Nailpolish", path: "/beauty-care/Nailpolish" },
            { name: "Brushes", path: "/beauty-care/Brushes" },
            { name: "Hair Remover", path: "/beauty-care/Hair Remover" },
            { name: "Foundation", path: "/beauty-care/Foundation" },
            { name: "Cream", path: "/beauty-care/Cream" },
          ]
        },
        {
          title: "Skin Care",
          items: [
            { name: "Face Wash", path: "/beauty-care/Face Wash" },
            { name: "Vaseline", path: "/beauty-care/Vaseline" },
          ]
        },
        {
          title: "Hair Care",
          items: [
            { name: "Shampoo & conditioner", path: "/beauty-care/Shampoo & conditioner" },
            { name: "Hair Oil", path: "/beauty-care/Hair Oil" },
            { name: "Hair Serum", path: "/beauty-care/Hair Serum" }
          ]
        },
        {
          title: "Summer Care",
          items: [
            { name: "Body Lotion", path: "/beauty-care/Body Lotion" },
            { name: "Whitening Creams", path: "/beauty-care/Whitening Creams" },
            { name: "Soap", path: "/beauty-care/Soap" },
            { name: "Face Oil", path: "/beauty-care/Face Oil" }
          ]
        },
        {
          title: "Health Care",
          items: [
            { name: "Ear Cleaner", path: "/beauty-care/Ear Cleaner" },
            { name: "Foot Care", path: "/beauty-care/Foot Care" },
            { name: "Oral Care", path: "/beauty-care/Oral Care" },
            { name: "Monitor & Massagers", path: "/beauty-care/Monitor & Massagers" },
            { name: "Winter Healthcare", path: "/beauty-care/Winter Healthcare" },
          ]
        }
      ]
    },
    {
      name: "Electronics",
      dropdownData: [
        {
          title: "Mobiles",
          items: [
            { name: "Vivo", path: "/electronics/Vivo" },
            { name: "Iphone", path: "/electronics/Iphone" },
            { name: "Oppo", path: "/electronics/Oppo" },
            { name: "Redmi", path: "/electronics/Redmi" },
            { name: "Samsumg", path: "/electronics/Samsumg" },
            { name: "OnePlus", path: "/electronics/OnePlus" },
            { name: "Realme", path: "/electronics/Realme" },
            { name: "Nokia", path: "/electronics/Nokia" },
            { name: "Motorola", path: "/electronics/Motorola" },
            { name: "MicroMax", path: "/electronics/MicroMax" },
          ]
        },
        {
          title: "Laptops",
          items: [
            { name: "HP", path: "/electronics/HP" },
            { name: "Dell", path: "/electronics/Dell" },
            { name: "Lenovo", path: "/electronics/Lenovo" },
            { name: "Asus", path: "/electronics/Asus" },
            { name: "Leptop Samsumg", path: "/electronics/Leptop Samsumg" },
            { name: "Apple", path: "/electronics/Apple" },
            { name: "Victus", path: "/electronics/Victus" },
          ]
        },
        {
          title: "Smart Watches",
          items: [
            { name: "Apple Watch", path: "/electronics/Apple Watch" },
            { name: "Fire-Boltt", path: "/electronics/Fire-Boltt" },
            { name: "Noice", path: "/electronics/Noice" },
            { name: "Fastrack", path: "/electronics/Fastrack" }
          ]
        },
        {
          title: "Bluetooth",
          items: [
            { name: "Airpod Bluetooth", path: "/electronics/Airpod Bluetooth" },
            { name: "Wired HeadPhone", path: "/electronics/Wired HeadPhone" },
            { name: "Neckband Bluetooth", path: "/electronics/Neckband Bluetooth" },
            { name: "New Selfie Stick", path: "/electronics/New Selfie Stick" },
            { name: "Mobile Chargers", path: "/electronics/Mobile Chargers" },
            { name: "Trendy Cooling", path: "/electronics/Trendy Cooling" },
            { name: "Cable Connection", path: "/electronics/Cable Connection" },
            { name: "Mobile Holder", path: "/electronics/Mobile Holder" },
            { name: "Leptop Chargers", path: "/electronics/Leptop Chargers" },
          ]
        },
        {
          title: "Electronics",
          items: [
            { name: "Refrigrater", path: "/electronics/Refrigrater" },
            { name: "Washing Machine", path: "/electronics/Washing Machine" },
            { name: "Irons", path: "/electronics/Irons" },
            { name: "Mini Fans", path: "/electronics/Mini Fans" },
            { name: "Tube-Light", path: "/electronics/Tube-Light" },
            { name: "Flour Mill", path: "/electronics/Flour Mill" },
            { name: "Juice Machine", path: "/electronics/Juice Machine" },
            { name: "Blendes", path: "/electronics/Blendes" },
            { name: "Electric Gas", path: "/electronics/Electric Gas" },
            { name: "Geyser", path: "/electronics/Geyser" },
          ]
        }
      ]
    },
    {
      name: "Wedding Hub",
      dropdownData: [
        {
          title: "Groom Collection",
          items: [
            { name: "Sherwani", path: "/wedding-hub/Sherwani" },
            { name: "Necklace", path: "/wedding-hub/Necklace" },
            { name: "Mojdi", path: "/wedding-hub/Mojdi" },
            { name: "Safa", path: "/wedding-hub/Safa" },
            { name: "Kurta Set", path: "/wedding-hub/Kurta Set" },
          ]
        },
        {
          title: "Bride Collection",
          items: [
            { name: "Hand Bag", path: "/wedding-hub/Hand Bag" },
            { name: "Chaniya Choli", path: "/wedding-hub/Chaniya Choli" },
            { name: "Patola Sadi", path: "/wedding-hub/Patola Sadi" },
            { name: "Merriage Sandal", path: "/wedding-hub/Merriage Sandal" },
            { name: "High Hills", path: "/wedding-hub/High Hills" },
          ]
        },
        {
          title: "Wedding Jewellery",
          items: [
            { name: "Necklace Sets", path: "/wedding-hub/Necklace Sets" },
            { name: "Payal", path: "/wedding-hub/Payal" },
            { name: "Rings", path: "/wedding-hub/Rings" },
            { name: "Merriage Chura", path: "/wedding-hub/Merriage Chura" },
            { name: "Earrings", path: "/wedding-hub/Earrings" },
            { name: "Kundan Collection", path: "/wedding-hub/Kundan Collection" },
          ]
        },
      ]
    },
    {
      name: "Grocery",
      dropdownData: [
        {
          title: "Staples & Grains",
          items: [
            { name: "Rice", path: "/grocery/Rice" },
            { name: "Wheat Flour", path: "/grocery/Wheat Flour" },
            { name: "Pulses & Dal", path: "/grocery/Pulses & Dal" },
            { name: "Sugar & Jaggery", path: "/grocery/Sugar & Jaggery" },
            { name: "Salt & Spices", path: "/grocery/Salt & Spices" },
          ]
        },
        {
          title: "Snacks & Beverages",
          items: [
            { name: "Chips & Namkeen", path: "/grocery/Chips & Namkeen" },
            { name: "Biscuits & Cookies", path: "/grocery/Biscuits & Cookies" },
            { name: "Chocolates & Candies", path: "/grocery/Chocolates & Candies" },
            { name: "Food Drinks", path: "/grocery/Food Drinks" },
            { name: "Tea", path: "/grocery/Tea" },
            { name: "Coffee", path: "/grocery/Coffee" },
          ]
        },
        {
          title: "Instant Food",
          items: [
            { name: "Maggi", path: "/grocery/Maggi" },
            { name: "Noodles", path: "/grocery/Noodles" },
            { name: "MasalaSpices", path: "/grocery/MasalaSpices" },
            { name: "Ice Cream Powder", path: "/grocery/Ice Cream Powder" },
            { name: "Chips", path: "/grocery/Chips & Namkeen" },
            { name: "Sauces", path: "/grocery/Sauces" },
          ]
        },
        {
          title: "Healthy Choices",
          items: [
            { name: "Dry Fruits", path: "/grocery/Dry Fruits" },
            { name: "Honey", path: "/grocery/Honey" },
            { name: "Pickles", path: "/grocery/Pickles" },
          ]
        },
        {
          title: "Dog & Cat Food",
          items: [
            { name: "Dog Food", path: "/grocery/Dog Food" },
            { name: "Cat Food", path: "/grocery/Cat Food" },
            { name: "Pet Treats", path: "/grocery/Pet Treats" },
            { name: "Pet Grooming", path: "/grocery/Pet Grooming" },
          ]
        },
      ]
    },
  ];

  // ✅ Get all searchable items
  const getAllSearchableItems = () => {
    let list = [];
    categories.forEach(category => {
      if (category.dropdownData) {
        category.dropdownData.forEach(sub => {
          if (sub.items) {
            sub.items.forEach(item => {
              list.push({
                text: item.name,
                path: item.path,
                category: category.name,
                subTitle: sub.title
              });
            });
          }
        });
      }
    });
    return list;
  };

  const searchableItems = getAllSearchableItems();

  // ✅ Filter suggestions
  const filteredSuggestions = searchableItems.filter(item =>
    item.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ✅ Update wishlist count and user name from auth
  useEffect(() => {
    setWishlistCount(getWishlistCount());

    const handleWishlistUpdate = () => {
      setWishlistCount(getWishlistCount());
    };

    window.addEventListener('wishlistUpdated', handleWishlistUpdate);
    return () => window.removeEventListener('wishlistUpdated', handleWishlistUpdate);
  }, []);

  // ✅ Click outside handler
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setIsSearchFocused(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // ✅ Search submit handler
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (filteredSuggestions.length > 0 && searchQuery.trim() !== "") {
      navigate(filteredSuggestions[0].path);
      setIsSearchFocused(false);
    }
  };

  // ✅ Logout handler with AuthContext
  const handleLogout = () => {
    logout();
    navigate('/');
    window.location.reload();
  };

  // ✅ NAYA CODE (Ye daalo)
const handleDeleteAccount = () => {
  if (window.confirm('⚠️ Are you sure you want to permanently delete your account?\n\nThis action cannot be undone.')) {
    try {
      // Get current user
      const userData = JSON.parse(localStorage.getItem('velora_user') || '{}');
      const userEmail = userData.email || localStorage.getItem('userEmail');
      
      if (!userEmail) {
        alert('No user found to delete');
        return;
      }

      // Remove user from users list
      const users = JSON.parse(localStorage.getItem('velora_users') || '[]');
      const updatedUsers = users.filter(u => u.email !== userEmail);
      localStorage.setItem('velora_users', JSON.stringify(updatedUsers));

      // Clear all auth data
      const keysToRemove = [
        'velora_user',
        'velora_token', 
        'userName',
        'userEmail',
        'velora_reset_data',
        'velora_reset_verified'
      ];
      keysToRemove.forEach(key => localStorage.removeItem(key));

      // Call logout
      logout();

      // Redirect
      navigate('/');
      setTimeout(() => window.location.reload(), 100);

      alert('✅ Account deleted successfully');
      
    } catch (error) {
      console.error('Delete account error:', error);
      alert('❌ Failed to delete account');
    }
  }
};

  // ✅ Get user name from auth context
  const userName = user?.name || localStorage.getItem("userName") || "User";

  return (
    <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      {/* Top Row: Logo, Search, and Actions */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-3 md:gap-5">

        <Link to="/" className="w-53 !h-30px flex items-center cursor-pointer decoration-none">
          <img src={Logo} alt="Logo" className="w-99" />
        </Link>

        {/* Search Bar */}


        {/* <div ref={searchContainerRef} className="hidden md:block relative w-full max-w-xl mx-auto">
          <form onSubmit={handleSearchSubmit} className="w-full h-12 flex items-center bg-[#1e2d42] rounded-md pl-4 pr-2 overflow-hidden">
            <button type="submit" className="text-gray-400 hover:text-amber-500 p-3 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500/50 flex-shrink-0" aria-label="Submit search">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </button>
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              className="w-full h-full bg-transparent text-sm text-white placeholder-gray-400 ml-3.5 focus:outline-none"
              placeholder="Search products, brands and more..."
            />
          </form>

          {isSearchFocused && searchQuery.trim() !== "" && (
            <div className="absolute top-full left-0 w-full mt-1.5 bg-white border border-gray-200 shadow-2xl rounded-md overflow-hidden z-50">
              <ul className="max-h-64 overflow-y-auto divide-y divide-gray-50">
                {filteredSuggestions.length > 0 ? (
                  filteredSuggestions.map((item, index) => (
                    <li key={index}>
                      <Link
                        to={item.path}
                        onClick={() => {
                          setSearchQuery(item.text);
                          setIsSearchFocused(false);
                        }}
                        className="w-full text-left px-4 py-3 flex items-center justify-between hover:bg-slate-50 transition-colors text-sm text-slate-700 !no-underline"
                      >
                        <div className="flex items-center gap-3">
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                          </svg>
                          <span className="font-medium text-slate-800">{item.text}</span>
                        </div>
                        <span className="text-xs text-gray-400 font-normal">
                          ({item.subTitle})
                        </span>
                      </Link>
                    </li>
                  ))
                ) : (
                  <div className="p-4 text-center text-sm text-gray-400">
                    No results found for "{searchQuery}"
                  </div>
                )}
              </ul>
            </div>
          )}
        </div> */}


        {/* Search Bar */}
<div ref={searchContainerRef} className="hidden md:block relative w-full max-w-xl mx-auto">
  <form onSubmit={handleSearchSubmit} className="w-full h-12 flex items-center bg-[#1e2d42] rounded-md pl-4 pr-2 overflow-hidden">
    <button type="submit" className="text-gray-400 hover:text-amber-500 p-3 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500/50 flex-shrink-0" aria-label="Submit search">
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
      </svg>
    </button>
    <input
      type="search"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      onFocus={() => setIsSearchFocused(true)}
      className="w-full h-full bg-transparent text-sm text-white placeholder-gray-400 ml-3.5 focus:outline-none"
      placeholder="Search products, brands and more..."
    />
  </form>

  {/* Search Dropdown */}
  {isSearchFocused && searchQuery.trim() !== "" && (
    <div className="absolute top-full left-0 w-full mt-1.5 bg-white border border-gray-200 shadow-2xl rounded-md overflow-hidden z-50">
      <ul className="max-h-64 overflow-y-auto divide-y divide-gray-50">
        {filteredSuggestions.length > 0 ? (
          filteredSuggestions.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                onClick={() => {
                  setSearchQuery(item.text);
                  setIsSearchFocused(false);
                }}
                className="w-full text-left px-4 py-3 flex items-center justify-between hover:bg-slate-50 transition-colors text-sm text-slate-700 !no-underline"
              >
                <div className="flex items-center gap-3">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                  {/* જો કેટેગરી કે સબટાઈટલ મેચ થયું હોય તો યુઝરને ખબર પડે એટલા માટે અમે item.text બતાવીએ છીએ */}
                  <span className="font-medium text-slate-800">{item.text}</span>
                </div>
                <div className="flex flex-col items-end gap-0.5">
                  <span className="text-xs text-amber-600 font-semibold bg-amber-50 px-1.5 py-0.5 rounded">
                    {item.category}
                  </span>
                  <span className="text-[10px] text-gray-400 font-normal">
                    ({item.subTitle})
                  </span>
                </div>
              </Link>
            </li>
          ))
        ) : (
          <div className="p-4 text-center text-sm text-gray-400">
            No results found for "{searchQuery}"
          </div>
        )}
      </ul>
    </div>
  )}
</div>

        {/* User Actions */}
        <div className="flex items-center gap-4 sm:gap-6 flex-shrink-0">
          {/* PROFILE DROPDOWN BLOCK */}
          <div
            ref={profileContainerRef}
            className="relative flex flex-col items-center"
            onMouseEnter={() => setIsProfileDropdownOpen(true)}
            onMouseLeave={() => setIsProfileDropdownOpen(false)}
          >
            <button className="flex flex-col items-center transition-colors focus:outline-none">
              <PersonOutlinedIcon className='!text-[28px] !text-[#1E2D42] !font-extrabold' />
            </button>

            {isProfileDropdownOpen && (
              <div className="absolute left-1/2 -translate-x-1/2 top-full !pt-[40px] z-50">
                <div className="w-72 bg-white rounded-md shadow-xl border border-gray-100 overflow-hidden text-left !py-5 !px-6">
                  <div>
                    <h3 className='!text-[24px]'>Hello {userName}</h3>
                  </div>
                  <p className="text-[15px] text-gray-500 mb-3">
                    {isAuthenticated ? 'Manage your account' : 'To access your Velora Hub account'}
                  </p>

                  {!isAuthenticated ? (
                    <>
                      <button 
                        onClick={() => openAuthModal('login')}
                        className="block w-full bg-[#1E2D42] text-white font-bold text-center my-3 !py-2.5 rounded-md transition-colors !no-underline"
                      >
                        Sign In / Sign Up
                      </button>
                    </>
                  ) : (
                    <>
                      <Link to="/account/orders" className="flex items-center gap-3 !py-2 text-slate-700 font-semibold hover:text-[#9c27b0] transition-colors !no-underline text-sm">
                        <ShoppingBagOutlinedIcon className="w-5 h-5 !text-[#1E2D42] !text-[17px] text-gray-500" />
                        <span className='text-[#1E2D42] !text-[17px]'>My Orders</span>
                      </Link>

                      <hr className="border-gray-100 my-2" />

                      <button 
                        onClick={handleDeleteAccount}
                        className="w-full flex items-center gap-3 py-2 text-slate-700 font-semibold hover:text-red-600 transition-colors text-sm text-left"
                      >
                        <DeleteOutlineOutlinedIcon className="w-5 h-5 !text-[#1E2D42] !text-[17px] text-gray-500" />
                        <span className='text-[#1E2D42] !text-[17px]'>Delete Account</span>
                      </button>

                      <hr className="border-gray-100 my-2" />

                      <button 
                        onClick={handleLogout}
                        className="block w-full bg-red-600 text-white font-bold text-center my-3 !py-2.5 rounded-md transition-colors hover:bg-red-700 !no-underline"
                      >
                        Logout
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Cart Icon */}
          <Link to="/cart" className="relative text-slate-700 hover:text-amber-500 transition-colors" title="Cart">
            <ShoppingCartOutlinedIcon className='!text-[28px] !text-[#1E2D42] !font-extrabold' />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-amber-500 text-white font-bold text-[11px] w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Wishlist Icon */}
          <Link to="/wishlist" className="relative text-slate-700 hover:text-amber-500 transition-colors hidden sm:block" title="Wishlist">
            <FavoriteBorderOutlinedIcon className='!mb-1 !text-[28px] !text-[#1E2D42] !font-extrabold' />
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white font-bold text-[11px] w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                {wishlistCount}
              </span>
            )}
          </Link>

{/* Login / Logout Button */}
{isAuthenticated ? (
  <button 
    onClick={handleLogout}
    className="!px-10 !py-[10px] !no-underline !ml-4 font-extrabold text-[17px] rounded-lg border-2 border-[#1E2D42] bg-[#1E2D42] text-white shadow-sm transition-all duration-300 opacity-90 hover:opacity-100"
  >
    LOGOUT
  </button>
) : (
  <button 
    onClick={() => openAuthModal('login')}
    className="!px-10 !py-[10px] !no-underline !ml-4 font-extrabold text-[17px] rounded-lg border-2 border-[#1E2D42] bg-[#1E2D42] text-white shadow-sm transition-all duration-300 opacity-90 hover:opacity-100"
  >
    LOGIN
  </button>
)}

          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-slate-700 hover:text-amber-500 transition-colors lg:hidden focus:outline-none" aria-label="Toggle navigation menu">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="px-4 pb-4 md:hidden">
        <form onSubmit={handleSearchSubmit} className="w-full h-11 flex items-center bg-[#1e2d42] rounded-md px-3">
          <button type="submit" className="text-gray-400 p-1 flex-shrink-0">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </button>
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            className="w-full h-full bg-transparent text-sm text-white placeholder-gray-400 ml-4 focus:outline-none"
            placeholder="Search products, brands and more..."
          />
        </form>
      </div>

      {/* Categories Navigation Bar */}
      <nav className="bg-white border-t border-gray-400 overflow-visible shadow-sm relative">
        <div className="max-w-[1400px] mx-auto px-5 flex justify-between items-center space-x-6 overflow-x-auto no-scrollbar lg:overflow-visible">
          {categories.map((item, index) => {
            const hasDropdownData = item.dropdownData && item.dropdownData.length > 0;
            const isOpen = activeCategoryDropdown === index;

            return (
              <div key={index} className="py-3 flex-shrink-0" onMouseEnter={() => hasDropdownData && setActiveCategoryDropdown(index)} onMouseLeave={() => hasDropdownData && setActiveCategoryDropdown(null)}>
                <div className="flex items-center space-x-1 cursor-pointer group">
                  <Link to={item.path} className="text-xs !text-[15px] !font-medium !text-[#0b1a29] pb-0.5 border-b-2 border-transparent transition-all duration-200 whitespace-nowrap tracking-wide !no-underline">
                    {item.name}
                  </Link>
                </div>

                {hasDropdownData && (
                  <div className={`absolute left-1/2 -translate-x-1/2 mt-3  min-w-[1150px] bg-white text-gray-800 border border-gray-100 rounded-lg shadow-2xl transition-all duration-200 z-50 !py-2 !px-2 ${isOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-2 pointer-events-none"}`}>
                    <div className="flex gap-x-9 overflow-hidden rounded-lg">
                      {item.dropdownData.map((subCategory, idx) => (
                        <div key={idx} className="p-6 min-h-[320px]">
                          <h4 className="!text-[#FEBB48] !text-[20px] !font-bold mb-3">
                            {subCategory.title}
                          </h4>
                          <div className="flex flex-col gap-y-3">
                            {subCategory.items.map((subItem, subIdx) => (
                              <Link key={subIdx} to={subItem.path} className="!no-underline font-semibold !text-[#1E2D42] text-gray-600 hover:text-[#df971a] transition-colors">
                                {subItem.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </nav>

      {/* Mobile Menu Sidebar */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white px-4 py-2 space-y-1 transition-all">
          {categories.map((link, index) => (
            <div key={index} className="border-b border-gray-50 last:border-none">
              <Link to={link.path} onClick={() => setIsMobileMenuOpen(false)} className="block py-3 text-sm font-semibold text-slate-700 hover:text-amber-500 transition-colors !no-underline">
                {link.name}
              </Link>
            </div>
          ))}
          <div className="pt-4 pb-2 sm:hidden">
            {isAuthenticated ? (
              <button 
                onClick={handleLogout}
                className="block w-full text-center py-2.5 font-bold tracking-wider text-red-600 uppercase border-2 border-red-600 rounded hover:bg-red-600 hover:text-white transition-all text-sm"
              >
                Logout
              </button>
            ) : (
              <button 
                onClick={() => openAuthModal('login')}
                className="block w-full text-center py-2.5 font-bold tracking-wider text-[#1e2d42] uppercase border-2 border-[#1e2d42] rounded hover:bg-[#1e2d42] hover:text-white transition-all text-sm"
              >
                Login
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}