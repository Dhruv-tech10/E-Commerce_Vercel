// src/component/Rings.jsx
import  { useEffect, useState } from "react";
import ProductCard from "../ProductCard";
import { loadAllProducts } from "../ProductsData";
import { Slider } from "@mui/material";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import { Link } from 'react-router-dom';
const FILTER_CONFIG = {
  color: ["Gold", "Yellow Gold", "Rose Gold", "White Gold", "Silver", "Platinum", "Black", "White", "Multicolor", "Red", "Blue", "Green"],
  material: ["Gold", "Silver", "Platinum", "Titanium", "Tungsten", "Stainless Steel", "Alloy", "Brass", "Copper", "Rose Gold", "White Gold"],
  type: ["Wedding Ring", "Engagement Ring", "Couple Ring", "Promise Ring", "Diamond Ring", "Gold Ring", "Silver Ring", "Platinum Ring", "Designer Ring", "Antique Ring", "Stackable Ring", "Band Ring", "Solitaire Ring"],
  stoneType: ["Diamond", "American Diamond", "Cubic Zirconia", "Ruby", "Emerald", "Sapphire", "Pearl", "Opal", "Moissanite", "No Stone", "Gemstone", "Lab Grown Diamond"],
  ringSize: ["4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "Adjustable", "Custom Size"],
  weight: ["1-2g", "2-3g", "3-4g", "4-5g", "5-6g", "6-7g", "7-8g", "8-10g", "10-15g", "15g+"],
  occasion: ["Wedding", "Engagement", "Anniversary", "Proposal", "Reception", "Party Wear", "Casual", "Daily Wear", "Formal", "Romantic Gift"],
  workType: ["Solitaire", "Prong Setting", "Bezel Setting", "Pavé Setting", "Channel Setting", "Cluster Setting", "Halo Setting", "Three Stone", "Eternity Band", "Plain Band", "Engraved", "Matte Finish", "Polished Finish"],
  brand: ["Tanishq", "Malabar Gold", "Kalyan Jewellers", "Joyalukkas", "PC Jeweller", "Caratlane", "Bluestone", "Melorra", "GIVA", "Voylla", "Mia by Tanishq", "Orra", "Senco Gold", "PN Gadgil"]
};

function Rings() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [maxPrice, setMaxPrice] = useState(5000);
  const [sortBy, setSortBy] = useState("default");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  
  const [filters, setFilters] = useState({ color: [], material: [], type: [], stoneType: [], ringSize: [], weight: [], occasion: [], workType: [], brand: [] });
  const [openSections, setOpenSections] = useState({ 
    color: true, material: true, type: true, stoneType: false, ringSize: false, weight: false, occasion: false, workType: false, brand: false
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
    setFilters({ color: [], material: [], type: [], stoneType: [], ringSize: [], weight: [], occasion: [], workType: [], brand: [] });
    setMaxPrice(50000);
    setSortBy("default");
  };

  let filteredProducts = products.filter(p => 
    p.category?.toLowerCase() === "rings" ||
    p.category?.toLowerCase() === "ring" ||
    p.subCategory?.toLowerCase() === "rings" ||
    p.name?.toLowerCase().includes("ring") ||
    p.name?.toLowerCase().includes("wedding ring") ||
    p.name?.toLowerCase().includes("engagement ring")
  );

  filteredProducts = filteredProducts.filter((product) => {
    if (product.offerPrice > maxPrice) return false;
    if (filters.color.length > 0 && !filters.color.includes(product.color)) return false;
    if (filters.material.length > 0 && !filters.material.includes(product.material)) return false;
    if (filters.type.length > 0 && !filters.type.includes(product.type)) return false;
    if (filters.stoneType.length > 0 && !filters.stoneType.includes(product.stoneType)) return false;
    if (filters.ringSize.length > 0 && !filters.ringSize.includes(product.ringSize)) return false;
    if (filters.weight.length > 0 && !filters.weight.includes(product.weight)) return false;
    if (filters.occasion.length > 0 && !filters.occasion.includes(product.occasion)) return false;
    if (filters.workType.length > 0 && !filters.workType.includes(product.workType)) return false;
    if (filters.brand.length > 0 && !filters.brand.includes(product.brand)) return false;
    return true;
  });

  if (sortBy === "price_low") filteredProducts.sort((a, b) => a.offerPrice - b.offerPrice);
  if (sortBy === "price_high") filteredProducts.sort((a, b) => b.offerPrice - a.offerPrice);
  if (sortBy === "name_asc") filteredProducts.sort((a, b) => a.name?.localeCompare(b.name));
  if (sortBy === "name_desc") filteredProducts.sort((a, b) => b.name?.localeCompare(a.name));

  const AccordionSection = ({ title, sectionKey, items }) => (
    <div className="mb-4 border-b border-gray-100 pb-3">
      <button onClick={() => toggleSection(sectionKey)} className="flex justify-between w-full font-bold text-gray-800 text-sm mb-2 hover:text-pink-600 transition">
        <span>{title}</span>
        {openSections[sectionKey] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      {openSections[sectionKey] && (
        <div className="grid grid-cols-1 gap-1.5 max-h-60 overflow-y-auto pr-1">
          {items.map((item, index) => (
            <label key={index} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
              <input type="checkbox" checked={filters[sectionKey]?.includes(item)} onChange={() => handleFilterToggle(sectionKey, item)} 
                className="w-3.5 h-3.5 !mr-2 rounded border-gray-300 text-pink-600" />
              <span className="text-gray-600 !text-sm">{item}</span>
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
        <button onClick={clearAllFilters} className="text-pink-600 text-xs hover:underline">Clear All</button>
      </div>
      <AccordionSection title=" Color" sectionKey="color" items={FILTER_CONFIG.color} />
      <AccordionSection title=" Material" sectionKey="material" items={FILTER_CONFIG.material} />
      <AccordionSection title=" Type" sectionKey="type" items={FILTER_CONFIG.type} />
      <AccordionSection title=" Stone Type" sectionKey="stoneType" items={FILTER_CONFIG.stoneType} />
      <AccordionSection title=" Ring Size" sectionKey="ringSize" items={FILTER_CONFIG.ringSize} />
      <AccordionSection title=" Weight" sectionKey="weight" items={FILTER_CONFIG.weight} />
      <AccordionSection title=" Occasion" sectionKey="occasion" items={FILTER_CONFIG.occasion} />
      <AccordionSection title=" Work Type" sectionKey="workType" items={FILTER_CONFIG.workType} />
      <AccordionSection title=" Brand" sectionKey="brand" items={FILTER_CONFIG.brand} />
      <div className="mb-4 pt-2">
        <h2 className="font-bold text-sm mb-2"> Max Price: ₹{maxPrice}</h2>
        <Slider value={maxPrice} onChange={(e, val) => setMaxPrice(val)} min={0} max={100000} step={1000}
          sx={{ color: "#db2777", height: 4, '& .MuiSlider-thumb': { width: 18, height: 18, backgroundColor: '#db2777' } }} />
      </div>
    </div>
  );

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600"></div></div>;

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <div className="mx-4 my-4 !shadow-3xl shadow-red-900/30 bg-[#1E2D42] bg-gradient-to-br from-[#EE971D] to-[#1E2D42] rounded-xl text-white text-center py-12 ">
        <h1 className="text-4xl font-bold">Rings Collection</h1>
      </div>
 <nav className="flex items-center gap-2 text-sm text-gray-500 mt-3 !pl-7">
          <Link to="/" className="!text-lg !no-underline !font-semibold !text-[#1E2D42] transition-colors">Home</Link>
          <span className="text-lg !font-medium">/</span>
          <span className="text-lg !font-medium text-[#E4921A]">Rings</span>
        </nav>
        <h2 className="text-2xl !font-bold !mt-3 !mb-3 !pl-7">Rings</h2>

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
              <button onClick={() => setMobileFiltersOpen(false)} className="w-full bg-pink-600 text-white py-3 rounded-lg font-semibold">
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
                <h3 className="text-xl font-semibold mb-2">No Rings Found</h3>
                <p className="text-gray-500 mb-4">Try adjusting your filters or check back later</p>
                <button onClick={clearAllFilters} className="bg-pink-600 text-white px-6 py-2 rounded-lg hover:bg-pink-700 transition">
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

export default Rings;