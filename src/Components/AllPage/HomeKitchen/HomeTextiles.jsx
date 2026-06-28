// src/component/HomeTextiles.jsx
import { useEffect, useState } from "react";
import ProductCard from "../ProductCard";
import { loadAllProducts } from "../ProductsData";
import { Slider } from "@mui/material";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import { Link } from 'react-router-dom';
const FILTER_CONFIG = {
  // Product Type
  type: [
    "Curtains", "Drapes", "Sheer Curtains", "Blackout Curtains",
    "Door Curtains", "Window Curtains", "Kitchen Curtains",
    "Bathroom Curtains", "Shower Curtains", "Table Cloth",
    "Table Runner", "Placemats", "Coasters", "Napkins",
    "Towels", "Bath Towels", "Hand Towels", "Face Towels",
    "Kitchen Towels", "Microfiber Towels", "Beach Towels",
    "Cushion Covers", "Throw Pillows", "Pillow Covers",
    "Blankets", "Throws", "Comforters", "Duvet Covers",
    "Quilts", "Bedspreads", "Mattress Protectors",
    "Pillow Protectors", "Bolsters", "Ottomans",
    "Aprons", "Oven Mitts", "Pot Holders", "Kitchen Napkins"
  ],
  
  // Room Type
  roomType: [
    "Living Room", "Bedroom", "Kitchen", "Bathroom", "Dining Room",
    "Kids Room", "Office", "Balcony", "Outdoor", "Hotel", "Restaurant",
    "Guest Room", "Master Bedroom", "Study Room", "Playroom"
  ],
  
  // Material
  material: [
    "Cotton", "Pure Cotton", "Linen", "Polyester", "Silk", "Satin",
    "Velvet", "Microfiber", "Jute", "Bamboo", "Wool", "Chenille",
    "Rayon", "Nylon", "Acrylic", "Flannel", "Fleece", "Terry Cotton",
    "Egyptian Cotton", "Organic Cotton", "Tencel", "Lycra", "Spandex",
    "Modal", "Viscose", "Hemp", "Ramie", "Olefin", "Polypropylene"
  ],
  
  // Color
  color: [
    "White", "Black", "Gray", "Beige", "Cream", "Brown", "Blue", 
    "Navy Blue", "Green", "Red", "Pink", "Purple", "Yellow", 
    "Orange", "Teal", "Maroon", "Burgundy", "Multicolor", 
    "Pastel", "Ivory", "Champagne", "Gold", "Silver", "Bronze",
    "Mint", "Coral", "Lavender", "Turquoise", "Peach", "Mustard"
  ],
  
  // Size (Dimensions)
  size: [
    "Small (20x20 inch)", "Medium (40x40 inch)", "Large (60x60 inch)",
    "Extra Large (80x80 inch)", "Standard (50x70 inch)", "King (90x100 inch)",
    "Queen (90x90 inch)", "Twin (70x90 inch)", "Door Size (36x80 inch)",
    "Window Size (42x72 inch)", "Table Size (60x90 inch)", "Round (36x36 inch)",
    "Bath Towel (27x54 inch)", "Hand Towel (16x28 inch)", "Face Towel (13x13 inch)"
  ],
  
  // Pattern
  pattern: [
    "Solid", "Printed", "Striped", "Checked", "Floral", "Geometric",
    "Abstract", "Moroccan", "Bohemian", "Ikat", "Block Print",
    "Digital Print", "Embroidered", "Lace", "Jacquard", "Woven",
    "Knitted", "Quilted", "Patchwork", "Damask", "Paisley", "Ombre",
    "Plaid", "Argyle", "Herringbone", "Chevron", "Polka Dots"
  ],
  
  // Features
  features: [
    "Washable", "Machine Washable", "Dry Clean Only", "Hand Wash",
    "Fade Resistant", "Shrink Resistant", "Wrinkle Resistant",
    "Stain Resistant", "Water Resistant", "Blackout", "Thermal",
    "Insulated", "Breathable", "Hypoallergenic", "Eco Friendly",
    "Recycled Material", "Sustainable", "Organic", "Heavy Duty",
    "Lightweight", "Quick Dry", "Soft Touch", "Luxury Feel",
    "Anti-Bacterial", "Anti-Microbial", "UV Protection", "Noise Reduction"
  ],
  
  // Brand
  brand: [
    "Home Centre", "Urban Ladder", "Pepperfry", "IKEA", "Wakefit",
    "Portico", "Spaces", "Nilkamal", "Bombay Dyeing", "Raymond Home",
    "Welspun", "Trident", "Fabindia", "Jaipur Rugs", "House of Pataudi",
    "Maspar", "Comfy Beds", "Linen Culture", "Royal Bedding", 
    "Amazon Brands", "Wipro", "Nilkamal", "Sleepwell", "Duroflex",
    "Springtek", "Sunday Mattress", "Morning Owl", "Zara Home",
    "H&M Home", "Marks & Spencer", "West Elm", "Crate & Barrel"
  ]
};

