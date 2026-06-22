// src/component/WomenSweaters.jsx
import { useEffect, useState } from "react";
import ProductCard from "../ProductCard";
import { loadAllProducts } from "../ProductsData";
import { Slider } from "@mui/material";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import { Link } from 'react-router-dom';
const FILTER_CONFIG = {
  // Sweater Type
  type: [
    "Pullover Sweater", "Cardigan", "Turtleneck Sweater", "V-Neck Sweater",
    "Crew Neck Sweater", "Cropped Sweater", "Oversized Sweater", "Slim Fit Sweater",
    "Cable Knit Sweater", "Ribbed Sweater", "Fair Isle Sweater", "Striped Sweater",
    "Printed Sweater", "Solid Sweater", "Cashmere Sweater", "Wool Sweater",
    "Cotton Sweater", "Acrylic Sweater", "Blend Sweater", "Chunky Knit Sweater",
    "Lightweight Sweater", "Winter Sweater", "Party Sweater", "Casual Sweater",
    "Office Sweater", "High Neck Sweater", "Hooded Sweater", "Button Down Sweater"
  ],
  
  // Size
  size: ["XS", "S", "M", "L", "XL", "XXL", "3XL", "4XL"],
  
  // Material
  material: [
    "Wool", "Cashmere", "Merino Wool", "Cotton", "Acrylic", "Polyester",
    "Nylon", "Viscose", "Rayon", "Alpaca", "Mohair", "Angora", "Linen",
    "Bamboo", "Hemp", "Wool Blend", "Cotton Blend", "Acrylic Blend"
  ],
  
  // Color
  color: [
    "Black", "White", "Gray", "Charcoal", "Navy Blue", "Blue", "Red",
    "Maroon", "Burgundy", "Pink", "Rose", "Beige", "Cream", "Brown",
    "Tan", "Olive Green", "Green", "Mustard", "Yellow", "Orange",
    "Purple", "Lavender", "Teal", "Multicolor", "Striped"
  ],
  
  // Knit Type
  knitType: [
    "Cable Knit", "Ribbed Knit", "Fine Knit", "Chunky Knit", "Loose Knit",
    "Tight Knit", "Fisherman Knit", "Fair Isle", "Intarsia", "Jacquard"
  ],
  
  // Neck Style
  neckStyle: [
    "Turtleneck", "Mock Neck", "Crew Neck", "V-Neck", "Scoop Neck",
    "Round Neck", "High Neck", "Boat Neck", "Hooded", "Polo Neck",
    "Roll Neck", "Cowl Neck", "Sweetheart Neck", "Off Shoulder"
  ],
  
  // Sleeve Type
  sleeveType: [
    "Long Sleeve", "Full Sleeve", "Three Quarter Sleeve", "Half Sleeve",
    "Short Sleeve", "Puff Sleeve", "Bell Sleeve", "Balloon Sleeve",
    "Dolman Sleeve", "Batwing Sleeve", "Cap Sleeve", "Sleeveless"
  ],
  
  // Length
  length: ["Cropped", "Regular", "Long", "Oversized", "Tunic Length", "Knee Length"],
  
  // Features
  features: [
    "Warm", "Breathable", "Lightweight", "Heavy Weight", "Soft Touch",
    "Itch Free", "Hypoallergenic", "Machine Washable", "Hand Wash Only",
    "Dry Clean Only", "Wrinkle Resistant", "Stretchable", "Non Stretch"
  ],
  
  // Season
  season: ["Winter", "Fall", "Spring", "All Season", "Cold Weather"],
  
  // Brand
  brand: [
    "H&M", "Zara", "Mango", "Forever 21", "Uniqlo", "Gap", "Tommy Hilfiger",
    "Calvin Klein", "Levi's", "Jack & Jones", "Vero Moda", "Only", "Biba",
    "Fabindia", "W for Woman", "Global Desi", "Allen Solly", "Van Heusen",
    "Louis Philippe", "Jockey", "Puma", "Adidas", "Nike", "Under Armour"
  ]
};

