import { Routes, Route } from "react-router-dom";
import Cover from '../../AllPage/HomeKitchen/Cover';
import KeyHolders from '../../AllPage/HomeKitchen/KeyHolders';
import ArtificialFlowers from '../../AllPage/HomeKitchen/ArtificialFlowers';
import PoojaNeeds from '../../AllPage/HomeKitchen/PoojaNeeds';
import PartySupplies from '../../AllPage/HomeKitchen/PartySupplies';
import WallpapersStickers from '../../AllPage/HomeKitchen/WallpapersStickers';
import ClocksWallDecor from '../../AllPage/HomeKitchen/ClocksWallClocks';
import ShowpiecesIdols from '../../AllPage/HomeKitchen/ShowpiecesIdols';
import KitchenLinen from '../../AllPage/HomeKitchen/KitchenLinen';
import Cookware from '../../AllPage/HomeKitchen/Cookware';
import KitchenTools from '../../AllPage/HomeKitchen/KitchenTools';
import Dinnerware from '../../AllPage/HomeKitchen/Dinnerware';
import KitchenAppliances from '../../AllPage/HomeKitchen/KitchenAppliances';
import GlassesBarware from '../../AllPage/HomeKitchen/GlassesBarware';
import StudyTable from '../../AllPage/HomeKitchen/StudyTable';
import HammocSwing from '../../AllPage/HomeKitchen/HammocSwing';
import BoxesBaskets from '../../AllPage/HomeKitchen/BoxesBaskets';
import StorageOrganizers from '../../AllPage/HomeKitchen/StorageOrganizers';
import BathroomAccessories from '../../AllPage/HomeKitchen/BathroomAccessories';
import CleaningSupplies from '../../AllPage/HomeKitchen/CleaningSupplies';
import CurtainAccessories from '../../AllPage/HomeKitchen/CurtainAccessories';
import BlanketsComforters from '../../AllPage/HomeKitchen/BlanketsComforters';
import CarpetsDoormats from '../../AllPage/HomeKitchen/CarpetsDoormats';
import InsectProtection from '../../AllPage/HomeKitchen/InsectProtection';
import CushionsPillow from '../../AllPage/HomeKitchen/CushionsPillow';
import Sofas from '../../AllPage/HomeKitchen/Sofas';
import Mattresses from '../../AllPage/HomeKitchen/Mattresses'
import Wardrobes from '../../AllPage/HomeKitchen/Wardrobes'
import FoodStorage from '../../AllPage/HomeKitchen/FoodStorage'
import StorageContainers from '../../AllPage/HomeKitchen/StorageContainers'
import DrawerOrganizers from '../../AllPage/HomeKitchen/DrawerOrganizers'
import WaterBottle from '../../AllPage/HomeKitchen/WaterBottle'
import HomeTextiles from '../../AllPage/HomeKitchen/HomeTextiles'
import ShopBedsheets from '../../AllPage/HomeKitchen/ShopBedsheets'
const HomeRouter = () => {
  return (
    <div>
      <Routes>
        <Route path="Cover" element={<Cover />} />
        <Route path="Key Holders" element={<KeyHolders />} />
        <Route path="Artificial Flowers" element={<ArtificialFlowers />} />
        <Route path="Pooja Needs" element={<PoojaNeeds />} />
        <Route path="Party Supplies" element={<PartySupplies />} />
        <Route path="Wallpapers & Stickers" element={<WallpapersStickers />} />
        <Route path="Clocks & Wall Clocks" element={<ClocksWallDecor />} />
        <Route path="Showpieces & Idols" element={<ShowpiecesIdols />} />

        <Route path="Kitchen Linen" element={<KitchenLinen />} />
        <Route path="Cookware" element={<Cookware />} />
        <Route path="Kitchen Tools" element={<KitchenTools />} />
        <Route path="Dinner Set" element={<Dinnerware />} />
        <Route path="Kitchen Appliances" element={<KitchenAppliances />} />
        <Route path="Glasses & Barware" element={<GlassesBarware />} />

        <Route path="Cushions & Pillow" element={<CushionsPillow />} />
        <Route path="Sofas" element={<Sofas />} />
        <Route path="Mattresses" element={<Mattresses />} />
        <Route path="Study Table" element={<StudyTable />} />
        <Route path="Hammock Swings" element={<HammocSwing />} />

        <Route path="Boxes & Baskets" element={<BoxesBaskets />} />
        <Route path="Wardrobes" element={<Wardrobes />} />
        <Route path="Storage Organizers" element={<StorageOrganizers />} />
        <Route path="Food Storage" element={<FoodStorage />} />
        <Route path="Storage Containers" element={<StorageContainers />} />
        <Route path="Drawer Organizers" element={<DrawerOrganizers />} />
        <Route path="Water Bottle" element={<WaterBottle />} />


        <Route path="Bathroom Accessiors" element={<BathroomAccessories />} />
        <Route path="Cleaning Supplies" element={<CleaningSupplies />} />
        <Route path="Curtain Accessories" element={<CurtainAccessories />} />
        <Route path="Shop Bedsheets" element={<ShopBedsheets />} />
        <Route path="Carpets & Doormats" element={<CarpetsDoormats />} />
        <Route path="Blankets & Comforters" element={<BlanketsComforters />} />
        <Route path="Insect Protection" element={<InsectProtection />} />
        <Route path="Home Textiles" element={<HomeTextiles />} />


      </Routes>
    </div>
  )
}

export default HomeRouter
