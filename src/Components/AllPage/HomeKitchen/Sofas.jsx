// src/component/Sofa.jsx
import { useEffect, useState } from "react";
import ProductCard from "../ProductCard";
import { loadAllProducts } from "../ProductsData";
import { Slider } from "@mui/material";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import { Link } from 'react-router-dom';
const FILTER_CONFIG = {
  // Sofa Type
  type: [
    "L-Shape Sofa", "3 Seater Sofa", "2 Seater Sofa", "Single Seater Sofa",
    "Recliner Sofa", "Sofa Cum Bed", "Sectional Sofa", "Loveseat",
    "Fabric Sofa", "Leather Sofa", "Wooden Sofa", "Modern Sofa",
    "Traditional Sofa", "Convertible Sofa", "Chaise Lounge", "Corner Sofa",
    "Modular Sofa", "Curved Sofa", "Wingback Sofa", "Chesterfield Sofa",
    "Mid Century Sofa", "Scandinavian Sofa", "Contemporary Sofa", "Velvet Sofa",
    "Tufted Sofa", "Button Back Sofa", "Roll Arm Sofa", "Track Arm Sofa"
  ],
  
  // Seating Capacity
  seating: ["1 Seater", "2 Seater", "3 Seater", "4 Seater", "5 Seater", "6+ Seater", "Adjustable"],
  
  // Color
  color: [
    "Black", "White", "Gray", "Beige", "Brown", "Blue", "Green", "Red", 
    "Burgundy", "Navy Blue", "Cream", "Teal", "Maroon", "Charcoal",
    "Olive Green", "Mustard", "Burgundy", "Purple", "Pink", "Orange",
    "Yellow", "Silver", "Gold", "Multicolor", "Pastel", "Neutral"
  ],
  
  // Material (Upholstery)
  material: [
    "Fabric", "Leather", "PU Leather", "Velvet", "Linen", "Cotton", 
    "Polyester", "Chenille", "Microfiber", "Boucle", "Wool", "Silk",
    "Jute", "Hemp", "Rayon", "Nylon", "Acrylic", "Olefin", "Polypropylene"
  ],
  
  // Frame Material
  frameMaterial: [
    "Solid Wood", "Engineered Wood", "Metal", "Plywood", "Teak Wood", 
    "Sheesham Wood", "Rubber Wood", "Pine Wood", "Oak Wood", "Walnut Wood",
    "Mahogany", "Beech Wood", "Ash Wood", "Birch Wood", "Aluminum", "Steel"
  ],
  
  // Filling
  filling: [
    "High Density Foam", "Memory Foam", "Spring Mattress", "Pocket Spring", 
    "Polyester Fiber", "Cotton", "Rebonded Foam", "HR Foam", "Latex Foam",
    "Polyurethane Foam", "Down Feather", "Cotton Blend", "Fiber Fill"
  ],
  
  // Features
  features: [
    "Recliner", "Adjustable Headrest", "Storage", "Foldable", "Convertible", 
    "Washable Cover", "Removable Cover", "Cup Holder", "USB Port", 
    "Massage Function", "Heating Function", "Rocking", "Swivel",
    "Pull Out Bed", "Hidden Storage", "Adjustable Armrest", "Tilt Mechanism",
    "Lift Up Seat", "Detachable Cushions", "Zip Cover", "Water Resistant",
    "Stain Resistant", "Pet Friendly", "Easy Assembly", "Wheels Included"
  ],
  
  // Room Type
  roomType: ["Living Room", "Drawing Room", "Bedroom", "Office", "Lobby", "Balcony", "Waiting Area", "Lounge"],
  
  // Assembly Required
  assembly: ["Ready to Use", "DIY Assembly", "Professional Assembly Required", "Pre-Assembled", "Knock Down"],
  
  // Warranty
  warranty: ["1 Year", "2 Years", "3 Years", "5 Years", "7 Years", "10 Years", "Lifetime"],
  
  // Brand
  brand: [
    "Urban Ladder", "Pepperfry", "Home Centre", "IKEA", "Wakefit", "Durian", 
    "Godrej Interio", "Nilkamal", "Royal Oak", "Damro", "Furlenco", "Evok",
    "Furniture Kraft", "Wooden Street", "Spacewood", "Star Furniture", 
    "Mintwud", "SleepyCat", "Zuari", "Wipro Furniture", "Furniture World",
    "HomeTown", "Mebelkart", "Fabindia", "Jaypore", "Crate & Barrel", "West Elm"
  ]
};

