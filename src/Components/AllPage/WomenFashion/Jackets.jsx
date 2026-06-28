// src/component/WomenJackets.jsx
import { useEffect, useState } from "react";
import { Slider } from "@mui/material";
import ProductCard from "../ProductCard";
import { ChevronDown, ChevronUp } from "lucide-react";
import { loadAllProducts } from "../ProductsData";
import { Link } from 'react-router-dom';
function Jackets() {
  const [products, setProducts] = useState([]);
  const [maxPrice, setMaxPrice] = useState(5000);
  const [filters, setFilters] = useState({ 
    fabrics: [], 
    combos: [] 
  });
  const [openSections, setOpenSections] = useState({ 
    fabrics: true, 
    combos: false 
  });

  const FILTER_CONFIG = {
    fabrics: ["Cotton", "Polyester", "Linen", "Rayon", "Silk", "Blended"],
    combos: ["Single", "Pack of 2", "Pack of 3", "Pack of 5", "Combo Set"],
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await loadAllProducts();
      setProducts(data);
    };
    fetchData();
  }, []);

  const toggleSection = (section) => setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  const handleFilterToggle = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: prev[key].includes(value) ? prev[key].filter(item => item !== value) : [...prev[key], value]
    }));
  };
  const clearAllFilters = () => {
    setFilters({ fabrics: [], combos: [] });
    setMaxPrice(5000);
  };

  const womenJacketsProducts = products
    .filter((p) => p.category?.trim().toLowerCase() === "women jackets")
    .filter((product) => {
      if (product.offerPrice > maxPrice) return false;
      if (filters.fabrics.length > 0 && !filters.fabrics.includes(product.fabric)) return false;
      if (filters.combos.length > 0 && !filters.combos.includes(product.combo)) return false;
      return true;
    })
    .sort((a, b) => a.offerPrice - b.offerPrice);

  const AccordionSection = ({ title, sectionKey, items }) => (
    <div className="mb-4 border-b border-gray-100 pb-3">
      <button onClick={() => toggleSection(sectionKey)} className="flex justify-between items-center w-full font-bold text-gray-800 text-sm mb-2 hover:text-orange-600">
        <span>{title}</span>
        {openSections[sectionKey] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      {openSections[sectionKey] && (
        <div className="grid grid-cols-1 gap-1.5 max-h-60 overflow-y-auto pr-1">
          {items.map((item, index) => (
            <label key={index} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
              <input type="checkbox" checked={filters[sectionKey]?.includes(item) || false}
                onChange={() => handleFilterToggle(sectionKey, item)} className="w-3.5 h-3.5 !mr-2 rounded border-gray-300 text-orange-600 focus:ring-orange-500" />
              <span className="text-gray-600 !text-sm">{item}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );

  const FilterSidebar = () => (
    <div className="bg-white p-4 rounded-xl shadow-sm space-y-4">
      <div className="flex justify-between items-center border-b pb-3">
        <h2 className="font-bold text-base text-gray-800">Filters</h2>
        <button onClick={clearAllFilters} className="text-orange-600 text-xs font-semibold hover:underline">Clear All</button>
      </div>
      
      <AccordionSection title="🧵 Fabric" sectionKey="fabrics" items={FILTER_CONFIG.fabrics} />
      <AccordionSection title="📦 Combo" sectionKey="combos" items={FILTER_CONFIG.combos} />

      {/* 🎨 PRICE RANGE SLIDER - LIKE IMAGE 2 */}
      <div className="mb-4 border-b border-gray-100 pb-3">
        <h2 className="font-bold text-gray-800 text-sm mb-1">Max Price: ₹{maxPrice.toLocaleString()}</h2>
        <div className="px-2 py-3">
          <Slider 
            value={maxPrice} 
            onChange={(e, val) => setMaxPrice(val)} 
            min={0} 
            max={5000} 
            step={50} 
            sx={{
              color: "#ea580c",
              height: 6,
              '& .MuiSlider-thumb': {
                width: 20,
                height: 20,
                backgroundColor: '#ea580c',
                boxShadow: '0 2px 8px rgba(234, 88, 12, 0.3)',
                '&:hover': {
                  boxShadow: '0 4px 12px rgba(234, 88, 12, 0.5)',
                }
              },
              '& .MuiSlider-track': {
                height: 6,
                borderRadius: 4,
              },
              '& .MuiSlider-rail': {
                height: 6,
                borderRadius: 4,
                backgroundColor: '#e5e7eb',
              }
            }} 
          />
        </div>
        <div className="flex justify-between text-[10px] text-gray-400 mt-1 font-medium">
          <span>₹0</span>
          <span>₹2.5k</span>
          <span>₹5k</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="mx-4 my-4 !shadow-3xl shadow-red-900/30 bg-[#1E2D42] bg-gradient-to-br from-[#EE971D] to-[#1E2D42] rounded-xl text-white text-center py-12 ">
        <h1 className="text-3xl font-bold">Jackets Collection</h1>
        <p className="mt-2 text-white/80 text-sm">Timeless Elegance for Every Occasion</p>
      </div>
      <nav className="flex items-center gap-2 text-sm text-gray-500 mt-3 !pl-7">
            <Link to="/" className="!text-lg !no-underline !font-semibold !text-[#1E2D42] transition-colors">Home</Link>
            <span className="text-lg !font-medium">/</span>
            <span className="text-lg !font-medium text-[#E4921A]">Jackets</span>
          </nav>
          <h2 className="text-2xl !font-bold !mt-3 !mb-3 !pl-7">Jackets</h2>
      <div className="max-w-7xl mx-auto flex gap-6 p-4">

        {/* Sidebar */}
        <div className="w-72 bg-white p-4 rounded-xl shadow-sm">
          <FilterSidebar />
        </div>

        {/* Products */}
        <div className="flex-1">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {womenJacketsProducts.length > 0 ? (
              womenJacketsProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <p className="text-gray-500">No Women's Jackets Found</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default Jackets;