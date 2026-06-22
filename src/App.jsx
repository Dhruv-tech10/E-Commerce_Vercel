// src/App.jsx
import { useState } from 'react';
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Routes, 
  Route,
} from "react-router-dom";
import Home from "./Components/Home";
import MenRouter from "../src/Components/AllPage/MenFashion/MenRouter";
import BeautyRouter from '../src/Components/AllPage/BeautyCare/BeautyRouter';
import ElectronicsRouter from '../src/Components/AllPage/Electronics/ElectronicsRouter';
import HomeRouter from '../src/Components/AllPage/HomeKitchen/HomeRouter';
import KidsRouter from '../src/Components/AllPage/KidsToys/KidsRouter';
import WomenRouter from '../src/Components/AllPage/WomenFashion/WomenRouter'
import WeddingRouter from '../src/Components/AllPage/WeddingHub/WeddingRouter';
import GroceryRouter from '../src/Components/AllPage/Grocery/GroceryRouter';
import LoginSignup from "./Components/Header/LoginSignup";
import LoginCallback from './Components/Header/LoginCallback'
import Wishlist from './Components/Header/Wishlist/Wishlist';
// ✅ Cart import karein
import Cart from './Components/Header/Cart/Cart';
import Header from "./Components/Header/Header";
import Fotter from "./Components/Fotter/Fotter";
import ProductDetails from "./Components/AllPage/Productdetailspage";
import { CartProvider } from './Context/CartContext';
import Checkoutpage from './Components/Header/Wishlist/Checkoutpage'
function App() {
  const [wishlistItems, setWishlistItems] = useState([]);

  return (
    <CartProvider>
      <Router>
        <Header wishlistItems={wishlistItems} />
        
        <Routes>
          <Route 
            path="/" 
            element={
              <Home 
                wishlistItems={wishlistItems}
                setWishlistItems={setWishlistItems}
              />
            } 
          />
          
          <Route path="/login" element={<LoginSignup />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          
          {/* ✅ Cart Route */}
          <Route path="/cart" element={<Cart />} />
          
          <Route 
            path="/wishlist" 
            element={
              <Wishlist 
                wishlistItems={wishlistItems}
                setWishlistItems={setWishlistItems}
              />
            } 
          />
          <Route path="/checkout" element={<Checkoutpage />} />
          
          <Route path="/auth/google/callback" element={<LoginCallback />} />
          <Route path="/home-kitchen/*" element={<HomeRouter />} />
          <Route path="/men-fashion/*" element={<MenRouter />} />
          <Route path="/women-fashion/*" element={<WomenRouter />} />
          <Route path="/kids-toys/*" element={<KidsRouter />} />
          <Route path="/beauty-care/*" element={<BeautyRouter />} />
          <Route path="/electronics/*" element={<ElectronicsRouter />} />
          <Route path="/wedding-hub/*" element={<WeddingRouter />} />
          <Route path="/grocery/*" element={<GroceryRouter />} />
        </Routes>
        
        <Fotter />
      </Router>
    </CartProvider>
  );
}

export default App;