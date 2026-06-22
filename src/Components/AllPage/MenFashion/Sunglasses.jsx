import { useEffect, useState } from "react";
import ProductCard from "../ProductCard";
import { loadAllProducts } from "../ProductsData";
import { Slider } from "@mui/material";
import { Link } from 'react-router-dom';
// ✅ SUNGLASSES FILTER DATA
const FILTER_CONFIG = {
  // Frame Shape
  frameShape: [
    "Aviator", "Wayfarer", "Round", "Square", "Rectangle", 
    "Oval", "Cat Eye", "Clubmaster", "Shield", "Geometric",
    "Butterfly", "Sport Wrap", "Pilot", "Navigator", "D-Frame"
  ],
  
  // Lens Type
  lensType: [
    "Single Vision", "Progressive", "Bifocal", "Polarized", 
    "Photochromic", "Mirrored", "Gradient", "Tinted", 
    "UV400", "Blue Light Blocking", "Anti-Glare", "HD"
  ],
  
  // Frame Material
  frameMaterial: [
    "Acetate", "Plastic", "Metal", "Stainless Steel", "Titanium",
    "Aluminum", "Nylon", "TR90", "Polycarbonate", "Wood",
    "Horn", "Carbon Fiber", "Brass", "Copper", "Flexon"
  ],
  
  // Frame Color
  frameColor: [
    "Black", "Brown", "Tortoise", "Gold", "Silver", "Gunmetal",
    "Navy Blue", "Red", "Blue", "Green", "White", "Gray",
    "Crystal Clear", "Rose Gold", "Matte Black", "Olive", "Maroon"
  ],
  
  // Lens Color
  lensColor: [
    "Black", "Brown", "Green", "Blue", "Gray", "Yellow",
    "Red", "Rose", "Purple", "Silver Mirror", "Blue Mirror",
    "Green Mirror", "Yellow Mirror", "Clear", "Amber", "Copper"
  ],
  
  // UV Protection Level
  uvProtection: ["UV400", "100% UV Protection", "UV380", "UV Protection", "No UV Protection"],
  
  // Polarization
  polarization: ["Polarized", "Non-Polarized"],
  
  // Lens Technology
  lensTechnology: [
    "Anti-Reflective", "Scratch Resistant", "Anti-Fog", "Hydrophobic",
    "Oleophobic", "Impact Resistant", "Blue Cut", "Smudge Resistant"
  ],
  
  // Gender
  gender: ["Men", "Women", "Unisex", "Kids"],
  
  // Brands
  brands: [
    "Ray-Ban", "Oakley", "Police", "Fastrack", "Titan", "Fossil",
    "Armani Exchange", "Diesel", "Tommy Hilfiger", "Calvin Klein",
    "Nike", "Adidas", "Puma", "Reebok", "New Balance",
    "Vogue", "Persol", "Maui Jim", "Costa Del Mar", "Bolle",
    "Lenskart", "Vincent Chase", "John Jacobs", "IDEE"
  ]
};

