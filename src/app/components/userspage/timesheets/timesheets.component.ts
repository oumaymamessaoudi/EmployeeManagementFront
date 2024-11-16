// timesheets.component.ts
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../service/user.service';
import { TimeEntryDialogComponent } from '../time-entry-dialog/time-entry-dialog.component';
import { DatePipe } from '@angular/common';
import { TimeEntry } from 'src/app/Models/TimeEntry';
import { Release } from 'src/app/Models/Release';
import { Projet } from 'src/app/Models/Projet';
import { Activite } from 'src/app/Models/Activite';
import { Router } from '@angular/router';
import { Timesheet } from 'src/app/Models/Timesheet';

@Component({
  selector: 'app-timesheets',
  templateUrl: './timesheets.component.html',
  styleUrls: ['./timesheets.component.scss']
})
export class TimesheetsComponent implements OnInit {
  
  timesheets: any[] = [];
  projects: any[] = [];
  releases: any[] = [];
  activities: any[] = [];
  userId: string = ''; 
currentIndex: number = 0;
currentTimesheet: Timesheet = {
  dateDebut: new Date(),
  dateFin: new Date(),
  timeEntries: [],
  id: 0,
  totalHours: 0
};
  constructor(private router: Router,private userService: UserService, public dialog: MatDialog, private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId') || ''; // Retrieve user ID from local storage
    if (this.userId) {
      console.log("My user:", this.userId); 
       this.loadProjects();
      this.loadReleases();
      this.loadActivities();
      this.loadTimesheets(this.userId);

      this.userService.getTimesheetsForUser(this.userId).subscribe((data: Timesheet[]) => {
        this.timesheets = data;
        console.log("Timesheets data:", data); // Check if totalHours is present in the response
        this.currentTimesheet = this.timesheets[this.currentIndex];
        console.log("Current Timesheet:", this.currentTimesheet); // Check current timesheet data
        console.log("Current Time Entries:", this.currentTimesheet.timeEntries); // Log time entries of the current timesheet

      });
    } else {
      console.error('User ID is not available.');
    }
  }

  loadTimesheets(userId: string): void {
    this.userService.getTimesheetsForUser(userId).subscribe(
      (data: Timesheet[]) => {
        this.timesheets = data;
        if (this.timesheets.length > 0) {
          this.updateCurrentTimesheet();
        }
        console.log('Timesheets:', this.timesheets);
      },
      (error) => {
        console.error('Error fetching timesheets:', error);
      }
    );
  }

  loadProjects(): void {
    this.userService.getProjects().subscribe(
      (data) => {
        this.projects = data;
        console.log('Projects:', this.projects);
      },
      (error) => {
        console.error('Error fetching projects:', error);
      }
    );
  }

  loadReleases(): void {
    this.userService.getReleases().subscribe(
      (data) => {
        this.releases = data;
        console.log('Releases:', this.releases);
      },
      (error) => {
        console.error('Error fetching releases:', error);
      }
    );
  }

  loadActivities(): void {
    this.userService.getActivities().subscribe(
      (data) => {
        this.activities = data;
        console.log('Activities:', this.activities);
      },
      (error) => {
        console.error('Error fetching activities:', error);
      }
    );
  }

  addTimeEntry(timesheet: Timesheet): void {
    const dialogRef = this.dialog.open(TimeEntryDialogComponent, {
      width: '400px',
      data: {
        projects: this.projects,
        releases: this.releases,
        activities: this.activities,
        daysCount: 5 // Fixed to 5 days for Lundi to Vendredi
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Time entry result:', result);
        if (result.heuresLundi !== undefined && result.heuresMardi !== undefined && result.heuresMercredi !== undefined &&
          result.heuresJeudi !== undefined && result.heuresVendredi !== undefined) {
          this.userService.addTimeEntry(timesheet.id, result).subscribe(
            () => {
              this.loadTimesheets(this.userId); // Reload timesheets to reflect changes

              timesheet.timeEntries.push(result);
            },
            (error: any) => {
              console.error('Error saving time entry:', error);
            }
          );
        } else {
          console.error('Invalid time entry data:', result);
        }
      }
    });
  }

  saveTimesheet(timesheet: any): void {
    // Implement save functionality to send updated timesheet data back to the server
  }

  calculateTotalHours(hours: number[]): number {
    if (!Array.isArray(hours)) {
      console.error('The hours parameter is not an array:', hours);
      return 0;
    }
    return hours.reduce((total, current) => total + (current || 0), 0);
  }

  calculateDaysDifference(startDate: string, endDate: string): number {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  }

  generateDays(startDate: string, endDate: string): string[] {
    const days: string[] = [];
    const start = new Date(startDate);
    const end = new Date(endDate);

    for (let d = start; d <= end; d.setDate(d.getDate() + 1)) {
      const formattedDate = this.datePipe.transform(d, 'EEE, MMM d', 'en-US') || '';
      days.push(formattedDate);
    }

    return days;
  }

  generateColumns(startDate: string, endDate: string): string[] {
    return ['project', 'release', 'activity', ...this.generateDays(startDate, endDate), 'total'];
  }
  getProjectName(project: Projet): string {
    const matchedProject = this.projects.find(p => p.id === project.id);
    return matchedProject ? matchedProject.nom : 'Unknown Project';
  }
  
  getReleaseName(release: Release): string {
    const matchedRelease = this.releases.find(r => r.idRelease === release.idRelease);
    return matchedRelease ? matchedRelease.nom : 'Unknown Release';
  }
  
  getActivityName(activity: Activite): string {
    const matchedActivity = this.activities.find(a => a.idActivité === activity.idActivité);
    return matchedActivity ? matchedActivity.nom : 'Unknown Activity';
  }
  navigateToTimesheets() {
    this.router.navigate(['/Timesheets']);
  }
  updateCurrentTimesheet(): void {
    this.currentTimesheet = this.timesheets[this.currentIndex];
    console.log('Current Timesheet:', this.currentTimesheet);
  }

  prevTimesheet(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.updateCurrentTimesheet();
      console.log("currentIndex prev",this.currentIndex)

    }
  }

  nextTimesheet(): void {
    if (this.currentIndex < this.timesheets.length - 1) {
      this.currentIndex++;
      this.updateCurrentTimesheet();
      console.log("currentIndex next",this.currentIndex)
    }
  }
}