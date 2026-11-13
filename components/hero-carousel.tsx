"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

export interface HeroCarouselProps {
  images: Array<{
    src: string;
    alt: string;
    priority?: boolean;
  }>;
}

export function HeroCarousel({ images }: HeroCarouselProps) {
  const [active, setActive] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const activeRef = useRef(0);
  activeRef.current = active;

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setActive((p) => (p + 1) % images.length);
    }, 5000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  // images.length é estavel (array constante em page.tsx)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function restart() {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActive((p) => (p + 1) % images.length);
    }, 5000);
  }

  return (
    <div
      className="hero-carousel"
      aria-label="Carrossel de imagens"
      aria-roledescription="carrossel"
    >
      {images.map((image, i) => (
        <div
          key={image.src}
          className={`carousel-slide${i === active ? " carousel-slide--active" : ""}`}
          aria-hidden={i !== active}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 700px) 100vw, 100vw"
            priority={image.priority === true}
            style={{ objectFit: "cover" }}
          />
        </div>
      ))}

      <div className="carousel-controls">
        <button
          className="carousel-control carousel-control--prev"
          aria-label="Imagem anterior"
          onClick={() => {
            setActive((p) => (p - 1 + images.length) % images.length);
            restart();
          }}
        >
          &#8249;
        </button>
        <button
          className="carousel-control carousel-control--next"
          aria-label="Próxima imagem"
          onClick={() => {
            setActive((p) => (p + 1) % images.length);
            restart();
          }}
        >
          &#8250;
        </button>
      </div>

      <div
        className="carousel-dots"
        role="tablist"
        aria-label="Slides do carrossel"
      >
        {images.map((_, i) => (
          <button
            key={i}
            role="tab"
            className={`carousel-dot${i === active ? " carousel-dot--active" : ""}`}
            aria-current={i === active ? "true" : undefined}
            aria-label={`Ir para imagem ${i + 1} de ${images.length}`}
            aria-selected={i === active}
            onClick={() => {
              setActive(i);
              restart();
            }}
          />
        ))}
      </div>
    </div>
  );
}