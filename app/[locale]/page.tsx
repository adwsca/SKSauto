import Image from "next/image";
import Hero from '../components/hero';
import WhyChooseUs from '../components/whyChooseUs';
import LookingForVehicle from '../components/lookingForVehicle';
import TheMostRecentsVehicles from '../components/theMostRecentsVehicles';
import SellAndLooking from '../components/SellAndLooking';
import BrowseByType from '../components/BrowseByType';
import ExplorePremiumBrands from '../components/ExplorePremiumBrands';
import CustomersSay from '../components/CustomersSay';
import ContactSection from '../components/contact';
import HomeCards from "../components/Homecards";
import HowWork from "../components/HowWork";
import ReadyToSeize from "../components/ReadyToSeize";
import { SliderHome } from "../components/SliderHome";

export default function Home() {
  return (
    <>
      <SliderHome />
      <HomeCards />
      <HowWork />
      <BrowseByType/>
      <ReadyToSeize />
      <TheMostRecentsVehicles/>
      <ExplorePremiumBrands/>
      <ContactSection/>
    </>
  );
}
