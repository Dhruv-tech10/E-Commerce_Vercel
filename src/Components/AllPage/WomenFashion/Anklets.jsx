// src/component/Anklets.jsx
import  { useEffect, useState } from "react";
import { Slider } from "@mui/material";
import ProductCard from "../ProductCard";
import { ChevronDown, ChevronUp } from "lucide-react";
import { loadAllProducts } from "../ProductsData";
import { Link } from 'react-router-dom';
function Anklets() {
  const [products, setProducts] = useState([]);
  const [maxPrice, setMaxPrice] = useState(5000);
  const [filters, setFilters] = useState({ 
    materials: [], 
    sizes: [] 
  });
  const [openSections, setOpenSections] = useState({ 
    materials: true, 
    sizes: false 
  });

  const FILTER_CONFIG = {
    materials: ["Gold", "Silver", "Rose Gold", "Stainless Steel", "Alloy", "Beads"],
    sizes: ["Small", "Medium", "Large", "Adjustable"]
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
    setFilters({ materials: [], sizes: [] });
    setMaxPrice(5000);
  };

  const ankletsProducts = products
    .filter((p) => p.subCategory?.toLowerCase() === "anklets")
    .filter((product) => {
      if (product.offerPrice > maxPrice) return false;
      if (filters.materials.length > 0 && !filters.materials.includes(product.material)) return false;
      if (filters.sizes.length > 0 && !product.sizes?.some((s) => filters.sizes.includes(s))) return false;
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
        <div className="space-y-1.5 max-h-52 overflow-y-auto pr-1">
          {items.map((item, index) => (
            <label key={index} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
              <input type="checkbox" checked={filters[sectionKey]?.includes(item) || false}
                onChange={() => handleFilterToggle(sectionKey, item)} className="w-3.5 h-3.5 rounded border-gray-300 text-orange-600 focus:ring-orange-500" />
              <span className="text-gray-600 text-xs">{item}</span>
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
      
      <AccordionSection title=" Material" sectionKey="materials" items={FILTER_CONFIG.materials} />
      <AccordionSection title="Size" sectionKey="sizes" items={FILTER_CONFIG.sizes} />

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
              },
              '& .MuiSlider-track': { height: 6, borderRadius: 4 },
              '& .MuiSlider-rail': { height: 6, borderRadius: 4, backgroundColor: '#e5e7eb' }
            }} 
          />
        </div>
        <div className="flex justify-between text-[10px] text-gray-400">
          <span>₹0</span><span>₹2.5k</span><span>₹5k</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-100 min-h-screen">
      <nav className="flex items-center gap-2 text-sm text-gray-500 mt-3 !pl-7">
            <Link to="/" className="!text-lg !no-underline !font-semibold !text-[#1E2D42] transition-colors">Home</Link>
            <span className="text-lg !font-medium">/</span>
            <span className="text-lg !font-medium text-[#E4921A]">Anklets</span>
          </nav>
          <h2 className="text-2xl !font-bold !mt-3 !mb-3 !pl-7">Anklets</h2>
      <div className="max-w-7xl mx-auto flex gap-6 p-4">
        <div className="w-72 hidden md:block"><FilterSidebar /></div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-6">Anklets Collection</h1>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {ankletsProducts.length > 0 ? (
              ankletsProducts.map((product) => <ProductCard key={product.id} product={product} />)
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500 text-lg">No Anklets Found</p>
                <button onClick={clearAllFilters} className="mt-4 text-orange-600 underline">Clear Filters</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Anklets;