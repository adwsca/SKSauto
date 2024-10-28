"use client"

import { useEffect, useState } from "react"
import { IoIosArrowUp } from "react-icons/io";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      // Calculer la hauteur totale de la page
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      // Vérifier si l'utilisateur a défilé plus de 50% de la page
      const isHalfwayDown = window.scrollY > totalHeight / 2
      setIsVisible(isHalfwayDown)
    }
    // Écouter les événements de défilement
    window.addEventListener("scroll", toggleVisibility)

    // Nettoyer l'écouteur lors du démontage du composant
    return () => {
      window.removeEventListener("scroll", toggleVisibility)
    }
  }, [])

  // Gère l'animation lors du défilement vers le haut
  const scrollToTop = () => {
    isVisible &&
      window.scrollTo({
        top: 0,
        behavior: "auto",
      })
  }

  return (
    <button
      className={`fixed bottom-10 right-12 rounded-[10px] text-xl p-4 outline-none bg-dark-3/20 transition-all duration-200 hover:bg-primary ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      onClick={scrollToTop}
    >
      <IoIosArrowUp />
    </button>
  )
}

export default ScrollToTopButton