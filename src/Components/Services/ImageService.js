// 🟢 Updated imageService.js with better error handling and fallback
const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
const BASE_URL = 'https://api.unsplash.com';

// ✅ Fallback images - Direct URL use karein (3 alag images ke liye index add kiya)
const getFallbackImage = (productName, category, index = 0) => {
  const seed = `${productName}-${category}-${index}`.replace(/[^a-zA-Z0-9]/g, '');
  return `https://picsum.photos/seed/${seed}/500/700`;
};

// ✅ Check if Unsplash key is configured
const isUnsplashConfigured = () => {
  return UNSPLASH_ACCESS_KEY && UNSPLASH_ACCESS_KEY !== '' && UNSPLASH_ACCESS_KEY !== 'your_unsplash_access_key_here';
};

export const searchImages = async (query, perPage = 5) => {
  if (!isUnsplashConfigured()) {
    console.warn('⚠️ Unsplash API key not found or not configured, using fallback images');
    return [];
  }
  
  try {
    const response = await fetch(
      `${BASE_URL}/search/photos?query=${encodeURIComponent(query)}&per_page=${perPage}&orientation=squarish`,
      { 
        headers: { 'Authorization': `Client-ID ${UNSPLASH_ACCESS_KEY}` },
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
    console.error('Error fetching images from Unsplash:', error);
    return [];
  }
};

// ✅ PRODUCT IMAGES - Ab yeh 3 ALAG-ALAG images return karega
export const getProductImages = async (productName, category) => {
  // Agar productName ya category missing hai toh fallback use karein
  if (!productName || !category) {
    console.warn('⚠️ Product name or category missing, using fallback images');
    return [
      getFallbackImage(productName || 'product', category || 'general', 0),
      getFallbackImage(productName || 'product', category || 'general', 1),
      getFallbackImage(productName || 'product', category || 'general', 2)
    ];
  }
  
  try {
    const query = `${productName} ${category} clothing product`;
    // Humne perPage ko 3 kar diya hai taaki 3 alag images milein
    const results = await searchImages(query, 3); 
    
    if (results.length >= 3) {
      return [
        results[0].urls.regular, 
        results[1].urls.regular, 
        results[2].urls.regular
      ];
    } else if (results.length > 0) {
      // Agar 3 se kam images mili toh baaki fallback se bhar denge
      const images = results.map(r => r.urls.regular);
      while (images.length < 3) {
        images.push(getFallbackImage(productName, category, images.length));
      }
      return images;
    }
    
    // ✅ Fallback - 3 Alag random picsum images
    return [
      getFallbackImage(productName, category, 0),
      getFallbackImage(productName, category, 1),
      getFallbackImage(productName, category, 2)
    ];
  } catch (error) {
    console.error('Error in getProductImages:', error);
    return [
      getFallbackImage(productName, category, 0),
      getFallbackImage(productName, category, 1),
      getFallbackImage(productName, category, 2)
    ];
  }
};

// ✅ Single image fast fetch with fallback
export const getProductMainImage = async (productName, category) => {
  if (!productName || !category) {
    return getFallbackImage(productName || 'product', category || 'general', 0);
  }
  
  try {
    const results = await searchImages(`${productName} ${category} product`, 1);
    if (results.length > 0 && results[0]?.urls?.regular) {
      return results[0].urls.regular;
    }
    return getFallbackImage(productName, category, 0);
  } catch (error) {
    console.error('Error in getProductMainImage:', error);
    return getFallbackImage(productName, category, 0);
  }
};

// ✅ Category images with fallback
export const getCategoryImages = async (category, count = 8) => {
  if (!category) {
    console.warn('⚠️ Category missing, using fallback images');
    return Array(count).fill().map((_, i) => ({
      id: i,
      url: `https://picsum.photos/seed/general-${i}/500/700`,
      thumb: `https://picsum.photos/seed/general-${i}/200/200`,
      alt: 'General category'
    }));
  }
  
  try {
    const results = await searchImages(`${category} fashion clothing`, count);
    if (results.length > 0) {
      return results.map(img => ({
        id: img.id,
        url: img.urls.regular,
        thumb: img.urls.small,
        alt: img.alt_description || category
      }));
    }
    
    return Array(count).fill().map((_, i) => ({
      id: i,
      url: `https://picsum.photos/seed/${category}-${i}/500/700`,
      thumb: `https://picsum.photos/seed/${category}-${i}/200/200`,
      alt: category
    }));
  } catch (error) {
    console.error('Error in getCategoryImages:', error);
    return Array(count).fill().map((_, i) => ({
      id: i,
      url: `https://picsum.photos/seed/${category}-${i}/500/700`,
      thumb: `https://picsum.photos/seed/${category}-${i}/200/200`,
      alt: category
    }));
  }
};

// ✅ Cache mechanism for images to avoid repeated API calls
const imageCache = new Map();
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour cache

export const getProductImagesWithCache = async (productName, category) => {
  const cacheKey = `${productName}-${category}`;
  
  // Check if cached data exists and is not expired
  if (imageCache.has(cacheKey)) {
    const cachedData = imageCache.get(cacheKey);
    if (Date.now() - cachedData.timestamp < CACHE_DURATION) {
      console.log('📦 Using cached images for:', productName);
      return cachedData.images;
    }
  }
  
  // Fetch fresh images
  const images = await getProductImages(productName, category);
  
  // Store in cache
  imageCache.set(cacheKey, {
    images: images,
    timestamp: Date.now()
  });
  
  return images;
};

// ✅ Clear cache function (useful for testing or manual refresh)
export const clearImageCache = () => {
  imageCache.clear();
  console.log('🗑️ Image cache cleared');
};

// ✅ Prefetch images for a list of products
export const prefetchProductImages = async (products) => {
  if (!products || products.length === 0) return;
  
  console.log(`🔄 Prefetching images for ${products.length} products...`);
  
  try {
    const prefetchPromises = products.map(product => 
      getProductImagesWithCache(product.name, product.category)
        .catch(err => {
          console.warn(`Failed to prefetch images for ${product.name}:`, err);
          return null;
        })
    );
    
    await Promise.all(prefetchPromises);
    console.log('✅ Image prefetching complete!');
  } catch (error) {
    console.error('Error during image prefetching:', error);
  }
};

// ✅ Helper function to get image with retry logic
export const getImageWithRetry = async (url, maxRetries = 3) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        return url;
      }
    } catch (error) {
      console.warn(`Retry ${i + 1}/${maxRetries} failed for URL:`, url);
    }
    // Wait before retry (exponential backoff)
    await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
  }
  return null; // All retries failed
};

// ✅ Get multiple product images with retry support
export const getProductImagesWithRetry = async (productName, category) => {
  const images = await getProductImages(productName, category);
  
  // Test each image URL and replace failed ones
  const validImages = await Promise.all(
    images.map(async (img, index) => {
      const validUrl = await getImageWithRetry(img);
      if (validUrl) {
        return validUrl;
      }
      // If image fails, use fallback
      return getFallbackImage(productName, category, index);
    })
  );
  
  return validImages;
};

// ✅ Export all functions
export default {
  searchImages,
  getProductImages,
  getProductMainImage,
  getCategoryImages,
  getProductImagesWithCache,
  getProductImagesWithRetry,
  prefetchProductImages,
  clearImageCache,
  getImageWithRetry
};