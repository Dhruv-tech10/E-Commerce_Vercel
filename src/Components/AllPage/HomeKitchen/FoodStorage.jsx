// src/component/FoodStorage.jsx
import { useEffect, useState } from "react";
import ProductCard from "../ProductCard";
import { loadAllProducts } from "../ProductsData";
import { Slider } from "@mui/material";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import { Link } from 'react-router-dom';
const FILTER_CONFIG = {
  // Product Type
  type: [
    "Food Storage Container", "Airtight Container", "Kitchen Storage Jar", "Glass Jar",
    "Plastic Container", "Stainless Steel Container", "Rice Container", "Flour Container",
    "Spice Jar", "Masala Dabba", "Sugar Container", "Tea Container", "Coffee Container",
    "Cereal Container", "Pasta Container", "Snack Container", "Lunch Box", "Tiffin Box",
    "Meal Prep Container", "Bento Box", "Vacuum Container", "Leak Proof Container",
    "Microwave Container", "Freezer Container", "Pantry Organizer", "Canister Set"
  ],
  
  // Capacity
  capacity: [
    "100ml", "250ml", "500ml", "750ml", "1L", "1.2L", "1.5L", "1.8L", "2L", 
    "2.5L", "3L", "3.5L", "4L", "5L", "6L", "8L", "10L", "15L", "20L", "25L", "30L", "50L"
  ],
  
  // Material
  material: [
    "Plastic", "Glass", "Stainless Steel", "Borosilicate Glass", "Tritan Plastic",
    "Polypropylene (PP)", "Polyethylene (PE)", "Silicone", "Ceramic", "Clay", 
    "Wood", "Bamboo", "Acrylic", "Melamine", "Copper", "Brass"
  ],
  
  // Color
  color: [
    "Clear", "White", "Black", "Gray", "Blue", "Green", "Red", "Yellow", "Orange",
    "Purple", "Pink", "Brown", "Beige", "Multicolor", "Pastel", "Transparent",
    "Amber", "Teal", "Navy Blue", "Rose Gold", "Copper"
  ],
  
  // Shape
  shape: ["Round", "Square", "Rectangular", "Oval", "Hexagonal", "Cylindrical", "Tapered", "Conical"],
  
  // Closure Type
  closureType: [
    "Airtight Lid", "Snap Lock", "Screw Cap", "Flip Top", "Push Button", 
    "Lever Lock", "Magnetic Lid", "Rubber Gasket", "Vacuum Seal", "Zipper Lock",
    "Clip Lock", "Hinged Lid", "Bamboo Lid", "Glass Lid", "Silicone Lid",
    "Press Lock", "Twist Lock", "Pop Up Lid"
  ],
  
  // Features
  features: [
    "Leak Proof", "BPA Free", "Microwave Safe", "Freezer Safe", "Dishwasher Safe",
    "Stackable", "Nestable", "Space Saving", "See Through", "Moisture Proof",
    "Pest Proof", "Odor Resistant", "Tempered Glass", "Break Resistant", 
    "Heat Resistant", "Cold Resistant", "Oven Safe", "Vacuum Seal", "Label Included",
    "Measuring Marks", "Handle", "Spout", "Strainer Lid", "Rotating Base",
    "Non Slip Base", "Easy Grip", "Air Tight Seal", "UV Protection"
  ],
  
  // Usage
  usage: [
    "Dry Food Storage", "Wet Food Storage", "Liquid Storage", "Powder Storage",
    "Spice Storage", "Grain Storage", "Snack Storage", "Leftover Storage",
    "Meal Prep", "Lunch Box", "Pantry Organization", "Refrigerator Storage",
    "Freezer Storage", "Microwave Cooking", "Travel Storage", "Camping Storage"
  ],
  
  // Brand
  brand: [
    "Cello", "Borosil", "Milton", "Prestige", "Tupperware", "Lock & Lock",
    "Pyrex", "IKEA", "Rubbermaid", "OXO", "Mepal", "Glasslock", "Hutzler",
    "Vaya", "Tablekraft", "Solimo", "Amazon Basics", "Home Centre", 
    "Urban Ladder", "Pepperfry", "Wakefit", "Pigeon", "Butterfly", "Crompton"
  ]
};

