// src/component/TubeLight.jsx
import { useEffect, useState } from "react";
import ProductCard from "../ProductCard";
import { loadAllElectronicsProducts } from "../ProductsData";
import { Slider } from "@mui/material";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import { Link } from 'react-router-dom';
const FILTER_CONFIG = {
  brand: ["Philips", "Wipro", "Syska", "Havells", "Crompton", "Bajaj", "Orient", "Panasonic", "Eveready", "Surya", "Luminous", "Halonix", "Opple", "GM", "Aurora", "Moser Baer", "Samsung", "LG"],
  type: ["LED Tube Light", "Fluorescent Tube Light", "T5 Tube Light", "T8 Tube Light", "Batten Light", "Integrated Tube Light", "Smart Tube Light"],
  wattage: ["4W", "6W", "8W", "10W", "12W", "15W", "18W", "20W", "22W", "24W", "28W", "30W", "36W", "40W", "50W"],
  length: ["1 Feet", "1.5 Feet", "2 Feet", "3 Feet", "4 Feet", "5 Feet", "6 Feet", "8 Feet"],
  colorTemperature: ["Warm White (3000K)", "Cool Daylight (4000K)", "Daylight White (5000K)", "Cool White (6500K)", "Natural White (5700K)", "RGB Color", "Tunable White"],
  color: ["White", "Cool White", "Warm White", "Daylight", "Multicolor", "RGB", "Red", "Blue", "Green", "Yellow"],
  mountingType: ["Surface Mount", "Recessed Mount", "Suspended Mount", "Magnetic Base", "Clip On", "Bracket Mount"],
  features: ["Dimmable", "Smart Control", "Motion Sensor", "Emergency Light", "Water Resistant", "Dust Proof", "Energy Saving", "Eye Comfort", "Flicker Free", "High Lumen", "Long Life", "Warranty 2 Years"]
};