function Sweaters() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [maxPrice, setMaxPrice] = useState(1200);
  const [sortBy, setSortBy] = useState("default");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  
  const [filters, setFilters] = useState({ 
    type: [], size: [], material: [], color: [], knitType: [], 
    neckStyle: [], sleeveType: [], length: [], features: [], season: [], brand: [] 
  });
  
  const [openSections, setOpenSections] = useState({
    type: true, size: true, material: true, color: true, knitType: false,
    neckStyle: false, sleeveType: false, length: false, features: false, season: false, brand: false
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
      type: [], size: [], material: [], color: [], knitType: [], 
      neckStyle: [], sleeveType: [], length: [], features: [], season: [], brand: [] 
    });
    setMaxPrice(8000);
    setSortBy("default");
  };

  let filteredProducts = products.filter(p => 
    p.category?.toLowerCase() === "sweater" ||
    p.category?.toLowerCase() === "winter wear" ||
    p.name?.toLowerCase().includes("sweater") ||
    p.name?.toLowerCase().includes("pullover") ||
    p.name?.toLowerCase().includes("cardigan")
  );

  filteredProducts = filteredProducts.filter((product) => {
    if (product.offerPrice > maxPrice) return false;
    if (filters.type.length > 0 && !filters.type.includes(product.type)) return false;
    if (filters.size.length > 0 && !filters.size.includes(product.size)) return false;
    if (filters.material.length > 0 && !filters.material.includes(product.material)) return false;
    if (filters.color.length > 0 && !filters.color.includes(product.color)) return false;
    if (filters.knitType.length > 0 && !filters.knitType.includes(product.knitType)) return false;
    if (filters.neckStyle.length > 0 && !filters.neckStyle.includes(product.neckStyle)) return false;
    if (filters.sleeveType.length > 0 && !filters.sleeveType.includes(product.sleeveType)) return false;
    if (filters.length.length > 0 && !filters.length.includes(product.length)) return false;
    if (filters.features.length > 0 && !filters.features.some(f => product.features?.includes(f))) return false;
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
      <button onClick={() => toggleSection(sectionKey)} className="flex justify-between w-full font-bold text-gray-800 text-sm mb-2 hover:text-blue-600 transition">
        <span>{title}</span>
        {openSections[sectionKey] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      {openSections[sectionKey] && (
        <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
          {items.map((item, index) => (
            <label key={index} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
              <input type="checkbox" checked={filters[sectionKey]?.includes(item)} onChange={() => handleFilterToggle(sectionKey, item)} 
                className="w-3.5 h-3.5 rounded border-gray-300 text-blue-600" />
              <span className="text-gray-600 text-xs">{item}</span>
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
        <button onClick={clearAllFilters} className="text-blue-600 text-xs hover:underline">Clear All</button>
      </div>
      <AccordionSection title=" Sweater Type" sectionKey="type" items={FILTER_CONFIG.type} />
      <AccordionSection title=" Size" sectionKey="size" items={FILTER_CONFIG.size} />
      <AccordionSection title=" Material" sectionKey="material" items={FILTER_CONFIG.material} />
      <AccordionSection title=" Color" sectionKey="color" items={FILTER_CONFIG.color} />
      <AccordionSection title=" Knit Type" sectionKey="knitType" items={FILTER_CONFIG.knitType} />
      <AccordionSection title=" Neck Style" sectionKey="neckStyle" items={FILTER_CONFIG.neckStyle} />
      <AccordionSection title=" Sleeve Type" sectionKey="sleeveType" items={FILTER_CONFIG.sleeveType} />
      <AccordionSection title=" Length" sectionKey="length" items={FILTER_CONFIG.length} />
      <AccordionSection title=" Features" sectionKey="features" items={FILTER_CONFIG.features} />
      <AccordionSection title=" Season" sectionKey="season" items={FILTER_CONFIG.season} />
      <AccordionSection title=" Brand" sectionKey="brand" items={FILTER_CONFIG.brand} />
      <div className="mb-4 pt-2">
        <h2 className="font-bold text-sm mb-2"> Max Price: ₹{maxPrice}</h2>
        <Slider value={maxPrice} onChange={(e, val) => setMaxPrice(val)} min={0} max={15000} step={500}
          sx={{ color: "#2563eb", height: 4, '& .MuiSlider-thumb': { width: 18, height: 18, backgroundColor: '#2563eb' } }} />
      </div>
    </div>
  );

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>;

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-center py-12">
        <h1 className="text-4xl font-bold">Women's Sweaters</h1>
  
      </div>
      <nav className="flex items-center gap-2 text-sm text-gray-500 mt-3 !pl-7">
            <Link to="/" className="!text-lg !no-underline !font-semibold !text-[#1E2D42] transition-colors">Home</Link>
            <span className="text-lg !font-medium">/</span>
            <span className="text-lg !font-medium text-[#E4921A]">Sweaters</span>
          </nav>
          <h2 className="text-2xl !font-bold !mt-3 !mb-3 !pl-7">Sweaters</h2>

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
              <button onClick={() => setMobileFiltersOpen(false)} className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold">Apply Filters</button>
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
              
                <h3 className="text-xl font-semibold mb-2">No Sweaters Found</h3>
                <p className="text-gray-500 mb-4">Try adjusting your filters or check back later</p>
                <button onClick={clearAllFilters} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">Clear All Filters</button>
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

export default Sweaters;