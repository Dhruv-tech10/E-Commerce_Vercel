import { useEffect, useState } from "react";
import ProductCard from "../ProductCard";
import { loadAllProducts } from "../ProductsData";
import { Slider } from "@mui/material";
import { Link } from 'react-router-dom';
// ✅ WALLETS FILTER DATA
const FILTER_CONFIG = {
  // Wallet Type
  walletType: [
    "Bi-Fold", "Tri-Fold", "Money Clip", "Card Holder", "Passport Wallet",
    "Travel Wallet", "Coin Purse", "Zip Around", "Minimalist", "RFID Blocking",
    "Chain Wallet", "Magnetic Wallet", "Vertical Wallet", "Zip Wallet"
  ],
  
  // Material
  material: [
    "Leather", "Genuine Leather", "PU Leather", "Synthetic", "Canvas",
    "Nylon", "Carbon Fiber", "Metal", "Wood", "Fabric", "Denim",
    "Cork", "Recycled Material", "Polyester", "Cotton"
  ],
  
  // Color
  color: [
    "Black", "Brown", "Tan", "Dark Brown", "Navy Blue", "Red", 
    "Gray", "Green", "Blue", "Cognac", "Burgundy", "Camel",
    "White", "Olive", "Maroon", "Teal"
  ],
  
  // Closure Type
  closure: [
    "Button", "Magnetic", "Zip", "Snap", "Elastic Band", 
    "No Closure", "Velcro", "Hook & Loop", "Buckle"
  ],
  
  // Number of Card Slots
  cardSlots: [
    "Up to 5", "6-10", "11-15", "16-20", "20+", 
    "1-3", "4-6", "7-9", "10-12"
  ],
  
  // Gender
  gender: ["Men", "Women", "Unisex"],
  
  // Brands
  brands: [
    "Levi's", "Wildhorn", "Urban Forest", "Hidesign", "Lavie", 
    "Baggit", "Caprese", "American Tourister", "Skybags", "Safari",
    "Nike", "Adidas", "Puma", "Fastrack", "Tommy Hilfiger",
    "Allen Solly", "Louis Philippe", "Van Heusen", "Calvin Klein",
    "Fossil", "Titan", "Casio", "Diesel", "Armani Exchange"
  ]
};