function HomeTextiles() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [maxPrice, setMaxPrice] = useState(2000);
  const [sortBy, setSortBy] = useState("default");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  
  const [filters, setFilters] = useState({ 
    type: [], roomType: [], material: [], color: [], 
    size: [], pattern: [], features: [], brand: [] 
  });
  
  const [openSections, setOpenSections] = useState({
    type: true, roomType: true, material: true, color: true,
    size: false, pattern: false, features: false, brand: false
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
      type: [], roomType: [], material: [], color: [], 
      size: [], pattern: [], features: [], brand: [] 
    });
    setMaxPrice(15000);
    setSortBy("default");
  };

  let filteredProducts = products.filter(p => 
    p.category?.toLowerCase() === "home textiles" ||
    p.subCategory?.toLowerCase() === "home-textiles" ||
    p.name?.toLowerCase().includes("curtain") ||
    p.name?.toLowerCase().includes("towel") ||
    p.name?.toLowerCase().includes("table cloth") ||
    p.name?.toLowerCase().includes("blanket") ||
    p.name?.toLowerCase().includes("throw") ||
    p.name?.toLowerCase().includes("cushion cover") ||
    p.name?.toLowerCase().includes("table runner") ||
    p.name?.toLowerCase().includes("placemat")
  );

  filteredProducts = filteredProducts.filter((product) => {
    if (product.offerPrice > maxPrice) return false;
    if (filters.type.length > 0 && !filters.type.includes(product.type)) return false;
    if (filters.roomType.length > 0 && !filters.roomType.includes(product.roomType)) return false;
    if (filters.material.length > 0 && !filters.material.includes(product.material)) return false;
    if (filters.color.length > 0 && !filters.color.includes(product.color)) return false;
    if (filters.size.length > 0 && !filters.size.includes(product.size)) return false;
    if (filters.pattern.length > 0 && !filters.pattern.includes(product.pattern)) return false;
    if (filters.features.length > 0 && !filters.features.some(f => product.features?.includes(f))) return false;
    if (filters.brand.length > 0 && !filters.brand.includes(product.brand)) return false;
    return true;
  });

  if (sortBy === "price_low") filteredProducts.sort((a, b) => a.offerPrice - b.offerPrice);
  if (sortBy === "price_high") filteredProducts.sort((a, b) => b.offerPrice - a.offerPrice);
  if (sortBy === "name_asc") filteredProducts.sort((a, b) => a.name?.localeCompare(b.name));
  if (sortBy === "name_desc") filteredProducts.sort((a, b) => b.name?.localeCompare(a.name));

  const AccordionSection = ({ title, sectionKey, items }) => (
    <div className="mb-4 border-b border-gray-100 pb-3">
      <button onClick={() => toggleSection(sectionKey)} className="flex justify-between w-full font-bold text-gray-800 text-sm mb-2 hover:text-indigo-600 transition">
        <span>{title}</span>
        {openSections[sectionKey] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      {openSections[sectionKey] && (
        <div className="grid grid-cols-1 gap-1.5 max-h-60 overflow-y-auto pr-1">
          {items.map((item, index) => (
            <label key={index} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
              <input type="checkbox" checked={filters[sectionKey]?.includes(item)} onChange={() => handleFilterToggle(sectionKey, item)} 
                className="w-3.5 h-3.5 !mr-2 rounded border-gray-300 text-indigo-600" />
              <span className="text-gray-600 !text-sm">{item}</span>
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
        <button onClick={clearAllFilters} className="text-indigo-600 text-xs hover:underline">Clear All</button>
      </div>
      <AccordionSection title=" Product Type" sectionKey="type" items={FILTER_CONFIG.type} />
      <AccordionSection title=" Room Type" sectionKey="roomType" items={FILTER_CONFIG.roomType} />
      <AccordionSection title=" Material" sectionKey="material" items={FILTER_CONFIG.material} />
      <AccordionSection title=" Color" sectionKey="color" items={FILTER_CONFIG.color} />
      <AccordionSection title=" Size" sectionKey="size" items={FILTER_CONFIG.size} />
      <AccordionSection title=" Pattern" sectionKey="pattern" items={FILTER_CONFIG.pattern} />
      <AccordionSection title=" Features" sectionKey="features" items={FILTER_CONFIG.features} />
      <AccordionSection title=" Brand" sectionKey="brand" items={FILTER_CONFIG.brand} />
      <div className="mb-4 pt-2">
        <h2 className="font-bold text-sm mb-2"> Max Price: ₹{maxPrice}</h2>
        <Slider value={maxPrice} onChange={(e, val) => setMaxPrice(val)} min={0} max={25000} step={500}
          sx={{ color: "#4f46e5", height: 4, '& .MuiSlider-thumb': { width: 18, height: 18, backgroundColor: '#4f46e5' } }} />
      </div>
    </div>
  );

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div></div>;

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <div className="mx-4 my-4 !shadow-3xl shadow-red-900/30 bg-[#1E2D42] bg-gradient-to-br from-[#EE971D] to-[#1E2D42] rounded-xl text-white text-center py-12 ">
        <h1 className="text-4xl font-bold">Home Textiles</h1>
        <p className="mt-2 text-white/80">Complete Your Home with Premium Fabrics</p>
      </div>
       <nav className="flex items-center gap-2 text-sm text-gray-500 mt-3 !pl-7">
            <Link to="/" className="!text-lg !no-underline !font-semibold !text-[#1E2D42] transition-colors">Home</Link>
            <span className="text-lg !font-medium">/</span>
            <span className="text-lg !font-medium text-[#E4921A]">Home Textiles</span>
          </nav>
          <h2 className="text-2xl !font-bold !mt-3 !mb-3 !pl-7">Home Textiles</h2>

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
              <button onClick={() => setMobileFiltersOpen(false)} className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold">Apply Filters</button>
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
                <div className="text-6xl mb-4">🏠</div>
                <h3 className="text-xl font-semibold mb-2">No Home Textiles Found</h3>
                <p className="text-gray-500 mb-4">Try adjusting your filters or check back later</p>
                <button onClick={clearAllFilters} className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition">
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

export default HomeTextiles;