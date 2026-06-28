// src/component/StorageContainers.jsx
import { useEffect, useState } from "react";
import ProductCard from "../ProductCard";
import { loadAllProducts } from "../ProductsData";
import { Slider } from "@mui/material";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import { Link } from 'react-router-dom';
const FILTER_CONFIG = {
  // Container Type
  type: [
    "Storage Box", "Storage Bin", "Storage Tote", "Plastic Storage Container",
    "Under Bed Storage", "Closet Organizer", "Stackable Storage", "Nesting Storage",
    "Modular Storage", "Drawer Organizer", "Cube Storage", "Storage Crate",
    "Storage Basket", "Storage Trunk", "Telescopic Storage", "Collapsible Container",
    "Latching Container", "Clear Storage Bin", "Labeled Container", "Lockable Storage",
    "Garage Storage", "Industrial Storage", "Heavy Duty Storage", "Weatherproof Container"
  ],
  
  // Capacity
  capacity: [
    "5L", "10L", "15L", "20L", "25L", "30L", "35L", "40L", "45L", "50L",
    "60L", "70L", "80L", "90L", "100L", "120L", "150L", "200L", "250L", "300L",
    "400L", "500L", "750L", "1000L"
  ],
  
  // Size (Dimensions)
  size: [
    "Small (10x10x10 inch)", "Medium (15x12x10 inch)", "Large (20x15x12 inch)",
    "Extra Large (25x18x15 inch)", "Jumbo (30x20x18 inch)", "Compact (8x6x4 inch)",
    "Standard (16x12x10 inch)", "Deep (20x15x18 inch)", "Shallow (20x15x6 inch)",
    "Tall (15x12x24 inch)", "Wide (30x15x12 inch)", "Narrow (10x15x12 inch)"
  ],
  
  // Material
  material: [
    "Plastic", "Polypropylene (PP)", "Polyethylene (PE)", "Polycarbonate", "Acrylic",
    "Metal", "Aluminum", "Steel", "Wire", "Wood", "Bamboo", "Fabric", "Canvas",
    "Polyester", "Nylon", "Glass", "Silicone", "Rubber", "Cardboard", "Corrugated Plastic",
    "PVC", "PET", "ABS", "HDPE", "LDPE"
  ],
  
  // Color
  color: [
    "Clear", "White", "Black", "Gray", "Blue", "Green", "Red", "Yellow", 
    "Orange", "Purple", "Pink", "Teal", "Navy Blue", "Brown", "Beige", 
    "Multicolor", "Translucent", "Amber", "Lavender", "Cyan", "Magenta"
  ],
  
  // Lid Type
  lidType: [
    "Attached Lid", "Detachable Lid", "Latching Lid", "Snap Lid", "Hinged Lid",
    "Flip Top", "Screw Top", "No Lid", "Rolling Lid", "Locking Lid", "Clear Lid",
    "Colored Lid", "Vented Lid", "Gasket Seal", "Rubber Seal", "Press Fit Lid",
    "Clamp Lid", "Sliding Lid", "Roll Up Lid", "Zipper Lid"
  ],
  
  // Features
  features: [
    "Stackable", "Nestable", "Wheeled/Casters", "Handles", "Clear Body",
    "Label Slot", "UV Resistant", "Waterproof", "Dustproof", "Airtight",
    "Moisture Resistant", "Impact Resistant", "Heavy Duty", "Lightweight",
    "Collapsible", "Foldable", "Telescopic", "Interlocking", "Wall Mountable",
    "Under Bed", "Garage Ready", "Food Grade", "BPA Free", "Chemical Resistant",
    "Temperature Resistant", "Crush Proof", "Weather Resistant", "Shatterproof",
    "Recyclable", "Eco Friendly"
  ],
  
  // Usage/Room
  usage: [
    "Home Storage", "Garage Storage", "Basement Storage", "Attic Storage",
    "Office Storage", "Classroom Storage", "Dorm Room", "Kitchen Storage",
    "Bathroom Storage", "Bedroom Storage", "Living Room Storage", "Closet Storage",
    "Pantry Storage", "Shed Storage", "Industrial Storage", "Moving Storage",
    "Workshop Storage", "Laundry Room", "Craft Room", "Toy Storage", "Shoe Storage"
  ],
  
  // Brand
  brand: [
    "Sterilite", "Rubbermaid", "IRIS", "Hefty", "Ziploc", "Akro-Mils",
    "Really Useful Box", "Storage Works", "ClearSpace", "HOMZ", "Whitmor",
    "Honey-Can-Do", "Simple Houseware", "ClosetMaid", "Mdesign", "Amazon Basics",
    "Craft Store", "Home Centre", "IKEA", "Target", "Walmart", "Container Store",
    "Bankers Box", "Toter", "Suncast", "Keter", "Stanley", "Craftsman"
  ]
};

