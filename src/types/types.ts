export interface Person {
  id: number;
  name: string;
  attendancePercentage: number;
  gender: 'male' | 'female';
  isEligible: boolean;
  profileImage?: string;
}

export type Gender = 'male' | 'female';