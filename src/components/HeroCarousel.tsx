"use client";

import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { useEffect } from "react";

export default function HeroCarousel() {
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: { perView: 1 },
    mode: "snap",
    spacing: 10,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      instanceRef.current?.next();
    }, 2500);
    return () => clearInterval(interval);
  }, [instanceRef]);

  const images = ["/artist1.jpg", "/artist2.jpg", "/artist3.jpg"];

  return (
    <div
      ref={sliderRef}
      className="keen-slider mt-10 max-w-3xl mx-auto rounded-xl overflow-hidden shadow-lg"
    >
      {images.map((img, index) => (
        <div className="keen-slider__slide" key={index}>
          <img
            src={img}
            alt={`Artist ${index + 1}`}
            className="w-full h-64 object-cover"
          />
        </div>
      ))}
    </div>
  );
}
