// src/component/ProductsData.jsx
import { getProductImages } from '../services/imageService';

// ============================================
// 📦 MEN PRODUCTS DATA
// ============================================
export const menProducts = [
  {
    id: 36,
    name: "Silk Saree - Red",
    category: "Sarees",
    price: 1999,
    offerPrice: 1299,
    description: "Beautiful red silk saree perfect for weddings and special occasions.",
    sizes: ["Free Size"],
    brand: "Puma",
    features: ["Pure Silk", "Banarasi Work", "Light Weight", "Easy to Wear"],
    rating: 4.5
  },
  {
    id: 2,
    name: "Designer Saree - Blue",
    category: "Sarees",
    price: 2499,
    offerPrice: 1499,
    description: "Stylish designer saree with heavy work.",
    sizes: ["Free Size"],
    brand: "Adidas",
    features: ["Designer Collection", "Heavy Work", "Party Wear", "Premium Quality"],
    rating: 4.3
  },
  {
    id: 3,
    name: "Cotton Saree - Green",
    category: "Sarees",
    price: 1899,
    offerPrice: 1299,
    description: "Comfortable cotton saree for daily wear.",
    sizes: ["Free Size"],
    brand: "Nike",
    features: ["Pure Cotton", "Floral Print", "Light Weight", "Easy to Maintain"],
    rating: 4.7
  },
  {
    id: 4,
    name: "Party Wear Saree - Pink",
    category: "Sarees",
    price: 2999,
    offerPrice: 1999,
    description: "Party wear saree with sequin work.",
    sizes: ["Free Size"],
    brand: "Levi's",
    features: ["Sequin Work", "Party Wear", "Premium Fabric", "Stunning Look"],
    rating: 4.6
  },
  {
    id: 5,
    name: "Wedding Saree - Maroon",
    category: "Sarees",
    price: 3999,
    offerPrice: 2999,
    description: "Wedding saree with heavy embroidery.",
    sizes: ["Free Size"],
    brand: "U.S. Polo",
    features: ["Heavy Embroidery", "Wedding Collection", "Premium Silk", "Royal Look"],
    rating: 4.8
  },
  {
    id: 6,
    name: "Night Suit - Blue",
    category: "Night-Suits",
    price: 1299,
    offerPrice: 999,
    description: "Comfortable night suit for men.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    brand: "Puma",
    features: ["Cotton Blend", "Comfortable Fit", "Soft Fabric", "Machine Wash"],
    rating: 4.2
  },
  {
    id: 7,
    name: "Night Suit - Black",
    category: "Night-Suits",
    price: 1299,
    offerPrice: 999,
    description: "Stylish night suit for men.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    brand: "Nike",
    features: ["Premium Cotton", "Regular Fit", "Full Sleeve", "Machine Wash"],
    rating: 4.4
  },
  {
    id: 8,
    name: "Night Suit - Grey",
    category: "Night-Suits",
    price: 1299,
    offerPrice: 999,
    description: "Comfortable grey night suit for men.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    brand: "Adidas",
    features: ["Soft Fabric", "Regular Fit", "Full Sleeve", "Machine Wash"],
    rating: 4.1
  },
  {
    id: 9,
    name: "Night Suit - Maroon",
    category: "Night-Suits",
    price: 1299,
    offerPrice: 999,
    description: "Stylish maroon night suit for men.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    brand: "Levi's",
    features: ["Premium Fabric", "Regular Fit", "Full Sleeve", "Machine Wash"],
    rating: 4.3
  },
  {
    id: 10,
    name: "Night Suit - Brown",
    category: "Night-Suits",
    price: 1299,
    offerPrice: 999,
    description: "Comfortable brown night suit for men.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    brand: "U.S. Polo",
    features: ["Cotton Fabric", "Regular Fit", "Full Sleeve", "Machine Wash"],
    rating: 4.0
  },
  {
    id: 11,
    name: "Designer Saree - Golden",
    category: "Sarees",
    price: 3499,
    offerPrice: 2499,
    description: "Golden designer saree for festive occasions.",
    sizes: ["Free Size"],
    brand: "U.S. Polo",
    features: ["Designer Work", "Festival Wear", "Premium Silk", "Elegant Look"],
    rating: 4.9
  },
  // 👕 Men's Top Wear
  {
    id: 12,
    name: "Men's Casual Shirt - White",
    category: "Shirts",
    price: 1499,
    offerPrice: 999,
    description: "Premium cotton casual shirt for men.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    brand: "U.S. Polo",
    features: ["Pure Cotton", "Regular Fit", "Full Sleeves"],
    rating: 4.3
  },
  {
    id: 13,
    name: "Men's T-Shirt - Black",
    category: "T-Shirts",
    price: 899,
    offerPrice: 599,
    description: "Comfortable round neck t-shirt.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    brand: "Nike",
    features: ["Cotton Blend", "Half Sleeves", "Regular Fit"],
    rating: 4.5
  },
  {
    id: 14,
    name: "Men's Denim Jacket - Blue",
    category: "Jackets & Coats",
    price: 2499,
    offerPrice: 1799,
    description: "Stylish denim jacket for men.",
    sizes: ["S", "M", "L", "XL"],
    brand: "Levi's",
    features: ["Pure Denim", "Button Closure", "Multiple Pockets"],
    rating: 4.6
  },
  {
    id: 15,
    name: "Men's Jeans - Black",
    category: "Jeans",
    price: 1899,
    offerPrice: 1299,
    description: "Slim fit black jeans.",
    sizes: ["28", "30", "32", "34", "36", "38"],
    brand: "Levi's",
    features: ["Stretchable", "Slim Fit", "Durable"],
    rating: 4.4
  },
  {
    id: 16,
    name: "Men's Cargo Pants - Olive",
    category: "Cargo",
    price: 1599,
    offerPrice: 1099,
    description: "Comfortable cargo pants with multiple pockets.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    brand: "Puma",
    features: ["Cotton Fabric", "Cargo Pockets", "Relaxed Fit"],
    rating: 4.3
  },
  {
    id: 17,
    name: "Men's Vest - White",
    category: "Vests",
    price: 499,
    offerPrice: 349,
    description: "Cotton vest for daily wear.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    brand: "Jockey",
    features: ["Pure Cotton", "Breathable", "Comfort Fit"],
    rating: 4.5
  },
  {
  id: 18,
  name: "Men's Briefs - Cotton",
  category: "Briefs",
  price: 299,
  offerPrice: 199,
  brand: "Jockey",
  sizes: ["S", "M", "L", "XL"],
  features: ["Soft Cotton", "Comfort Fit"],
  rating: 4.4
},
{
  id: 19,
  name: "Men's Boxers - Pack",
  category: "Boxers",
  price: 499,
  offerPrice: 349,
  brand: "Puma",
  sizes: ["S", "M", "L", "XL"],
  features: ["Breathable", "Loose Fit"],
  rating: 4.5
},
{
  id: 20,
  name: "Men's Thermals",
  category: "Thermals",
  price: 799,
  offerPrice: 599,
  brand: "Adidas",
  sizes: ["S", "M", "L", "XL"],
  features: ["Winter Wear", "Warm Fabric"],
  rating: 4.6
},
{
  id: 21,
  name: "Men's Trunks",
  category: "Trunks",
  price: 399,
  offerPrice: 249,
  brand: "Nike",
  sizes: ["S", "M", "L", "XL"],
  features: ["Stretchable", "Comfort Fit"],
  rating: 4.3
},
{
  id: 22,
  name: "Men's Sports Shoes - Running",
  category: "Sports Shoes",
  price: 1999,
  offerPrice: 1299,
  brand: "Nike",
  sizes: ["6", "7", "8", "9", "10"],
  features: ["Lightweight", "Breathable", "Comfort Fit", "Running Shoes"],
  rating: 4.5
},
{
  id: 23,
  name: "Men's Sports Shoes - Training",
  category: "Sports Shoes",
  price: 2499,
  offerPrice: 1599,
  brand: "Adidas",
  sizes: ["6", "7", "8", "9", "10", "11"],
  features: ["Shock Absorption", "Flexible Sole", "Gym Training"],
  rating: 4.4
},
{
  id: 24,
  name: "Men's Sports Shoes - Walking",
  category: "Sports Shoes",
  price: 1799,
  offerPrice: 1199,
  brand: "Puma",
  sizes: ["6", "7", "8", "9", "10"],
  features: ["Soft Cushion", "Daily Walking", "Comfort Grip"],
  rating: 4.3
},
{
  id: 25,
  name: "Men's Sports Shoes - Premium",
  category: "Sports Shoes",
  price: 2999,
  offerPrice: 1999,
  brand: "Nike",
  sizes: ["7", "8", "9", "10", "11"],
  features: ["Premium Build", "Durable Sole", "Sport Style"],
  rating: 4.6
},
{
  id: 26,
  name: "Men's Casual Shoes - White",
  category: "Casual Shoes",
  price: 1999,
  offerPrice: 1299,
  brand: "Nike",
  sizes: ["6", "7", "8", "9", "10"],
  features: ["Lightweight", "Everyday Wear", "Comfort Fit"],
  rating: 4.4,
  image: "https://picsum.photos/500/700?random=26"
},
{
  id: 27,
  name: "Men's Formal Shoes - Black",
  category: "Formal Shoes",
  price: 2499,
  offerPrice: 1599,
  brand: "Nike",
  sizes: ["6", "7", "8", "9", "10"],
  features: ["Shiny Finish", "Office Wear", "Comfort Sole"],
  rating: 4.5,
  image: "https://picsum.photos/500/700?random=27"
},
{
  id: 28,
  name: "Men's Leather Sandals",
  category: "Sandals",
  price: 1499,
  offerPrice: 999,
  brand: "Puma",
  sizes: ["6", "7", "8", "9", "10"],
  features: ["Soft Leather", "Comfort Sole", "Daily Wear"],
  rating: 4.4,
  image: "https://picsum.photos/500/700?random=28"
},
{
  id: 29,
  name: "Men's Rubber Slippers",
  category: "Slippers",
  price: 499,
  offerPrice: 299,
  brand: "Nike",
  sizes: ["6", "7", "8", "9", "10"],
  features: ["Lightweight", "Water Resistant", "Daily Use"],
  rating: 4.2,
  image: "https://picsum.photos/500/700?random=29"
},
{
  id: 30,
  name: "Men's Smart Watch",
  category: "Watches",
  price: 2999,
  offerPrice: 1999,
  brand: "Fastrack",
  sizes: ["One Size"],
  features: ["Smart Display", "Heart Rate Monitor", "Bluetooth"],
  rating: 4.5,
  image: "https://picsum.photos/500/700?random=30"
},
{
  id: 31,
  name: "Men's Leather Wallet",
  category: "Wallets",
  price: 999,
  offerPrice: 599,
  brand: "Levi's",
  sizes: ["One Size"],
  features: ["Genuine Leather", "Slim Fit", "Multiple Slots"],
  rating: 4.4,
  image: "https://picsum.photos/500/700?random=31"
},
  {
    id: 32,
    name: "Classic Formal Belt",
    category: "Belts",
    price: 799,
    offerPrice: 499,
    brand: "Levi's",
    sizes: ["M", "L", "XL"],
    features: ["Genuine Leather", "Formal Wear", "Durable Buckle"],
    rating: 4.3,
    image: "https://picsum.photos/500/700?random=30"
  },
    {
    id: 33,
    name: "Premium Sunglasses",
    category: "Sunglasses",
    price: 1499,
    offerPrice: 899,
    brand: "Ray-Ban",
    sizes: ["Free Size"],
    features: ["UV Protection", "Lightweight Frame", "Stylish Look"],
    rating: 4.5,
    image: "https://picsum.photos/500/700?random=33"
  },
  {
  id: 34,
  name: "Nike Travel Bag",
  category: "Bags",
  price: 1499,
  offerPrice: 999,
  brand: "Nike",
  image: "https://picsum.photos/500/700?random=50"
},
{
  id: 35,
  name: "men Nightdress",
  category: "nightdresses",
  price: 799,
  offerPrice: 499,
  brand: "U.S. Polo",
  image: "https://picsum.photos/500/700?random=101"
},
{
  id: 1,
  name: "Cotton Shirt",
  category: "Shirts",
  fabric: "Cotton",
  price: 999,
  offerPrice: 599,
  brand: "Levi's",
  image: "https://picsum.photos/500/700?random=1"
}

];

