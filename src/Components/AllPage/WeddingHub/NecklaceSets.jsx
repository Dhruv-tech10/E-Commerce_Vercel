// src/component/NecklaceSets.jsx
import { useEffect, useState } from "react";
import ProductCard from "../ProductCard";
import { loadAllProducts } from "../ProductsData";
import { Slider } from "@mui/material";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import { Link } from 'react-router-dom';
const FILTER_CONFIG = {
  color: ["Gold", "Yellow Gold", "Rose Gold", "White Gold", "Silver", "Black", "Brown", "Red", "Green", "Blue", "Pink", "Purple", "Maroon", "Burgundy", "Multicolor"],
  material: ["Gold", "Silver", "Platinum", "Alloy", "Steel", "Brass", "Copper", "Kundan", "Polki", "American Diamond", "Cubic Zirconia", "Pearl", "Artificial Jewellery"],
  type: ["Necklace Set", "Wedding Necklace", "Bridal Necklace", "Designer Necklace", "Kundan Set", "Polki Set", "Temple Necklace", "Traditional Necklace", "Choker Set", "Long Necklace", "Rani Haar", "Layered Necklace"],
  stoneType: ["Diamond", "American Diamond", "Cubic Zirconia", "Ruby", "Emerald", "Sapphire", "Pearl", "Kundan", "Polki", "No Stone", "Crystal", "Gemstone"],
  weight: ["10-20g", "20-30g", "30-40g", "40-50g", "50-60g", "60-70g", "70-80g", "80-100g", "100g+"],
  occasion: ["Wedding", "Engagement", "Reception", "Sangeet", "Mehendi", "Party Wear", "Festival", "Cocktail", "Formal", "Casual", "Daily Wear"],
  workType: ["Kundan Work", "Polki Work", "Meenakari Work", "Enamel Work", "Filigree Work", "Stone Work", "Pearl Work", "Zari Work", "Plain", "Matte Finish", "Shiny Finish"],
  brand: ["Tanishq", "Malabar Gold", "Kalyan Jewellers", "Joyalukkas", "PC Jeweller", "Senco Gold", "Caratlane", "Bluestone", "Melorra", "GIVA", "Voylla", "Sia Art Jewellery", "Miraggio", "Zaveri Pearls"]
};

function NecklaceSets() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [maxPrice, setMaxPrice] = useState(5000);
  const [sortBy, setSortBy] = useState("default");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const [filters, setFilters] = useState({ color: [], material: [], type: [], stoneType: [], weight: [], occasion: [], workType: [], brand: [] });
  const [openSections, setOpenSections] = useState({
    color: true, material: true, type: true, stoneType: false, weight: false, occasion: false, workType: false, brand: false
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
    setFilters({ color: [], material: [], type: [], stoneType: [], weight: [], occasion: [], workType: [], brand: [] });
    setMaxPrice(50000);
    setSortBy("default");
  };

  let filteredProducts = products.filter(p =>
    p.category?.toLowerCase() === "necklace sets" ||
    p.category?.toLowerCase() === "necklace" ||
    p.subCategory?.toLowerCase() === "necklace-sets" ||
    p.name?.toLowerCase().includes("necklace set") ||
    p.name?.toLowerCase().includes("bridal necklace") ||
    p.name?.toLowerCase().includes("kundan set")
  );

  filteredProducts = filteredProducts.filter((product) => {
    if (product.offerPrice > maxPrice) return false;
    if (filters.color.length > 0 && !filters.color.includes(product.color)) return false;
    if (filters.material.length > 0 && !filters.material.includes(product.material)) return false;
    if (filters.type.length > 0 && !filters.type.includes(product.type)) return false;
    if (filters.stoneType.length > 0 && !filters.stoneType.includes(product.stoneType)) return false;
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
      <button onClick={() => toggleSection(sectionKey)} className="flex justify-between w-full font-bold text-gray-800 text-sm mb-2 hover:text-yellow-600 transition">
        <span>{title}</span>
        {openSections[sectionKey] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      {openSections[sectionKey] && (
        <div className="grid grid-cols-1 gap-1.5 max-h-60 overflow-y-auto pr-1">
          {items.map((item, index) => (
            <label key={index} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
              <input type="checkbox" checked={filters[sectionKey]?.includes(item)} onChange={() => handleFilterToggle(sectionKey, item)}
                className="w-3.5 h-3.5 !mr-2 rounded border-gray-300 text-yellow-600" />
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
        <button onClick={clearAllFilters} className="text-yellow-600 text-xs hover:underline">Clear All</button>
      </div>
      <AccordionSection title=" Color" sectionKey="color" items={FILTER_CONFIG.color} />
      <AccordionSection title=" Material" sectionKey="material" items={FILTER_CONFIG.material} />
      <AccordionSection title=" Type" sectionKey="type" items={FILTER_CONFIG.type} />
      <AccordionSection title=" Stone Type" sectionKey="stoneType" items={FILTER_CONFIG.stoneType} />
      <AccordionSection title=" Weight" sectionKey="weight" items={FILTER_CONFIG.weight} />
      <AccordionSection title=" Occasion" sectionKey="occasion" items={FILTER_CONFIG.occasion} />
      <AccordionSection title=" Work Type" sectionKey="workType" items={FILTER_CONFIG.workType} />
      <AccordionSection title=" Brand" sectionKey="brand" items={FILTER_CONFIG.brand} />
      <div className="mb-4 pt-2">
        <h2 className="font-bold text-sm mb-2"> Max Price: ₹{maxPrice}</h2>
        <Slider value={maxPrice} onChange={(e, val) => setMaxPrice(val)} min={0} max={100000} step={1000}
          sx={{ color: "#ca8a04", height: 4, '& .MuiSlider-thumb': { width: 18, height: 18, backgroundColor: '#ca8a04' } }} />
      </div>
    </div>
  );

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600"></div></div>;

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <div className="mx-4 my-4 !shadow-3xl shadow-red-900/30 bg-[#1E2D42] bg-gradient-to-br from-[#EE971D] to-[#1E2D42] rounded-xl text-white text-center py-12 ">
        <h1 className="text-4xl font-bold">Necklace Sets Collection</h1>
      </div>
      <nav className="flex items-center gap-2 text-sm text-gray-500 mt-3 !pl-7">
        <Link to="/" className="!text-lg !no-underline !font-semibold !text-[#1E2D42] transition-colors">Home</Link>
        <span className="text-lg !font-medium">/</span>
        <span className="text-lg !font-medium text-[#E4921A]">Necklace Sets</span>
      </nav>
      <h2 className="text-2xl !font-bold !mt-3 !mb-3 !pl-7">Necklace Sets</h2>

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
                <h3 className="text-xl font-semibold mb-2">No Necklace Sets Found</h3>
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

export default NecklaceSets;