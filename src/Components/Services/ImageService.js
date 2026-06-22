// src/services/imageService.js

const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
const BASE_URL = 'https://api.unsplash.com';

// ✅ Fallback images - Direct URL use karein (CORS issue se bachne ke liye)
const getFallbackImage = (productName, category) => {
  // Picsum.photos CORS allow karta hai
  const seed = `${productName}-${category}`.replace(/[^a-zA-Z0-9]/g, '');
  return `https://picsum.photos/seed/${seed}/500/700`;
};

export const searchImages = async (query, perPage = 5) => {
  if (!UNSPLASH_ACCESS_KEY) {
    console.warn('⚠️ Unsplash API key not found, using fallback images');
    return [];
  }
  
  try {
    const response = await fetch(
      `${BASE_URL}/search/photos?query=${encodeURIComponent(query)}&per_page=${perPage}&orientation=squarish`,
      { 
        headers: { 'Authorization': `Client-ID ${UNSPLASH_ACCESS_KEY}` },
        // ✅ CORS issues ko handle karne ke liye mode: 'cors' use karein
        mode: 'cors'
      }
    );
    
    if (!response.ok) {
      console.warn(`API returned ${response.status}, using fallback images`);
      return [];
    }
    
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error('Error fetching images:', error);
    return [];
  }
};

// ✅ PRODUCT IMAGES - Fallback support ke saath
export const getProductImages = async (productName, category) => {
  const query = `${productName} ${category} clothing product`;
  const results = await searchImages(query, 1);
  
  if (results.length > 0 && results[0]?.urls?.regular) {
    const mainImage = results[0].urls.regular;
    return [mainImage, mainImage, mainImage];
  }
  
  // ✅ Fallback - Picsum.photos use karein (CORS friendly)
  const fallback = getFallbackImage(productName, category);
  return [fallback, fallback, fallback];
};

// ✅ Single image fast fetch with fallback
export const getProductMainImage = async (productName, category) => {
  const results = await searchImages(`${productName} ${category} product`, 1);
  if (results.length > 0 && results[0]?.urls?.regular) {
    return results[0].urls.regular;
  }
  return getFallbackImage(productName, category);
};

// ✅ Category images with fallback
export const getCategoryImages = async (category, count = 8) => {
  const results = await searchImages(`${category} fashion clothing`, count);
  if (results.length > 0) {
    return results.map(img => ({
      id: img.id,
      url: img.urls.regular,
      thumb: img.urls.small,
      alt: img.alt_description || category
    }));
  }
  
  // ✅ Fallback images array
  return Array(count).fill().map((_, i) => ({
    id: i,
    url: `https://picsum.photos/seed/${category}-${i}/500/700`,
    thumb: `https://picsum.photos/seed/${category}-${i}/200/200`,
    alt: category
  }));
};