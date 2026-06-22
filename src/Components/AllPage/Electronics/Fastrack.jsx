// src/component/Fastrack.jsx
import { useEffect, useState } from "react";
import ProductCard from "../ProductCard";
import { loadAllElectronicsProducts } from "../ProductsData";
import { Slider } from "@mui/material";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import { Link } from 'react-router-dom';
const FILTER_CONFIG = {
  series: ["Fastrack Reflex", "Fastrack Reflex Beat", "Fastrack Reflex Vox", "Fastrack Reflex Tune", "Fastrack Reflex Pro", "Fastrack Limitless", "Fastrack Optimus", "Fastrack New York", "Fastrack Voyage", "Fastrack Xtreme"],
  displaySize: ["1.05 inch", "1.3 inch", "1.4 inch", "1.69 inch", "1.78 inch", "1.96 inch"],
  color: ["Black", "Blue", "Green", "Red", "Silver", "Gold", "Pink", "Teal", "White", "Navy Blue", "Olive Green"],
  connectivity: ["Bluetooth Calling", "Non-Calling"],
  batteryLife: ["3 Days", "5 Days", "7 Days", "10 Days", "14 Days", "20 Days"],
  strapMaterial: ["Silicone", "Metal", "Leather", "Nylon", "Rubber"],
  waterResistance: ["IP67", "IP68", "5 ATM"]
};

function Fastrack() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [maxPrice, setMaxPrice] = useState(4000);
  const [sortBy, setSortBy] = useState("default");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  
  const [filters, setFilters] = useState({ series: [], displaySize: [], color: [], connectivity: [], batteryLife: [], strapMaterial: [], waterResistance: [] });
  const [openSections, setOpenSections] = useState({ 
    series: true, displaySize: true, color: true, connectivity: false, batteryLife: false, strapMaterial: false, waterResistance: false
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
    setFilters({ series: [], displaySize: [], color: [], connectivity: [], batteryLife: [], strapMaterial: [], waterResistance: [] });
    setMaxPrice(15000);
    setSortBy("default");
  };

  let filteredProducts = products.filter(p => 
    p.brand?.toLowerCase() === "fastrack" ||
    p.category?.toLowerCase() === "smartwatches" ||
    p.category?.toLowerCase() === "smart watches" ||
    p.name?.toLowerCase().includes("fastrack") ||
    p.name?.toLowerCase().includes("reflex")
  );

  filteredProducts = filteredProducts.filter((product) => {
    if (product.offerPrice > maxPrice) return false;
    if (filters.series.length > 0 && !filters.series.includes(product.series)) return false;
    if (filters.displaySize.length > 0 && !filters.displaySize.includes(product.displaySize)) return false;
    if (filters.color.length > 0 && !filters.color.includes(product.color)) return false;
    if (filters.connectivity.length > 0 && !filters.connectivity.includes(product.connectivity)) return false;
    if (filters.batteryLife.length > 0 && !filters.batteryLife.includes(product.batteryLife)) return false;
    if (filters.strapMaterial.length > 0 && !filters.strapMaterial.includes(product.strapMaterial)) return false;
    if (filters.waterResistance.length > 0 && !filters.waterResistance.includes(product.waterResistance)) return false;
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
        <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
          {items.map((item, index) => (
            <label key={index} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
              <input type="checkbox" checked={filters[sectionKey]?.includes(item)} onChange={() => handleFilterToggle(sectionKey, item)} 
                className="w-3.5 h-3.5 rounded border-gray-300 text-red-600" />
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
        <button onClick={clearAllFilters} className="text-red-600 text-xs hover:underline">Clear All</button>
      </div>
      <AccordionSection title=" Series" sectionKey="series" items={FILTER_CONFIG.series} />
      <AccordionSection title=" Display Size" sectionKey="displaySize" items={FILTER_CONFIG.displaySize} />
      <AccordionSection title=" Color" sectionKey="color" items={FILTER_CONFIG.color} />
      <AccordionSection title=" Connectivity" sectionKey="connectivity" items={FILTER_CONFIG.connectivity} />
      <AccordionSection title=" Battery Life" sectionKey="batteryLife" items={FILTER_CONFIG.batteryLife} />
      <AccordionSection title=" Strap Material" sectionKey="strapMaterial" items={FILTER_CONFIG.strapMaterial} />
      <AccordionSection title=" Water Resistance" sectionKey="waterResistance" items={FILTER_CONFIG.waterResistance} />
      <div className="mb-4 pt-2">
        <h2 className="font-bold text-sm mb-2"> Max Price: ₹{maxPrice}</h2>
        <Slider value={maxPrice} onChange={(e, val) => setMaxPrice(val)} min={0} max={20000} step={500}
          sx={{ color: "#dc2626", height: 4, '& .MuiSlider-thumb': { width: 18, height: 18, backgroundColor: '#dc2626' } }} />
      </div>
    </div>
  );

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div></div>;

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white text-center py-12">
        <h1 className="text-4xl font-bold">Fastrack Smartwatches</h1>
       
      </div>
      <nav className="flex items-center gap-2 text-sm text-gray-500 mt-3 !pl-7">
          <Link to="/" className="!text-lg !no-underline !font-semibold !text-[#1E2D42] transition-colors">Home</Link>
          <span className="text-lg !font-medium">/</span>
          <span className="text-lg !font-medium text-[#E4921A]">Fastrack</span>
        </nav>
        <h2 className="text-2xl !font-bold !mt-3 !mb-3 !pl-7">Fastrack</h2>

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
              <button onClick={() => setMobileFiltersOpen(false)} className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold">
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
                <h3 className="text-xl font-semibold mb-2">No Fastrack Products Found</h3>
                <p className="text-gray-500 mb-4">Try adjusting your filters or check back later</p>
                <button onClick={clearAllFilters} className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition">
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

export default Fastrack;