// ============================================
// 👩 WOMEN PRODUCTS DATA
// ============================================
export const womenProducts = [
  {
    id: 201,
    name: "Designer Saree - Red",
    category: "Sarees",
    price: 2499,
    offerPrice: 1799,
    description: "Beautiful red designer saree for weddings.",
    sizes: ["Free Size"],
    brand: "Biba",
    features: ["Pure Silk", "Heavy Work", "Wedding Collection"],
    rating: 4.7,
    image: "https://picsum.photos/500/700?random=201"
  },
  {
    id: 202,
    name: "Floral Print Dress - Blue",
    category: "Dresses",
    price: 1899,
    offerPrice: 1299,
    description: "Comfortable floral print summer dress.",
    sizes: ["S", "M", "L", "XL"],
    brand: "Zara",
    features: ["Cotton Fabric", "Floral Print", "Summer Wear"],
    rating: 4.5,
    image: "https://picsum.photos/500/700?random=202"
  },
  {
    id: 203,
    name: "Women's Top - White",
    category: "Tops",
    price: 899,
    offerPrice: 599,
    description: "Stylish casual top for women.",
    sizes: ["S", "M", "L", "XL"],
    brand: "H&M",
    features: ["Cotton Blend", "Round Neck", "Half Sleeves"],
    rating: 4.4,
    image: "https://picsum.photos/500/700?random=203"
  },
  {
    id: 204,
    name: "Women's Jeans - Blue",
    category: "Jeans",
    price: 1599,
    offerPrice: 1199,
    description: "Skinny fit blue jeans for women.",
    sizes: ["26", "28", "30", "32", "34"],
    brand: "Levi's",
    features: ["Stretchable", "Skinny Fit", "High Rise"],
    rating: 4.6,
    image: "https://picsum.photos/500/700?random=204"
  },
  {
    id: 205,
    name: "High Heels - Black",
    category: "Heels",
    price: 1599,
    offerPrice: 999,
    description: "Stylish black high heels for parties.",
    sizes: ["5", "6", "7", "8", "9"],
    brand: "Nike",
    features: ["Comfortable", "Non-slip", "Party Wear"],
    rating: 4.3,
    image: "https://picsum.photos/500/700?random=205"
  },
  {
    id: 206,
    name: "Handbag - Brown",
    category: "Bags",
    price: 1299,
    offerPrice: 899,
    description: "Premium leather handbag.",
    sizes: ["One Size"],
    brand: "Levi's",
    features: ["Genuine Leather", "Multiple Compartments"],
    rating: 4.6,
    image: "https://picsum.photos/500/700?random=206"
  },
  {
    id: 207,
    name: "Kurti - Yellow",
    category: "Kurtis",
    price: 999,
    offerPrice: 699,
    description: "Cotton printed kurti for daily wear.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    brand: "W",
    features: ["Pure Cotton", "Block Print", "Comfortable"],
    rating: 4.4,
    image: "https://picsum.photos/500/700?random=207"
  },
  {
    id: 208,
    name: "Lehenga Choli - Pink",
    category: "Lehengas",
    price: 4999,
    offerPrice: 3499,
    description: "Beautiful lehenga choli for weddings.",
    sizes: ["S", "M", "L", "XL"],
    brand: "Manyavar",
    features: ["Heavy Embroidery", "Wedding Wear", "Premium Fabric"],
    rating: 4.9,
    image: "https://picsum.photos/500/700?random=208"
  },

];

