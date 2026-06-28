// src/component/Dupatta.jsx
import { useEffect, useState } from "react";
import ProductCard from "../ProductCard";
import { loadAllProducts } from "../ProductsData";
import { Slider } from "@mui/material";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import { Link } from 'react-router-dom';
const FILTER_CONFIG = {
  // Dupatta Type
  type: [
    "Printed Dupatta", "Solid Dupatta", "Embroidered Dupatta", "Block Print Dupatta",
    "Bandhani Dupatta", "Tie & Dye Dupatta", "Phulkari Dupatta", "Chikankari Dupatta",
    "Silk Dupatta", "Cotton Dupatta", "Georgette Dupatta", "Chiffon Dupatta",
    "Net Dupatta", "Velvet Dupatta", "Linen Dupatta", "Kota Doria Dupatta",
    "Jaipuri Dupatta", "Banarasi Dupatta", "Zari Work Dupatta", "Sequin Dupatta",
    "Tassel Dupatta", "Mirror Work Dupatta", "Patch Work Dupatta"
  ],
  
  // Fabric
  fabric: [
    "Silk", "Cotton", "Georgette", "Chiffon", "Net", "Velvet", "Linen",
    "Kota Doria", "Banarasi Silk", "Raw Silk", "Art Silk", "Polyester",
    "Satin", "Crepe", "Organza", "Jute Silk", "Tissue Silk"
  ],
  
  // Color
  color: [
    "Red", "Maroon", "Burgundy", "Pink", "Peach", "Orange", "Yellow", "Gold",
    "Green", "Teal", "Blue", "Navy Blue", "Purple", "Lavender", "Brown",
    "Black", "White", "Cream", "Beige", "Ivory", "Multicolor", "Pastel"
  ],
  
  // Work Type
  workType: [
    "Zari Work", "Embroidered", "Chikankari", "Phulkari", "Bandhani", "Tie & Dye",
    "Block Print", "Digital Print", "Sequin Work", "Stone Work", "Mirror Work",
    "Patch Work", "Lace Work", "Tassel", "Fringe", "Piping", "Border Work",
    "Butta Work", "Jaali Work", "Cut Work", "Applique Work"
  ],
  
  // Length
  length: ["2.25 Meter", "2.5 Meter", "2.75 Meter", "3 Meter", "3.5 Meter", "4 Meter"],
  
  // Occasion
  occasion: [
    "Wedding", "Festival", "Party Wear", "Casual Wear", "Office Wear",
    "Daily Wear", "Sangeet", "Mehendi", "Reception", "Pooja", "Religious"
  ],
  
  // Brand
  brand: [
    "Fabindia", "Biba", "W for Woman", "Global Desi", "Manyavar", "Kalki Fashion",
    "Utsav Fashion", "Cbazaar", "Indo Era", "Rangriti", "Varanga", "Aurelia",
    "Libas", "Mitera", "Sangria", "Vastramay"
  ]
};

