// src/component/WomenSunglasses.jsx
import  { useEffect, useState } from "react";
import ProductCard from "../ProductCard";
import { loadAllProducts } from "../ProductsData";
import { Slider } from "@mui/material";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import { Link } from 'react-router-dom';
const FILTER_CONFIG = {
  // Sunglass Type
  type: [
    "Aviator Sunglasses", "Wayfarer Sunglasses", "Cat Eye Sunglasses",
    "Oversized Sunglasses", "Round Sunglasses", "Square Sunglasses",
    "Rectangle Sunglasses", "Butterfly Sunglasses", "Heart Shape Sunglasses",
    "Geometric Sunglasses", "Sport Sunglasses", "Pilot Sunglasses",
    "Clubmaster Sunglasses", "Browline Sunglasses", "Shield Sunglasses",
    "Wrap Around Sunglasses", "Polarized Sunglasses", "Mirrored Sunglasses",
    "Tinted Sunglasses", "Gradient Sunglasses", "Photochromic Sunglasses",
    "Blue Light Blocking", "UV Protection Sunglasses"
  ],
  
  // Frame Shape
  frameShape: [
    "Aviator", "Wayfarer", "Cat Eye", "Oversized", "Round", "Square",
    "Rectangle", "Butterfly", "Heart", "Geometric", "Pilot", "Clubmaster",
    "Browline", "Shield", "Wrap Around", "Oval", "Hexagonal", "D-Shape"
  ],
  
  // Frame Color
  frameColor: [
    "Black", "Brown", "Tortoise", "Gold", "Silver", "Rose Gold", "Copper",
    "White", "Beige", "Blue", "Red", "Pink", "Purple", "Green", "Yellow",
    "Orange", "Gray", "Maroon", "Navy Blue", "Multicolor", "Transparent"
  ],
  
  // Lens Color
  lensColor: [
    "Black", "Brown", "Gray", "Blue", "Green", "Pink", "Purple", "Red",
    "Yellow", "Orange", "Silver Mirror", "Blue Mirror", "Rose Gold Mirror",
    "Gold Mirror", "Rainbow", "Gradient", "Clear", "Transparent"
  ],
  
  // Lens Type
  lensType: ["Polarized", "Non-Polarized", "UV400", "UV Protection", "Mirrored", "Tinted", "Gradient", "Photochromic", "Blue Light Blocking"],
  
  // UV Protection Level
  uvProtection: ["UV400", "99% UV Protection", "100% UV Protection", "UV380", "UVB Protection", "UVA/UVB Protection"],
  
  // Frame Material
  frameMaterial: [
    "Plastic", "Acetate", "Metal", "Stainless Steel", "Titanium", "Aluminum",
    "TR90", "Polycarbonate", "Nylon", "Wood", "Horn", "Combination", "Flexible"
  ],
  
  // Lens Material
  lensMaterial: ["Polycarbonate", "Glass", "CR-39", "Nylon", "Acrylic", "TAC Polarized"],
  
  // Size
  size: ["Small", "Medium", "Large", "Extra Large", "One Size", "Petite", "Oversized"],
  
  // Features
  features: [
    "UV Protection", "Polarized", "Anti Glare", "Anti Scratch", "Anti Reflective",
    "Impact Resistant", "Lightweight", "Flexible Hinges", "Adjustable Nose Pads",
    "Spring Hinges", "Case Included", "Cleaning Cloth Included", "Warranty",
    "Water Resistant", "Smudge Resistant", "Oleophobic Coating"
  ],
  
  // Occasion
  occasion: [
    "Casual Wear", "Party Wear", "Beach Wear", "Travel", "Driving",
    "Sports", "Office", "Formal", "Wedding", "Photoshoot", "Daily Wear",
    "Vacation", "Shopping", "Outdoor Activities"
  ],
  
  // Gender
  gender: ["Women", "Unisex"],
  
  // Brand
  brand: [
    "Ray-Ban", "Oakley", "Vogue", "Polaroid", "Fastrack", "Titan", "Lenskart",
    "Vincent Chase", "John Jacobs", "IDEE", "Sojos", "Carrera", "Persol",
    "Maui Jim", "Costa Del Mar", "Gucci", "Prada", "Dior", "Chanel",
    "Tom Ford", "Versace", "Fendi", "Kate Spade", "Michael Kors"
  ]
};

