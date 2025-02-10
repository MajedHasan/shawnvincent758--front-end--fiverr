"use client";
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=1500",
    title: "Break The\nMold",
    subtitle: "Redefine Everyday Style.",
    cta: "Explore Asymmetric Aesthetics Now!",
  },
  {
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1500",
    title: "Summer\nEssentials",
    subtitle: "Embrace the Season.",
    cta: "Shop Summer Collection",
  },
  {
    image:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?w=1500",
    title: "Elegant\nSimplicity",
    subtitle: "Less is More.",
    cta: "Discover Minimalist Fashion",
  },
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [currentSlide]);

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <div className="lg:col-span-6 relative group">
      <div className="relative h-full min-h-[400px] overflow-hidden rounded-lg">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="absolute w-full h-full"
          >
            <img
              src={slides[currentSlide].image}
              alt="Hero"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white/50 to-transparent">
              <div className="absolute top-1/2 left-12 -translate-y-1/2">
                <h2 className="text-5xl font-bold mb-4 whitespace-pre-line">
                  {slides[currentSlide].title}
                </h2>
                <p className="text-2xl italic mb-6">
                  {slides[currentSlide].subtitle}
                </p>
                <button className="bg-white text-black px-8 py-3 rounded-full hover:bg-gray-100 transition-colors">
                  {slides[currentSlide].cta}
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={prevSlide}
      >
        <ChevronLeft size={24} />
      </button>
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={nextSlide}
      >
        <ChevronRight size={24} />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentSlide ? "bg-white" : "bg-white/50"
            }`}
            onClick={() => {
              setDirection(index > currentSlide ? 1 : -1);
              setCurrentSlide(index);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
