import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-collaborator-dashboard',
  templateUrl: './collaborator-dashboard.component.html',
  styleUrls: ['./collaborator-dashboard.component.scss']
})
export class CollaboratorDashboardComponent {
  constructor(private router: Router) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');

    console.log(token)

  }
  navigateToTimesheets() {
    this.router.navigate(['/Timesheets']);
  }
}
