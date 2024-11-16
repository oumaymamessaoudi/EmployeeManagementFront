import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../service/user.service';
import { Projet } from 'src/app/Models/Projet';
import { Release } from 'src/app/Models/Release';
import { Activite } from 'src/app/Models/Activite';

@Component({
  selector: 'app-affichage-timesheets',
  templateUrl: './affichage-timesheets.component.html',
  styleUrls: ['./affichage-timesheets.component.scss']
})
export class AffichageTimesheetsComponent implements OnInit {
  collaboratorId!: number;
  timesheets: any[] = [];
  currentIndex = 0;
  projects: any[] = [];
  releases: any[] = [];
  activities: any[] = [];
  noTimesheetsMessage = 'Ce collaborateur n\'a encore aucune feuille de temps.';

  constructor(private route: ActivatedRoute, private userService: UserService) {}

  ngOnInit(): void {
    this.collaboratorId = this.route.snapshot.params['id'];
    this.loadTimesheets();
  }
  
   token = localStorage.getItem('token') || ''; // Default to an empty string if token is null

   loadTimesheets(): void {
    this.userService.getTimesheetsByCollaboratorId(this.collaboratorId, this.token)
      .subscribe(
        data => {
          this.timesheets = data;
          if (this.timesheets.length === 0) {
            // Handle the case where no timesheets are found
            console.log(this.noTimesheetsMessage);
          }
        },
        error => console.error('Erreur lors de la récupération des feuilles de temps', error)
      );
  }

  get currentTimesheet() {
    return this.timesheets[this.currentIndex];
  }

  nextTimesheet(): void {
    if (this.currentIndex < this.timesheets.length - 1) {
      this.currentIndex++;
    }
  }

  prevTimesheet(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
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
}