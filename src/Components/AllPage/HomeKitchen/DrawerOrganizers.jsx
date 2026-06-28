// src/component/DrawersOrganizers.jsx
import { useEffect, useState } from "react";
import ProductCard from "../ProductCard";
import { loadAllProducts } from "../ProductsData";
import { Slider } from "@mui/material";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import { Link } from 'react-router-dom';
const FILTER_CONFIG = {
  // Organizer Type
  type: [
    "Drawer Divider", "Drawer Organizer Set", "Cutlery Tray", "Utensil Organizer",
    "Makeup Organizer", "Jewelry Organizer", "Office Desk Organizer", "Stationery Organizer",
    "Sock Organizer", "Underwear Organizer", "Clothing Divider", "Kitchen Drawer Organizer",
    "Bathroom Drawer Organizer", "Bedroom Drawer Organizer", "Expandable Divider", 
    "Adjustable Organizer", "Modular Organizer", "Stackable Drawers", "Drawer Inserts",
    "Silverware Tray", "Spice Drawer Organizer", "Tool Drawer Organizer", "Craft Organizer",
    "Medicine Organizer", "Vanity Organizer", "Shoe Drawer Organizer", "Belt Drawer Organizer"
  ],
  
  // Size (Dimensions)
  size: [
    "Small (6x6 inch)", "Medium (10x8 inch)", "Large (12x10 inch)", "Extra Large (15x12 inch)",
    "Narrow (6x12 inch)", "Wide (12x18 inch)", "Compact (8x8 inch)", "Standard (11x11 inch)",
    "Full Width (18x12 inch)", "Half Width (9x12 inch)", "Deep (12x14 inch)", "Shallow (12x4 inch)",
    "Extra Deep (12x18 inch)", "Mini (4x4 inch)", "Jumbo (15x20 inch)"
  ],
  
  // Compartments/Sections
  compartments: [
    "1 Section", "2 Sections", "3 Sections", "4 Sections", "5 Sections", "6 Sections",
    "7 Sections", "8 Sections", "9 Sections", "10 Sections", "12 Sections", "15 Sections",
    "20+ Sections", "Adjustable Compartments", "Customizable", "Grid Style", "Cell Style"
  ],
  
  // Material
  material: [
    "Plastic", "Bamboo", "Wood", "Acrylic", "Metal", "Stainless Steel", 
    "Aluminum", "Silicone", "Fabric", "Polyester", "Nylon", "Mesh", 
    "Cardboard", "Foam", "Velvet", "Felt", "Glass", "Ceramic", "Resin",
    "Polypropylene", "ABS Plastic", "MDF", "Plywood"
  ],
  
  // Color
  color: [
    "White", "Black", "Gray", "Clear", "Transparent", "Natural Wood", "Brown",
    "Blue", "Pink", "Green", "Beige", "Cream", "Silver", "Gold", "Rose Gold",
    "Multicolor", "Pastel", "Neutral", "Red", "Purple", "Orange", "Yellow"
  ],
  
  // Usage Room
  usageRoom: [
    "Kitchen", "Bathroom", "Bedroom", "Living Room", "Office", "Home Office",
    "Craft Room", "Garage", "Workshop", "Closet", "Vanity", "Pantry",
    "Laundry Room", "Entryway", "Kids Room", "Dorm Room", "Studio",
    "Jewelry Box", "Makeup Drawer", "Silverware Drawer", "Tool Drawer"
  ],
  
  // Features
  features: [
    "Adjustable", "Expandable", "Stackable", "Foldable", "Collapsible",
    "Non-Slip Bottom", "Removable Dividers", "Customizable Layout", "See Through",
    "Label Holder", "BPA Free", "Food Safe", "Water Resistant",
    "Easy Clean", "Rubber Feet", "Soft Close", "Drawer Liner Included",
    "Anti-Skid", "Durable", "Lightweight", "Space Saving", "Modular",
    "Interlocking", "Magnetic", "Velcro Backed", "Wall Mountable"
  ],
  
  // Brand
  brand: [
    "Home Centre", "IKEA", "Amazon Basics", "ClosetMaid", "Simple Houseware",
    "mDesign", "Joseph Joseph", "OXO", "InterDesign", "YouCopia", "Whitmor",
    "Honey-Can-Do", "Storage Works", "KISLAN", "Madesmart", "Room Essentials",
    "Urban Ladder", "Pepperfry", "Wakefit", "Decorify", "Walmart", "Target",
    "Container Store", "Sterilite", "Rubbermaid", "Elfa", "Real Simple"
  ]
};

