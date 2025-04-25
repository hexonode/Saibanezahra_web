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
                  Future Feature
                </h2>
                <p className="text-gray-600 mb-6 text-center text-md flex-grow">
                  More exciting features and information coming soon. Stay tuned!
                </p>
                <span className="mt-auto inline-block py-2 px-6 bg-gray-400 text-white rounded-full text-center font-medium cursor-not-allowed">
                  Coming Soon
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* <Footer /> */}
    </div>
  );
};

export default HomePage;