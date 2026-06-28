import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Slider } from "@mui/material";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import ProductCard from '../ProductCard';
import { loadAllProducts } from '../ProductsData';

// 🧴 SHAMPOO & CONDITIONER FILTER CONFIGURATION
const FILTER_CONFIG = {
  brands: ["Pantene", "Dove", "Sunsilk", "L'Oreal", "Matrix", "TRESemmé", "Head & Shoulders", "Herbal Essences", "OGX", "Mamaearth"],
  hairType: ["Dry Hair", "Oily Hair", "Normal Hair", "Damaged Hair", "Colored Hair", "Curly Hair", "Straight Hair", "Fine Hair", "Thick Hair"],
  formulation: ["Sulfate-Free", "Paraben-Free", "Silicon-Free", "Natural", "Organic", "Anti-Dandruff", "Volumizing", "Smoothing"],
  size: ["100ml", "200ml", "340ml", "400ml", "500ml", "650ml", "1L", "Set of 2", "Set of 3", "Travel Size"]
};

// Beauty Categories for Sidebar
const beautyCategories = [
  { 
    title: "Makeup", 
    slug: "makeup",
    items: [
      { name: "Lipstick", slug: "lipstick" },
      { name: "Eye Shadow", slug: "eye-shadow" },
      { name: "Face Makeup", slug: "face-makeup" },
      { name: "Nail Makeup", slug: "nail-makeup" },
      { name: "Brushes", slug: "brushes" },
      { name: "Hair Remover", slug: "hair-remover" },
      { name: "Perfume", slug: "perfume" },
      { name: "Cream", slug: "cream" },
      { name: "Foundation", slug: "foundation" }
    ]
  },
  { 
    title: "Skin Care", 
    slug: "skin-care",
    items: [
      { name: "Face Wash", slug: "face-wash" },
      { name: "Summer", slug: "summer" },
      { name: "Vaseline", slug: "vaseline" }
    ]
  },
  { 
    title: "Hair Care", 
    slug: "hair-care",
    items: [
      { name: "Shampoo & Conditioner", slug: "shampoo-conditioner" },
      { name: "Hair Oil", slug: "hair-oil" },
      { name: "Hair Serum", slug: "hair-serum" }
    ]
  },
  { 
    title: "Beauty Care", 
    slug: "beauty-care",
    items: [
      { name: "Body Lotion", slug: "body-lotion" },
      { name: "Hair Oil", slug: "hair-oil" },
      { name: "White Creams", slug: "white-creams" },
      { name: "Face Wash", slug: "face-wash" },
      { name: "Face Oil", slug: "face-oil" }
    ]
  },
  { 
    title: "Health Care", 
    slug: "health-care",
    items: [
      { name: "Ear Cleaner", slug: "ear-cleaner" },
      { name: "Foot Care", slug: "foot-care" },
      { name: "Oral Care", slug: "oral-care" },
      { name: "Monitor & Massagers", slug: "monitor-massagers" },
      { name: "Winter Healthcare", slug: "winter-healthcare" }
    ]
  },
  { 
    title: "Tools & Accessories", 
    slug: "tools-accessories",
    items: [
      { name: "Makeup Brushes", slug: "makeup-brushes" },
      { name: "Sponges", slug: "sponges" },
      { name: "Mirrors", slug: "mirrors" },
      { name: "Beauty Blender", slug: "beauty-blender" }
    ]
  }
];

