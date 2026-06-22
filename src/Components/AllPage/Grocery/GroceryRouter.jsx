import { Routes, Route } from "react-router-dom";
import ChipsNamkeen from '../../AllPage/Grocery/ChipsNamkeen'
import BiscuitsCookies from '../../AllPage/Grocery/BiscuitsCookies'
import ChocolatesCandies from '../../AllPage/Grocery/ChocolatesCandies'
import FoodDrinks from '../../AllPage/Grocery/FoodDrinks'
import Tea from '../../AllPage/Grocery/Tea'
import Coffee from '../../AllPage/Grocery/Coffee'
import Maggi from '../../AllPage/Grocery/Maggi'
import Noodles from '../../AllPage/Grocery/Noodles'
import IceCreamPowder from '../../AllPage/Grocery/IceCreamPowder'
import DryFruits from '../../AllPage/Grocery/DryFruits'
import Honey from '../../AllPage/Grocery/Honey'
import Pickles from '../../AllPage/Grocery/Pickles'
import Sauces from '../../AllPage/Grocery/Sauces'
import MasalaSpices from '../../AllPage/Grocery/MasalaSpices'
import Rice from '../../AllPage/Grocery/Rice'
import WheatFlour from '../../AllPage/Grocery/WheatFlour'
import PulsesDal from '../../AllPage/Grocery/PulsesDal'
import SugarJaggery from '../../AllPage/Grocery/SugarJaggery'
import SaltSpices from '../../AllPage/Grocery/SaltSpices'
import DogFood from '../../AllPage/Grocery/DogFood'
import CatFood from '../../AllPage/Grocery/CatFood'
import PetTreats from '../../AllPage/Grocery/PetTreats'
import PetGrooming from '../../AllPage/Grocery/PetGrooming'
const GroceryRouter = () => {
    return (
        <div>
            <Routes>
                <Route path="Rice" element={<Rice />} />
                <Route path="Wheat Flour" element={<WheatFlour />} />
                <Route path="Pulses & Dal" element={<PulsesDal />} />
                <Route path="Sugar & Jaggery" element={<SugarJaggery />} />
                <Route path="Salt & Spices" element={<SaltSpices />} />

                <Route path="Chips & Namkeen" element={<ChipsNamkeen />} />
                <Route path="Biscuits & Cookies" element={<BiscuitsCookies />} />
                <Route path="Chocolates & Candies" element={<ChocolatesCandies />} />
                <Route path="Food Drinks" element={<FoodDrinks />} />
                <Route path="Tea" element={<Tea />} />
                <Route path="Coffee" element={<Coffee />} />

                <Route path="Maggi" element={<Maggi />} />
                <Route path="Noodles" element={<Noodles />} />
                <Route path="MasalaSpices" element={<MasalaSpices />} />
                <Route path="Ice Cream Powder" element={<IceCreamPowder />} />
                <Route path="Chips" element={<ChipsNamkeen />} />
                <Route path="Sauces" element={<Sauces />} />

                <Route path="Dry Fruits" element={<DryFruits />} />
                <Route path="Honey" element={<Honey />} />
                <Route path="Pickles" element={<Pickles />} />

                <Route path="Dog Food" element={<DogFood />} />
                <Route path="Cat Food" element={<CatFood />} />
                <Route path="Pet Treats" element={<PetTreats />} />
                <Route path="Pet Grooming" element={<PetGrooming />} />
            </Routes>
        </div>
    );
}

export default GroceryRouter
