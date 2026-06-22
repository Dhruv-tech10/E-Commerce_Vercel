import Arrivals from "./Arrivals/Arrivals"
import Category from "./Category/Category"
// import Footer from "./Fotter/Fotter"
// import Header from './Header/Header'
import Hero from "./Hero/Hero"
import Instagram from "./Instagram/Instagram"
import Sellers from "./Sellers/Sellers"

const Home = ({ 
  setcartAllProducts,     // Cart setter
  wishlistItems,          // Wishlist state
  setWishlistItems        // Wishlist setter
}) => {
  return (
    <div>
      {/* <Header></Header> */}
      <Hero></Hero>
      <Category></Category>
      <Sellers></Sellers>
      
      {/* Arrivals ko wishlist props pass karo */}
      <Arrivals 
        wishlistItems={wishlistItems}
        setWishlistItems={setWishlistItems}
      />
      
      <Instagram></Instagram>
      {/* <Footer></Footer> */}
    </div>
  )
}

export default Home