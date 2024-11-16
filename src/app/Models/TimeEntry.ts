import { Activite } from "./Activite";
import { Projet } from "./Projet";
import { Release } from "./Release";
import { Timesheet } from "./Timesheet";

export interface TimeEntry {
    id: number;
    date: Date;
    heuresTravaillees: number[];
    projet: Projet;
    release: Release;
    activite: Activite;
    heuresLundi: number;
    heuresMardi: number;
    heuresMercredi: number;
    heuresJeudi: number;
    heuresVendredi: number;
    timesheet: Timesheet; // Reference back to Timesheet if needed
  }