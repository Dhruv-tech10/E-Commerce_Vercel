// src/Components/AllPage/Icons/IconBeauty.jsx
import { useEffect, useState } from "react";
import ProductCard from "../ProductCard";
import { loadAllProducts } from "../ProductsData";
import { Slider } from "@mui/material";
import { Link } from 'react-router-dom';

// ✅ BEAUTY FILTER CONFIG
const FILTER_CONFIG = {
  // Categories - All from BeautyRouter
  categories: [
    "Lipstick", "Eye Shadow", "Face Makup", "Nailpolish", 
    "Brushes", "Hair Remover", "Foundation", "Cream",
    "Face Wash", "Vaseline",
    "Shampoo & conditioner", "Hair Oil", "Hair Serum",
    "Body Lotion", "Whitening Creams", "Soap", "Face Oil",
    "Ear Cleaner", "Foot Care", "Oral Care", 
    "Monitor & Massagers", "Winter Healthcare"
  ],
  
  // Skin Type
  skinType: [
    "All Skin Types", "Oily Skin", "Dry Skin", "Combination Skin", 
    "Sensitive Skin", "Normal Skin", "Acne Prone", "Mature Skin"
  ],
  
  // Concern
  concerns: [
    "Acne", "Pigmentation", "Wrinkles", "Dryness", 
    "Oiliness", "Dullness", "Dark Circles", "Pores",
    "Sun Protection", "Anti-Aging", "Hydration", "Brightening"
  ],
  
  // Size
  sizes: ["Small", "Medium", "Large", "Travel Size", "Full Size"],
  
  // Color
  colors: [
    "Red", "Pink", "Nude", "Brown", "Black", 
    "White", "Gold", "Silver", "Rose Gold", "Coral",
    "Plum", "Berry", "Mauve", "Peach", "Orange",
    "Purple", "Blue", "Green", "Yellow", "Glitter"
  ],
  
  // Brands
  brands: [
    "Maybelline", "Lakme", "Himalaya", "Dove", 
    "Nivea", "Mamaearth", "Biotique", "Ponds",
    "L'Oreal", "NYX", "MAC", "Estee Lauder",
    "Clinique", "The Body Shop", "Forest Essentials", "Kama Ayurveda",
    "Sugar", "Colorbar", "Faces", "Revlon",
    "Vaseline", "Johnson's", "Cetaphil", "Neutrogena"
  ]
};

