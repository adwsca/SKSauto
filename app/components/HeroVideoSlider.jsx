'use client';
import React, { useState, useRef, useEffect } from 'react';
import companyInfo from '../../companyInfo.json';
import { useTranslations } from 'next-intl';

const HeroVideoSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [nextSlide, setNextSlide] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const company = companyInfo[0]; 
  const t = useTranslations('HeroVideoSlider'); // Use the 'HeroVideoSlider' namespace for translations
  
  const slides = [
    {
      videoSrc: "https://www.pexels.com/fr-fr/download/video/5309421/",
      title: t("title1"),
      subtitle: t("subtitle1"),
      description: t("description1"),
      buttonText: t("buttonText1"),
      buttonUrl: "/financing"
    },
    {
      videoSrc: "https://www.pexels.com/fr-fr/download/video/6159292/",
      title: t("title2"),
      subtitle: t("subtitle2"),
      description: t("description2"),
      buttonText: t("buttonText2"),
      buttonUrl: "/inventory"
    },
    {
      videoSrc: "https://www.pexels.com/fr-fr/download/video/6157909/",
      title: t("title3"),
      subtitle: t("subtitle3"),
      description: t("description3"),
      buttonText: t("buttonText3"),
      buttonUrl: "/contact"
    }
  ];

  const videoRefs = useRef(slides.map(() => React.createRef()));
  
  // Fonction pour préparer la prochaine vidéo
  const prepareNextVideo = (nextIndex) => {
    const nextVideo = videoRefs.current[nextIndex].current;
    if (nextVideo) {
      nextVideo.currentTime = 0;
      nextVideo.play().catch(error => console.error("Erreur de lecture vidéo:", error));
    }
  };

  // Fonction pour la transition
  const transition = () => {
    setIsTransitioning(true);
    
    // Préparer la prochaine vidéo
    const newNextSlide = (nextSlide + 1) % slides.length;
    prepareNextVideo(nextSlide);
    
    // Effectuer la transition
    setTimeout(() => {
      setCurrentSlide(nextSlide);
      setNextSlide(newNextSlide);
      setIsTransitioning(false);
    }, 1000);
  };

  // Gestion de la lecture des vidéos
  useEffect(() => {
    const currentVideo = videoRefs.current[currentSlide].current;
    const nextVideo = videoRefs.current[nextSlide].current;

    // Configuration des vidéos
    if (currentVideo && nextVideo) {
      // Réinitialiser et lancer la vidéo actuelle
      const playCurrentVideo = async () => {
        try {
          currentVideo.currentTime = 0;
          await currentVideo.play();
          
          // Préparer la prochaine vidéo
          nextVideo.currentTime = 0;
          await nextVideo.load();
        } catch (error) {
          console.error("Erreur de lecture vidéo:", error);
        }
      };

      // Gérer la transition près de la fin de la vidéo
      const handleTimeUpdate = () => {
        const timeLeft = currentVideo.duration - currentVideo.currentTime;
        if (timeLeft <= 0.5 && !isTransitioning) { // Commencer la transition 0.5 secondes avant la fin
          transition();
        }
      };

      currentVideo.addEventListener('timeupdate', handleTimeUpdate);
      playCurrentVideo();

      // Cleanup
      return () => {
        currentVideo.removeEventListener('timeupdate', handleTimeUpdate);
      };
    }
  }, [currentSlide, nextSlide]);

  // Gestion du changement manuel de slide
  const handleSlideChange = (index) => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentSlide(index);
    setNextSlide((index + 1) % slides.length);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 1000);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden max-h-[560px]">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 
            ${currentSlide === index ? 'opacity-100 z-10' : 
              nextSlide === index ? 'opacity-0 z-5' : 'opacity-0 z-0'}`}
        >
          <video
            ref={videoRefs.current[index]}
            className="object-cover w-full h-full"
            playsInline
            muted
            loop
          >
            <source src={slide.videoSrc} type="video/mp4" />
          </video>
          
          {/* Content Overlay */}
          <div className={`absolute inset-0 bg-black/40 z-20 transition-opacity duration-1000
            ${currentSlide === index ? 'opacity-100' : 'opacity-0'}`}>
            <div className="container mx-auto px-4 h-full flex flex-col justify-center">
              <div className="max-w-3xl">
                <h2 className="font-black text-4xl md:text-5xl text-primary uppercase transform transition-all duration-1000">
                  {slide.title}
                </h2>
                <h3 className="font-bold text-4xl md:text-5xl text-white uppercase transform transition-all duration-1000">
                  {slide.subtitle}
                </h3>
                <h3 className="font-bold text-4xl md:text-5xl text-white mb-5 uppercase transform transition-all duration-1000">
                  Chez {company.companyName}
                </h3>
                <p className="text-white text-3xl mb-8 transform transition-all duration-1000">
                  {slide.description}
                </p>
                <a
                  href={slide.buttonUrl}
                  className="inline-block bg-red-600 text-white px-8 py-3 rounded-md hover:bg-red-700 transition-colors"
                >
                  {slide.buttonText}
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}
      
      {/* Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-4 z-30">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => handleSlideChange(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSlide === index
                ? 'bg-white scale-125'
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroVideoSlider;