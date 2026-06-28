// // src/App.jsx
// import { useState } from 'react';
// import "./App.css";
// import "bootstrap/dist/css/bootstrap.min.css";
// import {
//   BrowserRouter as Router,
//   Routes, 
//   Route,
// } from "react-router-dom";
// import Home from "./Components/Home";
// import MenRouter from "../src/Components/AllPage/MenFashion/MenRouter";
// import BeautyRouter from '../src/Components/AllPage/BeautyCare/BeautyRouter';
// import ElectronicsRouter from '../src/Components/AllPage/Electronics/ElectronicsRouter';
// import HomeRouter from '../src/Components/AllPage/HomeKitchen/HomeRouter';
// import KidsRouter from '../src/Components/AllPage/KidsToys/KidsRouter';
// import WomenRouter from '../src/Components/AllPage/WomenFashion/WomenRouter'
// import WeddingRouter from '../src/Components/AllPage/WeddingHub/WeddingRouter';
// import GroceryRouter from '../src/Components/AllPage/Grocery/GroceryRouter';
// import LoginSignup from "./Components/Header/LoginSignup";
// import LoginCallback from './Components/Header/LoginCallback'
// import Wishlist from './Components/Header/Wishlist/Wishlist';
// // ✅ Cart import karein
// import Cart from './Components/Header/Cart/Cart';
// import Header from "./Components/Header/Header";
// import Fotter from "./Components/Fotter/Fotter";
// import ProductDetails from "./Components/AllPage/Productdetailspage";
// import { CartProvider } from './Context/CartContext';
// import Checkoutpage from './Components/Header/Wishlist/Checkoutpage'
// function App() {
//   const [wishlistItems, setWishlistItems] = useState([]);

//   return (
//     <CartProvider>
//       <Router>
//         <Header wishlistItems={wishlistItems} />
        
//         <Routes>
//           <Route 
//             path="/" 
//             element={
//               <Home 
//                 wishlistItems={wishlistItems}
//                 setWishlistItems={setWishlistItems}
//               />
//             } 
//           />
          
//           <Route path="/login" element={<LoginSignup />} />
//           <Route path="/product/:id" element={<ProductDetails />} />
          
//           {/* ✅ Cart Route */}
//           <Route path="/cart" element={<Cart />} />
          
//           <Route 
//             path="/wishlist" 
//             element={
//               <Wishlist 
//                 wishlistItems={wishlistItems}
//                 setWishlistItems={setWishlistItems}
//               />
//             } 
//           />
//           <Route path="/checkout" element={<Checkoutpage />} />
          
//           <Route path="/auth/google/callback" element={<LoginCallback />} />
//           <Route path="/home-kitchen/*" element={<HomeRouter />} />
//           <Route path="/men-fashion/*" element={<MenRouter />} />
//           <Route path="/women-fashion/*" element={<WomenRouter />} />
//           <Route path="/kids-toys/*" element={<KidsRouter />} />
//           <Route path="/beauty-care/*" element={<BeautyRouter />} />
//           <Route path="/electronics/*" element={<ElectronicsRouter />} />
//           <Route path="/wedding-hub/*" element={<WeddingRouter />} />
//           <Route path="/grocery/*" element={<GroceryRouter />} />
//         </Routes>
        
//         <Fotter />
//       </Router>
//     </CartProvider>
//   );
// }
// src/App.jsx
import { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Routes, 
  Route,
  Outlet,
  useLocation
} from "react-router-dom";

// ✅ Context Providers
import { CartProvider } from './Context/CartContext';
import { AuthProvider, useAuth } from './Context/AuthContext';
import { GoogleOAuthProvider } from '@react-oauth/google';

// ✅ Components
import Home from "./Components/Home";
import Header from "./Components/Header/Header";
import Fotter from "./Components/Fotter/Fotter";
import LoginSignup from "./Components/Header/LoginSignup";
import AuthModal from './Components/AuthModal/AuthModal';
import ProductDetails from "./Components/AllPage/Productdetailspage";
import Wishlist from './Components/Header/Wishlist/Wishlist';
import Cart from './Components/Header/Cart/Cart';
import Checkoutpage from './Components/Header/Wishlist/Checkoutpage';

