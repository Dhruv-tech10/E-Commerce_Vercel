// src/component/WallpaperStickers.jsx
import { useEffect, useState } from "react";
import ProductCard from "../ProductCard";
import { loadAllProducts } from "../ProductsData";
import { Slider } from "@mui/material";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import { Link } from 'react-router-dom';
const FILTER_CONFIG = {
  // Wallpaper Type
  wallpaperType: [
    "3D Wallpaper", "Textured Wallpaper", "Plain Wallpaper", "Pattern Wallpaper",
    "Floral Wallpaper", "Geometric Wallpaper", "Striped Wallpaper", "Abstract Wallpaper",
    "Brick Wallpaper", "Wooden Wallpaper", "Stone Wallpaper", "Glitter Wallpaper",
    "Metallic Wallpaper", "Kids Wallpaper", "Nature Wallpaper", "Traditional Wallpaper"
  ],
  
  // Sticker Type
  stickerType: [
    "Vinyl Sticker", "Removable Sticker", "Peel and Stick", "Self-Adhesive",
    "Wall Decal", "Quote Sticker", "Cartoon Sticker", "Animal Sticker",
    "Flower Sticker", "Tree Sticker", "Butterfly Sticker", "Custom Sticker"
  ],
  
  // Material
  material: ["Vinyl", "Paper", "Fabric", "Non-woven", "PVC", "Self-adhesive", "Peel and Stick", "Polyester", "Canvas", "Silk"],
  
  // Color
  color: ["Multicolor", "White", "Blue", "Green", "Pink", "Gold", "Silver", "Black", "Gray", "Red", "Yellow", "Orange", "Purple", "Brown", "Beige"],
  
  // Size
  sizes: ["Small Roll", "Medium Roll", "Large Roll", "Extra Large Roll", "Sheet", "Set of 5", "Set of 10", "Set of 20", "Custom Size"],
  
  // Pattern
  pattern: ["Floral", "Geometric", "Abstract", "Striped", "Solid", "Damask", "Toile", "Moroccan", "Bohemian", "Scandinavian", "Vintage", "Modern"],
  
  // Room Type
  roomType: ["Living Room", "Bedroom", "Kitchen", "Bathroom", "Kids Room", "Office", "Hallway", "Balcony", "Restaurant", "Hotel"],
  
  // Brand
  brands: ["Decorify", "WallArt", "StyleNest", "Amazon Basics", "Urban Ladder", "Asian Paints", "Nilkamal", "Home Centre", "IKEA", "Pepperfry"]
};

