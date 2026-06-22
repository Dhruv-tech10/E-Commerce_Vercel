// src/component/ProductsData.jsx
import { getProductImages } from '../../services/ImageService';

// ============================================
// 📦 COMMON PRODUCT UTILITY
// ============================================
const generateId = (prefix, id) => `${prefix}-${id}`;
const generateImage = (id) => `https://picsum.photos/500/700?random=${id}`;

const transformProducts = (products, prefix) => {
  return products.map(product => ({
    ...product,
    id: generateId(prefix, product.id),
    image: product.image || generateImage(`${prefix}-${product.id}`),
    images: [product.image || generateImage(`${prefix}-${product.id}`)]
  }));
};

// ============================================
// 👕 MEN PRODUCTS (Removed duplicates)
// ============================================
export const menProducts = [
  { id: 36, name: "Silk Saree - Red", category: "Sarees", price: 1999, offerPrice: 1299, sizes: ["Free Size"], brand: "Puma", rating: 4.5 },
  { id: 2, name: "Designer Saree - Blue", category: "Sarees", price: 2499, offerPrice: 1499, sizes: ["Free Size"], brand: "Adidas", rating: 4.3 },
  { id: 3, name: "Cotton Saree - Green", category: "Sarees", price: 1899, offerPrice: 1299, sizes: ["Free Size"], brand: "Nike", rating: 4.7 },
  { id: 4, name: "Party Wear Saree - Pink", category: "Sarees", price: 2999, offerPrice: 1999, sizes: ["Free Size"], brand: "Levi's", rating: 4.6 },
  { id: 5, name: "Wedding Saree - Maroon", category: "Sarees", price: 3999, offerPrice: 2999, sizes: ["Free Size"], brand: "U.S. Polo", rating: 4.8 },
  { id: 6, name: "Night Suit - Blue", category: "Night-Suits", price: 1299, offerPrice: 999, sizes: ["S","M","L","XL","XXL"], brand: "Puma", rating: 4.2 },
  { id: 7, name: "Night Suit - Black", category: "Night-Suits", price: 1299, offerPrice: 999, sizes: ["S","M","L","XL","XXL"], brand: "Nike", rating: 4.4 },
  { id: 8, name: "Night Suit - Grey", category: "Night-Suits", price: 1299, offerPrice: 999, sizes: ["S","M","L","XL","XXL"], brand: "Adidas", rating: 4.1 },
  { id: 9, name: "Night Suit - Maroon", category: "Night-Suits", price: 1299, offerPrice: 999, sizes: ["S","M","L","XL","XXL"], brand: "Levi's", rating: 4.3 },
  { id: 10, name: "Night Suit - Brown", category: "Night-Suits", price: 1299, offerPrice: 999, sizes: ["S","M","L","XL","XXL"], brand: "U.S. Polo", rating: 4.0 },
  { id: 11, name: "Designer Saree - Golden", category: "Sarees", price: 3499, offerPrice: 2499, sizes: ["Free Size"], brand: "U.S. Polo", rating: 4.9 },
  { id: 12, name: "Men's Casual Shirt - White", category: "Shirts", price: 1499, offerPrice: 999, sizes: ["S","M","L","XL","XXL"], brand: "U.S. Polo", rating: 4.3 },
  { id: 13, name: "Men's T-Shirt - Black", category: "T-Shirts", price: 899, offerPrice: 599, sizes: ["S","M","L","XL","XXL"], brand: "Nike", rating: 4.5 },
  { id: 14, name: "Men's Denim Jacket - Blue", category: "Jackets & Coats", price: 2499, offerPrice: 1799, sizes: ["S","M","L","XL"], brand: "Levi's", rating: 4.6 },
  { id: 15, name: "Men's Jeans - Black", category: "Jeans", price: 1899, offerPrice: 1299, sizes: ["28","30","32","34","36","38"], brand: "Levi's", rating: 4.4 },
  { id: 16, name: "Men's Cargo Pants - Olive", category: "Cargo", price: 1599, offerPrice: 1099, sizes: ["S","M","L","XL","XXL"], brand: "Puma", rating: 4.3 },
  { id: 17, name: "Men's Vest - White", category: "Vests", price: 499, offerPrice: 349, sizes: ["S","M","L","XL","XXL"], brand: "Jockey", rating: 4.5 },
  { id: 18, name: "Men's Briefs - Cotton", category: "Briefs", price: 299, offerPrice: 199, sizes: ["S","M","L","XL"], brand: "Jockey", rating: 4.4 },
  { id: 19, name: "Men's Boxers - Pack", category: "Boxers", price: 499, offerPrice: 349, sizes: ["S","M","L","XL"], brand: "Puma", rating: 4.5 },
  { id: 20, name: "Men's Thermals", category: "Thermals", price: 799, offerPrice: 599, sizes: ["S","M","L","XL"], brand: "Adidas", rating: 4.6 },
  { id: 21, name: "Men's Trunks", category: "Trunks", price: 399, offerPrice: 249, sizes: ["S","M","L","XL"], brand: "Nike", rating: 4.3 },
  { id: 22, name: "Men's Sports Shoes - Running", category: "Sports Shoes", price: 1999, offerPrice: 1299, sizes: ["6","7","8","9","10"], brand: "Nike", rating: 4.5 },
  { id: 23, name: "Men's Sports Shoes - Training", category: "Sports Shoes", price: 2499, offerPrice: 1599, sizes: ["6","7","8","9","10","11"], brand: "Adidas", rating: 4.4 },
  { id: 24, name: "Men's Sports Shoes - Walking", category: "Sports Shoes", price: 1799, offerPrice: 1199, sizes: ["6","7","8","9","10"], brand: "Puma", rating: 4.3 },
  { id: 25, name: "Men's Sports Shoes - Premium", category: "Sports Shoes", price: 2999, offerPrice: 1999, sizes: ["7","8","9","10","11"], brand: "Nike", rating: 4.6 },
  { id: 26, name: "Men's Casual Shoes - White", category: "Casual Shoes", price: 1999, offerPrice: 1299, sizes: ["6","7","8","9","10"], brand: "Nike", rating: 4.4 },
  { id: 27, name: "Men's Formal Shoes - Black", category: "Formal Shoes", price: 2499, offerPrice: 1599, sizes: ["6","7","8","9","10"], brand: "Nike", rating: 4.5 },
  { id: 28, name: "Men's Leather Sandals", category: "Sandals", price: 1499, offerPrice: 999, sizes: ["6","7","8","9","10"], brand: "Puma", rating: 4.4 },
  { id: 29, name: "Men's Rubber Slippers", category: "Slippers", price: 499, offerPrice: 299, sizes: ["6","7","8","9","10"], brand: "Nike", rating: 4.2 },
  { id: 30, name: "Men's Smart Watch", category: "Watches", price: 2999, offerPrice: 1999, sizes: ["One Size"], brand: "Fastrack", rating: 4.5 },
  { id: 31, name: "Men's Leather Wallet", category: "Wallets", price: 999, offerPrice: 599, sizes: ["One Size"], brand: "Levi's", rating: 4.4 },
  { id: 32, name: "Classic Formal Belt", category: "Belts", price: 799, offerPrice: 499, sizes: ["M","L","XL"], brand: "Levi's", rating: 4.3 },
  { id: 33, name: "Premium Sunglasses", category: "Sunglasses", price: 1499, offerPrice: 899, sizes: ["Free Size"], brand: "Ray-Ban", rating: 4.5 },
  { id: 34, name: "Nike Travel Bag", category: "Bags", price: 1499, offerPrice: 999, brand: "Nike" },
  { id: 35, name: "men Nightdress", category: "nightdresses", price: 799, offerPrice: 499, brand: "U.S. Polo" },
  { id: 1, name: "Cotton Shirt", category: "Shirts", price: 999, offerPrice: 599, brand: "Levi's" }
];

