import React, { useCallback, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightCircle, Calendar, Clock } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Particles from "react-tsparticles";
import type { Container, Engine } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim"; // loads tsparticles-slim

const HomePage: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [aspectRatio, setAspectRatio] = useState(9 / 16);

  // Placeholder images
  const images = [
    '/image.jpg',
    '/image2.jpg',
    '/image3.jpg',
    '/image4.jpg',
  ];

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []); // Empty dependency array means this effect runs once on mount and cleanup on unmount

  // Effect for image swapping
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, [images.length]);

  // Effect to calculate aspect ratio of the current image
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      // Calculate and set aspect ratio (height / width)
      setAspectRatio(img.naturalHeight / img.naturalWidth);
    };
    img.onerror = () => {
      // Fallback or default aspect ratio if image fails to load
      setAspectRatio(9 / 16); // Reset to default
    };
    img.src = images[currentImageIndex];

    // Optional: Cleanup function if needed, though usually not for Image objects
    // return () => { img.onload = null; img.onerror = null; }

  }, [currentImageIndex, images]);

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container: Container | undefined) => {
    // Optional: console.log(container);
  }, []);

  const particleOptions = {
    background: {
      color: {
        value: 'transparent',
      },
    },
    fpsLimit: 60,
    particles: {
      color: {
        value: "#a3e635", // Brighter lime-300 color
      },
      move: {
        direction: "none" as const,
        enable: true,
        outModes: {
          default: "out" as const,
        },
        random: true,
        speed: 0.4, // Slightly increased speed for visibility
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 900, // Increase area slightly to reduce density
        },
        value: 60, // Increased number of particles
      },
      opacity: {
        value: {
          min: 0.3, // Slightly higher minimum opacity
          max: 0.8
        },
        animation: {
          enable: true,
          speed: 0.6,
          sync: false
        }
      },
      shape: {
        type: "circle" as const,
      },
      size: {
        value: { min: 2, max: 5 },
      },
    },
    detectRetina: true,
  };

  return (
    <div className="min-h-screen flex flex-col  relative isolate overflow-hidden">
      {/* Mouse Follow Glow */}
      <div
        className="pointer-events-none fixed inset-0 z-[-5] transition duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(163, 230, 53, 0.15), transparent 70%)`,
        }}
      ></div>

      {/* Particles Background - z-index adjusted */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={particleOptions as any}
        className="absolute inset-0 -z-10" // Keep particles behind the glow
      />

      <Header />

      <p className="text-gray-700 text-lg text-center mt-10">This is the official website of Saiban-e-Zahra. Here, you will find all the latest event details and everything related to upcoming future events.</p>

      <main className="flex-grow z-10 flex items-center justify-center">
        {/* Hero Section with Clickable Cards */}
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="flex flex-wrap gap-8 justify-center items-stretch">
            {/* Exam Portal Card */}
            <Link
              to="/dashboard"
              className="group block max-w-sm w-full bg-white rounded-xl shadow-xl overflow-hidden border border-lime-200 transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-2 flex flex-col"
            >
              <div className="p-8 md:p-10 flex flex-col items-center flex-grow">
                <div className="w-20 h-20 bg-lime-100 text-lime-600 rounded-full flex items-center justify-center mx-auto mb-6 ring-4 ring-lime-50 shrink-0">
                  <ArrowRightCircle className="h-10 w-10 transition-transform duration-300 group-hover:rotate-[-15deg]" />
                </div>
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-3">
                  Exam Info & Portal
                </h2>
                <p className="text-gray-600 mb-6 text-center text-md flex-grow">
                  Click here to access the exam portal, check attendance, and view results.
                </p>
                <span className="mt-auto inline-block py-2 px-6 bg-lime-600 text-white rounded-full text-center font-medium transition duration-300 group-hover:bg-lime-700">
                  Proceed to Dashboard
                </span>
              </div>
            </Link>

            {/* Muharrum Information Card */}
            <div className="group block max-w-sm w-full bg-white rounded-xl shadow-xl overflow-hidden border border-lime-200 transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-2 flex flex-col">
              <div className="p-8 md:p-10 flex flex-col items-center flex-grow">
                <div className="w-20 h-20 bg-lime-100 text-lime-600 rounded-full flex items-center justify-center mx-auto mb-6 ring-4 ring-lime-50 shrink-0">
                  <Calendar className="h-10 w-10 transition-transform duration-300 group-hover:rotate-[-15deg]" />
                </div>
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-3">
                  Muharrum Information
                </h2>
                <p className="text-gray-600 mb-6 text-center text-md flex-grow">
                  Access information about Muharrum events, schedules, and resources.
                </p>
                <span className="mt-auto inline-block py-2 px-6 bg-gray-400 text-white rounded-full text-center font-medium cursor-not-allowed">
                  Coming Soon
                </span>
              </div>
            </div>

            {/* New Coming Soon Card */}
            <div className="group block max-w-sm w-full bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-2 flex flex-col">
              <div className="p-8 md:p-10 flex flex-col items-center flex-grow">
                <div className="w-20 h-20 bg-gray-100 text-gray-500 rounded-full flex items-center justify-center mx-auto mb-6 ring-4 ring-gray-50 shrink-0">
                  <Clock className="h-10 w-10 transition-transform duration-300 group-hover:rotate-[-15deg]" />
                </div>
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-3">
                  Recent Umrah Tour 2024
                </h2>
                <p className="text-gray-600 mb-6 text-center text-md flex-grow">
                  Saiban e zahra Group, Umrah tour 2024 Highlights
                </p>
                <span className="mt-auto inline-block py-2 px-6 bg-gray-400 text-white rounded-full text-center font-medium cursor-not-allowed">
                  Coming Soon
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Image Swapping Section */}
      <div className="container mx-auto px-4 py-12">
        {/* Responsive container using padding-bottom for aspect ratio */}
        {/* Removed fixed height classes, added style for paddingBottom */}
        <div
          className="relative w-full md:w-[40%] md:mx-auto overflow-hidden rounded-lg shadow-lg bg-gray-100"
          style={{ paddingBottom: `${aspectRatio * 100}%` }}
        >
          {images.map((src, index) => (
            <img
              key={src} // Use src as key assuming they are unique
              src={src}
              alt={`Highlight ${index + 1}`}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                }`}
            />
          ))}
        </div>
      </div>

      {/* <Footer /> */}
    </div>
  );
};

export default HomePage;