function Sofas() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [maxPrice, setMaxPrice] = useState(25000);
  const [sortBy, setSortBy] = useState("default");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  
  const [filters, setFilters] = useState({ 
    type: [], seating: [], color: [], material: [], frameMaterial: [], 
    filling: [], features: [], roomType: [], assembly: [], warranty: [], brand: [] 
  });
  
  const [openSections, setOpenSections] = useState({
    type: true, seating: true, color: true, material: true, frameMaterial: false,
    filling: false, features: false, roomType: false, assembly: false, warranty: false, brand: false
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
      type: [], seating: [], color: [], material: [], frameMaterial: [], 
      filling: [], features: [], roomType: [], assembly: [], warranty: [], brand: [] 
    });
    setMaxPrice(200000);
    setSortBy("default");
  };

  let filteredProducts = products.filter(p => 
    p.category?.toLowerCase() === "sofa" ||
    p.category?.toLowerCase() === "sofas" ||
    p.subCategory?.toLowerCase() === "sofa" ||
    p.name?.toLowerCase().includes("sofa") ||
    p.name?.toLowerCase().includes("couch") ||
    p.name?.toLowerCase().includes("loveseat") ||
    p.name?.toLowerCase().includes("sectional") ||
    p.name?.toLowerCase().includes("recliner")
  );

  filteredProducts = filteredProducts.filter((product) => {
    if (product.offerPrice > maxPrice) return false;
    if (filters.type.length > 0 && !filters.type.includes(product.type)) return false;
    if (filters.seating.length > 0 && !filters.seating.includes(product.seating)) return false;
    if (filters.color.length > 0 && !filters.color.includes(product.color)) return false;
    if (filters.material.length > 0 && !filters.material.includes(product.material)) return false;
    if (filters.frameMaterial.length > 0 && !filters.frameMaterial.includes(product.frameMaterial)) return false;
    if (filters.filling.length > 0 && !filters.filling.includes(product.filling)) return false;
    if (filters.features.length > 0 && !filters.features.some(f => product.features?.includes(f))) return false;
    if (filters.roomType.length > 0 && !filters.roomType.includes(product.roomType)) return false;
    if (filters.assembly.length > 0 && !filters.assembly.includes(product.assembly)) return false;
    if (filters.warranty.length > 0 && !filters.warranty.includes(product.warranty)) return false;
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
        <div className="grid grid-cols-1 gap-1.5 max-h-60 overflow-y-auto pr-1">
          {items.map((item, index) => (
            <label key={index} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
              <input type="checkbox" checked={filters[sectionKey]?.includes(item)} onChange={() => handleFilterToggle(sectionKey, item)} 
                className="w-3.5 h-3.5 !mr-2 rounded border-gray-300 text-blue-600" />
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
        <button onClick={clearAllFilters} className="text-blue-600 text-xs hover:underline">Clear All</button>
      </div>
      <AccordionSection title=" Sofa Type" sectionKey="type" items={FILTER_CONFIG.type} />
      <AccordionSection title=" Seating Capacity" sectionKey="seating" items={FILTER_CONFIG.seating} />
      <AccordionSection title=" Color" sectionKey="color" items={FILTER_CONFIG.color} />
      <AccordionSection title=" Upholstery" sectionKey="material" items={FILTER_CONFIG.material} />
      <AccordionSection title=" Frame Material" sectionKey="frameMaterial" items={FILTER_CONFIG.frameMaterial} />
      <AccordionSection title=" Filling Type" sectionKey="filling" items={FILTER_CONFIG.filling} />
      <AccordionSection title=" Features" sectionKey="features" items={FILTER_CONFIG.features} />
      <AccordionSection title=" Room Type" sectionKey="roomType" items={FILTER_CONFIG.roomType} />
      <AccordionSection title=" Assembly" sectionKey="assembly" items={FILTER_CONFIG.assembly} />
      <AccordionSection title=" Warranty" sectionKey="warranty" items={FILTER_CONFIG.warranty} />
      <AccordionSection title=" Brand" sectionKey="brand" items={FILTER_CONFIG.brand} />
      <div className="mb-4 pt-2">
        <h2 className="font-bold text-sm mb-2"> Max Price: ₹{maxPrice}</h2>
        <Slider value={maxPrice} onChange={(e, val) => setMaxPrice(val)} min={0} max={300000} step={5000}
          sx={{ color: "#2563eb", height: 4, '& .MuiSlider-thumb': { width: 18, height: 18, backgroundColor: '#2563eb' } }} />
      </div>
    </div>
  );

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>;

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <div className="mx-4 my-4 !shadow-3xl shadow-red-900/30 bg-[#1E2D42] bg-gradient-to-br from-[#EE971D] to-[#1E2D42] rounded-xl text-white text-center py-12 ">
        <h1 className="text-4xl font-bold">Sofas Collection</h1>
        <p className="mt-2 text-white/80">Comfort Meets Style - Find Your Perfect Sofa</p>
      </div>
       <nav className="flex items-center gap-2 text-sm text-gray-500 mt-3 !pl-7">
            <Link to="/" className="!text-lg !no-underline !font-semibold !text-[#1E2D42] transition-colors">Home</Link>
            <span className="text-lg !font-medium">/</span>
            <span className="text-lg !font-medium text-[#E4921A]">Sofas</span>
          </nav>
          <h2 className="text-2xl !font-bold !mt-3 !mb-3 !pl-7">Sofas</h2>

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
                <div className="text-6xl mb-4">🛋️</div>
                <h3 className="text-xl font-semibold mb-2">No Sofas Found</h3>
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

export default Sofas;