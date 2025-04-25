import React, { useState } from 'react';
import { Person, Gender } from '../types/types';
import PersonCard from './PersonCard';
import { Search } from 'lucide-react';

interface AttendanceListProps {
  people: Person[];
  gender: Gender;
}

const AttendanceList: React.FC<AttendanceListProps> = ({ people, gender }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showOnlyEligible, setShowOnlyEligible] = useState(false);

  const filteredPeople = people.filter(person => {
    return (
      person.gender === gender &&
      person.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (showOnlyEligible ? person.isEligible : true)
    );
  });

  const eligibleCount = filteredPeople.filter(p => p.isEligible).length;
  const totalCount = filteredPeople.length;

  return (
    <div className="container mx-auto px-4 pb-12">
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="relative max-w-md w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by name..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-lime-500 transition-colors"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-lime-600 focus:ring-lime-500 border-gray-300 rounded"
                checked={showOnlyEligible}
                onChange={() => setShowOnlyEligible(!showOnlyEligible)}
              />
              <span className="ml-2 text-sm text-gray-700">
                Show only eligible
              </span>
            </label>

            <div className="ml-6 bg-lime-50 py-1 px-3 rounded-full">
              <span className="text-xs font-medium text-lime-800">
                {eligibleCount} eligible of {totalCount}
              </span>
            </div>
          </div>
        </div>
      </div>

      {filteredPeople.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPeople.map(person => (
            <PersonCard key={person.id} person={person} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">No participants found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default AttendanceList;