// ============================================
// 👶 KIDS PRODUCTS DATA
// ============================================// ============================================
// 👶 KIDS PRODUCTS DATA (Updated with all categories)
// ============================================
export const kidsProducts = [
  // 👕 Boys Clothing
  {
    id: 301,
    name: "Boys T-Shirt - Blue",
    category: "Boys",
    price: 599,
    offerPrice: 399,
    description: "Cotton t-shirt for boys.",
    sizes: ["2-3Y", "3-4Y", "4-5Y", "5-6Y", "6-7Y", "7-8Y", "8-10Y"],
    brand: "Nike",
    features: ["Pure Cotton", "Printed", "Round Neck"],
    rating: 4.5,
    image: "https://picsum.photos/500/700?random=301"
  },
  {
    id: 302,
    name: "Boys Jeans - Blue",
    category: "Boys",
    price: 899,
    offerPrice: 649,
    description: "Comfortable jeans for boys.",
    sizes: ["2-3Y", "3-4Y", "4-5Y", "5-6Y", "6-7Y", "7-8Y", "8-10Y"],
    brand: "Levi's",
    features: ["Stretchable", "Adjustable Waist", "Durable"],
    rating: 4.4,
    image: "https://picsum.photos/500/700?random=302"
  },
  
  // 👗 Girls Clothing
  {
    id: 303,
    name: "Girls Dress - Pink",
    category: "Girls",
    price: 799,
    offerPrice: 549,
    description: "Beautiful frock for little girls.",
    sizes: ["2-3Y", "3-4Y", "4-5Y", "5-6Y", "6-7Y", "7-8Y", "8-10Y"],
    brand: "Gini & Jony",
    features: ["Flora Print", "Flared Design", "Soft Fabric"],
    rating: 4.7,
    image: "https://picsum.photos/500/700?random=303"
  },
  {
    id: 304,
    name: "Girls Leggings - Purple",
    category: "Girls",
    price: 399,
    offerPrice: 299,
    description: "Comfortable leggings for girls.",
    sizes: ["2-3Y", "3-4Y", "4-5Y", "5-6Y", "6-7Y", "7-8Y", "8-10Y"],
    brand: "Puma",
    features: ["Cotton Blend", "Elastic Waist", "Stretchy"],
    rating: 4.3,
    image: "https://picsum.photos/500/700?random=304"
  },
  
  // 👶 Babies Clothing
  {
    id: 305,
    name: "Baby Romper - Yellow",
    category: "Babies",
    price: 499,
    offerPrice: 349,
    description: "Soft cotton romper for babies.",
    sizes: ["0-6M", "6-12M", "12-18M", "18-24M"],
    brand: "Babyhug",
    features: ["Pure Cotton", "Snap Buttons", "Soft Fabric"],
    rating: 4.8,
    image: "https://picsum.photos/500/700?random=305"
  },
  {
    id: 306,
    name: "Baby Set - Blue",
    category: "Babies",
    price: 699,
    offerPrice: 499,
    description: "2 piece baby set with cap.",
    sizes: ["0-6M", "6-12M", "12-18M", "18-24M"],
    brand: "Mee Mee",
    features: ["Cotton Blend", "Cute Design", "Comfortable"],
    rating: 4.6,
    image: "https://picsum.photos/500/700?random=306"
  },
  
  // 🧴 Kids Skin Care
  {
    id: 307,
    name: "Baby Shampoo",
    category: "Shampoo",
    price: 299,
    offerPrice: 199,
    description: "Mild shampoo for kids.",
    sizes: ["200ml", "400ml"],
    brand: "Mamaearth",
    features: ["No Tears", "Mild", "Natural Ingredients"],
    rating: 4.7,
    image: "https://picsum.photos/500/700?random=307"
  },
  {
    id: 308,
    name: "Baby Powder",
    category: "Powder",
    price: 199,
    offerPrice: 149,
    description: "Talcum powder for babies.",
    sizes: ["100g", "200g", "400g"],
    brand: "Johnson's",
    features: ["Soft", "Fragrance Free", "Gentle"],
    rating: 4.5,
    image: "https://picsum.photos/500/700?random=308"
  },
  {
    id: 309,
    name: "Baby Oil",
    category: "Oil",
    price: 249,
    offerPrice: 179,
    description: "Massage oil for babies.",
    sizes: ["200ml", "400ml", "500ml"],
    brand: "Himalaya",
    features: ["Natural", "Moisturizing", "Gentle Massage"],
    rating: 4.6,
    image: "https://picsum.photos/500/700?random=309"
  },
  
  // 🎒 Kids Accessories
  {
    id: 310,
    name: "Kids Watch - Digital",
    category: "Watches",
    price: 999,
    offerPrice: 699,
    description: "Digital watch for kids.",
    sizes: ["One Size"],
    brand: "Fastrack",
    features: ["Water Resistant", "Digital Display", "Colorful"],
    rating: 4.4,
    image: "https://picsum.photos/500/700?random=310"
  },
  {
    id: 311,
    name: "Kids Shoes - White",
    category: "Shoes",
    price: 799,
    offerPrice: 549,
    description: "Comfortable sports shoes for kids.",
    sizes: ["10", "11", "12", "13", "1", "2"],
    brand: "Puma",
    features: ["Lightweight", "Non-slip Sole", "Breathable"],
    rating: 4.6,
    image: "https://picsum.photos/500/700?random=311"
  },
  {
    id: 312,
    name: "Kids Backpack - Blue",
    category: "Bags & Backpacks",
    price: 699,
    offerPrice: 499,
    description: "Stylish backpack for school.",
    sizes: ["One Size"],
    brand: "Skybags",
    features: ["Lightweight", "Multiple Compartments", "Durable"],
    rating: 4.5,
    image: "https://picsum.photos/500/700?random=312"
  },
  {
    id: 313,
    name: "Kids Sunglasses",
    category: "Goggles",
    price: 299,
    offerPrice: 199,
    description: "UV protection sunglasses for kids.",
    sizes: ["One Size"],
    brand: "Lenskart",
    features: ["UV Protection", "Colorful Frame", "Durable"],
    rating: 4.3,
    image: "https://picsum.photos/500/700?random=313"
  },
  
  // 🧸 Kids Toys
  {
    id: 314,
    name: "Wooden Puzzle",
    category: "Puzzle",
    price: 399,
    offerPrice: 299,
    description: "Educational wooden puzzle for kids.",
    sizes: ["One Size"],
    brand: "FunSkool",
    features: ["Educational", "Non-toxic", "Colorful"],
    rating: 4.7,
    image: "https://picsum.photos/500/700?random=314"
  },
  {
    id: 315,
    name: "Remote Control Car",
    category: "Remote Controls",
    price: 1299,
    offerPrice: 999,
    description: "RC car with remote control.",
    sizes: ["One Size"],
    brand: "Hot Wheels",
    features: ["Rechargeable", "Fast Speed", "Durable"],
    rating: 4.8,
    image: "https://picsum.photos/500/700?random=315"
  },
  {
    id: 316,
    name: "Teddy Bear - Large",
    category: "Teddy Bears",
    price: 899,
    offerPrice: 649,
    description: "Soft teddy bear for kids.",
    sizes: ["12 inch", "18 inch", "24 inch"],
    brand: "Soft Toys",
    features: ["Super Soft", "Huggable", "Safe Material"],
    rating: 4.9,
    image: "https://picsum.photos/500/700?random=316"
  },
  {
    id: 317,
    name: "Helmet - Kids",
    category: "Helmets",
    price: 599,
    offerPrice: 449,
    description: "Safety helmet for cycling.",
    sizes: ["S", "M", "L"],
    brand: "Vega",
    features: ["Safety Certified", "Adjustable", "Ventilated"],
    rating: 4.5,
    image: "https://picsum.photos/500/700?random=317"
  }
];
// ============================================
// 💄 BEAUTY PRODUCTS DATA
// ============================================
export const beautyProducts = [
  {
    id: 401,
    name: "Lipstick - Red",
    category: "Makeup",
    price: 599,
    offerPrice: 399,
    description: "Matte finish long-lasting lipstick.",
    sizes: ["One Size"],
    brand: "Maybelline",
    features: ["Matte Finish", "Long-lasting", "Smudge Proof"],
    rating: 4.5,
    image: "https://picsum.photos/500/700?random=401"
  },
  {
    id: 402,
    name: "Face Wash - Neem",
    category: "Skincare",
    price: 299,
    offerPrice: 199,
    description: "Neem face wash for acne-free skin.",
    sizes: ["100ml"],
    brand: "Himalaya",
    features: ["Neem Extract", "Anti-acne", "Gentle on Skin"],
    rating: 4.6,
    image: "https://picsum.photos/500/700?random=402"
  },
  {
    id: 403,
    name: "Shampoo - Coconut",
    category: "Hair Care",
    price: 399,
    offerPrice: 299,
    description: "Coconut shampoo for shiny hair.",
    sizes: ["200ml", "400ml"],
    brand: "Dove",
    features: ["Coconut Oil", "Damage Repair", "Shiny Hair"],
    rating: 4.4,
    image: "https://picsum.photos/500/700?random=403"
  },
  {
    id: 404,
    name: "Perfume - Premium",
    category: "Fragrances",
    price: 1299,
    offerPrice: 899,
    description: "Long-lasting premium perfume.",
    sizes: ["100ml"],
    brand: "Davidoff",
    features: ["Long-lasting", "Premium Fragrance", "Woody Notes"],
    rating: 4.8,
    image: "https://picsum.photos/500/700?random=404"
  }
];

