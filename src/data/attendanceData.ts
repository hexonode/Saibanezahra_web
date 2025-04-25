import Papa from 'papaparse';
import { Person } from '../types/types';

// Interface for MALE CSV Row
interface MaleCsvRow {
  'Roll no': string;
  Name: string;
  Percentage: string;
  profileImage?: string;
}

// Interface for FEMALE CSV Row (note header differences)
interface FemaleCsvRow {
  'Roll No': string; // Different capitalization and spacing
  Name: string;
  Attendance: string; // Different column name for percentage calculation?
  // Assuming this might be raw attendance count like "22" and Percentage is separate
  Percentage: string; // Contains the percentage value like "100%"
  // No profileImage column assumed for females based on provided CSV
}


/**
 * Fetches and parses the male attendance data from male_attendance.csv.
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
      console.error('Male CSV file is empty.');
      throw new Error('Male CSV file is empty.');
    }

    return new Promise<Person[]>((resolve, reject) => {
      Papa.parse<MaleCsvRow>(csvText, {
        header: true,
        skipEmptyLines: true,
        dynamicTyping: false,
        complete: (results) => {
          if (results.errors.length > 0) {
            console.error('Male CSV parsing errors:', results.errors);
            const firstError = results.errors[0];
            reject(new Error(`Error parsing Male CSV file (e.g., ${firstError.message} on row ${firstError.row})`));
            return;
          }
          if (results.data.length === 0) {
            console.warn('Male CSV file parsed successfully but contained no data rows.');
            resolve([]);
            return;
          }

          const maleData: Person[] = results.data.map((row, index) => {
            const idStr = row['Roll no'];
            const nameStr = row.Name;
            const percentageStr = row.Percentage;

            const id = parseInt(idStr, 10);
            const cleanedPercentageStr = percentageStr ? percentageStr.replace(/%$/, '').trim() : '0';
            const attendance = parseFloat(cleanedPercentageStr);
            const isEligible = !isNaN(attendance) && attendance >= 80;

            if (isNaN(id)) {
              console.warn(`Invalid Roll no found in Male CSV row ${index + 2}: ${idStr}. Skipping row.`);
              return null;
            }
            if (!nameStr || nameStr.trim() === '') {
              console.warn(`Missing Name found in Male CSV row ${index + 2}. Skipping row.`);
              return null;
            }
            // No warning needed for NaN attendance if cleanedPercentageStr is '0'
            if (isNaN(attendance) && cleanedPercentageStr !== '0') {
              console.warn(`Invalid Percentage found in Male CSV row ${index + 2}: ${percentageStr}. Setting attendance to 0.`);
            }

            return {
              id: id,
              name: nameStr.trim(),
              attendancePercentage: !isNaN(attendance) ? Math.round(attendance) : 0,
              gender: 'male',
              isEligible: isEligible,
              profileImage: row.profileImage?.trim() || undefined,
            };
          }).filter(person => person !== null) as Person[];

          resolve(maleData);
        },
        error: (error: Error) => {
          console.error('Male CSV parsing failed:', error);
          reject(error);
        },
      });
    });

  } catch (error) {
    console.error('Failed to fetch or parse male attendance data:', error);
    throw error instanceof Error ? error : new Error('An unknown error occurred while fetching male data.');
  }
};

/**
 * Fetches and parses the female attendance data from ladies_attendance.csv.
 */
export const fetchFemaleAttendanceData = async (): Promise<Person[]> => {
  try {
    const response = await fetch('/ladies_attendance.csv'); // Path relative to the public directory
    if (!response.ok) {
      if (response.status === 404) {
        console.error(`Error fetching CSV: File not found at ${response.url}`);
        throw new Error(`File not found: /ladies_attendance.csv. Make sure it's in the 'public' directory.`);
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const csvText = await response.text();
    if (!csvText.trim()) {
      console.error('Female CSV file is empty.');
      throw new Error('Female CSV file is empty.');
    }

    return new Promise<Person[]>((resolve, reject) => {
      Papa.parse<FemaleCsvRow>(csvText, {
        header: true,
        skipEmptyLines: true,
        dynamicTyping: false,
        complete: (results) => {
          if (results.errors.length > 0) {
            console.error('Female CSV parsing errors:', results.errors);
            const firstError = results.errors[0];
            reject(new Error(`Error parsing Female CSV file (e.g., ${firstError.message} on row ${firstError.row})`));
            return;
          }
          if (results.data.length === 0) {
            console.warn('Female CSV file parsed successfully but contained no data rows.');
            resolve([]);
            return;
          }

          const femaleData: Person[] = results.data.map((row, index) => {
            // Use the correct keys from FemaleCsvRow interface
            const idStr = row['Roll No']; // Note the different key
            const nameStr = row.Name;
            const percentageStr = row.Percentage;
            // const attendanceCountStr = row.Attendance; // Example if needed

            const id = parseInt(idStr, 10);
            const cleanedPercentageStr = percentageStr ? percentageStr.replace(/%$/, '').trim() : '0';
            const attendance = parseFloat(cleanedPercentageStr);
            const isEligible = !isNaN(attendance) && attendance >= 80;

            if (isNaN(id)) {
              console.warn(`Invalid Roll No found in Female CSV row ${index + 2}: ${idStr}. Skipping row.`);
              return null;
            }
            if (!nameStr || nameStr.trim() === '') {
              console.warn(`Missing Name found in Female CSV row ${index + 2}. Skipping row.`);
              return null;
            }
            if (isNaN(attendance) && cleanedPercentageStr !== '0') {
              console.warn(`Invalid Percentage found in Female CSV row ${index + 2}: ${percentageStr}. Setting attendance to 0.`);
            }

            return {
              id: id, // Consider prefixing female IDs if overlaps are possible (e.g., `id: 'F-' + id`)
              name: nameStr.trim(),
              attendancePercentage: !isNaN(attendance) ? Math.round(attendance) : 0,
              gender: 'female', // Set gender to female
              isEligible: isEligible,
              // profileImage: undefined, // No profile image column in female CSV
            };
          }).filter(person => person !== null) as Person[];

          resolve(femaleData);
        },
        error: (error: Error) => {
          console.error('Female CSV parsing failed:', error);
          reject(error);
        },
      });
    });

  } catch (error) {
    console.error('Failed to fetch or parse female attendance data:', error);
    throw error instanceof Error ? error : new Error('An unknown error occurred while fetching female data.');
  }
};

// Removed the old hardcoded export array