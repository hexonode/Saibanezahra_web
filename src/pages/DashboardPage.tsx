import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, FileText, ChevronRight, Home } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CountdownTimer from '../components/CountdownTimer';
const DashboardPage: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Pass showHomeLink={true} to Header */}
            <Header showHomeLink={true} />

            <main className="flex-grow">
                <div className="container mx-auto px-4 py-12">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-semibold text-lime-700">
                            Exam Portal Dashboard
                        </h2>
                        <p className="text-lg text-gray-600 mt-2">
                            Access exam resources, check your status, and view results.
                        </p>
                    </div>

                    {/* The 3 cards moved from HomePage */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {/* Exam Card */}
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-lime-200 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-2 flex flex-col">
                            <div className="p-6 flex-grow">
                                <div className="w-16 h-16 bg-lime-100 text-lime-600 rounded-full flex items-center justify-center mx-auto mb-5 ring-4 ring-lime-50">
                                    <BookOpen className="h-8 w-8" />
                                </div>
                                <h3 className="text-xl font-semibold text-center text-gray-800 mb-3">Start Your Exam</h3>
                                <p className="text-gray-600 mb-5 text-center text-sm">
                                    Start your exam from here.
                                </p>
                                <CountdownTimer />
                            </div>
                            <a
                                href="https://ilearnislamicteachings.org/ilitacademy/login/index.php"

                                rel="noopener noreferrer"
                                className="block py-3 px-4 bg-lime-600 hover:bg-lime-700 text-white text-center font-medium transition duration-300 flex items-center justify-center group"
                            >
                                Go to Exam Portal <ChevronRight className="w-5 h-5 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                            </a>
                        </div>

                        {/* Attendance Card */}
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-lime-200 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-2 flex flex-col">
                            <div className="p-6 flex-grow">
                                <div className="w-16 h-16 bg-lime-100 text-lime-600 rounded-full flex items-center justify-center mx-auto mb-5 ring-4 ring-lime-50">
                                    <Users className="h-8 w-8" />
                                </div>
                                <h3 className="text-xl font-semibold text-center text-gray-800 mb-3">Check Attendance</h3>
                                <p className="text-gray-600 mb-5 text-center text-sm">
                                    View your attendance record and check eligibility for the Ramzan exam.
                                </p>
                            </div>
                            <Link
                                to="/attendance"
                                className="block py-3 px-4 bg-lime-600 hover:bg-lime-700 text-white text-center font-medium transition duration-300 flex items-center justify-center group"
                            >
                                View Attendance <ChevronRight className="w-5 h-5 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                            </Link>
                        </div>

                        {/* Results Card */}
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-lime-200 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-2 flex flex-col">
                            <div className="p-6 flex-grow">
                                <div className="w-16 h-16 bg-lime-100 text-lime-600 rounded-full flex items-center justify-center mx-auto mb-5 ring-4 ring-lime-50">
                                    <FileText className="h-8 w-8" />
                                </div>
                                <h3 className="text-xl font-semibold text-center text-gray-800 mb-3">View Results</h3>
                                <p className="text-gray-600 mb-5 text-center text-sm">
                                    Access your Ramzan exam results and performance metrics after they are published.
                                </p>
                            </div>
                            <div
                                className="block py-3 px-4 bg-gray-400 text-white text-center font-medium cursor-not-allowed flex items-center justify-center"
                            >
                                Coming Soon
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Optional: Keep Footer or remove based on previous steps */}
            {/* <Footer /> */}
        </div>
    );
};

export default DashboardPage; 