function TubeLight() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [maxPrice, setMaxPrice] = useState(500);
  const [sortBy, setSortBy] = useState("default");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  
  const [filters, setFilters] = useState({ brand: [], type: [], wattage: [], length: [], colorTemperature: [], color: [], mountingType: [], features: [] });
  const [openSections, setOpenSections] = useState({ 
    brand: true, type: true, wattage: true, length: false, colorTemperature: false, color: false, mountingType: false, features: false
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await loadAllElectronicsProducts();
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
    setFilters({ brand: [], type: [], wattage: [], length: [], colorTemperature: [], color: [], mountingType: [], features: [] });
    setMaxPrice(2000);
    setSortBy("default");
  };

  let filteredProducts = products.filter(p => 
    p.category?.toLowerCase() === "tube light" ||
    p.category?.toLowerCase() === "led tube" ||
    p.subCategory?.toLowerCase() === "tube-light" ||
    p.name?.toLowerCase().includes("tube light") ||
    p.name?.toLowerCase().includes("led tube") ||
    p.name?.toLowerCase().includes("batten light")
  );

  filteredProducts = filteredProducts.filter((product) => {
    if (product.offerPrice > maxPrice) return false;
    if (filters.brand.length > 0 && !filters.brand.includes(product.brand)) return false;
    if (filters.type.length > 0 && !filters.type.includes(product.type)) return false;
    if (filters.wattage.length > 0 && !filters.wattage.includes(product.wattage)) return false;
    if (filters.length.length > 0 && !filters.length.includes(product.length)) return false;
    if (filters.colorTemperature.length > 0 && !filters.colorTemperature.includes(product.colorTemperature)) return false;
    if (filters.color.length > 0 && !filters.color.includes(product.color)) return false;
    if (filters.mountingType.length > 0 && !filters.mountingType.includes(product.mountingType)) return false;
    if (filters.features.length > 0 && !filters.features.some(f => product.features?.includes(f))) return false;
    return true;
  });

  if (sortBy === "price_low") filteredProducts.sort((a, b) => a.offerPrice - b.offerPrice);
  if (sortBy === "price_high") filteredProducts.sort((a, b) => b.offerPrice - a.offerPrice);
  if (sortBy === "name_asc") filteredProducts.sort((a, b) => a.name?.localeCompare(b.name));
  if (sortBy === "name_desc") filteredProducts.sort((a, b) => b.name?.localeCompare(a.name));

  const AccordionSection = ({ title, sectionKey, items }) => (
    <div className="mb-4 border-b border-gray-100 pb-3">
      <button onClick={() => toggleSection(sectionKey)} className="flex justify-between w-full font-bold text-gray-800 text-sm mb-2 hover:text-yellow-600 transition">
        <span>{title}</span>
        {openSections[sectionKey] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      {openSections[sectionKey] && (
        <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
          {items.map((item, index) => (
            <label key={index} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
              <input type="checkbox" checked={filters[sectionKey]?.includes(item)} onChange={() => handleFilterToggle(sectionKey, item)} 
                className="w-3.5 h-3.5 rounded border-gray-300 text-yellow-600" />
              <span className="text-gray-600 text-xs">{item}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );

  const FilterSidebar = () => (
    <div className="bg-white p-4 rounded-xl shadow-sm">
      <div className="flex justify-between items-center mb-4 border-b pb-3">
        <h2 className="font-bold">Filters</h2>
        <button onClick={clearAllFilters} className="text-yellow-600 text-xs hover:underline">Clear All</button>
      </div>
      <AccordionSection title=" Brand" sectionKey="brand" items={FILTER_CONFIG.brand} />
      <AccordionSection title=" Type" sectionKey="type" items={FILTER_CONFIG.type} />
      <AccordionSection title=" Wattage" sectionKey="wattage" items={FILTER_CONFIG.wattage} />
      <AccordionSection title=" Length" sectionKey="length" items={FILTER_CONFIG.length} />
      <AccordionSection title=" Color Temperature" sectionKey="colorTemperature" items={FILTER_CONFIG.colorTemperature} />
      <AccordionSection title=" Color" sectionKey="color" items={FILTER_CONFIG.color} />
      <AccordionSection title=" Mounting Type" sectionKey="mountingType" items={FILTER_CONFIG.mountingType} />
      <AccordionSection title=" Features" sectionKey="features" items={FILTER_CONFIG.features} />
      <div className="mb-4 pt-2">
        <h2 className="font-bold text-sm mb-2"> Max Price: ₹{maxPrice}</h2>
        <Slider value={maxPrice} onChange={(e, val) => setMaxPrice(val)} min={0} max={3000} step={50}
          sx={{ color: "#ca8a04", height: 4, '& .MuiSlider-thumb': { width: 18, height: 18, backgroundColor: '#ca8a04' } }} />
      </div>
    </div>
  );

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600"></div></div>;

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-yellow-600 to-amber-600 text-white text-center py-12">
        <h1 className="text-4xl font-bold">LED Tube Lights</h1>
      
      </div>
      <nav className="flex items-center gap-2 text-sm text-gray-500 mt-3 !pl-7">
          <Link to="/" className="!text-lg !no-underline !font-semibold !text-[#1E2D42] transition-colors">Home</Link>
          <span className="text-lg !font-medium">/</span>
          <span className="text-lg !font-medium text-[#E4921A]">Tube Lights</span>
        </nav>
        <h2 className="text-2xl !font-bold !mt-3 !mb-3 !pl-7">Tube Lights</h2>

      {/* Mobile Filter Button */}
      <div className="md:hidden px-4 pt-4 sticky top-0 z-40 bg-gray-100 pb-2">
        <button onClick={() => setMobileFiltersOpen(true)} className="flex items-center gap-2 bg-white px-4 py-3 rounded-lg shadow-md w-full justify-between border border-gray-200">
          <div className="flex items-center gap-2">
            <Menu size={20} />
            <span className="font-medium text-gray-700">Filters</span>
          </div>
          <span className="text-xs text-gray-500">{Object.values(filters).flat().length} active</span>
        </button>
      </div>

      {/* Mobile Filter Drawer */}
      {mobileFiltersOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/60" onClick={() => setMobileFiltersOpen(false)}>
          <div className="absolute top-0 left-0 w-[85%] h-full bg-white overflow-y-auto p-4 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4 pb-2 border-b sticky top-0 bg-white">
              <h2 className="font-bold text-lg">All Filters</h2>
              <button onClick={() => setMobileFiltersOpen(false)} className="p-1 hover:bg-gray-100 rounded">
                <X size={24} />
              </button>
            </div>
            <FilterSidebar />
            <div className="sticky bottom-0 bg-white pt-4 pb-2 mt-4 border-t">
              <button onClick={() => setMobileFiltersOpen(false)} className="w-full bg-yellow-600 text-white py-3 rounded-lg font-semibold">
                Apply Filters
              </button>
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
                <div className="text-6xl mb-4"></div>
                <h3 className="text-xl font-semibold mb-2">No Tube Lights Found</h3>
                <p className="text-gray-500 mb-4">Try adjusting your filters or check back later</p>
                <button onClick={clearAllFilters} className="bg-yellow-600 text-white px-6 py-2 rounded-lg hover:bg-yellow-700 transition">
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

export default TubeLight;