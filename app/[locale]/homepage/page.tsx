'use client'

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Hero from '../../components/hero';
import WhyChooseUs from '../../components/whyChooseUs';
import LookingForVehicle from '../../components/lookingForVehicle';
import TheMostRecentsVehicles from '../../components/theMostRecentsVehicles';
import SellAndLooking from '../../components/SellAndLooking';
import BrowseByType from '../../components/BrowseByType';
import ExplorePremiumBrands from '../../components/ExplorePremiumBrands';
import CustomersSay from '../../components/CustomersSay';
import ContactSection from '../../components/contact';

const navigation = [
  { name: 'Product', href: '#' },
  { name: 'Features', href: '#' },
  { name: 'Marketplace', href: '#' },
  { name: 'Company', href: '#' },
];

export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = useTranslations('example'); // 'example' is the namespace for the translations

  return (
	  <>

	  </>
  );
}