// ============================================
// 📱 ELECTRONICS PRODUCTS DATA
// ============================================
export const electronicsProducts = [
  {
    id: 501,
    name: "Smartphone - Pro",
    category: "Mobiles",
    price: 29999,
    offerPrice: 24999,
    description: "5G smartphone with 108MP camera.",
    sizes: ["128GB", "256GB"],
    brand: "Samsung",
    features: ["5G Support", "108MP Camera", "5000mAh Battery"],
    rating: 4.7,
    image: "https://picsum.photos/500/700?random=501"
  },
  {
    id: 502,
    name: "Wireless Headphones",
    category: "Audio",
    price: 2999,
    offerPrice: 1999,
    description: "Noise cancellation wireless headphones.",
    sizes: ["One Size"],
    brand: "Sony",
    features: ["Noise Cancellation", "40hr Battery", "Bluetooth 5.0"],
    rating: 4.6,
    image: "https://picsum.photos/500/700?random=502"
  },
  {
    id: 503,
    name: "Smart Watch",
    category: "Wearables",
    price: 3999,
    offerPrice: 2999,
    description: "Fitness tracking smart watch.",
    sizes: ["One Size"],
    brand: "Apple",
    features: ["Heart Rate Monitor", "GPS", "Water Resistant"],
    rating: 4.8,
    image: "https://picsum.photos/500/700?random=503"
  },
  {
    id: 504,
    name: "Laptop - Ultrabook",
    category: "Laptops",
    price: 59999,
    offerPrice: 49999,
    description: "Lightweight laptop for professionals.",
    sizes: ["512GB SSD", "1TB SSD"],
    brand: "Dell",
    features: ["Intel i7", "16GB RAM", "Backlit Keyboard"],
    rating: 4.9,
    image: "https://picsum.photos/500/700?random=504"
  }
];

