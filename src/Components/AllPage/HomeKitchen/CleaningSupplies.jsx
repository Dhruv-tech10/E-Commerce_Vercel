// src/component/CleaningSupplies.jsx
import { useEffect, useState } from "react";
import ProductCard from "../ProductCard";
import { loadAllProducts } from "../ProductsData";
import { Slider } from "@mui/material";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import { Link } from 'react-router-dom';
const FILTER_CONFIG = {
  material: ["Plastic", "Metal", "Fiber", "Cotton", "Microfiber", "Sponge", "Rubber", "Wood"],
  color: ["White", "Blue", "Green", "Yellow", "Red", "Gray", "Multicolor"],
  sizes: ["Small", "Medium", "Large", "Pack of 2", "Pack of 3", "Pack of 4", "Pack of 5"],
  brands: ["Home Centre", "Amazon Basics", "Solimo", "Cello", "Milton", "Prestige", "Dettol", "Lizol"]
};

function CleaningSupplies() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [maxPrice, setMaxPrice] = useState(1500);
  const [sortBy, setSortBy] = useState("default");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  
  const [filters, setFilters] = useState({ material: [], color: [], sizes: [], brands: [] });
  const [openSections, setOpenSections] = useState({ material: true, color: true, sizes: true, brands: true });

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
    setFilters({ material: [], color: [], sizes: [], brands: [] });
    setMaxPrice(1500);
    setSortBy("default");
  };

  let filteredProducts = products.filter(p => 
    p.category?.toLowerCase() === "cleaning" || 
    p.subCategory?.toLowerCase() === "cleaning-supplies" ||
    p.name?.toLowerCase().includes("clean") ||
    p.name?.toLowerCase().includes("mop") ||
    p.name?.toLowerCase().includes("brush")
  );

  filteredProducts = filteredProducts.filter(p => {
    if (p.offerPrice > maxPrice) return false;
    if (filters.material.length && !filters.material.includes(p.material)) return false;
    if (filters.color.length && !filters.color.includes(p.color)) return false;
    if (filters.sizes.length && !p.sizes?.some(s => filters.sizes.includes(s))) return false;
    if (filters.brands.length && !filters.brands.includes(p.brand)) return false;
    return true;
  });

  if (sortBy === "price_low") filteredProducts.sort((a, b) => a.offerPrice - b.offerPrice);
  if (sortBy === "price_high") filteredProducts.sort((a, b) => b.offerPrice - a.offerPrice);

  const AccordionSection = ({ title, sectionKey, items }) => (
    <div className="mb-4 border-b border-gray-100 pb-3">
      <button onClick={() => toggleSection(sectionKey)} className="flex justify-between w-full font-bold text-gray-800 text-sm mb-2 hover:text-green-600">
        <span>{title}</span>
        {openSections[sectionKey] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      {openSections[sectionKey] && (
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {items.map((item, i) => (
            <label key={i} className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={filters[sectionKey]?.includes(item)} onChange={() => handleFilterToggle(sectionKey, item)} 
                className="w-3.5 h-3.5 rounded border-gray-300 text-green-600" />
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
        <button onClick={clearAllFilters} className="text-green-600 text-xs hover:underline">Clear All</button>
      </div>
      <AccordionSection title=" Material" sectionKey="material" items={FILTER_CONFIG.material} />
      <AccordionSection title=" Color" sectionKey="color" items={FILTER_CONFIG.color} />
      <AccordionSection title=" Pack" sectionKey="sizes" items={FILTER_CONFIG.sizes} />
      <AccordionSection title=" Brands" sectionKey="brands" items={FILTER_CONFIG.brands} />
      <div className="mb-4 pt-2">
        <h2 className="font-bold text-sm mb-2"> Max Price: ₹{maxPrice}</h2>
        <Slider value={maxPrice} onChange={(e, val) => setMaxPrice(val)} min={0} max={3000} step={50}
          sx={{ color: "#16a34a", height: 4, '& .MuiSlider-thumb': { width: 18, height: 18, backgroundColor: '#16a34a' } }} />
      </div>
    </div>
  );

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div></div>;

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white text-center py-12">
        <h1 className="text-4xl font-bold"> Cleaning Supplies</h1>
        <p className="mt-2 text-white/80">Keep your home sparkling clean with our supplies</p>
      </div>
      <nav className="flex items-center gap-2 text-sm text-gray-500 mt-3 !pl-7">
            <Link to="/" className="!text-lg !no-underline !font-semibold !text-[#1E2D42] transition-colors">Home</Link>
            <span className="text-lg !font-medium">/</span>
            <span className="text-lg !font-medium text-[#E4921A]">Cleaning Supplies</span>
          </nav>
          <h2 className="text-2xl !font-bold !mt-3 !mb-3 !pl-7">Cleaning Supplies</h2>
      <div className="md:hidden px-4 pt-4">
        <button onClick={() => setMobileFiltersOpen(true)} className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm w-full justify-between border">
          <span className="font-medium text-gray-700">Filters</span><Menu size={20} />
        </button>
      </div>
      {mobileFiltersOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/50" onClick={() => setMobileFiltersOpen(false)}>
          <div className="absolute top-0 left-0 w-80 h-full bg-white overflow-y-auto p-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4 pb-2 border-b">
              <h2 className="font-bold text-lg">Filters</h2><button onClick={() => setMobileFiltersOpen(false)}><X size={20} /></button>
            </div>
            <FilterSidebar />
          </div>
        </div>
      )}
      <div className="max-w-7xl mx-auto p-4">
        <div className="flex gap-6">
          <div className="w-72 hidden md:block sticky top-20"><FilterSidebar /></div>
          <div className="flex-1">
            <div className="bg-white rounded-xl p-3 mb-4 flex justify-between items-center">
              <span className="text-xs">Showing {filteredProducts.length} products</span>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="border rounded-lg px-3 py-1.5 text-xs">
                <option value="default">Default</option><option value="price_low">Price: Low to High</option><option value="price_high">Price: High to Low</option>
              </select>
            </div>
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-xl p-12 text-center"><div className="text-5xl mb-4"></div>No Cleaning Supplies found.</div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProducts.map(p => <ProductCard key={p.id} product={p} />)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CleaningSupplies;