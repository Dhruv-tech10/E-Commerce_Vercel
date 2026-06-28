// src/component/WomenBlazers.jsx
import { useEffect, useState } from "react";
import ProductCard from "../ProductCard";
import { loadAllProducts } from "../ProductsData";
import { Slider } from "@mui/material";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import { Link } from 'react-router-dom';
const FILTER_CONFIG = {
  // Blazer Type
  type: [
    "Single Breasted Blazer", "Double Breasted Blazer", "Longline Blazer",
    "Cropped Blazer", "Oversized Blazer", "Slim Fit Blazer", "Regular Fit Blazer",
    "Linen Blazer", "Wool Blazer", "Cotton Blazer", "Velvet Blazer",
    "Silk Blazer", "Tweed Blazer", "Plaid Blazer", "Checkered Blazer",
    "Striped Blazer", "Solid Blazer", "Printed Blazer", "Formal Blazer",
    "Casual Blazer", "Party Blazer", "Office Blazer", "Wedding Blazer",
    "Summer Blazer", "Winter Blazer", "Business Blazer", "Tuxedo Blazer"
  ],
  
  // Size
  size: ["XS", "S", "M", "L", "XL", "XXL", "3XL", "4XL", "5XL"],
  
  // Material
  material: [
    "Linen", "Cotton", "Wool", "Polyester", "Viscose", "Rayon", "Silk",
    "Velvet", "Tweed", "Jersey", "Crepe", "Satin", "Lycra", "Spandex",
    "Nylon", "Acrylic", "Blend", "Wool Blend", "Cotton Blend"
  ],
  
  // Color
  color: [
    "Black", "White", "Navy Blue", "Gray", "Charcoal", "Brown", "Beige",
    "Cream", "Blue", "Red", "Burgundy", "Pink", "Green", "Olive",
    "Mustard", "Yellow", "Purple", "Lavender", "Teal", "Maroon",
    "Multicolor", "Plaid", "Checkered", "Striped"
  ],
  
  // Fit
  fit: ["Slim Fit", "Regular Fit", "Relaxed Fit", "Oversized Fit", "Tailored Fit", "Loose Fit"],
  
  // Length
  length: ["Cropped", "Regular", "Longline", "Knee Length", "Hip Length", "Thigh Length"],
  
  // Lapel Style
  lapelStyle: ["Notch Lapel", "Peak Lapel", "Shawl Lapel", "Wide Lapel", "Narrow Lapel", "Tuxedo Lapel"],
  
  // Closure Type
  closureType: ["Single Button", "Double Button", "Two Button", "Three Button", "Hook & Eye", "Open Front", "Zipper", "Belted"],
  
  // Sleeve Type
  sleeveType: ["Long Sleeve", "Full Sleeve", "Three Quarter Sleeve", "Half Sleeve", "Short Sleeve", "Roll Up Sleeve", "Bell Sleeve"],
  
  // Features
  features: [
    "Structured", "Unstructured", "Padded Shoulders", "No Padding", "Lined",
    "Unlined", "Breathable", "Stretchable", "Wrinkle Resistant",
    "Machine Washable", "Dry Clean Only", "Travel Friendly", "Lightweight",
    "Heavy Weight", "Water Resistant", "Wind Resistant"
  ],
  
  // Occasion
  occasion: [
    "Office Wear", "Business Meeting", "Formal Event", "Party Wear",
    "Casual Wear", "Wedding", "Date Night", "Cocktail", "Interview",
    "Conference", "Daily Wear", "Travel", "Evening Wear", "Day Wear"
  ],
  
  // Season
  season: ["Summer", "Winter", "Spring", "Fall", "All Season"],
  
  // Brand
  brand: [
    "H&M", "Zara", "Mango", "Forever 21", "Uniqlo", "Gap", "Tommy Hilfiger",
    "Calvin Klein", "Levi's", "Vero Moda", "Only", "Allen Solly",
    "Van Heusen", "Louis Philippe", "Park Avenue", "Raymond", "Blackberrys",
    "Biba", "W for Woman", "Global Desi", "Fabindia", "Marks & Spencer",
    "Next", "Benetton", "Aurelia", "Sangria"
  ]
};

