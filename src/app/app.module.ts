import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegistrationComponent } from './components/auth/registration/registration.component';
import { UsermanagementComponent } from './components/userspage/usermanagement/usermanagement.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { CollaboratorDashboardComponent } from './components/userspage/collaborator-dashboard/collaborator-dashboard.component';
import { UserDashboardComponent } from './components/userspage/user-dashboard/user-dashboard.component';
import { ManagerDashboardComponent } from './components/userspage/manager-dashboard/manager-dashboard.component';
import { TimesheetsComponent } from './components/userspage/timesheets/timesheets.component';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { TimeEntryDialogComponent } from './components/userspage/time-entry-dialog/time-entry-dialog.component';
import { DatePipe } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { CdkColumnDef } from '@angular/cdk/table';
import { MatCheckboxModule } from '@angular/material/checkbox'; 
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AffichageTimesheetsComponent } from './components/affichage-timesheets/affichage-timesheets.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    UsermanagementComponent,
    CollaboratorDashboardComponent,
    UserDashboardComponent,
    ManagerDashboardComponent,
    TimesheetsComponent,
    TimeEntryDialogComponent,
    AffichageTimesheetsComponent,
      
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    NoopAnimationsModule ,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatTableModule,
    MatSelectModule,
    MatButtonModule,
    MatOptionModule,
    MatDialogModule,    
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [DatePipe,CdkColumnDef],
  bootstrap: [AppComponent]
})
export class AppModule { }