function Wallets() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // 🔥 PRICE RANGE STATE
  const [maxPrice, setMaxPrice] = useState(3000);
  
  // 🔥 SORT STATE
  const [sortBy, setSortBy] = useState("default");
  
  // 🔥 MOBILE FILTER STATE
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  
  // 🔥 FILTER STATE
  const [filters, setFilters] = useState({
    walletType: [],
    material: [],
    color: [],
    closure: [],
    cardSlots: [],
    gender: [],
    brands: []
  });
  
  // 🔥 ACCORDION SECTIONS STATE
  const [openSections, setOpenSections] = useState({
    walletType: true,
    material: true,
    color: true,
    closure: false,
    cardSlots: false,
    gender: false,
    brands: true
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await loadAllProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error loading products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // ✅ TOGGLE FILTER HANDLER
  const handleFilterToggle = (key, value) => {
    setFilters((prev) => {
      const exists = prev[key].includes(value);
      return {
        ...prev,
        [key]: exists ? prev[key].filter((v) => v !== value) : [...prev[key], value]
      };
    });
  };

  // ✅ TOGGLE ACCORDION SECTION
  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const clearAllFilters = () => {
    setFilters({
      walletType: [],
      material: [],
      color: [],
      closure: [],
      cardSlots: [],
      gender: [],
      brands: []
    });
    setMaxPrice(3000);
    setSortBy("default");
  };

  // ✅ ONLY WALLETS PRODUCTS
  let filteredProducts = products.filter(
    (p) => p.category?.toLowerCase().trim() === "wallets"
  );

  // Apply all filters
  filteredProducts = filteredProducts.filter((product) => {
    // Price filter
    if (product.offerPrice > maxPrice) return false;
    
    // Wallet Type filter
    if (filters.walletType.length > 0 && !filters.walletType.includes(product.walletType)) return false;
    
    // Material filter
    if (filters.material.length > 0 && !filters.material.includes(product.material)) return false;
    
    // Color filter
    if (filters.color.length > 0 && !filters.color.includes(product.color)) return false;
    
    // Closure filter
    if (filters.closure.length > 0 && !filters.closure.includes(product.closure)) return false;
    
    // Card Slots filter
    if (filters.cardSlots.length > 0 && !filters.cardSlots.includes(product.cardSlots)) return false;
    
    // Gender filter
    if (filters.gender.length > 0 && !filters.gender.includes(product.gender)) return false;
    
    // Brand filter
    if (filters.brands.length > 0 && !filters.brands.includes(product.brand)) return false;
    
    return true;
  });

  // Apply sorting
  if (sortBy === "price_low") {
    filteredProducts.sort((a, b) => a.offerPrice - b.offerPrice);
  } else if (sortBy === "price_high") {
    filteredProducts.sort((a, b) => b.offerPrice - a.offerPrice);
  }

  // 🧱 ACCORDION SECTION COMPONENT
  const AccordionSection = ({ title, sectionKey, items }) => (
    <div className="mb-4 border-b border-gray-100 pb-3">
      <button 
        onClick={() => toggleSection(sectionKey)} 
        className="flex justify-between items-center w-full font-bold text-gray-800 text-sm mb-2 hover:text-orange-600 transition"
      >
        <span>{title}</span>
        {openSections[sectionKey] ? (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        ) : (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        )}
      </button>
      
      {openSections[sectionKey] && (
        <div className="grid grid-cols-1 gap-1.5 max-h-60 overflow-y-auto pr-1">
          {items.map((item, index) => (
            <label key={index} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
              <input 
                type="checkbox" 
                checked={filters[sectionKey]?.includes(item)}
                onChange={() => handleFilterToggle(sectionKey, item)} 
                className="w-3.5 h-3.5 rounded border-gray-300 text-orange-600 focus:ring-orange-500" 
              />
              <span className="text-gray-600 text-xs">{item}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );

  // 🗂️ FILTER SIDEBAR COMPONENT
  const FilterSidebar = () => (
    <div className="bg-white p-4 rounded-xl shadow-sm">
      <div className="flex justify-between items-center mb-4 border-b pb-3">
        <h2 className="font-bold text-base text-gray-800">Filters</h2>
        <button onClick={clearAllFilters} className="text-orange-600 text-xs font-semibold hover:underline">Clear All</button>
      </div>
      
      {/* Wallet Type Section */}
      <AccordionSection title=" Wallet Type" sectionKey="walletType" items={FILTER_CONFIG.walletType} />
      
      {/* Material Section */}
      <AccordionSection title=" Material" sectionKey="material" items={FILTER_CONFIG.material} />
      
      {/* Color Section */}
      <AccordionSection title=" Color" sectionKey="color" items={FILTER_CONFIG.color} />
      
      {/* Closure Type Section */}
      <AccordionSection title=" Closure Type" sectionKey="closure" items={FILTER_CONFIG.closure} />
      
      {/* Card Slots Section */}
      <AccordionSection title=" Card Slots" sectionKey="cardSlots" items={FILTER_CONFIG.cardSlots} />
      
      {/* Gender Section */}
      <AccordionSection title=" Gender" sectionKey="gender" items={FILTER_CONFIG.gender} />
      
      {/* Brands Section */}
      <AccordionSection title=" Brands" sectionKey="brands" items={FILTER_CONFIG.brands} />

      {/* Price Slider */}
      <div className="mb-4 pt-2">
        <h2 className="font-bold text-gray-800 text-sm mb-2"> Max Price: ₹{maxPrice}</h2>
        <div className="px-1">
          <Slider
            value={maxPrice}
            onChange={(e, val) => setMaxPrice(val)}
            valueLabelDisplay="auto"
            min={0}
            max={8000}
            step={100}
            sx={{
              color: "#ea580c",
              height: 4,
              '& .MuiSlider-thumb': {
                width: 18,
                height: 18,
                backgroundColor: '#ea580c',
                '&:hover': { boxShadow: '0 0 0 8px rgba(234, 88, 12, 0.16)' }
              },
              '& .MuiSlider-track': { backgroundColor: '#ea580c' },
              '& .MuiSlider-rail': { backgroundColor: '#d1d5db' },
            }}
          />
        </div>
        <div className="flex justify-between text-[10px] text-gray-400 mt-1">
          <span>₹0</span><span>₹2000</span><span>₹4000</span><span>₹6000</span><span>₹8000</span>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      
      {/* HEADER BANNER */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white text-center py-8">
        <h1 className="text-3xl font-bold">Men's Wallets Collection</h1>
        <p className="mt-2 text-white/80 text-sm">Style Meets Functionality for Everyday Carry</p>
      </div>
<nav className="flex items-center gap-2 text-sm text-gray-500 mt-3 !pl-7">
            <Link to="/" className="!text-lg !no-underline !font-semibold !text-[#1E2D42] transition-colors">Home</Link>
            <span className="text-lg !font-medium">/</span>
            <span className="text-lg !font-medium text-[#E4921A]">Wallets</span>
          </nav>
          <h2 className="text-2xl !font-bold !mt-3 !mb-3 !pl-7">Wallets</h2>
      {/* MOBILE FILTER BUTTON */}
      <div className="md:hidden px-4 pt-4">
        <button 
          onClick={() => setMobileFiltersOpen(true)} 
          className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm w-full justify-between border"
        >
          <span className="font-medium text-gray-700">Filters</span>
          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* MOBILE FILTER DRAWER */}
      {mobileFiltersOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/50" onClick={() => setMobileFiltersOpen(false)}>
          <div className="absolute top-0 left-0 w-80 h-full bg-white shadow-xl overflow-y-auto p-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4 pb-2 border-b">
              <h2 className="font-bold text-lg">Filters</h2>
              <button onClick={() => setMobileFiltersOpen(false)} className="p-1">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <FilterSidebar />
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto p-4">
        <div className="flex gap-6">
          
          {/* DESKTOP SIDEBAR */}
          <div className="w-72 hidden md:block sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto">
            <FilterSidebar />
          </div>

          {/* PRODUCT SECTION */}
          <div className="flex-1">
            <div className="bg-white rounded-xl shadow-sm p-3 mb-4 flex justify-between items-center flex-wrap gap-2">
              <div className="text-xs text-gray-500">
                Showing <span className="font-semibold text-gray-700">{filteredProducts.length}</span> products
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">Sort by:</span>
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)} 
                  className="border rounded-lg px-3 py-1.5 text-xs font-medium focus:outline-none focus:border-orange-500"
                >
                  <option value="default">Default</option>
                  <option value="price_low">Price: Low to High</option>
                  <option value="price_high">Price: High to Low</option>
                </select>
              </div>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                <div className="text-5xl mb-4"></div>
                <p className="text-gray-500 text-sm">No Wallets found matching your filters.</p>
                <button 
                  onClick={clearAllFilters}
                  className="mt-4 text-orange-600 text-sm font-medium hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Wallets;