import React from 'react';
import { Person } from '../types/types';
import { Check, X } from 'lucide-react';

interface PersonCardProps {
  person: Person;
}

const PersonCard: React.FC<PersonCardProps> = ({ person }) => {
  return (
    <div
      className={`relative bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 border-l-4 ${person.isEligible ? 'border-green-500' : 'border-red-500'
        }`}
    >
      <div className="p-5">
        <div className="flex items-center mb-3">
          <div className="flex-shrink-0 mr-4">
            <img
              src={person.profileImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(person.name)}&background=random`}
              alt={person.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-lime-100"
            />
          </div>
          <div className="flex-1">
            <p className="text-xs text-gray-500 mb-0.5">Roll No: {person.id}</p>
            <h3 className="text-lg font-semibold text-gray-800 leading-tight">{person.name}</h3>
          </div>
        </div>

        <div className="flex items-center mb-4">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className={`h-2.5 rounded-full ${person.attendancePercentage >= 90 ? 'bg-green-500' :
                person.attendancePercentage >= 80 ? 'bg-amber-500' : 'bg-red-500'
                }`}
              style={{ width: `${person.attendancePercentage}%` }}
            ></div>
          </div>
          <span className="ml-3 text-sm font-medium text-gray-700 whitespace-nowrap">
            {person.attendancePercentage}%
          </span>
        </div>

        <div className="flex justify-start items-center">
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${person.isEligible
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
              }`}
          >
            {person.isEligible ? (
              <>
                <Check className="w-3 h-3 mr-1" />
                Eligible
              </>
            ) : (
              <>
                <X className="w-3 h-3 mr-1" />
                Not Eligible
              </>
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PersonCard;