function IconBeauty() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // 🔥 PRICE RANGE STATE
  const [maxPrice, setMaxPrice] = useState(5000);
  
  // 🔥 SORT STATE
  const [sortBy, setSortBy] = useState("default");
  
  // 🔥 MOBILE FILTER STATE
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  
  // 🔥 FILTER STATE
  const [filters, setFilters] = useState({
    categories: [],
    skinType: [],
    concerns: [],
    sizes: [],
    colors: [],
    brands: []
  });
  
  // 🔥 ACCORDION SECTIONS STATE
  const [openSections, setOpenSections] = useState({
    categories: true,
    skinType: true,
    concerns: true,
    sizes: true,
    colors: true,
    brands: true
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await loadAllProducts();
        console.log("All Products:", data.length);
        
        // ✅ Filter ALL Beauty products
        const beautyProducts = data.filter(p => {
          const category = p.category?.toLowerCase() || '';
          const name = p.name?.toLowerCase() || '';
          
          const beautyCategories = [
            'lipstick', 'eye shadow', 'face makeup', 'nailpolish', 
            'brushes', 'hair remover', 'foundation', 'cream',
            'face wash', 'vaseline',
            'shampoo', 'conditioner', 'hair oil', 'hair serum',
            'body lotion', 'whitening creams', 'soap', 'face oil',
            'ear cleaner', 'foot care', 'oral care', 
            'monitor', 'massagers', 'winter healthcare',
            'beauty', 'cosmetics', 'makeup', 'skincare', 
            'hair care', 'lotion', 'moisturizer', 'sunscreen'
          ];
          
          return beautyCategories.some(beautyCat => 
            category.includes(beautyCat) || name.includes(beautyCat)
          );
        });
        
        console.log("Beauty Products Found:", beautyProducts.length);
        setProducts(beautyProducts);
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
      categories: [],
      skinType: [],
      concerns: [],
      sizes: [],
      colors: [],
      brands: []
    });
    setMaxPrice(5000);
    setSortBy("default");
  };

  // ✅ FILTER PRODUCTS
  let filteredProducts = [...products];

  filteredProducts = filteredProducts.filter((product) => {
    // Price filter
    if (product.offerPrice > maxPrice) return false;
    
    // Category filter
    if (filters.categories.length > 0) {
      const match = filters.categories.some(cat => 
        product.category?.toLowerCase().includes(cat.toLowerCase())
      );
      if (!match) return false;
    }
    
    // Skin Type filter
    if (filters.skinType.length > 0 && !filters.skinType.includes(product.skinType)) return false;
    
    // Concerns filter
    if (filters.concerns.length > 0 && !filters.concerns.includes(product.concern)) return false;
    
    // Size filter
    if (filters.sizes.length > 0) {
      const match = filters.sizes.some(size => 
        product.size?.toLowerCase().includes(size.toLowerCase()) ||
        product.sizes?.some(s => s.toLowerCase().includes(size.toLowerCase()))
      );
      if (!match) return false;
    }
    
    // Color filter
    if (filters.colors.length > 0 && !filters.colors.includes(product.color)) return false;
    
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
        className="flex justify-between items-center w-full font-bold text-gray-800 text-sm mb-2 hover:text-pink-600 transition"
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
                className="w-3.5 h-3.5 !mr-2  rounded border-gray-300 text-pink-600 focus:ring-pink-500" 
              />
              <span className="text-gray-600 !text-sm">{item}</span>
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
        <button onClick={clearAllFilters} className="text-pink-600 text-xs font-semibold hover:underline">Clear All</button>
      </div>
      
      <AccordionSection title=" Categories" sectionKey="categories" items={FILTER_CONFIG.categories} />
      <AccordionSection title=" Skin Type" sectionKey="skinType" items={FILTER_CONFIG.skinType} />
      <AccordionSection title=" Concerns" sectionKey="concerns" items={FILTER_CONFIG.concerns} />
      <AccordionSection title=" Size" sectionKey="sizes" items={FILTER_CONFIG.sizes} />
      <AccordionSection title=" Color" sectionKey="colors" items={FILTER_CONFIG.colors} />
      <AccordionSection title=" Brands" sectionKey="brands" items={FILTER_CONFIG.brands} />

      <div className="mb-4 pt-2">
        <h2 className="font-bold text-gray-800 text-sm mb-2"> Max Price: ₹{maxPrice}</h2>
        <div className="px-1">
          <Slider
            value={maxPrice}
            onChange={(e, val) => setMaxPrice(val)}
            valueLabelDisplay="auto"
            min={0}
            max={20000}
            step={500}
            sx={{
              color: "#ec4899",
              height: 4,
              '& .MuiSlider-thumb': {
                width: 18,
                height: 18,
                backgroundColor: '#ec4899',
                '&:hover': { boxShadow: '0 0 0 8px rgba(236, 72, 153, 0.16)' }
              },
              '& .MuiSlider-track': { backgroundColor: '#ec4899' },
              '& .MuiSlider-rail': { backgroundColor: '#d1d5db' },
            }}
          />
        </div>
        <div className="flex justify-between text-[10px] text-gray-400 mt-1">
          <span>₹0</span><span>₹5000</span><span>₹10000</span><span>₹15000</span><span>₹20000</span>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      
      {/* HEADER BANNER */}
      <div className="mx-4 my-4 !shadow-3xl shadow-red-900/30 bg-[#1E2D42] bg-gradient-to-br from-[#EE971D] to-[#1E2D42] rounded-xl text-white text-center py-12 ">
        <h1 className="text-3xl font-bold">Beauty Collection</h1>
        <p className="mt-2 text-white/80 text-sm">Discover Your Perfect Beauty Routine</p>
      </div>

      <nav className="flex items-center gap-2 text-sm text-gray-500 mt-3 pl-7">
        <Link to="/" className="text-lg !no-underline font-semibold !text-[#1E2D42] transition-colors">Home</Link>
        <span className="text-lg font-medium">/</span>
        <span className="text-lg font-medium text-[#E4921A]">Beauty Collection</span>
      </nav>
      <h2 className="text-2xl font-bold mt-3 mb-3 pl-7">Beauty Collection</h2>

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
                  className="border rounded-lg px-3 py-1.5 text-xs font-medium focus:outline-none focus:border-pink-500"
                >
                  <option value="default">Default</option>
                  <option value="price_low">Price: Low to High</option>
                  <option value="price_high">Price: High to Low</option>
                </select>
              </div>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                <div className="text-5xl mb-4">💄</div>
                <p className="text-gray-500 text-sm">No Beauty products found matching your filters.</p>
                <button 
                  onClick={clearAllFilters}
                  className="mt-4 text-pink-600 text-sm font-medium hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4">
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

export default IconBeauty;