function StorageContainers() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [maxPrice, setMaxPrice] = useState(1500);
  const [sortBy, setSortBy] = useState("default");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  
  const [filters, setFilters] = useState({ 
    type: [], capacity: [], size: [], material: [], color: [], 
    lidType: [], features: [], usage: [], brand: [] 
  });
  
  const [openSections, setOpenSections] = useState({
    type: true, capacity: true, size: true, material: true, color: false,
    lidType: false, features: false, usage: false, brand: false
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
      type: [], capacity: [], size: [], material: [], color: [], 
      lidType: [], features: [], usage: [], brand: [] 
    });
    setMaxPrice(10000);
    setSortBy("default");
  };

  let filteredProducts = products.filter(p => 
    p.category?.toLowerCase() === "storage containers" ||
    p.subCategory?.toLowerCase() === "storage-containers" ||
    p.name?.toLowerCase().includes("storage container") ||
    p.name?.toLowerCase().includes("storage box") ||
    p.name?.toLowerCase().includes("storage bin") ||
    p.name?.toLowerCase().includes("tote") ||
    p.name?.toLowerCase().includes("crate") ||
    p.name?.toLowerCase().includes("organizer")
  );

  filteredProducts = filteredProducts.filter((product) => {
    if (product.offerPrice > maxPrice) return false;
    if (filters.type.length > 0 && !filters.type.includes(product.type)) return false;
    if (filters.capacity.length > 0 && !filters.capacity.includes(product.capacity)) return false;
    if (filters.size.length > 0 && !filters.size.includes(product.size)) return false;
    if (filters.material.length > 0 && !filters.material.includes(product.material)) return false;
    if (filters.color.length > 0 && !filters.color.includes(product.color)) return false;
    if (filters.lidType.length > 0 && !filters.lidType.includes(product.lidType)) return false;
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
      <AccordionSection title=" Container Type" sectionKey="type" items={FILTER_CONFIG.type} />
      <AccordionSection title=" Capacity" sectionKey="capacity" items={FILTER_CONFIG.capacity} />
      <AccordionSection title=" Size" sectionKey="size" items={FILTER_CONFIG.size} />
      <AccordionSection title=" Material" sectionKey="material" items={FILTER_CONFIG.material} />
      <AccordionSection title=" Color" sectionKey="color" items={FILTER_CONFIG.color} />
      <AccordionSection title=" Lid Type" sectionKey="lidType" items={FILTER_CONFIG.lidType} />
      <AccordionSection title=" Features" sectionKey="features" items={FILTER_CONFIG.features} />
      <AccordionSection title=" Usage" sectionKey="usage" items={FILTER_CONFIG.usage} />
      <AccordionSection title=" Brand" sectionKey="brand" items={FILTER_CONFIG.brand} />
      <div className="mb-4 pt-2">
        <h2 className="font-bold text-sm mb-2"> Max Price: ₹{maxPrice}</h2>
        <Slider value={maxPrice} onChange={(e, val) => setMaxPrice(val)} min={0} max={15000} step={500}
          sx={{ color: "#2563eb", height: 4, '& .MuiSlider-thumb': { width: 18, height: 18, backgroundColor: '#2563eb' } }} />
      </div>
    </div>
  );

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>;

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <div className="mx-4 my-4 !shadow-3xl shadow-red-900/30 bg-[#1E2D42] bg-gradient-to-br from-[#EE971D] to-[#1E2D42] rounded-xl text-white text-center py-12 ">
        <h1 className="text-4xl font-bold">Storage Containers</h1>
        <p className="mt-2 text-white/80">Organize Your Space with Quality Storage Solutions</p>
      </div>
       <nav className="flex items-center gap-2 text-sm text-gray-500 mt-3 !pl-7">
            <Link to="/" className="!text-lg !no-underline !font-semibold !text-[#1E2D42] transition-colors">Home</Link>
            <span className="text-lg !font-medium">/</span>
            <span className="text-lg !font-medium text-[#E4921A]">Storage Containers</span>
          </nav>
          <h2 className="text-2xl !font-bold !mt-3 !mb-3 !pl-7">Storage Containers</h2>

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
                <div className="text-6xl mb-4">📦</div>
                <h3 className="text-xl font-semibold mb-2">No Storage Containers Found</h3>
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

export default StorageContainers;