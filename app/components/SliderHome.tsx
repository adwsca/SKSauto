"use client";
import { motion } from "framer-motion";
import React from "react";
import { ImagesSlider } from "./ui/images-slider";
import { usePathname, useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';

export const SliderHome = () => {

  const images = [
    "/images/slider/slider-1.jpg",
    "/images/slider/slider-2.jpg",
    "/images/slider/slider-3.jpg",
  ];

  const t = useTranslations('slider'); // Use the 'navbar' namespace for translations
  const getLocalizedPath = (path: string) => `/${currentLocale}${path}`;
	const pathname = usePathname();
	const currentLocale = useLocale();

  return ( <>
    <section className="mx-auto bg-white">
      <ImagesSlider className="h-[40rem] relative w-full mx-auto" images={images}>
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.9,
          }}
          className="z-50 flex flex-col justify-center items-start absolute inset-0 p-6 lg:p-12"
        >
            <div className="container">
          
          <motion.h1 className="font-bold text-5xl md:text-6xl text-white mb-5">
            <span className="text-primary">{t("span")}</span><br/>{t("titleL1")}<br/> {t("titleL2")}
          </motion.h1>
          <motion.p className="font-light text-lg md:text-2xl text-white max-w-[700px] mb-8">
            {t("content")}
          </motion.p>
          <Link href={getLocalizedPath('/contact')} passHref>
            <button className="inline-flex px-6 py-3 items-center justify-center rounded-lg bg-primary hover:bg-secondary text-[15px] font-semibold text-white transition-all duration-200 ease-in-out">
              {t("button")}
              <svg
                className="ml-2 h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.75 6.75L19.25 12L13.75 17.25"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M19 12H4.75"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </Link>
          </div>
        </motion.div>
      </ImagesSlider>
    </section>
    </>
  );
}
