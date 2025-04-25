import Papa from 'papaparse';
import { Person } from '../types/types';

// Update interface keys to match actual CSV headers
interface CsvRow {
  'Roll no': string; // Use quotes if header has spaces or special characters
  Name: string;
  // 'Total Attendance': string; // We don't directly use this one
  Percentage: string;
  profileImage?: string; // Keep optional, as it's missing in the CSV
}

/**
 * Fetches and parses the male attendance data from the CSV file.
 * Assumes male_attendance.csv is in the /public directory.
 */
export const fetchMaleAttendanceData = async (): Promise<Person[]> => {
  try {
    const response = await fetch('/male_attendance.csv');
    if (!response.ok) {
      if (response.status === 404) {
        console.error(`Error fetching CSV: File not found at ${response.url}`);
        throw new Error(`File not found: /male_attendance.csv. Make sure it's in the 'public' directory.`);
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const csvText = await response.text();
    if (!csvText.trim()) {
      console.error('CSV file is empty.');
      throw new Error('CSV file is empty.');
    }

    return new Promise<Person[]>((resolve, reject) => {
      Papa.parse<CsvRow>(csvText, {
        header: true,
        skipEmptyLines: true,
        dynamicTyping: false,
        complete: (results) => {
          if (results.errors.length > 0) {
            console.error('CSV parsing errors:', results.errors);
            const firstError = results.errors[0];
            reject(new Error(`Error parsing CSV file (e.g., ${firstError.message} on row ${firstError.row})`));
            return;
          }
          if (results.data.length === 0) {
            console.warn('CSV file parsed successfully but contained no data rows.');
            resolve([]);
            return;
          }

          const maleData: Person[] = results.data.map((row, index) => {
            // Use the correct keys from CsvRow interface
            const idStr = row['Roll no'];
            const nameStr = row.Name;
            const percentageStr = row.Percentage;

            const id = parseInt(idStr, 10);
            // Clean the percentage string (remove %) before parsing
            const cleanedPercentageStr = percentageStr ? percentageStr.replace(/%$/, '').trim() : '0';
            const attendance = parseFloat(cleanedPercentageStr); // Use parseFloat for potential decimals
            const isEligible = !isNaN(attendance) && attendance >= 80;

            // Add validation checks
            if (isNaN(id)) {
              console.warn(`Invalid Roll no found in CSV row ${index + 2}: ${idStr}. Skipping row.`);
              return null;
            }
            if (!nameStr || nameStr.trim() === '') {
              console.warn(`Missing Name found in CSV row ${index + 2}. Skipping row.`);
              return null;
            }
            if (isNaN(attendance)) {
              // Allow NaN attendance if percentageStr was initially invalid/missing, default to 0 later
              console.warn(`Invalid Percentage found in CSV row ${index + 2}: ${percentageStr}. Setting attendance to 0.`);
            }

            return {
              id: id,
              name: nameStr.trim(),
              attendancePercentage: !isNaN(attendance) ? Math.round(attendance) : 0, // Round to nearest whole number, default 0
              gender: 'male',
              isEligible: isEligible,
              profileImage: row.profileImage?.trim() || undefined, // Still handle this optional field
            };
          }).filter(person => person !== null) as Person[];

          resolve(maleData);
        },
        error: (error: Error) => {
          console.error('CSV parsing failed:', error);
          reject(error);
        },
      });
    });

  } catch (error) {
    console.error('Failed to fetch or parse attendance data:', error);
    throw error instanceof Error ? error : new Error('An unknown error occurred while fetching data.');
  }
};

// Removed the old hardcoded export array