function Sunglasses() {
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
    frameShape: [],
    lensType: [],
    frameMaterial: [],
    frameColor: [],
    lensColor: [],
    uvProtection: [],
    polarization: [],
    lensTechnology: [],
    gender: [],
    brands: []
  });
  
  // 🔥 ACCORDION SECTIONS STATE
  const [openSections, setOpenSections] = useState({
    frameShape: true,
    lensType: false,
    frameMaterial: true,
    frameColor: true,
    lensColor: false,
    uvProtection: false,
    polarization: false,
    lensTechnology: false,
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
      frameShape: [],
      lensType: [],
      frameMaterial: [],
      frameColor: [],
      lensColor: [],
      uvProtection: [],
      polarization: [],
      lensTechnology: [],
      gender: [],
      brands: []
    });
    setMaxPrice(5000);
    setSortBy("default");
  };

  // ✅ ONLY SUNGLASSES PRODUCTS
  let filteredProducts = products.filter(
    (p) => p.category?.toLowerCase().trim() === "sunglasses"
  );

  // Apply all filters
  filteredProducts = filteredProducts.filter((product) => {
    // Price filter
    if (product.offerPrice > maxPrice) return false;
    
    // Frame Shape filter
    if (filters.frameShape.length > 0 && !filters.frameShape.includes(product.frameShape)) return false;
    
    // Lens Type filter
    if (filters.lensType.length > 0 && !filters.lensType.includes(product.lensType)) return false;
    
    // Frame Material filter
    if (filters.frameMaterial.length > 0 && !filters.frameMaterial.includes(product.frameMaterial)) return false;
    
    // Frame Color filter
    if (filters.frameColor.length > 0 && !filters.frameColor.includes(product.frameColor)) return false;
    
    // Lens Color filter
    if (filters.lensColor.length > 0 && !filters.lensColor.includes(product.lensColor)) return false;
    
    // UV Protection filter
    if (filters.uvProtection.length > 0 && !filters.uvProtection.includes(product.uvProtection)) return false;
    
    // Polarization filter
    if (filters.polarization.length > 0 && !filters.polarization.includes(product.polarization)) return false;
    
    // Lens Technology filter
    if (filters.lensTechnology.length > 0 && !filters.lensTechnology.includes(product.lensTechnology)) return false;
    
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
      
      {/* Frame Shape Section */}
      <AccordionSection title=" Frame Shape" sectionKey="frameShape" items={FILTER_CONFIG.frameShape} />
      
      {/* Lens Type Section */}
      <AccordionSection title=" Lens Type" sectionKey="lensType" items={FILTER_CONFIG.lensType} />
      
      {/* Frame Material Section */}
      <AccordionSection title=" Frame Material" sectionKey="frameMaterial" items={FILTER_CONFIG.frameMaterial} />
      
      {/* Frame Color Section */}
      <AccordionSection title=" Frame Color" sectionKey="frameColor" items={FILTER_CONFIG.frameColor} />
      
      {/* Lens Color Section */}
      <AccordionSection title=" Lens Color" sectionKey="lensColor" items={FILTER_CONFIG.lensColor} />
      
      {/* UV Protection Section */}
      <AccordionSection title=" UV Protection" sectionKey="uvProtection" items={FILTER_CONFIG.uvProtection} />
      
      {/* Polarization Section */}
      <AccordionSection title=" Polarization" sectionKey="polarization" items={FILTER_CONFIG.polarization} />
      
      {/* Lens Technology Section */}
      <AccordionSection title=" Lens Technology" sectionKey="lensTechnology" items={FILTER_CONFIG.lensTechnology} />
      
      {/* Gender Section */}
      <AccordionSection title=" Gender" sectionKey="gender" items={FILTER_CONFIG.gender} />
      
      {/* Brands Section */}
      <AccordionSection title=" Brands" sectionKey="brands" items={FILTER_CONFIG.brands} />

      {/* Price Slider */}
      <div className="mb-4 pt-2">
        <h2 className="font-bold text-gray-800 text-sm mb-2">Max Price: ₹{maxPrice}</h2>
        <div className="px-1">
          <Slider
            value={maxPrice}
            onChange={(e, val) => setMaxPrice(val)}
            valueLabelDisplay="auto"
            min={0}
            max={25000}
            step={500}
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
          <span>₹0</span><span>₹6250</span><span>₹12500</span><span>₹18750</span><span>₹25000</span>
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
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-8">
        <h1 className="text-3xl font-bold">Men's Sunglasses Collection</h1>
        <p className="mt-2 text-white/80 text-sm">Protect Your Eyes in Style</p>
      </div>
 <nav className="flex items-center gap-2 text-sm text-gray-500 mt-3 !pl-7">
            <Link to="/" className="!text-lg !no-underline !font-semibold !text-[#1E2D42] transition-colors">Home</Link>
            <span className="text-lg !font-medium">/</span>
            <span className="text-lg !font-medium text-[#E4921A]">Sunglasses</span>
          </nav>
          <h2 className="text-2xl !font-bold !mt-3 !mb-3 !pl-7">Sunglasses</h2>
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
                <p className="text-gray-500 text-sm">No Sunglasses found matching your filters.</p>
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

export default Sunglasses;