// ============================================
// 🛒 GROBRID PRODUCTS DATA
// ============================================
export const weddingProducts = [
  {
    id: 601,
    name: "Basmati Rice",
    category: "Groceries",
    price: 899,
    offerPrice: 699,
    description: "Premium basmati rice 5kg.",
    sizes: ["1kg", "5kg", "10kg"],
    brand: "India Gate",
    features: ["Aged Rice", "Long Grain", "Aromatic"],
    rating: 4.7,
    image: "https://picsum.photos/500/700?random=601"
  },
  {
    id: 602,
    name: "Premium Tea",
    category: "Beverages",
    price: 399,
    offerPrice: 299,
    description: "Darjeeling tea leaves 250g.",
    sizes: ["100g", "250g", "500g"],
    brand: "Taj",
    features: ["Organic", "Premium Leaves", "Rich Aroma"],
    rating: 4.6,
    image: "https://picsum.photos/500/700?random=602"
  },
  {
    id: 603,
    name: "Organic Honey",
    category: "Groceries",
    price: 499,
    offerPrice: 349,
    description: "Pure organic honey 500g.",
    sizes: ["250g", "500g", "1kg"],
    brand: "Dabur",
    features: ["Organic", "Pure", "Chemical Free"],
    rating: 4.8,
    image: "https://picsum.photos/500/700?random=603"
  }
];

