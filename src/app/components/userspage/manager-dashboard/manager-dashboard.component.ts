import { Component, OnInit } from '@angular/core';
import { OurUser } from 'src/app/Models/OurUser';
import { TimesheetService } from '../../service/timesheet.service';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manager-dashboard',
  templateUrl: './manager-dashboard.component.html',
  styleUrls: ['./manager-dashboard.component.scss']
})
export class ManagerDashboardComponent  implements OnInit {
  collaborators: OurUser[] = [];
  filteredCollaborators: OurUser[] = [];
  selectedDate: Date | null = null;
  errorMessage: string = '';
  numberOfCollaborators: number = 0;

  constructor(private timesheetService: TimesheetService,private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    
    const token = localStorage.getItem('token');
    if (token) {
      this.userService.getAllCollaborators(token).subscribe({
        next: (data) => {
          this.collaborators = data;
          this.numberOfCollaborators = this.collaborators.length; // Compute the number of collaborators
          this.collaborators.forEach(collaborator => {
            this.userService.getTimesheetsByCollaboratorId(collaborator.id, token).subscribe({
              next: (timesheets) => collaborator.timesheetCount = timesheets.length,
              error: () => collaborator.timesheetCount = 0
            });
          });
        },
        error: (err) => this.errorMessage = 'Une erreur est survenue lors de la récupération des collaborateurs.'
      });
    } else {
      this.errorMessage = 'Token non disponible. Veuillez vous reconnecter.';
    }
  }
  seeMore(collaboratorId: number): void {
    this.router.navigate(['/collaborator-timesheets', collaboratorId]);
  }
}