function Shampooconditioner() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [maxPrice, setMaxPrice] = useState(5000);
  const [sortBy, setSortBy] = useState("default");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  
  const [filters, setFilters] = useState({ 
    brands: [], 
    hairType: [], 
    formulation: [], 
    size: [] 
  });
  
  const [openSections, setOpenSections] = useState({ 
    brands: true, 
    hairType: true, 
    formulation: true, 
    size: true 
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await loadAllProducts();
      setProducts(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  const shampooConditionerProducts = products.filter((p) => 
    p.category?.toLowerCase() === 'shampoo & conditioner' || 
    p.name?.toLowerCase().includes('shampoo') ||
    p.name?.toLowerCase().includes('conditioner')
  );

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleFilterToggle = (key, value, isSingleSelect = false) => {
    setFilters((prev) => {
      const current = prev[key];
      if (isSingleSelect) {
        return { ...prev, [key]: current.includes(value) ? [] : [value] };
      }
      return {
        ...prev,
        [key]: current.includes(value) ? current.filter((item) => item !== value) : [...current, value]
      };
    });
  };

  const clearAllFilters = () => {
    setFilters({ brands: [], hairType: [], formulation: [], size: [] });
    setMaxPrice(5000);
  };

  const filteredProducts = shampooConditionerProducts
    .filter((product) => {
      if (product.offerPrice > maxPrice) return false;
      if (filters.brands.length > 0 && !filters.brands.includes(product.brand)) return false;
      if (filters.hairType.length > 0 && !filters.hairType.includes(product.hairType)) return false;
      if (filters.formulation.length > 0 && !filters.formulation.includes(product.formulation)) return false;
      if (filters.size.length > 0 && !product.sizes?.some((s) => filters.size.includes(s))) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "price_low") return a.offerPrice - b.offerPrice;
      if (sortBy === "price_high") return b.offerPrice - a.offerPrice;
      if (sortBy === "newest") return b.id - a.id;
      if (sortBy === "popular") return (b.rating || 0) - (a.rating || 0);
      return 0;
    });

  const AccordionSection = ({ title, sectionKey, items }) => (
    <div className="mb-4 border-b border-gray-100 pb-3">
      <button 
        onClick={() => toggleSection(sectionKey)} 
        className="flex justify-between items-center w-full font-semibold text-gray-800 text-sm mb-2 hover:text-orange-600 transition"
      >
        <span>{title}</span>
        {openSections[sectionKey] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      
      {openSections[sectionKey] && (
        <div className="grid grid-cols-1 gap-1.5 max-h-60 overflow-y-auto pr-1">
          {items.map((item, index) => (
            <label key={index} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1.5 rounded transition">
              <input 
                type="checkbox" 
                checked={filters[sectionKey]?.includes(item) || false}
                onChange={() => handleFilterToggle(sectionKey, item)} 
                className="w-3.5 h-3.5 !mr-2 rounded border-gray-300 text-orange-600 focus:ring-orange-500" 
              />
              <span className="text-gray-600 !text-sm">{item}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );

  const FilterSidebar = () => (
    <div className="bg-white p-4 rounded-xl shadow-sm space-y-4">
      <div className="flex justify-between items-center border-b pb-3">
        <h2 className="font-bold text-base text-gray-800">Shampoo & Conditioner Filters</h2>
        <button onClick={clearAllFilters} className="text-orange-600 text-xs font-semibold hover:underline">Clear All</button>
      </div>

      <AccordionSection title=" Brand" sectionKey="brands" items={FILTER_CONFIG.brands} />
      <AccordionSection title=" Hair Type" sectionKey="hairType" items={FILTER_CONFIG.hairType} />
      <AccordionSection title=" Formulation" sectionKey="formulation" items={FILTER_CONFIG.formulation} />

      <div className="mb-4 border-b border-gray-100 pb-3">
        <button onClick={() => toggleSection('size')} className="flex justify-between items-center w-full font-semibold text-gray-800 text-sm mb-2">
          <span> Size</span>
          {openSections.size ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        {openSections.size && (
          <div className="flex gap-2 flex-wrap pt-1">
            {FILTER_CONFIG.size.map((size, idx) => (
              <button
                key={idx}
                onClick={() => handleFilterToggle('size', size, true)}
                className={`border px-3 py-1.5 rounded-md text-xs font-medium transition ${
                  filters.size.includes(size) ? 'bg-orange-600 text-white border-orange-600' : 'border-gray-200 hover:border-orange-500 text-gray-600 bg-white'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="mb-2 pb-3">
        <h2 className="font-semibold text-gray-800 text-sm mb-1">  Max Price: ₹{maxPrice}</h2>
        <Slider
          value={maxPrice}
          onChange={(e, val) => setMaxPrice(val)}
          min={0}
          max={5000}
          step={50}
          sx={{
            color: "#ea580c",
            height: 4,
            '& .MuiSlider-thumb': { width: 16, height: 16, backgroundColor: '#ea580c' }
          }}
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>₹0</span>
          <span>₹5000</span>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
        <div className="mx-4 my-4 !shadow-3xl shadow-red-900/30 bg-[#1E2D42] bg-gradient-to-br from-[#EE971D] to-[#1E2D42] rounded-xl text-white text-center py-12 ">
        <h1 className="text-3xl font-bold">Shampoo & Conditioner</h1>
        <p className="mt-2 text-white/80 text-sm">Timeless Elegance for Every Occasion</p>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mt-3">
          <Link to="/" className="!text-lg !no-underline !font-semibold !text-[#1E2D42] transition-colors">Home</Link>
          <span className="text-lg !font-medium">/</span>
          <span className="text-lg !font-medium text-[#E4921A]">Shampoo & Conditioner</span>
        </nav>
        <h2 className="text-2xl !font-bold !mt-3 !mb-3">Shampoo & Conditioner</h2>


        {/* Mobile Filter Button */}
        <div className="md:hidden mb-4">
          <button 
            onClick={() => setMobileFiltersOpen(true)} 
            className="flex items-center bg-white px-4 py-3 rounded-xl shadow-sm w-full justify-between border"
          >
            <span className="font-bold text-sm text-gray-700">Refine Shampoo & Conditioner</span>
            <Menu size={18} />
          </button>
        </div>

        {/* Mobile Filter Drawer */}
        {mobileFiltersOpen && (
          <div className="md:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" onClick={() => setMobileFiltersOpen(false)}>
            <div className="absolute top-0 left-0 w-80 h-full bg-white overflow-y-auto p-4 flex flex-col" onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-center border-b pb-3 mb-2">
                <h2 className="font-black text-gray-800"> Shampoo & Conditioner Filters</h2>
                <button onClick={() => setMobileFiltersOpen(false)} className="text-gray-500 p-1"><X size={20} /></button>
              </div>
              <FilterSidebar />
            </div>
          </div>
        )}

        {/* Main Content with Sidebar */}
        <div className="flex flex-col md:flex-row gap-6">
          
          {/* Sidebar */}
          <aside className="w-full md:w-64 flex-shrink-0">
            {/* Categories Sidebar */}
  

            {/* Filter Sidebar - Hidden on mobile, visible on desktop */}
            <div className="hidden md:block">
              <FilterSidebar />
            </div>
          </aside>

          {/* Products Grid */}
          <main className="flex-1">
            {/* Sort and Count Bar */}
            <div className="bg-white rounded-xl p-3 mb-4 border border-gray-100 flex justify-between items-center shadow-sm">
              <span className="!text-xs !text-gray-500 !font-medium">
                Found <span className="text-orange-600 font-bold">{filteredProducts.length}</span> shampoo & conditioner products
              </span>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)} 
                className="border border-gray-200 outline-none rounded-lg px-3 py-1.5 text-xs text-gray-700 font-medium bg-gray-50 cursor-pointer"
              >
                <option value="default">Sort by: Default</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
                <option value="newest">Newest First</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl border p-12 text-center shadow-sm">
                <div className="mb-4">
                  <span className="text-6xl">🧴</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-500 mb-2">No Shampoo & Conditioner Found</h2>
                <p className="text-gray-400">No shampoo & conditioner products match your filters.</p>
                <button onClick={clearAllFilters} className="text-orange-600 text-xs font-bold mt-2 underline">Reset Filters</button>
              </div>
            )}
          </main>

        </div>

      </div>
    </div>
  );
}

export default Shampooconditioner;