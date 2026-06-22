// src/component/Lipstick.jsx
import  { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Slider } from "@mui/material";
import ProductCard from "../ProductCard";
import { loadAllProducts } from "../ProductsData";

function Lipstick() {
  const [products, setProducts] = useState([]);
  const [maxPrice, setMaxPrice] = useState(5000);
  const [selectedFilters, setSelectedFilters] = useState({
    type: [],
    finish: [],
    brand: [],
  });

  const FILTER_CONFIG = {
    type: [
      "Matte Lipstick",
      "Liquid Lipstick",
      "Creamy Lipstick",
      "Glossy Lipstick",
      "Lip Crayon",
      "Lip Stain",
      "Lip Balm",
      "Lip Liner",
    ],

    finish: [
      "Matte Finish",
      "Glossy Finish",
      "Satin Finish",
      "Shimmer Finish",
      "Metallic Finish",
      "Sheer Finish",
    ],

    brand: [
      "Lakmé",
      "Maybelline",
      "MAC",
      "Nykaa",
      "Sugar",
      "L'Oréal",
      "Revlon",
      "Colorbar",
      "Swiss Beauty",
      "Insight",
    ],
  };

  const shadeFamily = [
    "Red Shades",
    "Pink Shades",
    "Nude Shades",
    "Brown Shades",
    "Plum Shades",
    "Coral Shades",
    "Mauve Shades",
    "Berry Shades",
    "Orange Shades",
    "Peach Shades",
  ];

  useEffect(() => {
    const fetchData = async () => {
      const data = await loadAllProducts();
      setProducts(data || []);
    };
    fetchData();
  }, []);

  // Filter products based on category and selected filters
  const lipstickProducts = products
    .filter((p) => p.category?.trim().toLowerCase() === "lipstick")
    .filter((product) => {
      if (product.offerPrice > maxPrice) return false;
      if (selectedFilters.type.length > 0 && !selectedFilters.type.includes(product.subcategory)) return false;
      if (selectedFilters.finish.length > 0 && !selectedFilters.finish.includes(product.finish)) return false;
      if (selectedFilters.brand.length > 0 && !selectedFilters.brand.includes(product.brand)) return false;
      return true;
    })
    .sort((a, b) => a.offerPrice - b.offerPrice);

  const handleFilterChange = (section, item) => {
    setSelectedFilters((prev) => {
      const currentFilters = [...prev[section]];
      const itemIndex = currentFilters.indexOf(item);

      if (itemIndex === -1) {
        currentFilters.push(item);
      } else {
        currentFilters.splice(itemIndex, 1);
      }

      return {
        ...prev,
        [section]: currentFilters,
      };
    });
  };

  const clearAllFilters = () => {
    setSelectedFilters({
      type: [],
      finish: [],
      brand: [],
    });
    setMaxPrice(5000);
  };

  const getActiveFilterCount = () => {
    return Object.values(selectedFilters).reduce(
      (total, arr) => total + arr.length,
      0
    );
  };

  // Helper function to get color for shade family indicator
  function getShadeColor(shade) {
    const colorMap = {
      "Red Shades": "#FF0000",
      "Pink Shades": "#FF69B4",
      "Nude Shades": "#DEB887",
      "Brown Shades": "#8B4513",
      "Plum Shades": "#8E4585",
      "Coral Shades": "#FF7F50",
      "Mauve Shades": "#E0B0FF",
      "Berry Shades": "#8B0045",
      "Orange Shades": "#FF8C00",
      "Peach Shades": "#FFDAB9",
    };
    return colorMap[shade] || "#CCCCCC";
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-6">
        
        {/* ✅ BREADCRUMB - LIKE IMAGE */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mt-3">
          <Link to="/" className="!text-lg !no-underline !font-semibold !text-[#1E2D42] transition-colors">Home</Link>
          <span className="text-lg !font-medium">/</span>
          <span className="text-lg !font-medium text-[#E4921A]">Lipstick</span>
        </nav>
        <h2 className="text-2xl !font-bold !mt-3 !mb-3">Makeup & Lipstick</h2>

        <div className="flex gap-6">
          {/* SIDEBAR */}
          <div className="w-72 bg-white p-4 rounded-xl shadow-sm h-fit sticky top-4">
            <div className="flex justify-between mb-4 border-b pb-2">
              <h2 className="font-bold text-lg">FILTERS</h2>
              {getActiveFilterCount() > 0 && (
                <button
                  className="text-red-500 text-sm hover:text-red-700 font-medium"
                  onClick={clearAllFilters}
                >
                  Clear All ({getActiveFilterCount()})
                </button>
              )}
            </div>

            {/* Type Filter */}
            <div className="mb-6">
              <h3 className="font-semibold text-sm mb-3 uppercase text-gray-700">
                Lipstick Type
              </h3>
              {FILTER_CONFIG.type.map((item, i) => (
                <label
                  key={i}
                  className="flex items-center text-sm mb-2 cursor-pointer hover:text-pink-600"
                >
                  <input
                    type="checkbox"
                    className="mr-3 w-4 h-4 accent-pink-500 cursor-pointer"
                    checked={selectedFilters.type.includes(item)}
                    onChange={() => handleFilterChange("type", item)}
                  />
                  <span>{item}</span>
                </label>
              ))}
            </div>

            {/* Finish Filter */}
            <div className="mb-6">
              <h3 className="font-semibold text-sm mb-3 uppercase text-gray-700">
                Finish
              </h3>
              {FILTER_CONFIG.finish.map((item, i) => (
                <label
                  key={i}
                  className="flex items-center text-sm mb-2 cursor-pointer hover:text-pink-600"
                >
                  <input
                    type="checkbox"
                    className="mr-3 w-4 h-4 accent-pink-500 cursor-pointer"
                    checked={selectedFilters.finish.includes(item)}
                    onChange={() => handleFilterChange("finish", item)}
                  />
                  <span>{item}</span>
                </label>
              ))}
            </div>

            {/* Brand Filter */}
            <div className="mb-6">
              <h3 className="font-semibold text-sm mb-3 uppercase text-gray-700">
                Brand
              </h3>
              {FILTER_CONFIG.brand.map((item, i) => (
                <label
                  key={i}
                  className="flex items-center text-sm mb-2 cursor-pointer hover:text-pink-600"
                >
                  <input
                    type="checkbox"
                    className="mr-3 w-4 h-4 accent-pink-500 cursor-pointer"
                    checked={selectedFilters.brand.includes(item)}
                    onChange={() => handleFilterChange("brand", item)}
                  />
                  <span>{item}</span>
                </label>
              ))}
            </div>

            {/* Shade Family Filter */}
            <div className="mb-6">
              <h3 className="font-semibold text-sm mb-3 uppercase text-gray-700">
                Shade Family
              </h3>
              {shadeFamily.map((item, i) => (
                <label
                  key={i}
                  className="flex items-center text-sm mb-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    className="mr-3 w-4 h-4 accent-pink-500 cursor-pointer"
                  />
                  <span>
                    <span
                      className="inline-block w-3 h-3 rounded-full mr-2"
                      style={{
                        backgroundColor: getShadeColor(item),
                      }}
                    ></span>
                    {item}
                  </span>
                </label>
              ))}
            </div>

            {/* 🎨 PRICE RANGE SLIDER - LIKE IMAGE (ORANGE) */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">💰</span>
                <h3 className="font-semibold text-sm uppercase text-gray-700">
                  Max Price: ₹{maxPrice.toLocaleString()}
                </h3>
              </div>
              <div className="px-1 py-2">
                <Slider
                  value={maxPrice}
                  onChange={(e, val) => setMaxPrice(val)}
                  min={0}
                  max={5000}
                  step={50}
                  sx={{
                    color: "#ea580c", // Orange color
                    height: 6,
                    '& .MuiSlider-thumb': {
                      width: 20,
                      height: 20,
                      backgroundColor: '#ea580c',
                      boxShadow: '0 2px 8px rgba(234, 88, 12, 0.3)',
                      '&:hover': {
                        boxShadow: '0 4px 12px rgba(234, 88, 12, 0.5)',
                      }
                    },
                    '& .MuiSlider-track': {
                      height: 6,
                      borderRadius: 4,
                    },
                    '& .MuiSlider-rail': {
                      height: 6,
                      borderRadius: 4,
                      backgroundColor: '#e5e7eb',
                    }
                  }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>₹0</span>
                <span>₹2.5k</span>
                <span>₹5k</span>
              </div>
            </div>

          </div>

          {/* PRODUCTS */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold">Lipstick</h1>
              <p className="text-gray-600">
                {lipstickProducts.length} Products
              </p>
            </div>

            {/* Active Filters Display */}
            {getActiveFilterCount() > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {Object.entries(selectedFilters).map(([section, items]) =>
                  items.map((item) => (
                    <span
                      key={`${section}-${item}`}
                      className="bg-pink-50 text-pink-700 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                    >
                      {item}
                      <button
                        onClick={() => handleFilterChange(section, item)}
                        className="text-pink-500 hover:text-pink-700 font-bold"
                      >
                        ×
                      </button>
                    </span>
                  ))
                )}
              </div>
            )}

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {lipstickProducts.length > 0 ? (
                lipstickProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-500 text-lg">No Lipsticks Found</p>
                  <p className="text-gray-400 text-sm mt-2">
                    Try adjusting your filters or clear them to see all products
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Lipstick;