function Blazers() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [maxPrice, setMaxPrice] = useState(2000);
  const [sortBy, setSortBy] = useState("default");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  
  const [filters, setFilters] = useState({ 
    type: [], size: [], material: [], color: [], fit: [], length: [],
    lapelStyle: [], closureType: [], sleeveType: [], features: [], 
    occasion: [], season: [], brand: [] 
  });
  
  const [openSections, setOpenSections] = useState({
    type: true, size: true, material: true, color: true, fit: false,
    length: false, lapelStyle: false, closureType: false, sleeveType: false,
    features: false, occasion: false, season: false, brand: false
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
      type: [], size: [], material: [], color: [], fit: [], length: [],
      lapelStyle: [], closureType: [], sleeveType: [], features: [], 
      occasion: [], season: [], brand: [] 
    });
    setMaxPrice(15000);
    setSortBy("default");
  };

  let filteredProducts = products.filter(p => 
    p.category?.toLowerCase() === "blazer" ||
    p.subCategory?.toLowerCase() === "women-blazers" ||
    p.name?.toLowerCase().includes("blazer") ||
    p.name?.toLowerCase().includes("jacket") ||
    (p.name?.toLowerCase().includes("coat") && p.name?.toLowerCase().includes("women"))
  );

  filteredProducts = filteredProducts.filter((product) => {
    if (product.offerPrice > maxPrice) return false;
    if (filters.type.length > 0 && !filters.type.includes(product.type)) return false;
    if (filters.size.length > 0 && !filters.size.includes(product.size)) return false;
    if (filters.material.length > 0 && !filters.material.includes(product.material)) return false;
    if (filters.color.length > 0 && !filters.color.includes(product.color)) return false;
    if (filters.fit.length > 0 && !filters.fit.includes(product.fit)) return false;
    if (filters.length.length > 0 && !filters.length.includes(product.length)) return false;
    if (filters.lapelStyle.length > 0 && !filters.lapelStyle.includes(product.lapelStyle)) return false;
    if (filters.closureType.length > 0 && !filters.closureType.includes(product.closureType)) return false;
    if (filters.sleeveType.length > 0 && !filters.sleeveType.includes(product.sleeveType)) return false;
    if (filters.features.length > 0 && !filters.features.some(f => product.features?.includes(f))) return false;
    if (filters.occasion.length > 0 && !filters.occasion.includes(product.occasion)) return false;
    if (filters.season.length > 0 && !filters.season.includes(product.season)) return false;
    if (filters.brand.length > 0 && !filters.brand.includes(product.brand)) return false;
    return true;
  });

  if (sortBy === "price_low") filteredProducts.sort((a, b) => a.offerPrice - b.offerPrice);
  if (sortBy === "price_high") filteredProducts.sort((a, b) => b.offerPrice - a.offerPrice);
  if (sortBy === "name_asc") filteredProducts.sort((a, b) => a.name?.localeCompare(b.name));
  if (sortBy === "name_desc") filteredProducts.sort((a, b) => b.name?.localeCompare(a.name));

  const AccordionSection = ({ title, sectionKey, items }) => (
    <div className="mb-4 border-b border-gray-100 pb-3">
      <button onClick={() => toggleSection(sectionKey)} className="flex justify-between w-full font-bold text-gray-800 text-sm mb-2 hover:text-red-600 transition">
        <span>{title}</span>
        {openSections[sectionKey] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      {openSections[sectionKey] && (
        <div className="grid grid-cols-1 gap-1.5 max-h-60 overflow-y-auto pr-1">
          {items.map((item, index) => (
            <label key={index} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
              <input type="checkbox" checked={filters[sectionKey]?.includes(item)} onChange={() => handleFilterToggle(sectionKey, item)} 
                className="w-3.5 h-3.5 !mr-2 rounded border-gray-300 text-red-600" />
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
        <button onClick={clearAllFilters} className="text-red-600 text-xs hover:underline">Clear All</button>
      </div>
      <AccordionSection title=" Blazer Type" sectionKey="type" items={FILTER_CONFIG.type} />
      <AccordionSection title=" Size" sectionKey="size" items={FILTER_CONFIG.size} />
      <AccordionSection title=" Material" sectionKey="material" items={FILTER_CONFIG.material} />
      <AccordionSection title=" Color" sectionKey="color" items={FILTER_CONFIG.color} />
      <AccordionSection title=" Fit" sectionKey="fit" items={FILTER_CONFIG.fit} />
      <AccordionSection title=" Length" sectionKey="length" items={FILTER_CONFIG.length} />
      <AccordionSection title=" Lapel Style" sectionKey="lapelStyle" items={FILTER_CONFIG.lapelStyle} />
      <AccordionSection title=" Closure Type" sectionKey="closureType" items={FILTER_CONFIG.closureType} />
      <AccordionSection title=" Sleeve Type" sectionKey="sleeveType" items={FILTER_CONFIG.sleeveType} />
      <AccordionSection title=" Features" sectionKey="features" items={FILTER_CONFIG.features} />
      <AccordionSection title=" Occasion" sectionKey="occasion" items={FILTER_CONFIG.occasion} />
      <AccordionSection title=" Season" sectionKey="season" items={FILTER_CONFIG.season} />
      <AccordionSection title=" Brand" sectionKey="brand" items={FILTER_CONFIG.brand} />
      <div className="mb-4 pt-2">
        <h2 className="font-bold text-sm mb-2"> Max Price: ₹{maxPrice}</h2>
        <Slider value={maxPrice} onChange={(e, val) => setMaxPrice(val)} min={0} max={25000} step={500}
          sx={{ color: "#dc2626", height: 4, '& .MuiSlider-thumb': { width: 18, height: 18, backgroundColor: '#dc2626' } }} />
      </div>
    </div>
  );

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div></div>;

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="mx-4 my-4 !shadow-3xl shadow-red-900/30 bg-[#1E2D42] bg-gradient-to-br from-[#EE971D] to-[#1E2D42] rounded-xl text-white text-center py-12 ">
        <h1 className="text-4xl font-bold">Women's Blazers</h1>
      
      </div>
<nav className="flex items-center gap-2 text-sm text-gray-500 mt-3 !pl-7">
            <Link to="/" className="!text-lg !no-underline !font-semibold !text-[#1E2D42] transition-colors">Home</Link>
            <span className="text-lg !font-medium">/</span>
            <span className="text-lg !font-medium text-[#E4921A]">Blazers</span>
          </nav>
          <h2 className="text-2xl !font-bold !mt-3 !mb-3 !pl-7">Blazers</h2>

          
      <div className="md:hidden px-4 pt-4 sticky top-0 z-40 bg-gray-100 pb-2">
        <button onClick={() => setMobileFiltersOpen(true)} className="flex items-center gap-2 bg-white px-4 py-3 rounded-lg shadow-md w-full justify-between border border-gray-200">
          <div className="flex items-center gap-2"><Menu size={20} /><span className="font-medium text-gray-700">Filters</span></div>
          <span className="text-xs text-gray-500">{Object.values(filters).flat().length} active</span>
        </button>
      </div>

      {mobileFiltersOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/60" onClick={() => setMobileFiltersOpen(false)}>
          <div className="absolute top-0 left-0 w-[85%] h-full bg-white overflow-y-auto p-4 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4 pb-2 border-b sticky top-0 bg-white">
              <h2 className="font-bold text-lg">All Filters</h2>
              <button onClick={() => setMobileFiltersOpen(false)} className="p-1 hover:bg-gray-100 rounded"><X size={24} /></button>
            </div>
            <FilterSidebar />
            <div className="sticky bottom-0 bg-white pt-4 pb-2 mt-4 border-t">
              <button onClick={() => setMobileFiltersOpen(false)} className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold">Apply Filters</button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto p-4">
        <div className="flex gap-6">
          <div className="w-72 hidden md:block sticky top-20"><FilterSidebar /></div>
          <div className="flex-1">
            <div className="bg-white rounded-xl p-3 mb-4 flex justify-between items-center flex-wrap gap-2">
              <span className="text-xs text-gray-500">Showing {filteredProducts.length} products</span>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="border rounded-lg px-3 py-1.5 text-xs">
                <option value="default">Default</option><option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
              </select>
            </div>
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-xl p-12 text-center">
              
                <h3 className="text-xl font-semibold mb-2">No Blazers Found</h3>
                <p className="text-gray-500 mb-4">Try adjusting your filters or check back later</p>
                <button onClick={clearAllFilters} className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition">Clear All Filters</button>
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

export default Blazers;