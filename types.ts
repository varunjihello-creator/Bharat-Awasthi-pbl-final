export type AttendanceStatus = 'present' | 'absent';

export interface AttendanceRecord {
  date: string; // "YYYY-MM-DD"
  status: AttendanceStatus;
}

export interface Subject {
  id: string;
  name: string;
  marks: number;
}

export interface Student {
  id:string;
  name: string;
  subjects: Subject[];
  attendance: AttendanceRecord[];
}
