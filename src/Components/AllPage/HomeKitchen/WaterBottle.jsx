// src/component/WaterBottle.jsx
import { useEffect, useState } from "react";
import ProductCard from "../ProductCard";
import { loadAllProducts } from "../ProductsData";
import { Slider } from "@mui/material";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import { Link } from 'react-router-dom';
const FILTER_CONFIG = {
  // Bottle Type
  type: [
    "Water Bottle", "Sports Bottle", "Gym Bottle", "Travel Bottle",
    "Insulated Bottle", "Vacuum Flask", "Copper Bottle", "Glass Bottle",
    "Steel Bottle", "Plastic Bottle", "Collapsible Bottle", "Foldable Bottle",
    "Infuser Bottle", "Fruit Infuser", "Alkaline Bottle", "Copper Vessel",
    "Thermos", "Hydro Flask", "Squeeze Bottle", "Shaker Bottle", "BPA Free Bottle",
    "Stainless Steel Bottle", "Double Wall Bottle", "Vacuum Insulated", "Thermal Bottle"
  ],
  
  // Capacity
  capacity: [
    "250ml", "350ml", "400ml", "500ml", "600ml", "700ml", "750ml", "800ml",
    "900ml", "1000ml", "1L", "1.2L", "1.5L", "1.8L", "2L", "2.2L", "2.5L", "3L",
    "3.5L", "4L", "5L", "6L", "8L", "10L"
  ],
  
  // Material
  material: [
    "Stainless Steel", "Plastic", "Glass", "Copper", "Aluminum", "Tritan",
    "Silicone", "Polypropylene (PP)", "Polycarbonate", "Borosilicate Glass",
    "Copper with Steel", "Double Wall Vacuum", "304 Stainless Steel", "18/8 Steel",
    "316 Stainless Steel", "Titanium", "Ceramic", "Bamboo", "Coconut Shell"
  ],
  
  // Color
  color: [
    "Black", "White", "Silver", "Gray", "Blue", "Red", "Green", "Pink",
    "Purple", "Orange", "Yellow", "Teal", "Navy Blue", "Rose Gold", "Gold",
    "Copper", "Multicolor", "Matte Black", "Glossy White", "Transparent",
    "Coral", "Lavender", "Turquoise", "Bronze", "Chrome"
  ],
  
  // Insulation
  insulation: [
    "Double Wall Vacuum", "Triple Wall Vacuum", "Single Wall", "Insulated",
    "Non-Insulated", "Hot & Cold", "Hot 12hrs", "Cold 24hrs", "Thermal",
    "Temperature Retention", "Ice Retention", "Vacuum Insulated", "Cooler"
  ],
  
  // Lid Type
  lidType: [
    "Screw Cap", "Flip Top", "Pop Up", "Straw Lid", "Wide Mouth", 
    "Narrow Mouth", "Chug Cap", "Mug Cap", "Carabiner Cap", "Push Button",
    "Leak Proof", "Spout Lid", "Cork Lid", "Bamboo Lid", "Stainless Steel Lid",
    "Screw Top", "Snap Lid", "Twist Cap", "Sports Cap", "Straw Cap"
  ],
  
  // Features
  features: [
    "Leak Proof", "BPA Free", "Dishwasher Safe", "Hand Wash Only",
    "Carry Loop", "Carabiner Clip", "Sleeve Included", "Fruit Infuser",
    "Time Marker", "Measurement Marks", "Wide Mouth", "Ice Cube Friendly",
    "Sweat Proof", "Rust Proof", "Odor Resistant", "Taste Neutral",
    "Shaker Ball", "Straw Included", "Cleaning Brush", "Gift Box", "Lifetime Warranty",
    "Anti-Slip Grip", "Non-Slip Base", "Strap Included", "Belt Clip", "ID Tag"
  ],
  
  // Bottle Shape
  shape: ["Round", "Square", "Tapered", "Cylindrical", "Bullet Shape", "Flask Shape", "Tumbler Shape", "Flat", "Ergonomic", "Hourglass"],
  
  // Brand
  brand: [
    "Milton", "Cello", "Prestige", "Pigeon", "Borosil", "Tupperware", "Nike",
    "Adidas", "Puma", "MuscleBlaze", "Healthfarm", "Cellin", "Stor Plus",
    "Bottle Pro", "Quba", "Copperplus", "Nutrifit", "Hydro Flask", "Yeti",
    "Thermos", "Contigo", "Nalgene", "CamelBak", "Owala", "S'well",
    "Klean Kanteen", "Takeya", "Iron Flask", "Simple Modern", "Mira",
    "Amazon Basics", "Solimo", "Fastrack", "Titan", "Zebronics", "Portronics"
  ]
};

