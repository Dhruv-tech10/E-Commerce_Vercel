import  { useEffect, useState } from "react";
import ProductCard from "../ProductCard";
import { loadAllProducts } from "../ProductsData";
import { Link } from 'react-router-dom';
function DryFruits() {
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
    typeOptions: [
      "Almonds",
      "Cashews",
      "Walnuts",
      "Pistachios",
      "Raisins",
      "Dates",
      "Figs",
      "Mixed Dry Fruits"
    ],
    brandOptions: [
      "Haldiram's",
      "Bikano",
      "Nutraj",
      "Wonderland",
      "Tulsi",
      "Dried Fruits Co."
    ],
  };

  const [maxPrice, setMaxPrice] = useState(1000);

  useEffect(() => {
    const fetchData = async () => {
      const data = await loadAllProducts();
      setProducts(data);
    };
    fetchData();
  }, []);

  const toggleDropdown = (filterType) => {
    setOpenDropdown((prev) => ({
      ...prev,
      [filterType]: !prev[filterType],
    }));
  };

  const handleFilterChange = (filterType, value) => {
    setActiveFilters((prev) => {
      const currentFilters = [...prev[filterType]];
      if (currentFilters.includes(value)) {
        return {
          ...prev,
          [filterType]: currentFilters.filter((item) => item !== value),
        };
      } else {
        return {
          ...prev,
          [filterType]: [...currentFilters, value],
        };
      }
    });
  };

  const handlePriceChange = (e) => {
    const newPrice = Number(e.target.value);
    setMaxPrice(newPrice);
    setActiveFilters((prev) => ({
      ...prev,
      price: newPrice,
    }));
  };

  const clearNewFilters = () => {
    setActiveFilters({
      type: [],
      brand: [],
      price: null,
    });
    setMaxPrice(1000);
  };

  const getFilteredProducts = () => {
    let filtered = products.filter((p) => p.category === "Dry Fruits" || p.category === "Grocery");

    if (activeFilters.type.length > 0) {
      filtered = filtered.filter((product) =>
        activeFilters.type.some(
          (type) => product.type?.toLowerCase() === type.toLowerCase()
        )
      );
    }

    if (activeFilters.brand.length > 0) {
      filtered = filtered.filter((product) =>
        activeFilters.brand.some(
          (brand) => product.brand?.toLowerCase() === brand.toLowerCase()
        )
      );
    }

    if (activeFilters.price !== null && activeFilters.price > 0) {
      const selectedPrice = activeFilters.price;
      filtered = filtered.filter((product) => {
        const productPrice = Number(product.price);
        return productPrice === selectedPrice;
      });
    }

    return filtered;
  };

  const filteredProducts = getFilteredProducts();
  const hasActiveFilters =
    activeFilters.type.length > 0 ||
    activeFilters.brand.length > 0 ||
    (activeFilters.price !== null && activeFilters.price > 0);

  const FilterDropdown = ({ title, filterKey, options }) => (
    <div className="border-b border-gray-200 py-3">
      <div
        className="flex justify-between items-center cursor-pointer select-none"
        onClick={() => toggleDropdown(filterKey)}
      >
        <h3 className="font-semibold text-base text-gray-800">{title}</h3>
        <svg
          className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
            openDropdown[filterKey] ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

      {openDropdown[filterKey] && (
        <div className="mt-2 pl-1 space-y-1.5 max-h-60 overflow-y-auto custom-scrollbar">
          {options.map((item, i) => (
            <label key={i} className="flex items-center text-sm cursor-pointer text-gray-700 hover:text-gray-900">
              <input
                type="checkbox"
                className="mr-2 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                checked={activeFilters[filterKey].includes(item)}
                onChange={() => handleFilterChange(filterKey, item)}
              />
              {item}
            </label>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="bg-gray-100 min-h-screen">
      <nav className="flex items-center gap-2 text-sm text-gray-500 mt-3 !pl-7">
        <Link to="/" className="!text-lg !no-underline !font-semibold !text-[#1E2D42] transition-colors">Home</Link>
        <span className="text-lg !font-medium">/</span>
        <span className="text-lg !font-medium text-[#E4921A]">Dry Fruits</span>
      </nav>
      <h2 className="text-2xl !font-bold !mt-3 !mb-3 !pl-7">Dry Fruits</h2>
      <div className="max-w-7xl mx-auto p-4 flex gap-6">
        <div className="w-72 bg-white p-4 rounded-xl shadow-sm">
          <div className="flex justify-between mb-4 border-b pb-2">
            <h2 className="font-bold text-lg">Filters</h2>
            <button
              onClick={clearNewFilters}
              className={`text-sm font-medium ${
                hasActiveFilters ? "text-red-500 hover:text-red-600" : "text-gray-400 cursor-not-allowed"
              }`}
              disabled={!hasActiveFilters}
            >
              Clear All
            </button>
          </div>

          <div className="pt-3 mt-3">
            <FilterDropdown
              title="Dry Fruit Type"
              filterKey="type"
              options={FILTER_CONFIG.typeOptions}
            />
            <FilterDropdown
              title="Brand"
              filterKey="brand"
              options={FILTER_CONFIG.brandOptions}
            />
            <div className="border-b border-gray-200 py-3">
              <div
                className="flex justify-between items-center cursor-pointer select-none"
                onClick={() => toggleDropdown("price")}
              >
                <h3 className="font-semibold text-base text-gray-800">Price</h3>
                <svg
                  className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                    openDropdown.price ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>

              {openDropdown.price && (
                <div className="mt-4 px-1">
                  <div className="flex justify-between mb-4">
                    <h4 className="text-lg font-bold text-gray-800">Price: ₹{maxPrice}</h4>
                    {activeFilters.price !== null && activeFilters.price > 0 && (
                      <span className="text-xs text-orange-500 font-medium">Exact Match</span>
                    )}
                  </div>
                  <div className="relative w-full h-1 bg-gray-300 rounded-full mt-1">
                    <div className="absolute h-1 bg-orange-500 rounded-full" style={{ width: `${(maxPrice / 1000) * 100}%` }} />
                    <input
                      type="range"
                      min="0"
                      max="1000"
                      step="1"
                      value={maxPrice}
                      onChange={handlePriceChange}
                      className="absolute w-full h-1 opacity-0 cursor-pointer z-10"
                    />
                    <div className="absolute top-1/2 -mt-3 w-6 h-6 bg-orange-500 rounded-full shadow-md z-5 pointer-events-none" style={{ left: `calc(${(maxPrice / 1000) * 100}% - 12px)` }} />
                  </div>
                  <div className="flex justify-between mt-3 text-xs text-gray-400 font-medium">
                    <span>₹0</span><span>₹250</span><span>₹500</span><span>₹750</span><span>₹1000</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-6">
            Dry Fruits
            {hasActiveFilters && <span className="text-lg font-normal text-gray-500 ml-2">({filteredProducts.length} products)</span>}
          </h1>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-96 text-center">
              <div className="mb-6">
                <svg className="w-32 h-32 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-500 mb-2">Product Not Found</h2>
              <p className="text-gray-400 mb-4 max-w-md">
                {hasActiveFilters ? "We couldn't find any products matching your selected filters." : "No dry fruits products are available at the moment."}
              </p>
              {hasActiveFilters && (
                <button onClick={clearNewFilters} className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">Clear All Active Filters</button>
              )}
            </div>
          )}
        </div>
      </div>
      
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f1f1f1; border-radius: 8px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 8px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
      `}</style>
    </div>
  );
}

export default DryFruits;