function Dupatta() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [maxPrice, setMaxPrice] = useState(800);
  const [sortBy, setSortBy] = useState("default");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  
  const [filters, setFilters] = useState({ type: [], fabric: [], color: [], workType: [], length: [], occasion: [], brand: [] });
  const [openSections, setOpenSections] = useState({ type: true, fabric: true, color: true, workType: false, length: false, occasion: false, brand: false });

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
    setFilters({ type: [], fabric: [], color: [], workType: [], length: [], occasion: [], brand: [] });
    setMaxPrice(5000);
    setSortBy("default");
  };

  let filteredProducts = products.filter(p => 
    p.category?.toLowerCase() === "dupatta" ||
    p.name?.toLowerCase().includes("dupatta") ||
    p.name?.toLowerCase().includes("duppata")
  );

  filteredProducts = filteredProducts.filter((product) => {
    if (product.offerPrice > maxPrice) return false;
    if (filters.type.length > 0 && !filters.type.includes(product.type)) return false;
    if (filters.fabric.length > 0 && !filters.fabric.includes(product.fabric)) return false;
    if (filters.color.length > 0 && !filters.color.includes(product.color)) return false;
    if (filters.workType.length > 0 && !filters.workType.includes(product.workType)) return false;
    if (filters.length.length > 0 && !filters.length.includes(product.length)) return false;
    if (filters.occasion.length > 0 && !filters.occasion.includes(product.occasion)) return false;
    if (filters.brand.length > 0 && !filters.brand.includes(product.brand)) return false;
    return true;
  });

  if (sortBy === "price_low") filteredProducts.sort((a, b) => a.offerPrice - b.offerPrice);
  if (sortBy === "price_high") filteredProducts.sort((a, b) => b.offerPrice - a.offerPrice);
  if (sortBy === "name_asc") filteredProducts.sort((a, b) => a.name?.localeCompare(b.name));
  if (sortBy === "name_desc") filteredProducts.sort((a, b) => b.name?.localeCompare(a.name));

  const AccordionSection = ({ title, sectionKey, items }) => (
    <div className="mb-4 border-b border-gray-100 pb-3">
      <button onClick={() => toggleSection(sectionKey)} className="flex justify-between w-full font-bold text-gray-800 text-sm mb-2 hover:text-purple-600 transition">
        <span>{title}</span>
        {openSections[sectionKey] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      {openSections[sectionKey] && (
        <div className="grid grid-cols-1 gap-1.5 max-h-60 overflow-y-auto pr-1">
          {items.map((item, index) => (
            <label key={index} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
              <input type="checkbox" checked={filters[sectionKey]?.includes(item)} onChange={() => handleFilterToggle(sectionKey, item)} 
                className="w-3.5 h-3.5 !mr-2 rounded border-gray-300 text-purple-600" />
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
        <button onClick={clearAllFilters} className="text-purple-600 text-xs hover:underline">Clear All</button>
      </div>
      <AccordionSection title=" Dupatta Type" sectionKey="type" items={FILTER_CONFIG.type} />
      <AccordionSection title=" Fabric" sectionKey="fabric" items={FILTER_CONFIG.fabric} />
      <AccordionSection title=" Color" sectionKey="color" items={FILTER_CONFIG.color} />
      <AccordionSection title=" Work Type" sectionKey="workType" items={FILTER_CONFIG.workType} />
      <AccordionSection title=" Length" sectionKey="length" items={FILTER_CONFIG.length} />
      <AccordionSection title=" Occasion" sectionKey="occasion" items={FILTER_CONFIG.occasion} />
      <AccordionSection title=" Brand" sectionKey="brand" items={FILTER_CONFIG.brand} />
      <div className="mb-4 pt-2">
        <h2 className="font-bold text-sm mb-2"> Max Price: ₹{maxPrice}</h2>
        <Slider value={maxPrice} onChange={(e, val) => setMaxPrice(val)} min={0} max={10000} step={200}
          sx={{ color: "#9333ea", height: 4, '& .MuiSlider-thumb': { width: 18, height: 18, backgroundColor: '#9333ea' } }} />
      </div>
    </div>
  );

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div></div>;

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="mx-4 my-4 !shadow-3xl shadow-red-900/30 bg-[#1E2D42] bg-gradient-to-br from-[#EE971D] to-[#1E2D42] rounded-xl text-white text-center py-12 ">
        <h1 className="text-4xl font-bold">Dupatta Collection</h1>
     
      </div>
<nav className="flex items-center gap-2 text-sm text-gray-500 mt-3 !pl-7">
            <Link to="/" className="!text-lg !no-underline !font-semibold !text-[#1E2D42] transition-colors">Home</Link>
            <span className="text-lg !font-medium">/</span>
            <span className="text-lg !font-medium text-[#E4921A]">Dupattas</span>
          </nav>
          <h2 className="text-2xl !font-bold !mt-3 !mb-3 !pl-7">Dupattas</h2>
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
              <button onClick={() => setMobileFiltersOpen(false)} className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold">Apply Filters</button>
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
              
                <h3 className="text-xl font-semibold mb-2">No Dupattas Found</h3>
                <p className="text-gray-500 mb-4">Try adjusting your filters or check back later</p>
                <button onClick={clearAllFilters} className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition">Clear All Filters</button>
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

export default Dupatta;