// ============================================
// 👩 WOMEN PRODUCTS
// ============================================
export const womenProducts = [
  { id: 201, name: "Designer Saree - Red", category: "Sarees", price: 2499, offerPrice: 1799, sizes: ["Free Size"], brand: "Biba", rating: 4.7 },
  { id: 202, name: "Floral Print Dress - Blue", category: "Dresses", price: 1899, offerPrice: 1299, sizes: ["S","M","L","XL"], brand: "Zara", rating: 4.5 },
  { id: 203, name: "Women's Top - White", category: "Tops", price: 899, offerPrice: 599, sizes: ["S","M","L","XL"], brand: "H&M", rating: 4.4 },
  { id: 204, name: "Women's Jeans - Blue", category: "Jeans", price: 1599, offerPrice: 1199, sizes: ["26","28","30","32","34"], brand: "Levi's", rating: 4.6 },
  { id: 205, name: "High Heels - Black", category: "Heels", price: 1599, offerPrice: 999, sizes: ["5","6","7","8","9"], brand: "Nike", rating: 4.3 },
  { id: 206, name: "Handbag - Brown", category: "Bags", price: 1299, offerPrice: 899, sizes: ["One Size"], brand: "Levi's", rating: 4.6 },
  { id: 207, name: "Kurti - Yellow", category: "Kurtis", price: 999, offerPrice: 699, sizes: ["S","M","L","XL","XXL"], brand: "W", rating: 4.4 },
  { id: 208, name: "Lehenga Choli - Pink", category: "Lehengas", price: 4999, offerPrice: 3499, sizes: ["S","M","L","XL"], brand: "Manyavar", rating: 4.9 }
];

