import { Routes, Route } from "react-router-dom";
import Vivo from '../../AllPage/Electronics/Vivo'
import Iphone from '../../AllPage/Electronics/Iphone'
import Oppo from '../../AllPage/Electronics/Oppo'
import Redmi from '../../AllPage/Electronics/Redmi'
import Samsumg from '../../AllPage/Electronics/Samsumg'
import OnePlus from '../../AllPage/Electronics/OnePlus'
import Realme from '../../AllPage/Electronics/Realme'
import Nokia from '../../AllPage/Electronics/Nokia'
import Motorola from '../../AllPage/Electronics/Motorola'
import MicroMax from './MicroMax'
import Hp from '../../AllPage/Electronics/Hp'
import Dell from '../../AllPage/Electronics/Dell'
import Lenovo from '../../AllPage/Electronics/Lenovo'
import Asus from '../../AllPage/Electronics/Asus'
import LeptopSamSumg from '../../AllPage/Electronics/LeptopSamSumg'
import Apple from '../../AllPage/Electronics/Apple'
import Victus from '../../AllPage/Electronics/Victus'
import AppleWatch from '../../AllPage/Electronics/AppleWatch'
import FireBoltt from '../../AllPage/Electronics/FireBoltt'
import Noice from '../../AllPage/Electronics/Noice'
import Fastrack from '../../AllPage/Electronics/Fastrack'
import AirpodBluetooth from '../../AllPage/Electronics/AirpodBluetooth'
import WiredHeadPhone from '../../AllPage/Electronics/WiredHeadPhone'
import NeckbandBluetooth from '../../AllPage/Electronics/NeckbandBluetooth'
import NewSelfieStick from '../../AllPage/Electronics/NewSelfieStick'
import MobileChargers from '../../AllPage/Electronics/MobileChargers'
import TrendyCooling from '../../AllPage/Electronics/TrendyCooling'
import CableConnection from '../../AllPage/Electronics/CableConnection'
import MobileHolder from '../../AllPage/Electronics/MobileHolder'
import LeptopChargers from '../../AllPage/Electronics/LeptopChargers'
import Refrigrater from '../../AllPage/Electronics/Refrigrater'
import WashingMachine from '../../AllPage/Electronics/WashingMachine'
import Irons from '../../AllPage/Electronics/Irons'
import MiniFans from '../../AllPage/Electronics/MiniFans'
import TubeLight from '../../AllPage/Electronics/TubeLight'
import FlourMill from '../../AllPage/Electronics/FlourMill'
import JuiceMachine from '../../AllPage/Electronics/JuiceMachine'
import Blendes from '../../AllPage/Electronics/Blendes'
import ElectricGas from '../../AllPage/Electronics/ElectricGas'
import Geyser from '../../AllPage/Electronics/Geyser'

const ElectronicsRouter = () => {
  return (
    <div>
      <Routes>
        <Route path="Vivo" element={<Vivo />} />
        <Route path="Iphone" element={<Iphone />} />
        <Route path="Oppo" element={<Oppo />} />
        <Route path="Redmi" element={<Redmi />} />
        <Route path="Samsumg" element={<Samsumg />} />
        <Route path="OnePlus" element={<OnePlus />} />
        <Route path="Realme" element={<Realme />} />
        <Route path="Nokia" element={<Nokia />} />
        <Route path="Motorola" element={<Motorola />} />
        <Route path="MicroMax" element={<MicroMax />} />

        <Route path="HP" element={<Hp />} />
        <Route path="Dell" element={<Dell />} />
        <Route path="Lenovo" element={<Lenovo />} />
        <Route path="Asus" element={<Asus />} />
        <Route path="Leptop Samsumg" element={<LeptopSamSumg />} />
        <Route path="Apple" element={<Apple />} />
        <Route path="Victus" element={<Victus />} />

        <Route path="Apple Watch" element={<AppleWatch />} />
        <Route path="Fire-Boltt" element={<FireBoltt />} />
        <Route path="Noice" element={<Noice />} />
        <Route path="Fastrack" element={<Fastrack />} />

        <Route path="Airpod Bluetooth" element={<AirpodBluetooth />} />
        <Route path="Wired HeadPhone" element={<WiredHeadPhone />} />
        <Route path="Neckband Bluetooth" element={<NeckbandBluetooth />} />
        <Route path="New Selfie Stick" element={<NewSelfieStick />} />
        <Route path="Mobile Chargers" element={<MobileChargers />} />
        <Route path="Trendy Cooling" element={<TrendyCooling />} />
        <Route path="Cable Connection" element={<CableConnection />} />
        <Route path="Mobile Holder" element={<MobileHolder />} />
        <Route path="Leptop Chargers" element={<LeptopChargers />} />

        <Route path="Refrigrater" element={<Refrigrater />} />
        <Route path="Washing Machine" element={<WashingMachine />} />
        <Route path="Irons" element={<Irons />} />
        <Route path="Mini Fans" element={<MiniFans />} />
        <Route path="Tube-Light" element={<TubeLight />} />
        <Route path="Flour Mill" element={<FlourMill />} />
        <Route path="Juice Machine" element={<JuiceMachine />} />
        <Route path="Blendes" element={<Blendes />} />
        <Route path="Electric Gas" element={<ElectricGas />} />
        <Route path="Geyser" element={<Geyser />} />
      </Routes>
    </div>
  )
}

export default ElectronicsRouter