// ============================================
// 🏷️ BRANDS PRODUCTS DATA
// ============================================
export const brandsProducts = [
  {
    id: 701,
    name: "Nike Air Max",
    category: "Shoes",
    price: 7999,
    offerPrice: 5999,
    description: "Premium running shoes.",
    sizes: ["7", "8", "9", "10", "11"],
    brand: "Nike",
    features: ["Air Cushion", "Breathable", "Lightweight"],
    rating: 4.9,
    image: "https://picsum.photos/500/700?random=701"
  },
  {
    id: 702,
    name: "Adidas Hoodie",
    category: "Hoodies",
    price: 3999,
    offerPrice: 2999,
    description: "Comfortable hoodie for winter.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    brand: "Adidas",
    features: ["Cotton Blend", "Warm", "Stylish"],
    rating: 4.7,
    image: "https://picsum.photos/500/700?random=702"
  },
  {
    id: 703,
    name: "Puma Backpack",
    category: "Bags",
    price: 1999,
    offerPrice: 1499,
    description: "Stylish backpack for college.",
    sizes: ["One Size"],
    brand: "Puma",
    features: ["Water Resistant", "Multiple Compartments", "Durable"],
    rating: 4.6,
    image: "https://picsum.photos/500/700?random=703"
  }
];

// ============================================
// 🏠 HOME & KITCHEN PRODUCTS DATA
// ============================================
export const homeKitchenProducts = [
  {
    id: 801,
    name: "Sofa Set - 3 Seater",
    category: "Furniture",
    price: 24999,
    offerPrice: 19999,
    description: "Premium fabric sofa set.",
    sizes: ["3 Seater", "L Shape"],
    brand: "Urban Ladder",
    features: ["Premium Fabric", "Solid Wood", "Comfortable"],
    rating: 4.8,
    image: "https://picsum.photos/500/700?random=801"
  },
  {
    id: 802,
    name: "Non-stick Cookware Set",
    category: "Kitchen",
    price: 2999,
    offerPrice: 1999,
    description: "5-piece non-stick cookware set.",
    sizes: ["5 Piece"],
    brand: "Prestige",
    features: ["Non-stick", "Eco-friendly", "Heat Resistant"],
    rating: 4.7,
    image: "https://picsum.photos/500/700?random=802"
  }
];


