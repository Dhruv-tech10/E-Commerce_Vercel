import { Routes, Route } from "react-router-dom";
import Boys from '../../AllPage/KidsToys/Boys'
import Girls from '../../AllPage/KidsToys/Girls'
import Babies from '../../AllPage/KidsToys/Babies'
import Soap from '../../AllPage/KidsToys/Soap'
import Powder from '../../AllPage/KidsToys/Powder'
import Shampoo from '../../AllPage/KidsToys/Shampoo'
import Oil from '../../AllPage/KidsToys/Oil'
import Diaper from '../../AllPage/KidsToys/Diaper'
import Watches from '../../AllPage/KidsToys/Watches' 
import BagsBackpats from '../../AllPage/KidsToys/BagsBackpats'
import Puzzle from '../../AllPage/KidsToys/Puzzle'
import ToysGames from '../../AllPage/KidsToys/ToysGames'
import TickTak from '../../AllPage/KidsToys/TickTak'
import Ring from '../../AllPage/KidsToys/Ring'
import RemoteControlhelecopers from '../../AllPage/KidsToys/RemoteControlhelecopers'
import SummerPicks from '../../AllPage/KidsToys/SummerPicks'
import Gears from '../../AllPage/KidsToys/Gears'
import Cricket from '../../AllPage/KidsToys/Cricket'
import NewbornCare from '../../AllPage/KidsToys/NewbornCare' 
import Mosquitonets from '../../AllPage/KidsToys/Mosquitonets' 
import DrySheets from '../../AllPage/KidsToys/DrySheets'
import Bedding from '../../AllPage/KidsToys/Bedding'
import ForksDresses from '../../AllPage/KidsToys/ForksDresses'
import TShirtPolos from '../../AllPage/KidsToys/TShirtPolos'
import Shoes from '../../AllPage/KidsToys/Shoes'
import Goggles from '../../AllPage/KidsToys/Goggles'
import BabyBlankets from '../../AllPage/KidsToys/BabyBlankets'
const KidsRouter = () => {
  return (
    <div>
      <Routes>
              <Route path="Boys" element={<Boys/>} />
              <Route path="Girls" element={<Girls/>} />
              <Route path="Babies" element={<Babies/>} />
              <Route path="Forks & Dresses" element={<ForksDresses/>} />
              <Route path="T-Shirt & Polos" element={<TShirtPolos/>} />

              <Route path="Soap" element={<Soap/>} />
              <Route path="Powder" element={<Powder/>} />
              <Route path="Shampoo" element={<Shampoo/>} />
              <Route path="Oil" element={<Oil/>} />
              <Route path="Diaper" element={<Diaper/>} />

              <Route path="Watches" element={<Watches/>} />
              <Route path="Shoes" element={<Shoes/>} />
              <Route path="Bags & Back pats" element={<BagsBackpats/>} />
              <Route path="Goggles" element={<Goggles/>} />
              <Route path="Baby Blankets" element={<BabyBlankets/>} />

               <Route path="Puzzle" element={<Puzzle/>} />
              <Route path="Toys & Games" element={<ToysGames/>} />
              <Route path="Tick-Tak" element={<TickTak/>} />
              <Route path="Ring" element={<Ring/>} />
              <Route path="Remote Control helecopers" element={<RemoteControlhelecopers/>} />
               <Route path="Summer Picks" element={<SummerPicks/>} />
              <Route path="Gears" element={<Gears/>} />
              <Route path="Cricket" element={<Cricket/>} />

              <Route path="Newborn Care" element={<NewbornCare/>} />
              <Route path="Mosquito nets" element={<Mosquitonets />} />
              <Route path="Dry Sheets" element={<DrySheets/>} />
              <Route path="Bedding" element={<Bedding/>} />
            </Routes>
    </div>
  )
}

export default KidsRouter
