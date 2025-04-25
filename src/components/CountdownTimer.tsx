import React, { useState, useEffect } from 'react';
import { intervalToDuration, isBefore } from 'date-fns';
import { toZonedTime, fromZonedTime } from 'date-fns-tz';

interface TimeLeft {
    days?: number;
    hours?: number;
    minutes?: number;
    seconds?: number;
}

const CountdownTimer: React.FC = () => {
    const targetDateStr = '2025-04-27T10:30:00'; // Exam date and time (YYYY-MM-DDTHH:mm:ss)
    const timeZone = 'Asia/Karachi'; // Pakistan Standard Time

    // Use fromZonedTime to get the UTC Date object representing the target time in PKT
    const targetDateUTC = fromZonedTime(targetDateStr, timeZone);

    const calculateTimeLeft = (): TimeLeft => {
        const now = new Date(); // Current time in UTC

        if (isBefore(targetDateUTC, now)) {
            // If the target date is in the past
            return {};
        }

        // intervalToDuration works directly with UTC Date objects
        const duration = intervalToDuration({ start: now, end: targetDateUTC });
        return {
            days: duration.days,
            hours: duration.hours,
            minutes: duration.minutes,
            seconds: duration.seconds,
        };
    };

    const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        // Clear interval on component unmount
        return () => clearInterval(timer);
    }, []); // Effect runs once on mount

    const formatTime = (time: number | undefined): string => {
        return String(time || 0).padStart(2, '0');
    };

    // Check if any time component is greater than 0
    const hasTimeLeft = timeLeft.days !== undefined || timeLeft.hours !== undefined || timeLeft.minutes !== undefined || timeLeft.seconds !== undefined;
    // A more precise check ensuring at least one value is positive if needed:
    // const hasTimeLeft = Object.values(timeLeft).some(val => val !== undefined && val > 0);

    return (
        <div className="bg-lime-50 rounded-lg p-4 shadow-md border border-lime-200 text-center">
            <p className="text-sm text-gray-600 mb-1">Exam Starts In:</p>
            {hasTimeLeft ? (
                <div className="flex justify-center space-x-2 font-mono text-lg md:text-xl font-semibold text-lime-800">
                    <div>
                        <span>{formatTime(timeLeft.days)}</span>
                        <span className="block text-xs font-normal text-gray-500">Days</span>
                    </div>
                    <span>:</span>
                    <div>
                        <span>{formatTime(timeLeft.hours)}</span>
                        <span className="block text-xs font-normal text-gray-500">Hours</span>
                    </div>
                    <span>:</span>
                    <div>
                        <span>{formatTime(timeLeft.minutes)}</span>
                        <span className="block text-xs font-normal text-gray-500">Mins</span>
                    </div>
                    <span>:</span>
                    <div>
                        <span>{formatTime(timeLeft.seconds)}</span>
                        <span className="block text-xs font-normal text-gray-500">Secs</span>
                    </div>
                </div>
            ) : (
                <p className="font-semibold text-lime-800 text-lg">Exam Time!</p>
            )}
            <p className="text-sm font-bold text-gray-500 mt-1">27th April 2025 - 10:30AM(PKT)</p>
        </div>
    );
};

export default CountdownTimer; 