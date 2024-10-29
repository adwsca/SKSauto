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
import HomeSearchBar from "../components/HomeSearchBar";
import HelloCompany from "../components/HelloCompany";
import HeroVideoSlider from '../components/HeroVideoSlider';

export default function Home() {
  return (
    <>
      <HomeSearchBar />
      <HeroVideoSlider />
      <HelloCompany />
      <HomeCards />
      <HowWork />
      <BrowseByType/>
      <ReadyToSeize />
      <ExplorePremiumBrands/>
      <ContactSection/>
    </>
  );
}
