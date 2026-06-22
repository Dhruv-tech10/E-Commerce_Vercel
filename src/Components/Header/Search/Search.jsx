// import {React} from 'react'

import axios from "axios";
import { useEffect, useState } from "react";

const Search = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://dummyjson.com/products?limit=0")
      .then((response) => {
        setData(response.data.products);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  console.log(data);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = data.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
  
    <div>
  {loading ? (
    <div className="flex justify-center items-center h-96">
      <p className="text-xl font-semibold text-gray-500 animate-pulse">
        <image src="https://upload.wikimedia.org/wikipedia/commons/c/c7/Loading_2.gif?_=20170503175831" alt="Loading..." className="w-16 h-16" />
      </p>
    </div>
  ) : (
    <div className="container mx-auto px-4 py-8">
      {/* Search Input */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="🔍 Search by title or category..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredData.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
          >
            {/* Image */}
            <div className="overflow-hidden">
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-full h-56 object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>

            {/* Content */}
            <div className="p-4">
              <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-100 rounded-full mb-3">
                {item.category}
              </span>

              <h2 className="text-lg font-bold text-gray-800 line-clamp-2 mb-2">
                {item.title}
              </h2>

              {item.price && (
                <p className="text-2xl font-bold text-green-600 mb-4">
                  ${item.price}
                </p>
              )}

              <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                View Product
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )}
</div>
  );
};

export default Search;