// ============================================
// 👶 KIDS PRODUCTS
// ============================================
export const kidsProducts = [
  { id: 301, name: "Boys T-Shirt - Blue", category: "Boys", price: 599, offerPrice: 399, sizes: ["2-3Y","3-4Y","4-5Y","5-6Y","6-7Y","7-8Y","8-10Y"], brand: "Nike", rating: 4.5 },
  { id: 302, name: "Boys Jeans - Blue", category: "Boys", price: 899, offerPrice: 649, sizes: ["2-3Y","3-4Y","4-5Y","5-6Y","6-7Y","7-8Y","8-10Y"], brand: "Levi's", rating: 4.4 },
  { id: 303, name: "Girls Dress - Pink", category: "Girls", price: 799, offerPrice: 549, sizes: ["2-3Y","3-4Y","4-5Y","5-6Y","6-7Y","7-8Y","8-10Y"], brand: "Gini & Jony", rating: 4.7 },
  { id: 304, name: "Girls Leggings - Purple", category: "Girls", price: 399, offerPrice: 299, sizes: ["2-3Y","3-4Y","4-5Y","5-6Y","6-7Y","7-8Y","8-10Y"], brand: "Puma", rating: 4.3 },
  { id: 305, name: "Baby Romper - Yellow", category: "Babies", price: 499, offerPrice: 349, sizes: ["0-6M","6-12M","12-18M","18-24M"], brand: "Babyhug", rating: 4.8 },
  { id: 306, name: "Baby Set - Blue", category: "Babies", price: 699, offerPrice: 499, sizes: ["0-6M","6-12M","12-18M","18-24M"], brand: "Mee Mee", rating: 4.6 },
  { id: 307, name: "Baby Shampoo", category: "Shampoo", price: 299, offerPrice: 199, sizes: ["200ml","400ml"], brand: "Mamaearth", rating: 4.7 },
  { id: 308, name: "Baby Powder", category: "Powder", price: 199, offerPrice: 149, sizes: ["100g","200g","400g"], brand: "Johnson's", rating: 4.5 },
  { id: 309, name: "Baby Oil", category: "Oil", price: 249, offerPrice: 179, sizes: ["200ml","400ml","500ml"], brand: "Himalaya", rating: 4.6 },
  { id: 310, name: "Kids Watch - Digital", category: "Watches", price: 999, offerPrice: 699, sizes: ["One Size"], brand: "Fastrack", rating: 4.4 },
  { id: 311, name: "Kids Shoes - White", category: "Shoes", price: 799, offerPrice: 549, sizes: ["10","11","12","13","1","2"], brand: "Puma", rating: 4.6 },
  { id: 312, name: "Kids Backpack - Blue", category: "Bags & Backpacks", price: 699, offerPrice: 499, sizes: ["One Size"], brand: "Skybags", rating: 4.5 },
  { id: 313, name: "Kids Sunglasses", category: "Goggles", price: 299, offerPrice: 199, sizes: ["One Size"], brand: "Lenskart", rating: 4.3 },
  { id: 314, name: "Wooden Puzzle", category: "Puzzle", price: 399, offerPrice: 299, sizes: ["One Size"], brand: "FunSkool", rating: 4.7 },
  { id: 315, name: "Remote Control Car", category: "Remote Controls", price: 1299, offerPrice: 999, sizes: ["One Size"], brand: "Hot Wheels", rating: 4.8 },
  { id: 316, name: "Teddy Bear - Large", category: "Teddy Bears", price: 899, offerPrice: 649, sizes: ["12 inch","18 inch","24 inch"], brand: "Soft Toys", rating: 4.9 },
  { id: 317, name: "Helmet - Kids", category: "Helmets", price: 599, offerPrice: 449, sizes: ["S","M","L"], brand: "Vega", rating: 4.5 }
];

// ============================================
// 💄 BEAUTY PRODUCTS
// ============================================
export const beautyProducts = [
  { id: 401, name: "Lipstick - Red", category: "Makeup", price: 599, offerPrice: 399, sizes: ["One Size"], brand: "Maybelline", rating: 4.5 },
  { id: 402, name: "Face Wash - Neem", category: "Skincare", price: 299, offerPrice: 199, sizes: ["100ml"], brand: "Himalaya", rating: 4.6 },
  { id: 403, name: "Shampoo - Coconut", category: "Hair Care", price: 399, offerPrice: 299, sizes: ["200ml","400ml"], brand: "Dove", rating: 4.4 },
  { id: 404, name: "Perfume - Premium", category: "Fragrances", price: 1299, offerPrice: 899, sizes: ["100ml"], brand: "Davidoff", rating: 4.8 }
];

