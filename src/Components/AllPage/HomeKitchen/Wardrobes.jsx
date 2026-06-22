// src/component/Wardrobs.jsx
import { useEffect, useState } from "react";
import ProductCard from "../ProductCard";
import { loadAllProducts } from "../ProductsData";
import { Slider } from "@mui/material";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import { Link } from 'react-router-dom';
const FILTER_CONFIG = {
  // Wardrobe Type
  type: [
    "Wardrobe", "Almirah", "Sliding Door Wardrobe", "Hinged Door Wardrobe",
    "Walk-in Wardrobe", "Open Wardrobe", "Corner Wardrobe", "2 Door Wardrobe",
    "3 Door Wardrobe", "4 Door Wardrobe", "1 Door Wardrobe", "Triple Door Wardrobe",
    "Fabric Wardrobe", "Plastic Wardrobe", "Wooden Wardrobe", "Steel Wardrobe",
    "Collapsible Wardrobe", "Portable Wardrobe", "Double Wardrobe", "Single Wardrobe",
    "Built-in Wardrobe", "Modular Wardrobe", "Free Standing Wardrobe"
  ],
  
  // Size
  size: [
    "Small (30x60 inch)", "Medium (36x66 inch)", "Large (48x72 inch)", 
    "Extra Large (60x84 inch)", "Compact (24x48 inch)", "Standard (42x72 inch)",
    "Double (48x78 inch)", "Triple (60x78 inch)", "Corner Unit (36x36 inch)",
    "Tall (36x84 inch)", "Wide (72x72 inch)", "Narrow (24x72 inch)"
  ],
  
  // Material
  material: [
    "Solid Wood", "Engineered Wood", "Plywood", "Particle Board", "MDF", 
    "Steel", "Metal", "Iron", "Aluminum", "Plastic", "Fabric", "Laminate",
    "Teak Wood", "Sheesham Wood", "Rubber Wood", "Pine Wood", "Beech Wood",
    "Oak Wood", "Walnut Wood", "Mahogany", "Bamboo"
  ],
  
  // Color
  color: [
    "White", "Black", "Brown", "Walnut", "Teak", "Oak", "Honey", "Mahogany",
    "Gray", "Beige", "Cream", "Blue", "Green", "Red", "Maroon", "Cherry",
    "Wenge", "Espresso", "Natural Wood", "Matte White", "Glossy White",
    "Silver", "Gold", "Rose Gold"
  ],
  
  // Door Type
  doorType: [
    "Sliding Doors", "Hinged Doors", "Bi-fold Doors", "French Doors", 
    "Shutter Doors", "Mirror Doors", "Flush Doors", "Panel Doors", 
    "Glass Doors", "Louvered Doors", "Rolling Doors"
  ],
  
  // Number of Sections
  sections: ["1 Section", "2 Sections", "3 Sections", "4 Sections", "5 Sections", "6+ Sections"],
  
  // Features
  features: [
    "Mirror Attached", "Internal Drawers", "Hanging Rod", "Shelves", "Lockable",
    "Aluminum Frame", "Soft Closing", "Adjustable Shelves", "Chest Drawers",
    "Boot Shelf", "Jewelry Tray", "Shirt Organizer", "Trouser Hanger",
    "Tie Rack", "Belt Rack", "LED Lighting", "Glass Panel", "Carry Handle",
    "Foldable", "Portable", "Wheels/Casters", "Rain Cover", "Anti-Rust",
    "Anti-Bacterial", "Moisture Proof", "Termite Proof", "Fire Resistant"
  ],
  
  // Capacity
  capacity: ["Single Person", "Couple", "Family", "Kids", "Standard", "Extra Storage"],
  
  // Room Type
  roomType: ["Bedroom", "Master Bedroom", "Guest Room", "Kids Room", "Living Room", "Hallway", "Dressing Room"],
  
  // Assembly
  assembly: ["Ready to Use", "DIY Assembly", "Professional Assembly Required", "Pre-Assembled", "Knock Down"],
  
  // Brand
  brand: [
    "Godrej Interio", "Urban Ladder", "Pepperfry", "Home Centre", "IKEA",
    "Wakefit", "Nilkamal", "Durian", "Royal Oak", "Evok", "Furniture Kraft",
    "Wooden Street", "Spacewood", "Star Furniture", "Mintwud", "SleepyCat",
    "Zuari", "Damro", "Wipro Furniture", "Furniture World"
  ]
};