// ✅ Category Routes
import MenRouter from "../src/Components/AllPage/MenFashion/MenRouter";
import WomenRouter from '../src/Components/AllPage/WomenFashion/WomenRouter';
import KidsRouter from '../src/Components/AllPage/KidsToys/KidsRouter';
import BeautyRouter from '../src/Components/AllPage/BeautyCare/BeautyRouter';
import ElectronicsRouter from '../src/Components/AllPage/Electronics/ElectronicsRouter';
import HomeRouter from '../src/Components/AllPage/HomeKitchen/HomeRouter';
import WeddingRouter from '../src/Components/AllPage/WeddingHub/WeddingRouter';
import GroceryRouter from '../src/Components/AllPage/Grocery/GroceryRouter';

// ✅ Icon Routes
import IconMen from "./Components/AllPage/Icons/IconMen";
import IconWomen from "./Components/AllPage/Icons/IconWomen";
import IconKids from "./Components/AllPage/Icons/IconKids";
import IconFootwear from "./Components/AllPage/Icons/IconFootwear";
import IconBags from "./Components/AllPage/Icons/IconBags";
import IconWatches from "./Components/AllPage/Icons/IconWatches";
import IconAccessories from "./Components/AllPage/Icons/IconAccessories";
import IconHomeLiving from "./Components/AllPage/Icons/IconHomeLiving";
import IconBeauty from "./Components/AllPage/Icons/IconBeauty";
import IconGrocery from './Components/AllPage/Icons/IconGrocery';




// ============================================
// 📦 MAIN LAYOUT COMPONENT
// ============================================
const MainLayout = ({ wishlistItems, setWishlistItems }) => {
  const location = useLocation();
  const { authModal } = useAuth();
  
  return (
    <div 
      key={location.pathname} 
      className="w-full min-h-screen flex flex-col overflow-x-hidden bg-white"
    >
      <Header wishlistItems={wishlistItems} setWishlistItems={setWishlistItems} />
      <main className="flex-grow w-full">
        <Outlet />
      </main>
      <Fotter />
      
      {/* ✅ Global Auth Modal */}
      {authModal?.isOpen && <LoginSignup />}
    </div>
  );
};

// ============================================
// 🚀 MAIN APP COMPONENT
// ============================================
function App() {
  const [wishlistItems, setWishlistItems] = useState([]);

  return (
    <GoogleOAuthProvider clientId="1080228480275-a72d4labvq2pggkskcjvsj4onjv29nb6.apps.googleusercontent.com">
      <AuthProvider>
        <CartProvider>
          <Router
            future={{
              v7_startTransition: true,
              v7_relativeSplatPath: true,
            }}
          >
            <Routes>
              {/* 🚪 Routes WITHOUT Header/Footer */}
              <Route path="/login" element={<LoginSignup />} />

              {/* 🛍️ Routes WITH Header/Footer */}
              <Route 
                element={
                  <MainLayout 
                    wishlistItems={wishlistItems} 
                    setWishlistItems={setWishlistItems} 
                  />
                } 
              >
                {/* Home Page */}
                <Route 
                  path="/" 
                  element={
                    <Home 
                      wishlistItems={wishlistItems}
                      setWishlistItems={setWishlistItems}
                    />
                  } 
                />
                
                {/* Product & Cart Routes */}
                <Route path="/product/:id" element={<ProductDetails />} />
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
                
                {/* ✅ Category Routes */}
                <Route path="/men-fashion/*" element={<MenRouter />} />
                <Route path="/women-fashion/*" element={<WomenRouter />} />
                <Route path="/kids-toys/*" element={<KidsRouter />} />
                <Route path="/beauty-care/*" element={<BeautyRouter />} />
                <Route path="/electronics/*" element={<ElectronicsRouter />} />
                <Route path="/wedding-hub/*" element={<WeddingRouter />} />
                <Route path="/grocery/*" element={<GroceryRouter />} />
                <Route path="/home-kitchen/*" element={<HomeRouter />} />

                {/* ✅ Icon Routes */}
                <Route path="/men-collection" element={<IconMen />} />
                <Route path="/women-collection" element={<IconWomen />} />
                <Route path="/kids-collection" element={<IconKids />} />
                <Route path="/footwear-collection" element={<IconFootwear />} />
                <Route path="/bags-collection" element={<IconBags />} />
                <Route path="/watches-collection" element={<IconWatches />} />
                <Route path="/accessories-collection" element={<IconAccessories />} />
                <Route path="/home-living-collection" element={<IconHomeLiving />} />
                <Route path="/beauty-collection" element={<IconBeauty />} />
                <Route path="/grocery-collection" element={<IconGrocery/>}/>
               
                
              </Route>
            </Routes>
          </Router>
        </CartProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;