function WaterBottle() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [maxPrice, setMaxPrice] = useState(800);
  const [sortBy, setSortBy] = useState("default");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  
  const [filters, setFilters] = useState({ 
    type: [], capacity: [], material: [], color: [], insulation: [], 
    lidType: [], features: [], shape: [], brand: [] 
  });
  
  const [openSections, setOpenSections] = useState({
    type: true, capacity: true, material: true, color: true, insulation: false,
    lidType: false, features: false, shape: false, brand: false
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await loadAllProducts();
        setProducts(data);
      } catch (error) {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const toggleSection = (section) => setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  
  const handleFilterToggle = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: prev[key].includes(value) ? prev[key].filter(v => v !== value) : [...prev[key], value]
    }));
  };
  
  const clearAllFilters = () => {
    setFilters({ 
      type: [], capacity: [], material: [], color: [], insulation: [], 
      lidType: [], features: [], shape: [], brand: [] 
    });
    setMaxPrice(5000);
    setSortBy("default");
  };

  let filteredProducts = products.filter(p => 
    p.category?.toLowerCase() === "water bottle" ||
    p.subCategory?.toLowerCase() === "water-bottle" ||
    p.name?.toLowerCase().includes("water bottle") ||
    p.name?.toLowerCase().includes("copper bottle") ||
    p.name?.toLowerCase().includes("insulated bottle") ||
    p.name?.toLowerCase().includes("flask") ||
    p.name?.toLowerCase().includes("thermos") ||
    p.name?.toLowerCase().includes("hydro flask")
  );

  filteredProducts = filteredProducts.filter((product) => {
    if (product.offerPrice > maxPrice) return false;
    if (filters.type.length > 0 && !filters.type.includes(product.type)) return false;
    if (filters.capacity.length > 0 && !filters.capacity.includes(product.capacity)) return false;
    if (filters.material.length > 0 && !filters.material.includes(product.material)) return false;
    if (filters.color.length > 0 && !filters.color.includes(product.color)) return false;
    if (filters.insulation.length > 0 && !filters.insulation.includes(product.insulation)) return false;
    if (filters.lidType.length > 0 && !filters.lidType.includes(product.lidType)) return false;
    if (filters.features.length > 0 && !filters.features.some(f => product.features?.includes(f))) return false;
    if (filters.shape.length > 0 && !filters.shape.includes(product.shape)) return false;
    if (filters.brand.length > 0 && !filters.brand.includes(product.brand)) return false;
    return true;
  });

  if (sortBy === "price_low") filteredProducts.sort((a, b) => a.offerPrice - b.offerPrice);
  if (sortBy === "price_high") filteredProducts.sort((a, b) => b.offerPrice - a.offerPrice);
  if (sortBy === "name_asc") filteredProducts.sort((a, b) => a.name?.localeCompare(b.name));
  if (sortBy === "name_desc") filteredProducts.sort((a, b) => b.name?.localeCompare(a.name));

  const AccordionSection = ({ title, sectionKey, items }) => (
    <div className="mb-4 border-b border-gray-100 pb-3">
      <button onClick={() => toggleSection(sectionKey)} className="flex justify-between w-full font-bold text-gray-800 text-sm mb-2 hover:text-blue-600 transition">
        <span>{title}</span>
        {openSections[sectionKey] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      {openSections[sectionKey] && (
        <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
          {items.map((item, index) => (
            <label key={index} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
              <input type="checkbox" checked={filters[sectionKey]?.includes(item)} onChange={() => handleFilterToggle(sectionKey, item)} 
                className="w-3.5 h-3.5 rounded border-gray-300 text-blue-600" />
              <span className="text-gray-600 text-xs">{item}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );

  const FilterSidebar = () => (
    <div className="bg-white p-4 rounded-xl shadow-sm sticky top-20">
      <div className="flex justify-between items-center mb-4 border-b pb-3">
        <h2 className="font-bold">Filters</h2>
        <button onClick={clearAllFilters} className="text-blue-600 text-xs hover:underline">Clear All</button>
      </div>
      <AccordionSection title=" Bottle Type" sectionKey="type" items={FILTER_CONFIG.type} />
      <AccordionSection title=" Capacity" sectionKey="capacity" items={FILTER_CONFIG.capacity} />
      <AccordionSection title=" Material" sectionKey="material" items={FILTER_CONFIG.material} />
      <AccordionSection title=" Color" sectionKey="color" items={FILTER_CONFIG.color} />
      <AccordionSection title=" Insulation" sectionKey="insulation" items={FILTER_CONFIG.insulation} />
      <AccordionSection title=" Lid Type" sectionKey="lidType" items={FILTER_CONFIG.lidType} />
      <AccordionSection title=" Features" sectionKey="features" items={FILTER_CONFIG.features} />
      <AccordionSection title=" Shape" sectionKey="shape" items={FILTER_CONFIG.shape} />
      <AccordionSection title=" Brand" sectionKey="brand" items={FILTER_CONFIG.brand} />
      <div className="mb-4 pt-2">
        <h2 className="font-bold text-sm mb-2"> Max Price: ₹{maxPrice}</h2>
        <Slider value={maxPrice} onChange={(e, val) => setMaxPrice(val)} min={0} max={8000} step={200}
          sx={{ color: "#2563eb", height: 4, '& .MuiSlider-thumb': { width: 18, height: 18, backgroundColor: '#2563eb' } }} />
      </div>
    </div>
  );

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>;

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-center py-12">
        <h1 className="text-4xl font-bold">Water Bottles</h1>
        <p className="mt-2 text-white/80">Stay Hydrated Anywhere, Anytime</p>
        <div className="mt-4 flex justify-center gap-3 flex-wrap">
          <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs">Insulated Bottles</span>
          <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs">Copper Bottles</span>
          <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs">Sports Bottles</span>
          <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs">Steel Bottles</span>
        </div>
      </div>

 <nav className="flex items-center gap-2 text-sm text-gray-500 mt-3 !pl-7">
            <Link to="/" className="!text-lg !no-underline !font-semibold !text-[#1E2D42] transition-colors">Home</Link>
            <span className="text-lg !font-medium">/</span>
            <span className="text-lg !font-medium text-[#E4921A]">Water Bottles</span>
          </nav>
          <h2 className="text-2xl !font-bold !mt-3 !mb-3 !pl-7">Water Bottles</h2>
      {/* Mobile Filter Button */}
      <div className="md:hidden px-4 pt-4 sticky top-0 z-40 bg-gray-100 pb-2">
        <button onClick={() => setMobileFiltersOpen(true)} className="flex items-center gap-2 bg-white px-4 py-3 rounded-lg shadow-md w-full justify-between border border-gray-200">
          <div className="flex items-center gap-2"><Menu size={20} /><span className="font-medium text-gray-700">Filters</span></div>
          <span className="text-xs text-gray-500">{Object.values(filters).flat().length} active</span>
        </button>
      </div>

      {/* Mobile Filter Drawer */}
      {mobileFiltersOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/60" onClick={() => setMobileFiltersOpen(false)}>
          <div className="absolute top-0 left-0 w-[85%] h-full bg-white overflow-y-auto p-4 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4 pb-2 border-b sticky top-0 bg-white">
              <h2 className="font-bold text-lg">All Filters</h2>
              <button onClick={() => setMobileFiltersOpen(false)} className="p-1 hover:bg-gray-100 rounded"><X size={24} /></button>
            </div>
            <FilterSidebar />
            <div className="sticky bottom-0 bg-white pt-4 pb-2 mt-4 border-t">
              <button onClick={() => setMobileFiltersOpen(false)} className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold">Apply Filters</button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto p-4">
        <div className="flex gap-6">
          {/* LEFT SIDE FILTER SIDEBAR - DESKTOP */}
          <div className="w-72 hidden md:block sticky top-20">
            <FilterSidebar />
          </div>
          
          {/* RIGHT SIDE - PRODUCTS */}
          <div className="flex-1">
            {/* Sort Bar */}
            <div className="bg-white rounded-xl p-3 mb-4 flex justify-between items-center flex-wrap gap-2">
              <span className="text-xs text-gray-500">Showing {filteredProducts.length} products</span>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="border rounded-lg px-3 py-1.5 text-xs">
                <option value="default">Default</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
                <option value="name_asc">Name: A to Z</option>
                <option value="name_desc">Name: Z to A</option>
              </select>
            </div>
            
            {/* Products Grid or Empty State */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-xl p-12 text-center">
                <div className="text-6xl mb-4">💧</div>
                <h3 className="text-xl font-semibold mb-2">No Water Bottles Found</h3>
                <p className="text-gray-500 mb-4">Try adjusting your filters or check back later</p>
                <button onClick={clearAllFilters} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default WaterBottle;