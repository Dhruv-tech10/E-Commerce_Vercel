
import { Routes, Route } from "react-router-dom";
import Lipstick from '../../AllPage/BeautyCare/Lipstick'
import Brushes from '../../AllPage/BeautyCare/Brushes'
import FaceWash from '../../AllPage/BeautyCare/FaceWash'
import HairOil from '../../AllPage/BeautyCare/HairOil'
import Soap from '../../AllPage/BeautyCare/Soap'
import EyeShadow from '../../AllPage/BeautyCare/EyeShadow'
import FaceMakup from '../../AllPage/BeautyCare/FaceMakup'
import Nailpolish from '../../AllPage/BeautyCare/Nailpolish'
import HairRemover from '../../AllPage/BeautyCare/HairRemover'
import Foundation from '../../AllPage/BeautyCare/Foundation' 
import Cream from '../../AllPage/BeautyCare/Cream'
import Vaseline from '../../AllPage/BeautyCare/Vaseline'
import Shampooconditioner from '../../AllPage/BeautyCare/Shampooconditioner'
import HairSerum from '../../AllPage/BeautyCare/HairSerum'
import BodyLotion from '../../AllPage/BeautyCare/BodyLotion'
import WhiteningCreams from '../../AllPage/BeautyCare/WhiteningCreams'
import FaceOil from '../../AllPage/BeautyCare/FaceOil'
import EarCleaner from '../../AllPage/BeautyCare/EarCleaner'
import FootCare from '../../AllPage/BeautyCare/FootCare'
import OralCare from '../../AllPage/BeautyCare/OralCare'
import MonitorMassagers from '../../AllPage/BeautyCare/MonitorMassagers'
import WinterHealthcare from '../../AllPage/BeautyCare/WinterHealthcare'
const BeautyRouter = () => {
  return (
    <div>
      <Routes>
        <Route path="Lipstick" element={<Lipstick />} />
        <Route path="Eye Shadow" element={<EyeShadow />} />
        <Route path="Face Makup" element={<FaceMakup />} />
        <Route path="Nailpolish" element={<Nailpolish />} />
        <Route path="Brushes" element={<Brushes />} />
        <Route path="Hair Remover" element={<HairRemover />} />
        <Route path="Foundation" element={<Foundation />} />
        <Route path="Cream" element={<Cream />} />

        <Route path="Face Wash" element={<FaceWash />} />
        <Route path="Vaseline" element={<Vaseline />} />

        <Route path="Shampoo & conditioner" element={<Shampooconditioner />} />
        <Route path="Hair Oil" element={<HairOil />} />
        <Route path="Hair Serum" element={<HairSerum />} />

        <Route path="Body Lotion" element={<BodyLotion />} />
        <Route path="Whitening Creams" element={<WhiteningCreams />} />
        <Route path="Soap" element={<Soap />} />
        <Route path="Face Oil" element={<FaceOil />} />

        <Route path="Ear Cleaner" element={<EarCleaner />} />
        <Route path="Foot Care" element={<FootCare/>} />
        <Route path="Oral Care" element={<OralCare />} />
        <Route path="Monitor & Massagers" element={<MonitorMassagers/>} />
        <Route path="Winter Healthcare" element={<WinterHealthcare />} />

      </Routes>
    </div>
  )
}

export default BeautyRouter