function FoodStorage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [sortBy, setSortBy] = useState("default");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  
  const [filters, setFilters] = useState({ 
    type: [], capacity: [], material: [], color: [], shape: [], 
    closureType: [], features: [], usage: [], brand: [] 
  });
  
  const [openSections, setOpenSections] = useState({
    type: true, capacity: true, material: true, color: true, shape: false,
    closureType: false, features: false, usage: false, brand: false
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
      type: [], capacity: [], material: [], color: [], shape: [], 
      closureType: [], features: [], usage: [], brand: [] 
    });
    setMaxPrice(5000);
    setSortBy("default");
  };

  let filteredProducts = products.filter(p => 
    p.category?.toLowerCase() === "food storage" ||
    p.subCategory?.toLowerCase() === "food-storage" ||
    p.name?.toLowerCase().includes("storage container") ||
    p.name?.toLowerCase().includes("airtight container") ||
    p.name?.toLowerCase().includes("kitchen jar") ||
    p.name?.toLowerCase().includes("food storage") ||
    p.name?.toLowerCase().includes("pantry organizer") ||
    p.name?.toLowerCase().includes("canister")
  );

  filteredProducts = filteredProducts.filter((product) => {
    if (product.offerPrice > maxPrice) return false;
    if (filters.type.length > 0 && !filters.type.includes(product.type)) return false;
    if (filters.capacity.length > 0 && !filters.capacity.includes(product.capacity)) return false;
    if (filters.material.length > 0 && !filters.material.includes(product.material)) return false;
    if (filters.color.length > 0 && !filters.color.includes(product.color)) return false;
    if (filters.shape.length > 0 && !filters.shape.includes(product.shape)) return false;
    if (filters.closureType.length > 0 && !filters.closureType.includes(product.closureType)) return false;
    if (filters.features.length > 0 && !filters.features.some(f => product.features?.includes(f))) return false;
    if (filters.usage.length > 0 && !filters.usage.includes(product.usage)) return false;
    if (filters.brand.length > 0 && !filters.brand.includes(product.brand)) return false;
    return true;
  });

  if (sortBy === "price_low") filteredProducts.sort((a, b) => a.offerPrice - b.offerPrice);
  if (sortBy === "price_high") filteredProducts.sort((a, b) => b.offerPrice - a.offerPrice);
  if (sortBy === "name_asc") filteredProducts.sort((a, b) => a.name?.localeCompare(b.name));
  if (sortBy === "name_desc") filteredProducts.sort((a, b) => b.name?.localeCompare(a.name));

  const AccordionSection = ({ title, sectionKey, items }) => (
    <div className="mb-4 border-b border-gray-100 pb-3">
      <button onClick={() => toggleSection(sectionKey)} className="flex justify-between w-full font-bold text-gray-800 text-sm mb-2 hover:text-orange-600 transition">
        <span>{title}</span>
        {openSections[sectionKey] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      {openSections[sectionKey] && (
        <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
          {items.map((item, index) => (
            <label key={index} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
              <input type="checkbox" checked={filters[sectionKey]?.includes(item)} onChange={() => handleFilterToggle(sectionKey, item)} 
                className="w-3.5 h-3.5 rounded border-gray-300 text-orange-600" />
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
        <button onClick={clearAllFilters} className="text-orange-600 text-xs hover:underline">Clear All</button>
      </div>
      <AccordionSection title=" Container Type" sectionKey="type" items={FILTER_CONFIG.type} />
      <AccordionSection title=" Capacity" sectionKey="capacity" items={FILTER_CONFIG.capacity} />
      <AccordionSection title=" Material" sectionKey="material" items={FILTER_CONFIG.material} />
      <AccordionSection title=" Color" sectionKey="color" items={FILTER_CONFIG.color} />
      <AccordionSection title=" Shape" sectionKey="shape" items={FILTER_CONFIG.shape} />
      <AccordionSection title=" Closure Type" sectionKey="closureType" items={FILTER_CONFIG.closureType} />
      <AccordionSection title=" Features" sectionKey="features" items={FILTER_CONFIG.features} />
      <AccordionSection title=" Usage" sectionKey="usage" items={FILTER_CONFIG.usage} />
      <AccordionSection title=" Brand" sectionKey="brand" items={FILTER_CONFIG.brand} />
      <div className="mb-4 pt-2">
        <h2 className="font-bold text-sm mb-2"> Max Price: ₹{maxPrice}</h2>
        <Slider value={maxPrice} onChange={(e, val) => setMaxPrice(val)} min={0} max={10000} step={200}
          sx={{ color: "#ea580c", height: 4, '& .MuiSlider-thumb': { width: 18, height: 18, backgroundColor: '#ea580c' } }} />
      </div>
    </div>
  );

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div></div>;

  return (
    <div className="bg-gray-100 min-h-screen">

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-600 to-amber-600 text-white text-center py-12">
        <h1 className="text-4xl font-bold">Food Storage Containers</h1>
        <p className="mt-2 text-white/80">Keep Your Food Fresh & Organized</p>
        <div className="mt-4 flex justify-center gap-3 flex-wrap">
          <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs">Airtight Containers</span>
          <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs">Glass Jars</span>
          <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs">Plastic Containers</span>
          <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs">Spice Jars</span>
        </div>
      </div>
       <nav className="flex items-center gap-2 text-sm text-gray-500 mt-3 !pl-7">
            <Link to="/" className="!text-lg !no-underline !font-semibold !text-[#1E2D42] transition-colors">Home</Link>
            <span className="text-lg !font-medium">/</span>
            <span className="text-lg !font-medium text-[#E4921A]">Food Storage Containers</span>
          </nav>
          <h2 className="text-2xl !font-bold !mt-3 !mb-3 !pl-7">Food Storage Containers</h2>

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
              <button onClick={() => setMobileFiltersOpen(false)} className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold">Apply Filters</button>
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
                <div className="text-6xl mb-4">🥫</div>
                <h3 className="text-xl font-semibold mb-2">No Food Storage Containers Found</h3>
                <p className="text-gray-500 mb-4">Try adjusting your filters or check back later</p>
                <button onClick={clearAllFilters} className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition">
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

export default FoodStorage;