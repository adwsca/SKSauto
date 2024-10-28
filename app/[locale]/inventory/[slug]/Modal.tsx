// app/[locale]/inventory/[slug]/Modal.tsx

import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './Modal.css'; // Import custom styles

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  currentIndex: number;
  onNext: () => void;
  onPrev: () => void;
};

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  images = [],
  currentIndex,
  onNext,
  onPrev
}) => {
  const swiperRef = useRef<any>(null);

  // Go to the specific slide
  const goToSlide = (index: number) => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideTo(index);
    }
  };

  // Watch for currentIndex changes
  React.useEffect(() => {
    goToSlide(currentIndex);
  }, [currentIndex]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <Swiper
          ref={swiperRef}
          spaceBetween={10}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          initialSlide={currentIndex}
          loop={true}
          modules={[Navigation, Pagination]}
          className="w-full h-auto mb-4"
        >
          {images.length > 0 ? (
            images.map((image, index) => (
              <SwiperSlide key={index}>
                <img
                  src={image}
                  alt={`Modal Image ${index + 1}`}
                  className="w-full h-auto object-cover object-center rounded-lg"
                />
              </SwiperSlide>
            ))
          ) : (
            <div>No images available</div>
          )}
        </Swiper>

        {/* Navigation buttons */}
        <button className="modal-prev" onClick={onPrev}>
          Prev
        </button>
        <button className="modal-next" onClick={onNext}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Modal;