function WallpaperStickers() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [maxPrice, setMaxPrice] = useState(4000);
  const [sortBy, setSortBy] = useState("default");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  
  const [filters, setFilters] = useState({ 
    wallpaperType: [], stickerType: [], material: [], color: [], 
    sizes: [], pattern: [], roomType: [], brands: [] 
  });
  
  const [openSections, setOpenSections] = useState({
    wallpaperType: true, stickerType: true, material: true, color: true,
    sizes: true, pattern: false, roomType: false, brands: true
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

  const toggleSection = (section) => setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  
  const handleFilterToggle = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: prev[key].includes(value) ? prev[key].filter(v => v !== value) : [...prev[key], value]
    }));
  };
  
  const clearAllFilters = () => {
    setFilters({ 
      wallpaperType: [], stickerType: [], material: [], color: [], 
      sizes: [], pattern: [], roomType: [], brands: [] 
    });
    setMaxPrice(15000);
    setSortBy("default");
  };

  let filteredProducts = products.filter(p => 
    p.category?.toLowerCase() === "wallpapers" || 
    p.category?.toLowerCase() === "stickers" ||
    p.subCategory?.toLowerCase() === "wallpapers-stickers" ||
    p.type?.toLowerCase() === "wallpaper" ||
    p.type?.toLowerCase() === "sticker" ||
    (p.name?.toLowerCase().includes("wallpaper")) ||
    (p.name?.toLowerCase().includes("sticker")) ||
    (p.name?.toLowerCase().includes("wall decal"))
  );

  filteredProducts = filteredProducts.filter((product) => {
    if (product.offerPrice > maxPrice) return false;
    if (filters.wallpaperType.length > 0 && !filters.wallpaperType.includes(product.wallpaperType)) return false;
    if (filters.stickerType.length > 0 && !filters.stickerType.includes(product.stickerType)) return false;
    if (filters.material.length > 0 && !filters.material.includes(product.material)) return false;
    if (filters.color.length > 0 && !filters.color.includes(product.color)) return false;
    if (filters.sizes.length > 0 && !product.sizes?.some((s) => filters.sizes.includes(s))) return false;
    if (filters.pattern.length > 0 && !filters.pattern.includes(product.pattern)) return false;
    if (filters.roomType.length > 0 && !filters.roomType.includes(product.roomType)) return false;
    if (filters.brands.length > 0 && !filters.brands.includes(product.brand)) return false;
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
        <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
          {items.map((item, index) => (
            <label key={index} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
              <input type="checkbox" checked={filters[sectionKey]?.includes(item)} onChange={() => handleFilterToggle(sectionKey, item)} 
                className="w-3.5 h-3.5 rounded border-gray-300 text-purple-600" />
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
        <button onClick={clearAllFilters} className="text-purple-600 text-xs hover:underline">Clear All</button>
      </div>
      <AccordionSection title=" Wallpaper Type" sectionKey="wallpaperType" items={FILTER_CONFIG.wallpaperType} />
      <AccordionSection title=" Sticker Type" sectionKey="stickerType" items={FILTER_CONFIG.stickerType} />
      <AccordionSection title=" Material" sectionKey="material" items={FILTER_CONFIG.material} />
      <AccordionSection title=" Color" sectionKey="color" items={FILTER_CONFIG.color} />
      <AccordionSection title=" Size" sectionKey="sizes" items={FILTER_CONFIG.sizes} />
      <AccordionSection title=" Pattern" sectionKey="pattern" items={FILTER_CONFIG.pattern} />
      <AccordionSection title=" Room Type" sectionKey="roomType" items={FILTER_CONFIG.roomType} />
      <AccordionSection title=" Brands" sectionKey="brands" items={FILTER_CONFIG.brands} />
      <div className="mb-4 pt-2">
        <h2 className="font-bold text-sm mb-2"> Max Price: ₹{maxPrice}</h2>
        <Slider value={maxPrice} onChange={(e, val) => setMaxPrice(val)} min={0} max={15000} step={200}
          sx={{ color: "#9333ea", height: 4, '& .MuiSlider-thumb': { width: 18, height: 18, backgroundColor: '#9333ea' } }} />
      </div>
    </div>
  );

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div></div>;

  return (
    <div className="bg-gray-100 min-h-screen">
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-center py-12">
        <h1 className="text-4xl font-bold">Wallpapers & Stickers Collection</h1>
        <p className="mt-2 text-white/80">Transform your walls with beautiful wallpapers and stickers</p>
        <div className="mt-4 flex justify-center gap-3 flex-wrap">
          <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs">3D Wallpapers</span>
          <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs">Vinyl Stickers</span>
          <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs">Wall Decals</span>
          <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs">Textured Wallpapers</span>
        </div>
      </div>
 <nav className="flex items-center gap-2 text-sm text-gray-500 mt-3 !pl-7">
            <Link to="/" className="!text-lg !no-underline !font-semibold !text-[#1E2D42] transition-colors">Home</Link>
            <span className="text-lg !font-medium">/</span>
            <span className="text-lg !font-medium text-[#E4921A]">Wallpapers & Stickers</span>
          </nav>
          <h2 className="text-2xl !font-bold !mt-3 !mb-3 !pl-7">Wallpapers & Stickers</h2>
      {/* Mobile Filter Button */}
      <div className="md:hidden px-4 pt-4 sticky top-0 z-40 bg-gray-100 pb-2">
        <button onClick={() => setMobileFiltersOpen(true)} className="flex items-center gap-2 bg-white px-4 py-3 rounded-lg shadow-md w-full justify-between border border-gray-200">
          <div className="flex items-center gap-2"><Menu size={20} /><span className="font-medium text-gray-700">Filters</span></div>
          <span className="text-xs text-gray-500">{Object.values(filters).flat().length} active</span>
        </button>
      </div>

      {/* Mobile Filter Drawer */}
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
                <div className="text-6xl mb-4">🖼️</div>
                <h3 className="text-xl font-semibold mb-2">No Wallpapers & Stickers Found</h3>
                <p className="text-gray-500 mb-4">Try adjusting your filters or check back later</p>
                <button onClick={clearAllFilters} className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition">
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

export default WallpaperStickers;