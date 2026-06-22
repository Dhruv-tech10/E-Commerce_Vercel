import { Routes, Route } from "react-router-dom";
import Sherwani from '../../AllPage/WeddingHub/Sherwani'
import Necklace from '../../AllPage/WeddingHub/Necklace'
import Mojdi from '../../AllPage/WeddingHub/Mojdi'
import Safa from '../../AllPage/WeddingHub/Safa'
import KurtaSet from '../../AllPage/WeddingHub/KurtaSet'
import HandBag from '../../AllPage/WeddingHub/HandBag'
import ChaniyaCholi from '../../AllPage/WeddingHub/ChaniyaCholi'
import PatolaSadi from '../../AllPage/WeddingHub/PatolaSadi'
import MerriageSandal from '../../AllPage/WeddingHub/MerriageSandal'
import HighHills from '../../AllPage/WeddingHub/HighHills'
import NecklaceSets from '../../AllPage/WeddingHub/NecklaceSets'
import Payal from '../../AllPage/WeddingHub/Payal'
import Rings from '../../AllPage/WeddingHub/Rings'
import MerriageChura from '../../AllPage/WeddingHub/MerriageChura'
import Earrings from '../../AllPage/WeddingHub/Earrings'
import KundanCollection from '../../AllPage/WeddingHub/KundanCollection'
const WeddingRouter = () => {
  return (
    <div>
      <Routes>
        <Route path="Sherwani" element={<Sherwani />} />
        <Route path="Necklace" element={<Necklace />} />
        <Route path="Mojdi" element={<Mojdi />} />
        <Route path="Safa" element={<Safa />} />
        <Route path="Kurta Set" element={<KurtaSet />} />

        <Route path="Hand Bag" element={<HandBag />} />
        <Route path="Chaniya Choli" element={<ChaniyaCholi />} />
        <Route path="Patola Sadi" element={<PatolaSadi />} />
        <Route path="Merriage Sandal" element={<MerriageSandal />} />
        <Route path="High Hills" element={<HighHills />} />

        <Route path="Necklace Sets" element={<NecklaceSets />} />
        <Route path="Payal" element={<Payal />} />
        <Route path="Rings" element={<Rings />} />
        <Route path="Merriage Chura" element={<MerriageChura />} />
        <Route path="Earrings" element={<Earrings />} />
        <Route path="Kundan Collection" element={<KundanCollection />} />

      </Routes>
    </div>
  )
}

export default WeddingRouter
