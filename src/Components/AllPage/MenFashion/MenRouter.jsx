
import { Routes, Route } from "react-router-dom";
import Shirt from '../../AllPage/MenFashion/Shirt';
import TShirt from '../../AllPage/MenFashion/TShirt';
import JacketCoat from '../../AllPage/MenFashion/JacketCoat';
import Kurta from '../../AllPage/MenFashion/Kurta';
import Jeans from '../../AllPage/MenFashion/Jeans';
import Cargos from '../../AllPage/MenFashion/Cargos';
import Verts from '../../AllPage/MenFashion/Verts';
import Briefs from '../../AllPage/MenFashion/Briefs';
import Trunks from '../../AllPage/MenFashion/Trunks';
import Boxers from '../../AllPage/MenFashion/Boxers';
import SportsShoes from '../../AllPage/MenFashion/SportsShoes';
import FormallShoes from '../../AllPage/MenFashion/FormallShoes';
import Watches from '../../AllPage/MenFashion/Watches';
import BagsLuggage from '../../AllPage/MenFashion/BagsLuggage';
import Sunglasses from '../../AllPage/MenFashion/Sunglasses';
import Wallets from '../../AllPage/MenFashion/Wallets';
import Belts from '../../AllPage/MenFashion/Belts';
import Condoms from '../../AllPage/MenFashion/Condoms';
import DelaySprays from '../../AllPage/MenFashion/DelaySprays';  
import MassageOils from '../../AllPage/MenFashion/MassageOils';
import MenTrackpants from '../../AllPage/MenFashion/MenTrackpants';
import MenPartywearshoes from '../../AllPage/MenFashion/MenPartywearshoes';
import NightShorts from '../../AllPage/MenFashion/NightShorts';
import MenPyjamas from '../../AllPage/MenFashion/MenPyjamas'
import Caps from '../../AllPage/MenFashion/Caps'
import Jewellery from '../../AllPage/MenFashion/Jewellery'
import Facewash from '../../AllPage/MenFashion/Facewash'
import Perfume from '../../AllPage/MenFashion/Perfume'
import PersonalLubricants from '../../AllPage/MenFashion/PersonalLubricants'
import PartyWear from '../../AllPage/MenFashion/PartyWear'

const MenRouter = () => {
    return (
        <div>
            <Routes>
                <Route path="Shirt" element={<Shirt />} />
                <Route path="T-Shirt" element={<TShirt />} />
                <Route path="Jacket & Coat" element={<JacketCoat />} />
                <Route path="Kurta" element={<Kurta />} />

                <Route path="Jeans" element={<Jeans />} />
                <Route path="Cargos" element={<Cargos />} />
                <Route path="MenTrackpants" element={<MenTrackpants />} />

                <Route path="Verts" element={<Verts />} />
                <Route path="Briefs" element={<Briefs />} />
                <Route path="Trunks" element={<Trunks />} />
                <Route path="Boxers" element={<Boxers />} />

                <Route path="MenPartywearshoes" element={<MenPartywearshoes />} />
                <Route path="Sports Shoes" element={<SportsShoes />} />
                <Route path="Formall Shoes" element={<FormallShoes />} />
                <Route path="Party Wear" element={<PartyWear />} />

                <Route path="NightShorts" element={<NightShorts />} />
                <Route path="MenPyjamas" element={<MenPyjamas />} />

                  <Route path="Condoms" element={<Condoms />} />
                <Route path="Personal Lubricants" element={<PersonalLubricants />} /> 
                 <Route path="Delay Sprays" element={<DelaySprays />} />
                <Route path="Massage Oils" element={<MassageOils />} />

                <Route path="Watches" element={<Watches />} />
                <Route path="Bags & Luggage" element={<BagsLuggage />} />
                <Route path="Sunglasses" element={<Sunglasses />} />
                <Route path="Wallets" element={<Wallets />} />
                <Route path="Belts" element={<Belts />} />
                <Route path="Caps" element={<Caps />} />
                <Route path="Jewellery" element={<Jewellery/>} />
                <Route path="Perfume" element={<Perfume />} />
                <Route path="Facewash" element={<Facewash />} />
            </Routes>
        </div>
    )
}

export default MenRouter;