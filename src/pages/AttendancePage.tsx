import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import TabNavigation from '../components/TabNavigation';
import AttendanceList from '../components/AttendanceList';
import Footer from '../components/Footer';
import { fetchMaleAttendanceData, fetchFemaleAttendanceData } from '../data/attendanceData';
import { Gender, Person } from '../types/types';
import { Loader2 } from 'lucide-react';

const AttendancePage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<Gender>('male');
    const [attendanceData, setAttendanceData] = useState<Person[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const [maleData, femaleData] = await Promise.all([
                    fetchMaleAttendanceData(),
                    fetchFemaleAttendanceData()
                ]);

                setAttendanceData([...maleData, ...femaleData]);
            } catch (err) {
                console.error("Failed to load attendance data:", err);
                const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
                setError(`Failed to load attendance data: ${errorMessage}`);
                setAttendanceData([]);
            } finally {
                setIsLoading(false);
            }
        };

        loadData();
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <div className="flex-grow text-gray-900 transition-colors duration-200">
                <Header showHomeLink={true} />

                <main>
                    <div className="container mx-auto px-4 py-8">
                        <div className="max-w-4xl mx-auto text-center mb-1">
                            <h2 className="text-3xl font-bold text-lime-800 mb-4">
                                Ramzan Exam Eligibility
                            </h2>
                            <p className="text-lg text-gray-600">
                                Congratulations to all participants who have maintained excellent attendance throughout.
                                Below you can check if you're eligible to participate in the upcoming Ramzan exam.
                            </p>
                            <div className="mt-6 inline-flex items-center px-4 py-2 bg-amber-100 text-amber-800 rounded-lg">
                                <span className="text-sm">
                                    Only participants with 80% or higher attendance are eligible for the exam
                                </span>
                            </div>
                        </div>
                    </div>

                    <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

                    {isLoading ? (
                        <div className="flex justify-center items-center py-16">
                            <Loader2 className="h-12 w-12 animate-spin text-lime-600" />
                        </div>
                    ) : error ? (
                        <div className="text-center py-12 text-red-600 px-4">
                            <p className="font-semibold">Error Loading Data</p>
                            <p className="text-sm">{error}</p>
                            <p className="text-sm mt-2">Please ensure 'male_attendance.csv' and 'ladies_attendance.csv' are in the /public folder and correctly formatted.</p>
                        </div>
                    ) : (
                        <AttendanceList people={attendanceData} gender={activeTab} />
                    )}
                </main>

                {/* <Footer /> */}
            </div>
        </div>
    );
};

export default AttendancePage; 