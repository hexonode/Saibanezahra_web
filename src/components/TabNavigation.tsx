import React from 'react';
import { UserRound, Users } from 'lucide-react';
import { Gender } from '../types/types';

interface TabNavigationProps {
  activeTab: Gender;
  setActiveTab: (tab: Gender) => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-center mb-8">
        <div className="inline-flex rounded-md shadow-sm bg-white p-1">
          <button
            className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ease-in-out ${activeTab === 'male'
                ? 'bg-lime-600 text-white shadow-md'
                : 'text-gray-700 hover:bg-gray-100'
              }`}
            onClick={() => setActiveTab('male')}
          >
            <Users className="mr-2 h-5 w-5" />
            <span>Gents Section</span>
          </button>
          <button
            className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ease-in-out ${activeTab === 'female'
                ? 'bg-lime-600 text-white shadow-md'
                : 'text-gray-700 hover:bg-gray-100'
              }`}
            onClick={() => setActiveTab('female')}
          >
            <UserRound className="mr-2 h-5 w-5" />
            <span>Ladies Section</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TabNavigation;