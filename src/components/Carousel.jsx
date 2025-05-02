// components/Carousel.js
import { useState } from 'react';
import Image from 'next/image';

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Arreglo de imágenes
  const images = [
    "/img/banner-home-ica-erdi-768x320.webp",
    "/img/banner-home-chilca-avv-768x320.webp",
    "/img/banner-home-piura-si-768x320.webp",
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div className="relative w-full overflow-hidden  shadow-lg">
      {/* Contenedor de la imagen */}
      <div className="w-full aspect-w-16 aspect-h-9 relative">
        <Image
          src={images[currentIndex]}
          alt={`Propiedad ${currentIndex + 1}`}
          className="w-full h-full object-cover transition-transform duration-500 ease-in-out"
          width={1500}
          height={500}  // Este valor se puede mantener o ajustar, el aspecto se calcula automáticamente
          quality={100}
          priority={true}
        />
      </div>

      {/* Botones de navegación */}
      <div className="absolute inset-0 flex justify-between items-center px-4">
        <button
          onClick={prevSlide}
          className="bg-primary text-2xl bg-opacity-50 text-white py-3 px-5 rounded-full shadow-lg hover:bg-opacity-70 focus:outline-none"
        >
          &#8249;
        </button>
        <button
          onClick={nextSlide}
          className="bg-primary text-2xl bg-opacity-50 text-white py-3 px-5  rounded-full shadow-lg hover:bg-opacity-70 focus:outline-none"
        >
          &#8250;
        </button>
      </div>

      {/* Puntos de navegación */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${index === currentIndex ? "bg-white" : "bg-gray-500"
              }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
