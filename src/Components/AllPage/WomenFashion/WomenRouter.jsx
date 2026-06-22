import { Routes, Route } from "react-router-dom";
import TunicTop from '../../AllPage/WomenFashion/TunicTop'
import Dresses from '../../AllPage/WomenFashion/Dresses'
import Gowns from '../../AllPage/WomenFashion/Gowns'
import Saree from '../../AllPage/WomenFashion/Saree'
import Jumpsuit from '../../AllPage/WomenFashion/Jumpsuit'
import Kurtie from '../../AllPage/WomenFashion/Kurtie'
import JeansJeggie from '../../AllPage/WomenFashion/JeansJeggie'
import Legging from '../../AllPage/WomenFashion/Legging'
import ShortsSkirt from '../../AllPage/WomenFashion/ShortsSkirt'
import Palazzo from '../../AllPage/WomenFashion/Palazzo'
import PantsTrouser from '../../AllPage/WomenFashion/PantsTrouser'
import WomenBra from '../../AllPage/WomenFashion/WomenBra'
import WomenPanties from '../../AllPage/WomenFashion/WomenPanties'
import WomenNightdress from '../../AllPage/WomenFashion/WomenNightdress'
import WomenNightSuit from '../../AllPage/WomenFashion/WomenNightSuit'
import Earrings from '../../AllPage/WomenFashion/Earrings'
import Watch from '../../AllPage/WomenFashion/Watch'
import Necklace from '../../AllPage/WomenFashion/Necklace'
import Jwellery from '../../AllPage/WomenFashion/Jwellery'
import TShirt from '../../AllPage/WomenFashion/TShirt'
import Shirt from '../../AllPage/WomenFashion/Shirt'
import Jackets from '../../AllPage/WomenFashion/Jackets'
import Facewash from '../../AllPage/WomenFashion/Facewash'
import Dupatta from '../../AllPage/WomenFashion/Dupatta'
import Blouses from '../../AllPage/WomenFashion/Blouses'
import Sweaters from '../../AllPage/WomenFashion/Sweaters'
import Blazers from '../../AllPage/WomenFashion/Blazers'
import SportsBra from '../../AllPage/WomenFashion/SportsBra'
import SunGlasses from '../../AllPage/WomenFashion/SunGlasses'
import Coats from '../../AllPage/WomenFashion/Coats'
import Anklets from '../../AllPage/WomenFashion/Anklets'
import Bracelets from '../../AllPage/WomenFashion/Bracelets'
import Perfumes from '../../AllPage/WomenFashion/Perfumes'
const WomenRouter = () => {
  return (
    <div>
      <Routes>
        <Route path="T-Shirt" element={<TShirt />} />
        <Route path="Tunic & Top" element={<TunicTop />} />
        <Route path="Shirt" element={<Shirt />} />
        <Route path="Dresses" element={<Dresses/>} />
        <Route path="Gowns" element={<Gowns />} />
        <Route path="Dupatta" element={<Dupatta />} />
        <Route path="Saree" element={<Saree />} />
        <Route path="Jumpsuit" element={<Jumpsuit />} />
        <Route path="Kurtie" element={<Kurtie />} />
        <Route path="Blouses" element={<Blouses />} />

        <Route path="Jeans & Jeggie" element={<JeansJeggie />} />
        <Route path="Legging" element={<Legging />} />
        <Route path="Shorts & Skirt" element={<ShortsSkirt />} />
        <Route path="Palazzo" element={<Palazzo/>} />
        <Route path="Pants & Trouser" element={<PantsTrouser />} />

        <Route path="Jackets" element={<Jackets />} />
        <Route path="Sweaters" element={<Sweaters />} />
        <Route path="Coats" element={<Coats />} />
        <Route path="Blazers" element={<Blazers/>} />

         <Route path="Women Bra" element={<WomenBra />} />
        <Route path="Women Panties" element={<WomenPanties/>} />
        <Route path="Sports Bra" element={<SportsBra />} />

         <Route path="Women NightDress" element={<WomenNightdress/>} />
        <Route path="Women NightSuit" element={<WomenNightSuit />} />

         <Route path="Anklets" element={<Anklets />} />
        <Route path="Bracelets" element={<Bracelets />} />
        <Route path="Jwellery" element={<Jwellery />} />
        <Route path="Earrings" element={<Earrings/>} />
        <Route path="Watch" element={<Watch />} />
        <Route path="Necklace" element={<Necklace />} />
        <Route path="Facewash" element={<Facewash />} />
        <Route path="Perfumes" element={<Perfumes />} />
        <Route path="SunGlasses" element={<SunGlasses />} />
      </Routes>
    </div>
  )
}

export default WomenRouter
