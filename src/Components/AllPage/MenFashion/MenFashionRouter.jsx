// src/Components/AllPage/MenFashion/MenFashionRouter.jsx
import { Routes, Route } from 'react-router-dom';
import MenFashion from './MenFashion';

// ✅ Import all sub-components
import Caps from './Caps';
import Shirt from './Shirt';
import TShirt from './TShirt';
import Jeans from './Jeans';
import JacketCoat from './JacketCoat';
import Kurta from './Kurta';
import Cargos from './Cargos';
import MenTrackpants from './MenTrackpants';
import MenPyjamas from './MenPyjamas';
import NightShorts from './NightShorts';
import Vests from './Vests';
import Briefs from './Briefs';
import Boxers from './Boxers';
import Trunks from './Trunks';
import MenPartywearshoes from './MenPartywearshoes';
import SportsShoes from './SportsShoes';
import FormallShoes from './FormallShoes';
import PartyWear from './PartyWear';
import Watches from './Watches';
import BagsLuggage from './BagsLuggage';
import Sunglasses from './Sunglasses';
import Wallets from './Wallets';
import Belts from './Belts';
import Jewellery from './Jewellery';
import Perfume from './Perfume';
import Facewash from './Facewash';
import Condoms from './Condoms';
import PersonalLubricants from './PersonalLubricants';
import DelaySprays from './DelaySprays';
import MassageOils from './MassageOils';

const MenFashionRouter = () => {
  return (
    <Routes>
      {/* ✅ Main Men Fashion Page - /men-fashion */}
      <Route path="/" element={<MenFashion />} />
      
      {/* ✅ Top Wear - /men-fashion/Shirt, /men-fashion/T-Shirt, etc. */}
      <Route path="/Shirt" element={<Shirt />} />
      <Route path="/T-Shirt" element={<TShirt />} />
      <Route path="/Jacket-Coat" element={<JacketCoat />} />
      <Route path="/Kurta" element={<Kurta />} />
      
      {/* ✅ Bottom Wear */}
      <Route path="/Jeans" element={<Jeans />} />
      <Route path="/Cargos" element={<Cargos />} />
      <Route path="/Trackpants" element={<MenTrackpants />} />
      
      {/* ✅ Inner Wear */}
      <Route path="/Vests" element={<Vests />} />
      <Route path="/Briefs" element={<Briefs />} />
      <Route path="/Trunks" element={<Trunks />} />
      <Route path="/Boxers" element={<Boxers />} />
      
      {/* ✅ Sleep Wear */}
      <Route path="/NightShorts" element={<NightShorts />} />
      <Route path="/MenPyjamas" element={<MenPyjamas />} />
      
      {/* ✅ Shoes */}
      <Route path="/Partywearshoes" element={<MenPartywearshoes />} />
      <Route path="/SportsShoes" element={<SportsShoes />} />
      <Route path="/FormallShoes" element={<FormallShoes />} />
      <Route path="/PartyWear" element={<PartyWear />} />
      
      {/* ✅ Accessories */}
      <Route path="/Watches" element={<Watches />} />
      <Route path="/Bags-Luggage" element={<BagsLuggage />} />
      <Route path="/Sunglasses" element={<Sunglasses />} />
      <Route path="/Wallets" element={<Wallets />} />
      <Route path="/Belts" element={<Belts />} />
      <Route path="/Caps" element={<Caps />} />
      <Route path="/Jewellery" element={<Jewellery />} />
      
      {/* ✅ Health & Personal Care */}
      <Route path="/Perfume" element={<Perfume />} />
      <Route path="/Facewash" element={<Facewash />} />
      <Route path="/Condoms" element={<Condoms />} />
      <Route path="/PersonalLubricants" element={<PersonalLubricants />} />
      <Route path="/DelaySprays" element={<DelaySprays />} />
      <Route path="/MassageOils" element={<MassageOils />} />
      
      {/* ✅ Fallback - agar koi route match nahi kare to main page */}
      <Route path="*" element={<MenFashion />} />
    </Routes>
  );
};

export default MenFashionRouter;