function Wardrobs() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [maxPrice, setMaxPrice] = useState(20000);
  const [sortBy, setSortBy] = useState("default");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  
  const [filters, setFilters] = useState({ 
    type: [], size: [], material: [], color: [], doorType: [], 
    sections: [], features: [], capacity: [], roomType: [], assembly: [], brand: [] 
  });
  
  const [openSections, setOpenSections] = useState({
    type: true, size: true, material: true, color: true, doorType: false,
    sections: false, features: false, capacity: false, roomType: false, assembly: false, brand: false
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
      type: [], size: [], material: [], color: [], doorType: [], 
      sections: [], features: [], capacity: [], roomType: [], assembly: [], brand: [] 
    });
    setMaxPrice(150000);
    setSortBy("default");
  };

  let filteredProducts = products.filter(p => 
    p.category?.toLowerCase() === "wardrobe" ||
    p.category?.toLowerCase() === "almirah" ||
    p.subCategory?.toLowerCase() === "wardrobs" ||
    p.name?.toLowerCase().includes("wardrobe") ||
    p.name?.toLowerCase().includes("almirah") ||
    p.name?.toLowerCase().includes("closet") ||
    p.name?.toLowerCase().includes("cabinet") ||
    p.name?.toLowerCase().includes("storage cabinet")
  );

  filteredProducts = filteredProducts.filter((product) => {
    if (product.offerPrice > maxPrice) return false;
    if (filters.type.length > 0 && !filters.type.includes(product.type)) return false;
    if (filters.size.length > 0 && !filters.size.includes(product.size)) return false;
    if (filters.material.length > 0 && !filters.material.includes(product.material)) return false;
    if (filters.color.length > 0 && !filters.color.includes(product.color)) return false;
    if (filters.doorType.length > 0 && !filters.doorType.includes(product.doorType)) return false;
    if (filters.sections.length > 0 && !filters.sections.includes(product.sections)) return false;
    if (filters.features.length > 0 && !filters.features.some(f => product.features?.includes(f))) return false;
    if (filters.capacity.length > 0 && !filters.capacity.includes(product.capacity)) return false;
    if (filters.roomType.length > 0 && !filters.roomType.includes(product.roomType)) return false;
    if (filters.assembly.length > 0 && !filters.assembly.includes(product.assembly)) return false;
    if (filters.brand.length > 0 && !filters.brand.includes(product.brand)) return false;
    return true;
  });

  if (sortBy === "price_low") filteredProducts.sort((a, b) => a.offerPrice - b.offerPrice);
  if (sortBy === "price_high") filteredProducts.sort((a, b) => b.offerPrice - a.offerPrice);
  if (sortBy === "name_asc") filteredProducts.sort((a, b) => a.name?.localeCompare(b.name));
  if (sortBy === "name_desc") filteredProducts.sort((a, b) => b.name?.localeCompare(a.name));

  const AccordionSection = ({ title, sectionKey, items }) => (
    <div className="mb-4 border-b border-gray-100 pb-3">
      <button onClick={() => toggleSection(sectionKey)} className="flex justify-between w-full font-bold text-gray-800 text-sm mb-2 hover:text-green-600 transition">
        <span>{title}</span>
        {openSections[sectionKey] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      {openSections[sectionKey] && (
        <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
          {items.map((item, index) => (
            <label key={index} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
              <input type="checkbox" checked={filters[sectionKey]?.includes(item)} onChange={() => handleFilterToggle(sectionKey, item)} 
                className="w-3.5 h-3.5 rounded border-gray-300 text-green-600" />
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
        <button onClick={clearAllFilters} className="text-green-600 text-xs hover:underline">Clear All</button>
      </div>
      <AccordionSection title=" Wardrobe Type" sectionKey="type" items={FILTER_CONFIG.type} />
      <AccordionSection title=" Size" sectionKey="size" items={FILTER_CONFIG.size} />
      <AccordionSection title=" Material" sectionKey="material" items={FILTER_CONFIG.material} />
      <AccordionSection title=" Color" sectionKey="color" items={FILTER_CONFIG.color} />
      <AccordionSection title=" Door Type" sectionKey="doorType" items={FILTER_CONFIG.doorType} />
      <AccordionSection title=" Sections" sectionKey="sections" items={FILTER_CONFIG.sections} />
      <AccordionSection title=" Features" sectionKey="features" items={FILTER_CONFIG.features} />
      <AccordionSection title=" Capacity" sectionKey="capacity" items={FILTER_CONFIG.capacity} />
      <AccordionSection title=" Room Type" sectionKey="roomType" items={FILTER_CONFIG.roomType} />
      <AccordionSection title=" Assembly" sectionKey="assembly" items={FILTER_CONFIG.assembly} />
      <AccordionSection title=" Brand" sectionKey="brand" items={FILTER_CONFIG.brand} />
      <div className="mb-4 pt-2">
        <h2 className="font-bold text-sm mb-2"> Max Price: ₹{maxPrice}</h2>
        <Slider value={maxPrice} onChange={(e, val) => setMaxPrice(val)} min={0} max={200000} step={5000}
          sx={{ color: "#16a34a", height: 4, '& .MuiSlider-thumb': { width: 18, height: 18, backgroundColor: '#16a34a' } }} />
      </div>
    </div>
  );

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div></div>;

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-700 text-white text-center py-12">
        <h1 className="text-4xl font-bold">Wardrobes & Almirahs</h1>
        <p className="mt-2 text-white/80">Organize Your Space with Stylish Storage Solutions</p>
        <div className="mt-4 flex justify-center gap-3 flex-wrap">
          <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs">Sliding Wardrobes</span>
          <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs">Wooden Wardrobes</span>
          <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs">Steel Almirahs</span>
          <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs">Foldable Wardrobes</span>
        </div>
      </div>
 <nav className="flex items-center gap-2 text-sm text-gray-500 mt-3 !pl-7">
            <Link to="/" className="!text-lg !no-underline !font-semibold !text-[#1E2D42] transition-colors">Home</Link>
            <span className="text-lg !font-medium">/</span>
            <span className="text-lg !font-medium text-[#E4921A]">Wardrobes & Almirahs</span>
          </nav>
          <h2 className="text-2xl !font-bold !mt-3 !mb-3 !pl-7">Wardrobes & Almirahs</h2>
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
              <button onClick={() => setMobileFiltersOpen(false)} className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold">Apply Filters</button>
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
                <div className="text-6xl mb-4">🚪</div>
                <h3 className="text-xl font-semibold mb-2">No Wardrobes Found</h3>
                <p className="text-gray-500 mb-4">Try adjusting your filters or check back later</p>
                <button onClick={clearAllFilters} className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition">
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

export default Wardrobs;