function DrawerOrganizers() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [maxPrice, setMaxPrice] = useState(800);
  const [sortBy, setSortBy] = useState("default");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  
  const [filters, setFilters] = useState({ 
    type: [], size: [], compartments: [], material: [], color: [], 
    usageRoom: [], features: [], brand: [] 
  });
  
  const [openSections, setOpenSections] = useState({
    type: true, size: true, compartments: true, material: true, color: false,
    usageRoom: false, features: false, brand: false
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
      type: [], size: [], compartments: [], material: [], color: [], 
      usageRoom: [], features: [], brand: [] 
    });
    setMaxPrice(5000);
    setSortBy("default");
  };

  let filteredProducts = products.filter(p => 
    p.category?.toLowerCase() === "drawer organizer" ||
    p.subCategory?.toLowerCase() === "drawers-organizers" ||
    p.name?.toLowerCase().includes("drawer organizer") ||
    p.name?.toLowerCase().includes("cutlery tray") ||
    p.name?.toLowerCase().includes("makeup organizer") ||
    p.name?.toLowerCase().includes("drawer divider") ||
    p.name?.toLowerCase().includes("silverware tray") ||
    p.name?.toLowerCase().includes("jewelry organizer")
  );

  filteredProducts = filteredProducts.filter((product) => {
    if (product.offerPrice > maxPrice) return false;
    if (filters.type.length > 0 && !filters.type.includes(product.type)) return false;
    if (filters.size.length > 0 && !filters.size.includes(product.size)) return false;
    if (filters.compartments.length > 0 && !filters.compartments.includes(product.compartments)) return false;
    if (filters.material.length > 0 && !filters.material.includes(product.material)) return false;
    if (filters.color.length > 0 && !filters.color.includes(product.color)) return false;
    if (filters.usageRoom.length > 0 && !filters.usageRoom.includes(product.usageRoom)) return false;
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
      <button onClick={() => toggleSection(sectionKey)} className="flex justify-between w-full font-bold text-gray-800 text-sm mb-2 hover:text-teal-600 transition">
        <span>{title}</span>
        {openSections[sectionKey] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      {openSections[sectionKey] && (
        <div className="grid grid-cols-1 gap-1.5 max-h-60 overflow-y-auto pr-1">
          {items.map((item, index) => (
            <label key={index} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
              <input type="checkbox" checked={filters[sectionKey]?.includes(item)} onChange={() => handleFilterToggle(sectionKey, item)} 
                className="w-3.5 h-3.5 !mr-2 rounded border-gray-300 text-teal-600" />
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
        <button onClick={clearAllFilters} className="text-teal-600 text-xs hover:underline">Clear All</button>
      </div>
      <AccordionSection title=" Organizer Type" sectionKey="type" items={FILTER_CONFIG.type} />
      <AccordionSection title=" Size" sectionKey="size" items={FILTER_CONFIG.size} />
      <AccordionSection title=" Compartments" sectionKey="compartments" items={FILTER_CONFIG.compartments} />
      <AccordionSection title=" Material" sectionKey="material" items={FILTER_CONFIG.material} />
      <AccordionSection title=" Color" sectionKey="color" items={FILTER_CONFIG.color} />
      <AccordionSection title=" Usage Room" sectionKey="usageRoom" items={FILTER_CONFIG.usageRoom} />
      <AccordionSection title=" Features" sectionKey="features" items={FILTER_CONFIG.features} />
      <AccordionSection title=" Brand" sectionKey="brand" items={FILTER_CONFIG.brand} />
      <div className="mb-4 pt-2">
        <h2 className="font-bold text-sm mb-2"> Max Price: ₹{maxPrice}</h2>
        <Slider value={maxPrice} onChange={(e, val) => setMaxPrice(val)} min={0} max={8000} step={200}
          sx={{ color: "#0d9488", height: 4, '& .MuiSlider-thumb': { width: 18, height: 18, backgroundColor: '#0d9488' } }} />
      </div>
    </div>
  );

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div></div>;

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <div className="mx-4 my-4 !shadow-3xl shadow-red-900/30 bg-[#1E2D42] bg-gradient-to-br from-[#EE971D] to-[#1E2D42] rounded-xl text-white text-center py-12 ">
        <h1 className="text-4xl font-bold">Drawer Organizers</h1>
        <p className="mt-2 text-white/80">Organize Every Drawer in Your Home</p>
      </div>
       <nav className="flex items-center gap-2 text-sm text-gray-500 mt-3 !pl-7">
            <Link to="/" className="!text-lg !no-underline !font-semibold !text-[#1E2D42] transition-colors">Home</Link>
            <span className="text-lg !font-medium">/</span>
            <span className="text-lg !font-medium text-[#E4921A]">Drawer Organizers</span>
          </nav>
          <h2 className="text-2xl !font-bold !mt-3 !mb-3 !pl-7">Drawer Organizers</h2>
      

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
              <button onClick={() => setMobileFiltersOpen(false)} className="w-full bg-teal-600 text-white py-3 rounded-lg font-semibold">Apply Filters</button>
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
                <div className="text-6xl mb-4">🗄️</div>
                <h3 className="text-xl font-semibold mb-2">No Drawer Organizers Found</h3>
                <p className="text-gray-500 mb-4">Try adjusting your filters or check back later</p>
                <button onClick={clearAllFilters} className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition">
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

export default DrawerOrganizers;