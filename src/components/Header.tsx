import React from 'react';
import { Home } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  showHomeLink?: boolean;
}

const Header: React.FC<HeaderProps> = ({ showHomeLink = false }) => {
  return (
    <header className="relative">
      {/* Decorative pattern */}
      <div className="absolute inset-0 bg-[url('https://cdn.discordapp.com/attachments/1317781055532695622/1364671915310186588/2560px-Jamkaran_Mosque-3855.png?ex=680a8542&is=680933c2&hm=488ea83c0cd59a6ac17da86b60016f0e9e3c3c1691802f08734474f0d99b6cdf&')] bg-cover bg-center bg-no-repeat opacity-50" style={{ backgroundPosition: 'center calc(30%)' }}></div>

      {/* Increased vertical padding: py-12 */}
      <div className="relative container mx-auto px-4 py-20">
        {/* Centered the main title and adjusted flex for layout */}
        <div className="flex flex-col items-center">
          {/* Title Block - Centered */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-lime-900">
              Welcome to Saiban E Zahra
              <br />
              Official Website
            </h1>
          </div>

          {/* Bottom Row: Countdown Timer and Links */}
          <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-center gap-4 md:gap-6 w-full max-w-3xl">


            <div className="flex items-center justify-center gap-4 mt-4 sm:mt-0">
              <Link
                to="/contact"
                className="inline-flex items-center px-5 py-2 bg-white border border-lime-600 text-lime-600 rounded-full text-sm font-medium hover:bg-lime-50 transition duration-300 whitespace-nowrap"
              >
                Contact Us
              </Link>

              {showHomeLink && (
                <Link
                  to="/"
                  className="p-2 rounded-full bg-white text-lime-700 hover:bg-lime-50 border border-lime-300 transition-colors flex items-center justify-center w-10 h-10 shrink-0"
                  aria-label="Back to Home"
                >
                  <Home size={20} />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

    </header>
  );
};

export default Header;