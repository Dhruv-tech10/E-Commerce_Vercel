import { useEffect, useState } from "react";
import ProductCard from "../ProductCard";
import { Link } from 'react-router-dom';
function CatFood() {
  const [products, setProducts] = useState([]);
  const [activeFilters, setActiveFilters] = useState({
    type: [],
    brand: [],
    price: null,
  });
  const [openDropdown, setOpenDropdown] = useState({
    type: false,
    brand: false,
    price: false,
  });

  const FILTER_CONFIG = {
    typeOptions: ["Dry Cat Food", "Wet Cat Food", "Kitten Food", "Senior Cat Food", "Grain Free", "Organic Cat Food"],
    brandOptions: ["Whiskas", "Me-O", "Purina", "Royal Canin", "Hill's Science Diet", "Farmina"],
  };

  const [maxPrice, setMaxPrice] = useState(1000);

  const sampleProducts = [
    { 
      id: 1, 
      name: "Whiskas Dry Cat Food", 
      category: "Cat Food", 
      type: "Dry Cat Food", 
      brand: "Whiskas", 
      price: 499, 
      offerPrice: 449, 
      image: "https://m.media-amazon.com/images/I/71BzjxTj4LL._SL1500_.jpg", 
      rating: 4.5 
    },
    { 
      id: 2, 
      name: "Me-O Kitten Food", 
      category: "Cat Food", 
      type: "Kitten Food", 
      brand: "Me-O", 
      price: 599, 
      offerPrice: 549, 
      image: "https://m.media-amazon.com/images/I/71nQa6GhGPL._SL1500_.jpg", 
      rating: 4.3 
    },
    { 
      id: 3, 
      name: "Royal Canin Senior Cat Food", 
      category: "Cat Food", 
      type: "Senior Cat Food", 
      brand: "Royal Canin", 
      price: 899, 
      offerPrice: 849, 
      image: "https://m.media-amazon.com/images/I/71t9bWKkKOL._SL1500_.jpg", 
      rating: 4.4 
    },
    { 
      id: 4, 
      name: "Farmina Grain Free Cat Food", 
      category: "Cat Food", 
      type: "Grain Free", 
      brand: "Farmina", 
      price: 999, 
      offerPrice: 949, 
      image: "https://m.media-amazon.com/images/I/71Z1yLq9xU4L._SL1500_.jpg", 
      rating: 4.6 
    },
    { 
      id: 5, 
      name: "Purina Organic Cat Food", 
      category: "Cat Food", 
      type: "Organic Cat Food", 
      brand: "Purina", 
      price: 799, 
      offerPrice: 749, 
      image: "https://m.media-amazon.com/images/I/71yLq9xU4uL._SL1500_.jpg", 
      rating: 4.2 
    },
  ];

  useEffect(() => {
    setProducts(sampleProducts);
  }, []);

  const toggleDropdown = (filterType) => {
    setOpenDropdown((prev) => ({ ...prev, [filterType]: !prev[filterType] }));
  };

  const handleFilterChange = (filterType, value) => {
    setActiveFilters((prev) => {
      const current = [...prev[filterType]];
      if (current.includes(value)) {
        return { ...prev, [filterType]: current.filter((item) => item !== value) };
      }
      return { ...prev, [filterType]: [...current, value] };
    });
  };

  const handlePriceChange = (e) => {
    const newPrice = Number(e.target.value);
    setMaxPrice(newPrice);
    setActiveFilters((prev) => ({ ...prev, price: newPrice }));
  };

  const clearNewFilters = () => {
    setActiveFilters({ type: [], brand: [], price: null });
    setMaxPrice(1000);
  };

  const getFilteredProducts = () => {
    let filtered = products.filter((p) => 
      p.category === "Cat Food" || 
      p.category === "Grocery" ||
      p.category?.toLowerCase().includes("cat")
    );

    if (activeFilters.type.length > 0) {
      filtered = filtered.filter((product) =>
        activeFilters.type.some((type) => product.type?.toLowerCase() === type.toLowerCase())
      );
    }

    if (activeFilters.brand.length > 0) {
      filtered = filtered.filter((product) =>
        activeFilters.brand.some((brand) => product.brand?.toLowerCase() === brand.toLowerCase())
      );
    }

    if (activeFilters.price !== null && activeFilters.price > 0) {
      const selectedPrice = activeFilters.price;
      filtered = filtered.filter((product) => Number(product.price) === selectedPrice);
    }

    return filtered;
  };

  const filteredProducts = getFilteredProducts();
  const hasActiveFilters = activeFilters.type.length > 0 || activeFilters.brand.length > 0 || (activeFilters.price !== null && activeFilters.price > 0);

  const FilterDropdown = ({ title, filterKey, options }) => (
    <div className="border-b border-gray-200 py-3">
      <div className="flex justify-between items-center cursor-pointer select-none" onClick={() => toggleDropdown(filterKey)}>
        <h3 className="font-semibold text-base text-gray-800">{title}</h3>
        <svg className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${openDropdown[filterKey] ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      {openDropdown[filterKey] && (
                <div className="grid grid-cols-1 gap-1.5 max-h-60 overflow-y-auto pr-1">
          {options.map((item, i) => (
            <label key={i} className="flex items-center text-sm cursor-pointer text-gray-700 hover:text-gray-900">
              <input type="checkbox" className="w-3.5 h-3.5 !mr-2 !text-sm rounded border-gray-300 text-blue-600 focus:ring-blue-500" checked={activeFilters[filterKey].includes(item)} onChange={() => handleFilterChange(filterKey, item)} />
              {item}
            </label>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="bg-gray-100 min-h-screen">
        <div className="mx-4 my-4 !shadow-3xl shadow-red-900/30 bg-[#1E2D42] bg-gradient-to-br from-[#EE971D] to-[#1E2D42] rounded-xl text-white text-center py-12 ">
        <h1 className="text-3xl font-bold">Cat Food</h1>
        <p className="mt-2 text-white/80 text-sm">Timeless Elegance for Every Occasion</p>
      </div>
      <nav className="flex items-center gap-2 text-sm text-gray-500 mt-3 !pl-7">
        <Link to="/" className="!text-lg !no-underline !font-semibold !text-[#1E2D42] transition-colors">Home</Link>
        <span className="text-lg !font-medium">/</span>
        <span className="text-lg !font-medium text-[#E4921A]">Cat Food</span>
      </nav>
      <h2 className="text-2xl !font-bold !mt-3 !mb-3 !pl-7">Cat Food</h2>
      <div className="max-w-7xl mx-auto p-4 flex gap-6">
        <div className="w-72 bg-white p-4 rounded-xl shadow-sm">
          <div className="flex justify-between mb-4 border-b pb-2">
            <h2 className="font-bold text-lg">Filters</h2>
            <button onClick={clearNewFilters} className={`text-sm font-medium ${hasActiveFilters ? "text-red-500 hover:text-red-600" : "text-gray-400 cursor-not-allowed"}`} disabled={!hasActiveFilters}>Clear All</button>
          </div>
          <FilterDropdown title="Cat Food Type" filterKey="type" options={FILTER_CONFIG.typeOptions} />
          <FilterDropdown title="Brand" filterKey="brand" options={FILTER_CONFIG.brandOptions} />
          <div className="border-b border-gray-200 py-3">
            <div className="flex justify-between items-center cursor-pointer select-none" onClick={() => toggleDropdown("price")}>
              <h3 className="font-semibold text-base text-gray-800">Price</h3>
              <svg className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${openDropdown.price ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            {openDropdown.price && (
              <div className="mt-4 px-1">
                <div className="flex justify-between mb-4"><h4 className="text-lg font-bold text-gray-800">Price: ₹{maxPrice}</h4></div>
                <div className="relative w-full h-1 bg-gray-300 rounded-full mt-1">
                  <div className="absolute h-1 bg-orange-500 rounded-full" style={{ width: `${(maxPrice / 1000) * 100}%` }} />
                  <input type="range" min="0" max="1000" step="10" value={maxPrice} onChange={handlePriceChange} className="absolute w-full h-1 opacity-0 cursor-pointer z-10" />
                  <div className="absolute top-1/2 -mt-3 w-6 h-6 bg-orange-500 rounded-full shadow-md z-5 pointer-events-none" style={{ left: `calc(${(maxPrice / 1000) * 100}% - 12px)` }} />
                </div>
                <div className="flex justify-between mt-3 text-xs text-gray-400 font-medium"><span>₹0</span><span>₹200</span><span>₹400</span><span>₹600</span><span>₹800</span><span>₹1000</span></div>
              </div>
            )}
          </div>
        </div>
        <div className="flex-1">
          
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-96 text-center">
              <div className="text-6xl mb-4"></div>
              <h2 className="text-2xl font-bold text-gray-500 mb-2">No Cat Food Products Found</h2>
              <button onClick={clearNewFilters} className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">Clear All Filters</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CatFood;