function SunGlasses() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [sortBy, setSortBy] = useState("default");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  
  const [filters, setFilters] = useState({ 
    type: [], frameShape: [], frameColor: [], lensColor: [], lensType: [],
    uvProtection: [], frameMaterial: [], lensMaterial: [], size: [],
    features: [], occasion: [], gender: [], brand: [] 
  });
  
  const [openSections, setOpenSections] = useState({
    type: true, frameShape: true, frameColor: true, lensColor: true, lensType: false,
    uvProtection: false, frameMaterial: false, lensMaterial: false, size: false,
    features: false, occasion: false, brand: false
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
      type: [], frameShape: [], frameColor: [], lensColor: [], lensType: [],
      uvProtection: [], frameMaterial: [], lensMaterial: [], size: [],
      features: [], occasion: [], gender: [], brand: [] 
    });
    setMaxPrice(15000);
    setSortBy("default");
  };

  let filteredProducts = products.filter(p => 
    p.category?.toLowerCase() === "sunglasses" ||
    p.subCategory?.toLowerCase() === "women-sunglasses" ||
    p.name?.toLowerCase().includes("sunglass") ||
    p.name?.toLowerCase().includes("goggle") ||
    p.name?.toLowerCase().includes("shades")
  );

  filteredProducts = filteredProducts.filter((product) => {
    if (product.offerPrice > maxPrice) return false;
    if (filters.type.length > 0 && !filters.type.includes(product.type)) return false;
    if (filters.frameShape.length > 0 && !filters.frameShape.includes(product.frameShape)) return false;
    if (filters.frameColor.length > 0 && !filters.frameColor.includes(product.frameColor)) return false;
    if (filters.lensColor.length > 0 && !filters.lensColor.includes(product.lensColor)) return false;
    if (filters.lensType.length > 0 && !filters.lensType.includes(product.lensType)) return false;
    if (filters.uvProtection.length > 0 && !filters.uvProtection.includes(product.uvProtection)) return false;
    if (filters.frameMaterial.length > 0 && !filters.frameMaterial.includes(product.frameMaterial)) return false;
    if (filters.lensMaterial.length > 0 && !filters.lensMaterial.includes(product.lensMaterial)) return false;
    if (filters.size.length > 0 && !filters.size.includes(product.size)) return false;
    if (filters.features.length > 0 && !filters.features.some(f => product.features?.includes(f))) return false;
    if (filters.occasion.length > 0 && !filters.occasion.includes(product.occasion)) return false;
    if (filters.gender.length > 0 && !filters.gender.includes(product.gender)) return false;
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
    <div className="bg-white p-4 rounded-xl shadow-sm sticky top-20">
      <div className="flex justify-between items-center mb-4 border-b pb-3">
        <h2 className="font-bold">Filters</h2>
        <button onClick={clearAllFilters} className="text-pink-600 text-xs hover:underline">Clear All</button>
      </div>
      <AccordionSection title=" Sunglass Type" sectionKey="type" items={FILTER_CONFIG.type} />
      <AccordionSection title=" Frame Shape" sectionKey="frameShape" items={FILTER_CONFIG.frameShape} />
      <AccordionSection title=" Frame Color" sectionKey="frameColor" items={FILTER_CONFIG.frameColor} />
      <AccordionSection title=" Lens Color" sectionKey="lensColor" items={FILTER_CONFIG.lensColor} />
      <AccordionSection title=" Lens Type" sectionKey="lensType" items={FILTER_CONFIG.lensType} />
      <AccordionSection title=" UV Protection" sectionKey="uvProtection" items={FILTER_CONFIG.uvProtection} />
      <AccordionSection title=" Frame Material" sectionKey="frameMaterial" items={FILTER_CONFIG.frameMaterial} />
      <AccordionSection title=" Lens Material" sectionKey="lensMaterial" items={FILTER_CONFIG.lensMaterial} />
      <AccordionSection title=" Size" sectionKey="size" items={FILTER_CONFIG.size} />
      <AccordionSection title=" Features" sectionKey="features" items={FILTER_CONFIG.features} />
      <AccordionSection title=" Occasion" sectionKey="occasion" items={FILTER_CONFIG.occasion} />
      <AccordionSection title=" Brand" sectionKey="brand" items={FILTER_CONFIG.brand} />
      <div className="mb-4 pt-2">
        <h2 className="font-bold text-sm mb-2"> Max Price: ₹{maxPrice}</h2>
        <Slider value={maxPrice} onChange={(e, val) => setMaxPrice(val)} min={0} max={25000} step={500}
          sx={{ color: "#db2777", height: 4, '& .MuiSlider-thumb': { width: 18, height: 18, backgroundColor: '#db2777' } }} />
      </div>
    </div>
  );

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600"></div></div>;

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="mx-4 my-4 !shadow-3xl shadow-red-900/30 bg-[#1E2D42] bg-gradient-to-br from-[#EE971D] to-[#1E2D42] rounded-xl text-white text-center py-12 ">
        <h1 className="text-4xl font-bold">Women's Sunglasses</h1>
  
      </div>
      <nav className="flex items-center gap-2 text-sm text-gray-500 mt-3 !pl-7">
            <Link to="/" className="!text-lg !no-underline !font-semibold !text-[#1E2D42] transition-colors">Home</Link>
            <span className="text-lg !font-medium">/</span>
            <span className="text-lg !font-medium text-[#E4921A]">Sunglasses</span>
          </nav>
          <h2 className="text-2xl !font-bold !mt-3 !mb-3 !pl-7">Sunglasses</h2>

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
              <button onClick={() => setMobileFiltersOpen(false)} className="w-full bg-pink-600 text-white py-3 rounded-lg font-semibold">Apply Filters</button>
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
           
                <h3 className="text-xl font-semibold mb-2">No Sunglasses Found</h3>
                <p className="text-gray-500 mb-4">Try adjusting your filters or check back later</p>
                <button onClick={clearAllFilters} className="bg-pink-600 text-white px-6 py-2 rounded-lg hover:bg-pink-700 transition">Clear All Filters</button>
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

export default SunGlasses;