import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-lime-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Exam Information</h3>
            <ul className="space-y-2">
              <li>Date: 15 Ramzan, 1446</li>
              <li>Time: After Asr Prayer</li>
              <li>Venue: Main Examination Hall</li>
              <li>Duration: 2 Hours</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Eligibility</h3>
            <ul className="space-y-2">
              <li>Minimum 80% attendance required</li>
              <li>Completion of all assignments</li>
              <li>Formal registration completed</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:underline">Home</Link></li>
              <li><Link to="/attendance" className="hover:underline">Attendance</Link></li>
              <li><Link to="/contact" className="hover:underline">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Important Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">Exam Syllabus</a></li>
              <li><a href="#" className="hover:underline">Study Materials</a></li>
              <li><a href="#" className="hover:underline">Past Papers</a></li>
              <li><a href="#" className="hover:underline">Prayer Timings</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-lime-700 text-center">
          <p className="text-sm text-lime-100">
            &copy; {new Date().getFullYear()} Ramzan Exam Portal. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;