// ============================================
// 🚀 LOAD FUNCTIONS (API + Images)
// ============================================




// ============================================
// 🚀 LOAD FUNCTIONS (API + Unique IDs + Images)
// ============================================

// ✅ MEN Products Load (ONLY ONE DECLARATION HERE)
export const loadAllProducts = async () => {
  const productsWithImages = [];
  for (const product of menProducts) {
    try {
      // Image service API call safely handled
      if (typeof getProductImages === "function") {
        await getProductImages(product.name, product.category);
      }
      
      productsWithImages.push({
        ...product,
        id: `men-${product.id}`, // Globally unique string ID
        image: `https://picsum.photos/500/700?random=men-${product.id}`,
        images: [`https://picsum.photos/500/700?random=men-${product.id}`]
      });
    } catch (error) {
      console.error(`Error loading image for ${product.name}, using fallback:`, error);
      productsWithImages.push({
        ...product,
        id: `men-${product.id}`,
        image: `https://picsum.photos/500/700?random=men-${product.id}`,
        images: [`https://picsum.photos/500/700?random=men-${product.id}`]
      });
    }
  }
  return productsWithImages;
};

// ✅ WOMEN Products Load
export const loadAllWomenProducts = async () => {
  return womenProducts.map(product => ({
    ...product,
    id: `women-${product.id}`,
    image: product.image || `https://picsum.photos/500/700?random=women-${product.id}`,
    images: [product.image || `https://picsum.photos/500/700?random=women-${product.id}`]
  }));
};

