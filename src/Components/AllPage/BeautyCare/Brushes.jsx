import { useEffect, useState } from "react";
import ProductCard from "../ProductCard";
import { loadAllProducts } from "../ProductsData";
import { Link } from 'react-router-dom';
function Brushes() {
  const [products, setProducts] = useState([]);

  const FILTER_CONFIG = {
    topWear: [
      "Women T-Shirts",
      "Tunics & Tops",
      "Women Shirts",
      "Dresses",
      "Gowns",
      "Sarees",
      "Jumpsuits",
      "Women Jackets",
      "Kurtis",
    ],

    bottomWear: [
      "Jeans & Jeggings",
      "Leggings",
      "Shorts & Skirts",
      "Palazzos",
      "Pants & Trousers",
    ],

    innerWear: ["Women Bra", "Women Panties"],

    sleepwear: ["Women Nightdress", "Women Nightsuits"],

    accessories: [
      "Anklets & Bracelets",
      "Jewellery Sets",
      "Earrings",
      "Women Watches",
      "Necklaces",
      "Perfume",
    ],

    beauty: [
      "Face Wash",
      "Lipstick",
      "Foundation",
      "Highlighter",
      "Brush",
      "Eyeliner",
      "Kajal",
    ],
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await loadAllProducts();
      setProducts(data || []);
    };
    fetchData();
  }, []);

  const brushProducts = products.filter(
    (p) => p.category?.trim().toLowerCase() === "brush"
  );

  return (
    <div className="bg-gray-100 min-h-screen">
        <nav className="flex items-center gap-2 text-sm text-gray-500 mt-3 !pl-7">
                <Link to="/" className="!text-lg !no-underline !font-semibold !text-[#1E2D42] transition-colors">Home</Link>
                <span className="text-lg !font-medium">/</span>
                <span className="text-lg !font-medium text-[#E4921A]">Brushes</span>
              </nav>
              <h2 className="text-2xl !font-bold !mt-3 !mb-2 !pl-7">Brushes</h2>
      <div className="max-w-7xl mx-auto flex gap-6 p-4">

        {/* SIDEBAR */}
        <div className="w-72 bg-white p-4 rounded-xl shadow-sm">

          <div className="flex justify-between mb-4 border-b pb-2">
            <h2 className="font-bold">Filters</h2>
            <button className="text-red-500 text-sm">
              Clear
            </button>
          </div>

          {Object.entries(FILTER_CONFIG).map(([section, items]) => (
            <div key={section} className="mb-4">
              <h3 className="font-semibold text-sm mb-2 capitalize">
                {section}
              </h3>

              {items.map((item, i) => (
                <label key={i} className="block text-sm">
                  <input type="checkbox" className="mr-2" />
                  {item}
                </label>
              ))}
            </div>
          ))}

        </div>

        {/* PRODUCTS */}
        <div className="flex-1">

          <h1 className="text-3xl font-bold mb-6">
            Makeup Brush
          </h1>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

            {brushProducts.length > 0 ? (
              brushProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))
            ) : (
              <p className="text-gray-500">
                No Brush Found
              </p>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}

export default Brushes;