// ============================================
// 📱 ELECTRONICS PRODUCTS
// ============================================
export const electronicsProducts = [
  { id: 501, name: "Smartphone - Pro", category: "Mobiles", price: 29999, offerPrice: 24999, sizes: ["128GB","256GB"], brand: "Samsung", rating: 4.7 },
  { id: 502, name: "Wireless Headphones", category: "Audio", price: 2999, offerPrice: 1999, sizes: ["One Size"], brand: "Sony", rating: 4.6 },
  { id: 503, name: "Smart Watch", category: "Wearables", price: 3999, offerPrice: 2999, sizes: ["One Size"], brand: "Apple", rating: 4.8 },
  { id: 504, name: "Laptop - Ultrabook", category: "Laptops", price: 59999, offerPrice: 49999, sizes: ["512GB SSD","1TB SSD"], brand: "Dell", rating: 4.9 }
];

// ============================================
// 🛒 GROCERY PRODUCTS
// ============================================
export const groceryProducts = [
  { id: 601, name: "Basmati Rice", category: "Groceries", price: 899, offerPrice: 699, sizes: ["1kg","5kg","10kg"], brand: "India Gate", rating: 4.7 },
  { id: 602, name: "Premium Tea", category: "Beverages", price: 399, offerPrice: 299, sizes: ["100g","250g","500g"], brand: "Taj", rating: 4.6 },
  { id: 603, name: "Organic Honey", category: "Groceries", price: 499, offerPrice: 349, sizes: ["250g","500g","1kg"], brand: "Dabur", rating: 4.8 }
];

// ============================================
// 🏷️ BRANDS PRODUCTS
// ============================================
export const brandsProducts = [
  { id: 701, name: "Nike Air Max", category: "Shoes", price: 7999, offerPrice: 5999, sizes: ["7","8","9","10","11"], brand: "Nike", rating: 4.9 },
  { id: 702, name: "Adidas Hoodie", category: "Hoodies", price: 3999, offerPrice: 2999, sizes: ["S","M","L","XL","XXL"], brand: "Adidas", rating: 4.7 },
  { id: 703, name: "Puma Backpack", category: "Bags", price: 1999, offerPrice: 1499, sizes: ["One Size"], brand: "Puma", rating: 4.6 }
];

// ============================================
// 🏠 HOME & KITCHEN PRODUCTS
// ============================================
export const homeKitchenProducts = [
  { id: 801, name: "Sofa Set - 3 Seater", category: "Furniture", price: 24999, offerPrice: 19999, sizes: ["3 Seater","L Shape"], brand: "Urban Ladder", rating: 4.8 },
  { id: 802, name: "Non-stick Cookware Set", category: "Kitchen", price: 2999, offerPrice: 1999, sizes: ["5 Piece"], brand: "Prestige", rating: 4.7 }
];

// ============================================
// 🚀 LOAD FUNCTIONS
// ============================================
const productGroups = [
  { data: menProducts, prefix: "men" },
  { data: womenProducts, prefix: "women" },
  { data: kidsProducts, prefix: "kids" },
  { data: beautyProducts, prefix: "beauty" },
  { data: electronicsProducts, prefix: "electronics" },
  { data: groceryProducts, prefix: "grocery" },
  { data: brandsProducts, prefix: "brands" },
  { data: homeKitchenProducts, prefix: "home" }
];

export const loadAllProducts = async () => {
  const allProducts = [];
  for (const group of productGroups) {
    const transformed = transformProducts(group.data, group.prefix);
    allProducts.push(...transformed);
  }
  return allProducts;
};

// Single function for all categories
export const loadCategoryProducts = async (category) => {
  const group = productGroups.find(g => g.data === category);
  return group ? transformProducts(group.data, group.prefix) : [];
};

// ============================================
// 🛠️ HELPER FUNCTIONS
// ============================================
const getAllProducts = () => {
  const all = [];
  for (const group of productGroups) {
    all.push(...transformProducts(group.data, group.prefix));
  }
  return all;
};

export const getProductById = (id) => {
  const allProducts = getAllProducts();
  return allProducts.find(product => String(product.id) === String(id));
};

export const getRelatedProducts = (category, currentId) => {
  const allProducts = getAllProducts();
  return allProducts.filter(
    product => product.category === category && String(product.id) !== String(currentId)
  );
};

// Individual load functions (for backward compatibility)
export const loadAllWomenProducts = () => loadCategoryProducts(womenProducts);
export const loadAllKidsProducts = () => loadCategoryProducts(kidsProducts);
export const loadAllBeautyProducts = () => loadCategoryProducts(beautyProducts);
export const loadAllElectronicsProducts = () => loadCategoryProducts(electronicsProducts);
export const loadAllWeddingProducts = () => loadCategoryProducts(groceryProducts);
export const loadAllBrandsProducts = () => loadCategoryProducts(brandsProducts);
export const loadAllHomeKitchenProducts = () => loadCategoryProducts(homeKitchenProducts);