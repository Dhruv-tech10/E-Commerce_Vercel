// src/Components/WishlistUtils.js

// ============================================
// 1. GET WISHLIST - localStorage se wishlist data lao
// ============================================
export const getWishlist = () => {
  try {
    const wishlist = localStorage.getItem('userWishlist');
    return wishlist ? JSON.parse(wishlist) : [];
  } catch (error) {
    console.error('Error getting wishlist:', error);
    return [];
  }
};

// ============================================
// 2. SAVE WISHLIST - localStorage mein wishlist save karo
// ============================================
export const saveWishlist = (wishlist) => {
  try {
    localStorage.setItem('userWishlist', JSON.stringify(wishlist));
    // ✅ Sabhi components ko update karne ke liye event dispatch karo
    window.dispatchEvent(new CustomEvent('wishlistUpdated'));
  } catch (error) {
    console.error('Error saving wishlist:', error);
  }
};

// ============================================
// 3. CHECK IF IN WISHLIST - Product wishlist mein hai ya nahi?
// ============================================
export const isInWishlist = (productId) => {
  const wishlist = getWishlist();
  return wishlist.some(item => item.id === productId);
};

// ============================================
// 4. ADD TO WISHLIST - Product wishlist mein add karo
// ============================================
export const addToWishlist = (product) => {
  const wishlist = getWishlist();
  
  // ✅ Check karo product already exist toh nahi karta
  if (!wishlist.some(item => item.id === product.id)) {
    saveWishlist([...wishlist, product]);
    return true; // ✅ Successfully added
  }
  return false; // ❌ Already exists
};

// ============================================
// 5. REMOVE FROM WISHLIST - Product wishlist se hatao
// ============================================
export const removeFromWishlist = (productId) => {
  const wishlist = getWishlist();
  const updatedWishlist = wishlist.filter(item => item.id !== productId);
  saveWishlist(updatedWishlist);
};

// ============================================
// 6. TOGGLE WISHLIST - Agar hai toh hatao, nahi hai toh add karo
// ============================================
export const toggleWishlist = (product) => {
  if (isInWishlist(product.id)) {
    removeFromWishlist(product.id);
    return false; // ❌ Removed from wishlist
  } else {
    addToWishlist(product);
    return true; // ✅ Added to wishlist
  }
};

// ============================================
// 7. GET WISHLIST COUNT - Wishlist mein kitne items hain?
// ============================================
export const getWishlistCount = () => {
  const wishlist = getWishlist();
  return wishlist.length;
};

// ============================================
// 8. CLEAR WISHLIST - Poori wishlist empty karo
// ============================================
export const clearWishlist = () => {
  saveWishlist([]);
};

// ============================================
// 9. GET WISHLIST ITEM - Specific product find karo
// ============================================
export const getWishlistItem = (productId) => {
  const wishlist = getWishlist();
  return wishlist.find(item => item.id === productId);
};

// ============================================
// 10. UPDATE WISHLIST ITEM - Product ki details update karo
// ============================================
export const updateWishlistItem = (productId, updatedData) => {
  const wishlist = getWishlist();
  const updatedWishlist = wishlist.map(item => 
    item.id === productId ? { ...item, ...updatedData } : item
  );
  saveWishlist(updatedWishlist);
};

// ============================================
// 11. ADD MULTIPLE TO WISHLIST - Ek saath multiple products add karo
// ============================================
export const addMultipleToWishlist = (products) => {
  const wishlist = getWishlist();
  const newProducts = products.filter(
    product => !wishlist.some(item => item.id === product.id)
  );
  if (newProducts.length > 0) {
    saveWishlist([...wishlist, ...newProducts]);
    return true;
  }
  return false;
};

// ============================================
// 12. IS WISHLIST EMPTY - Wishlist khali hai?
// ============================================
export const isWishlistEmpty = () => {
  const wishlist = getWishlist();
  return wishlist.length === 0;
};

// ============================================
// 13. GET WISHLIST BY CATEGORY - Category ke hisaab se filter karo
// ============================================
export const getWishlistByCategory = (category) => {
  const wishlist = getWishlist();
  return wishlist.filter(item => item.category === category);
};

// ============================================
// 14. REMOVE MULTIPLE FROM WISHLIST - Multiple products ek saath hatao
// ============================================
export const removeMultipleFromWishlist = (productIds) => {
  const wishlist = getWishlist();
  const updatedWishlist = wishlist.filter(item => !productIds.includes(item.id));
  saveWishlist(updatedWishlist);
};

// ============================================
// 15. GET TOTAL WISHLIST VALUE - Wishlist ki total value
// ============================================
export const getWishlistTotalValue = () => {
  const wishlist = getWishlist();
  return wishlist.reduce((total, item) => {
    const price = item.offerPrice || item.price || 0;
    return total + price;
  }, 0);
};

// ============================================
// 16. FORMAT PRICE - Price ko readable format mein badlo
// ============================================
export const formatPrice = (price) => {
  if (typeof price === 'number') {
    return `₹${price.toLocaleString()}`;
  }
  if (typeof price === 'string') {
    const numericPrice = parseFloat(price.replace(/[₹,]/g, ''));
    if (!isNaN(numericPrice)) {
      return `₹${numericPrice.toLocaleString()}`;
    }
    return price;
  }
  return '₹0';
};

// ============================================
// 17. PARSE PRICE - String price ko number mein badlo
// ============================================
export const parsePrice = (price) => {
  if (typeof price === 'number') {
    return price;
  }
  if (typeof price === 'string') {
    const numericPrice = parseFloat(price.replace(/[₹,]/g, ''));
    return isNaN(numericPrice) ? 0 : numericPrice;
  }
  return 0;
};