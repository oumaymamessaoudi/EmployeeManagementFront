import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegistrationComponent } from './components/auth/registration/registration.component';
import { AuthGuard } from './components/auth/auth.guard';
import { AdminGuard } from './components/auth/admin.guard';
import { UsermanagementComponent } from './components/userspage/usermanagement/usermanagement.component';
import { CollaboratorDashboardComponent } from './components/userspage/collaborator-dashboard/collaborator-dashboard.component';
import { CollaboratorGuard } from './components/auth/Collaborator.guard';
import { UserDashboardComponent } from './components/userspage/user-dashboard/user-dashboard.component';
import { ManagerGuard } from './components/auth/manager.guard';
import { ManagerDashboardComponent } from './components/userspage/manager-dashboard/manager-dashboard.component';
import { TimesheetsComponent } from './components/userspage/timesheets/timesheets.component';
import { AffichageTimesheetsComponent } from './components/affichage-timesheets/affichage-timesheets.component';
 
const routes: Routes = [
  { path: 'Timesheets', component: TimesheetsComponent },

  { path: 'login', component: LoginComponent },
  { path: 'user-dashboard', component: UserDashboardComponent },
  { path: 'manager-dashboard', component: ManagerDashboardComponent, canActivate: [ManagerGuard] },
  { path: 'collaborator-dashboard', component: CollaboratorDashboardComponent, canActivate: [CollaboratorGuard] },
  { path: 'register', component: RegistrationComponent, canActivate: [AdminGuard  ] },
  { path: 'admin/user-management', component: UsermanagementComponent, canActivate: [AdminGuard] },
  { path: 'collaborator-timesheets/:id', component: AffichageTimesheetsComponent },

  { path: '', redirectTo: '/user-dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/user-dashboard' }, // Redirect unknown paths to login

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
