// src/component/ProductListing.jsx
import { menProducts } from '../ProductsData';
import ProductCard from '../ProductCard';

function ProductListing() {
  return (
    // MAIN WRAPPER: Pure page ka background light gray set kiya hai aur vertical padding (py-8) di hai
    <div className="bg-gray-50 min-h-screen py-8">
      
      {/* CENTERING CONTAINER: Content ko screen ke beech mein alignment dene ke liye (max-w-7xl) */}
      <div className="max-w-7xl mx-auto px-4">
        
        {/* PAGE HEADER: Main Title aur Subtitle heading */}
        <h1 className="text-3xl font-bold text-gray-900 mb-2">All Products</h1>
        <p className="text-gray-500 mb-8">Discover our latest collection</p>
        
        {/* 🛍️ PRODUCTS GRID MARKETPLACE */}
        {/* Responsive Grid Layout: 
            - Mobile par 2 columns (`grid-cols-2`)
            - Tablet par 3 columns (`sm:grid-cols-3`)
            - Desktop par 4 columns (`md:grid-cols-4`) 
            - Cards ke beech ka gap: `gap-5`
        */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
          
          {/* 🔄 MAP METHOD: `menProducts?.map` use kiya hai takki agar kisi wajah se data 
              loading mein delay ho ya empty ho, toh hamari React App crash na kare (Safe navigation `?.`) */}
          {menProducts?.map((product) => (
            // Ek-ek karke saare products 'ProductCard' component mein as a prop pass ho rahe hain
            // React optimization ke liye unique 'key' dena zaroori hai, isliye product.id pass kiya hai
            <ProductCard key={product.id} product={product} />
          ))}
          
        </div>

        {/* 🛑 EMPTY STATE CHECK: Agar data load na ho ya list khali ho toh ye message dikhega */}
        {(!menProducts || menProducts.length === 0) && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products available at the moment.</p>
          </div>
        )}

      </div>
    </div>
  );
}

export default ProductListing;