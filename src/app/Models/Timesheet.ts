import { TimeEntry } from "./TimeEntry";

export interface Timesheet {
    id: number;
    dateDebut: Date;
    dateFin: Date;
    timeEntries: TimeEntry[];
    totalHours: number; // New field for total hours

  }