// ✅ KIDS Products Load
export const loadAllKidsProducts = async () => {
  return kidsProducts.map(product => ({
    ...product,
    id: `kids-${product.id}`,
    image: product.image || `https://picsum.photos/500/700?random=kids-${product.id}`,
    images: [product.image || `https://picsum.photos/500/700?random=kids-${product.id}`]
  }));
};

// ✅ BEAUTY Products Load
export const loadAllBeautyProducts = async () => {
  return beautyProducts.map(product => ({
    ...product,
    id: `beauty-${product.id}`,
    image: product.image || `https://picsum.photos/500/700?random=beauty-${product.id}`,
    images: [product.image || `https://picsum.photos/500/700?random=beauty-${product.id}`]
  }));
};

// ✅ ELECTRONICS Products Load
export const loadAllElectronicsProducts = async () => {
  return electronicsProducts.map(product => ({
    ...product,
    id: `electronics-${product.id}`,
    image: product.image || `https://picsum.photos/500/700?random=electronics-${product.id}`,
    images: [product.image || `https://picsum.photos/500/700?random=electronics-${product.id}`]
  }));
};

// ✅ WEDDING Products Load
export const loadAllWeddingProducts = async () => {
  return weddingProducts.map(product => ({
    ...product,
    id: `wedding-${product.id}`,
    image: product.image || `https://picsum.photos/500/700?random=wedding-${product.id}`,
    images: [product.image || `https://picsum.photos/500/700?random=wedding-${product.id}`]
  }));
};

// ✅ BRANDS Products Load
export const loadAllBrandsProducts = async () => {
  return brandsProducts.map(product => ({
    ...product,
    id: `brands-${product.id}`,
    image: product.image || `https://picsum.photos/500/700?random=brands-${product.id}`,
    images: [product.image || `https://picsum.photos/500/700?random=brands-${product.id}`]
  }));
};

// ✅ HOME & KITCHEN Products Load
export const loadAllHomeKitchenProducts = async () => {
  return homeKitchenProducts.map(product => ({
    ...product,
    id: `home-kitchen-${product.id}`,
    image: product.image || `https://picsum.photos/500/700?random=hk-${product.id}`,
    images: [product.image || `https://picsum.photos/500/700?random=hk-${product.id}`]
  }));
};

// ============================================
// 🛠️ HELPER FUNCTIONS (Safely modified for String IDs)
// ============================================

// Helper function to combine all products with transformed unique IDs
const getAllTransformedProducts = () => {
  const transform = (arr, prefix) => (arr ? arr.map(p => ({ ...p, id: `${prefix}-${p.id}` })) : []);
  
  return [
    ...transform(menProducts, "men"),
    ...transform(womenProducts, "women"),
    ...transform(kidsProducts, "kids"),
    ...transform(beautyProducts, "beauty"),
    ...transform(electronicsProducts, "electronics"),
    ...transform(weddingProducts, "wedding"),
    ...transform(brandsProducts, "brands"),
    ...transform(homeKitchenProducts, "home-kitchen")
  ];
};

// ✅ Get Product By ID (Supports string/prefixed match seamlessly)
export const getProductById = (id) => {
  const allProducts = getAllTransformedProducts();
  const searchId = String(id);
  return allProducts.find(product => String(product.id) === searchId);
};

// ✅ Get Related Products
export const getRelatedProducts = (category, currentId) => {
  const allProducts = getAllTransformedProducts();
  const excludeId = String(currentId);
  return allProducts.filter(product => product.category === category && String(product.id) !== excludeId);
};