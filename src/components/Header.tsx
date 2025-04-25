import React from 'react';
import { Home } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  showHomeLink?: boolean;
}

const Header: React.FC<HeaderProps> = ({ showHomeLink = false }) => {
  return (
    <header className="relative overflow-hidden">
      {/* Decorative pattern */}
      <div className="absolute inset-0 bg-[url('https://i.imgur.com/IkgHXEo.jpeg')] bg-cover bg-center bg-no-repeat opacity-50" style={{ backgroundPosition: 'center calc(30%)' }}></div>
      <div className="absolute inset-0 bg-black/10"></div>

      {/* Increased vertical padding: py-12 */}
      <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center min-h-[300px] md:min-h-[400px] py-12 md:py-20">
        {/* Centered the main title and adjusted flex for layout */}
        <div className="flex flex-col items-center w-full max-w-3xl z-10">
          {/* Title Block - Centered */}
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold text-lime-900 text-shadow-md">
              Welcome to
              Saiban E Zahra
              <br />
              Official Website
            </h1>
          </div>

          {/* Bottom Row: Countdown Timer and Links */}
          <div className="flex items-center justify-center gap-4 mt-4">
            <Link
              to="/contact"
              className="inline-flex items-center px-6 py-3 bg-white/90 border border-lime-200 text-lime-700 rounded-full text-sm font-semibold hover:bg-white transition duration-300 whitespace-nowrap shadow-md hover:shadow-lg"
            >
              Contact Us
            </Link>

            {showHomeLink && (
              <Link
                to="/"
                className="p-3 rounded-full bg-white/90 border border-lime-200 text-lime-700 hover:bg-white transition-colors flex items-center justify-center w-12 h-12 shrink-0 shadow-md hover:shadow-lg"
                aria-label="Back to Home"
              >
                <Home size={20} />
              </Link>
            )}
          </div>
          <div className="flex flex-col items-center mt-4">
            <p className="text-center text-black text-1xl font-bold">
              Imam Bargah Location - Multan, Sabzazar Colony Pta Office Street House no 114
            </p>
          </div>
        </div>
      </div>

    </header>
  );
};

export default Header;