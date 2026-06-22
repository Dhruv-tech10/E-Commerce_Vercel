// src/component/MenLuggageBags.jsx
import  { useEffect, useState } from "react";
import ProductCard from "../ProductCard";
import { loadAllProducts } from "../ProductsData";
import { Slider } from "@mui/material";
import { Link } from 'react-router-dom';
const FILTER_CONFIG = {
  bagType: [
    "Duffle Bags", "Travel Bags", "Luggage Bags", "Holdalls", 
    "Garment Bags", "Wheeled Bags", "Backpack Luggage", "Trolley Bags",
    "Overnight Bags", "Weekender Bags", "Suit Bags"
  ],
  material: [
    "Polyester", "Nylon", "Leather", "Canvas", "PU Leather", 
    "Oxford Fabric", "Ballistic Nylon", "Cordura", "PVC"
  ],
  capacity: [
    "20-30 L", "30-40 L", "40-50 L", "50-60 L", "60-70 L", 
    "70-80 L", "80-100 L", "100+ L"
  ],
  features: [
    "Wheeled", "With Lock", "Water Resistant", "Lightweight", 
    "Expandable", "Multiple Compartments", "Laptop Compartment", "TSA Lock"
  ]
};

function MenLuggageBags() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [maxPrice, setMaxPrice] = useState(5000);
  const [sortBy, setSortBy] = useState("default");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  
  const [filters, setFilters] = useState({
    bagType: [],
    material: [],
    capacity: [],
    features: []
  });
  
  const [openSections, setOpenSections] = useState({
    bagType: true,
    material: true,
    capacity: false,
    features: false
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await loadAllProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error loading products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleFilterToggle = (key, value) => {
    setFilters((prev) => {
      const exists = prev[key].includes(value);
      return {
        ...prev,
        [key]: exists ? prev[key].filter((v) => v !== value) : [...prev[key], value]
      };
    });
  };

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const clearAllFilters = () => {
    setFilters({ bagType: [], material: [], capacity: [], features: [] });
    setMaxPrice(5000);
    setSortBy("default");
  };

  let filteredProducts = products.filter(
    (p) => p.category === "Tour Bags" || p.category === "Luggage Bags" || p.subCategory === "Tour Bags" || p.name?.toLowerCase().includes("luggage") || p.name?.toLowerCase().includes("tour bag")
  );

  filteredProducts = filteredProducts.filter((product) => {
    if (product.offerPrice > maxPrice) return false;
    if (filters.bagType.length > 0 && !filters.bagType.includes(product.bagType)) return false;
    if (filters.material.length > 0 && !filters.material.includes(product.material)) return false;
    if (filters.capacity.length > 0 && !filters.capacity.includes(product.capacity)) return false;
    if (filters.features.length > 0 && !filters.features.some(f => product.features?.includes(f))) return false;
    return true;
  });

  if (sortBy === "price_low") filteredProducts.sort((a, b) => a.offerPrice - b.offerPrice);
  if (sortBy === "price_high") filteredProducts.sort((a, b) => b.offerPrice - a.offerPrice);

  const AccordionSection = ({ title, sectionKey, items }) => (
    <div className="mb-4 border-b border-gray-100 pb-3">
      <button onClick={() => toggleSection(sectionKey)} className="flex justify-between items-center w-full font-bold text-gray-800 text-sm mb-2 hover:text-orange-600 transition">
        <span>{title}</span>
        {openSections[sectionKey] ? (<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>) : (<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>)}
      </button>
      {openSections[sectionKey] && (<div className="grid grid-cols-1 gap-1.5 max-h-60 overflow-y-auto pr-1">{items.map((item, index) => (<label key={index} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded"><input type="checkbox" checked={filters[sectionKey]?.includes(item)} onChange={() => handleFilterToggle(sectionKey, item)} className="w-3.5 h-3.5 rounded border-gray-300 text-orange-600 focus:ring-orange-500" /><span className="text-gray-600 text-xs">{item}</span></label>))}</div>)}
    </div>
  );

  const FilterSidebar = () => (
    <div className="bg-white p-4 rounded-xl shadow-sm">
      <div className="flex justify-between items-center mb-4 border-b pb-3"><h2 className="font-bold text-base text-gray-800">Filters</h2><button onClick={clearAllFilters} className="text-orange-600 text-xs font-semibold hover:underline">Clear All</button></div>
      <AccordionSection title="Bag Type" sectionKey="bagType" items={FILTER_CONFIG.bagType} />
      <AccordionSection title="Material" sectionKey="material" items={FILTER_CONFIG.material} />
      <AccordionSection title="Capacity" sectionKey="capacity" items={FILTER_CONFIG.capacity} />
      <AccordionSection title="Features" sectionKey="features" items={FILTER_CONFIG.features} />
      <div className="mb-4 pt-2"><h2 className="font-bold text-gray-800 text-sm mb-2">Max Price: ₹{maxPrice}</h2><div className="px-1"><Slider value={maxPrice} onChange={(e, val) => setMaxPrice(val)} valueLabelDisplay="auto" min={0} max={10000} step={200} sx={{ color: "#ea580c", height: 4, '& .MuiSlider-thumb': { width: 18, height: 18, backgroundColor: '#ea580c' }, '& .MuiSlider-track': { backgroundColor: '#ea580c' }, '& .MuiSlider-rail': { backgroundColor: '#d1d5db' } }} /></div><div className="flex justify-between text-[10px] text-gray-400 mt-1"><span>₹0</span><span>₹2500</span><span>₹5000</span><span>₹7500</span><span>₹10000</span></div></div>
    </div>
  );

  if (loading) return (<div className="bg-gray-100 min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div></div>);

  return (
    <div className="bg-gray-100 min-h-screen">
    
      <div className="bg-gradient-to-r from-gray-700 to-gray-900 text-white text-center py-8"><h1 className="text-3xl font-bold">Men's Luggage & Tour Bags</h1><p className="mt-2 text-white/80 text-sm">Travel in Style & Comfort</p></div>
      <nav className="flex items-center gap-2 text-sm text-gray-500 mt-3 !pl-7">
            <Link to="/" className="!text-lg !no-underline !font-semibold !text-[#1E2D42] transition-colors">Home</Link>
            <span className="text-lg !font-medium">/</span>
            <span className="text-lg !font-medium text-[#E4921A]">Men's Luggage & Tour Bags</span>
          </nav>
          <h2 className="text-2xl !font-bold !mt-3 !mb-3 !pl-7">Men's Luggage & Tour Bags</h2>
      <div className="md:hidden px-4 pt-4"><button onClick={() => setMobileFiltersOpen(true)} className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm w-full justify-between border"><span className="font-medium text-gray-700">Filters</span><svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg></button></div>
      {mobileFiltersOpen && (<div className="md:hidden fixed inset-0 z-50 bg-black/50" onClick={() => setMobileFiltersOpen(false)}><div className="absolute top-0 left-0 w-80 h-full bg-white shadow-xl overflow-y-auto p-4" onClick={(e) => e.stopPropagation()}><div className="flex justify-between items-center mb-4 pb-2 border-b"><h2 className="font-bold text-lg">Filters</h2><button onClick={() => setMobileFiltersOpen(false)} className="p-1"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button></div><FilterSidebar /></div></div>)}
      <div className="max-w-7xl mx-auto p-4"><div className="flex gap-6"><div className="w-72 hidden md:block sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto"><FilterSidebar /></div><div className="flex-1"><div className="bg-white rounded-xl shadow-sm p-3 mb-4 flex justify-between items-center flex-wrap gap-2"><div className="text-xs text-gray-500">Showing <span className="font-semibold text-gray-700">{filteredProducts.length}</span> luggage bags</div><div className="flex items-center gap-2"><span className="text-xs text-gray-500">Sort by:</span><select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="border rounded-lg px-3 py-1.5 text-xs font-medium focus:outline-none focus:border-orange-500"><option value="default">Default</option><option value="price_low">Price: Low to High</option><option value="price_high">Price: High to Low</option></select></div></div>{filteredProducts.length === 0 ? (<div className="bg-white rounded-xl shadow-sm p-12 text-center"><p className="text-gray-500 text-sm">No Luggage Bags found matching your filters.</p><button onClick={clearAllFilters} className="mt-4 text-orange-600 text-sm font-medium hover:underline">Clear all filters</button></div>) : (<div className="grid grid-cols-2 lg:grid-cols-3 gap-4">{filteredProducts.map((product) => (<ProductCard key={product.id} product={product} />))}</div>)}</div></div></div>
    </div>
  );
}

export default MenLuggageBags;