import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Activite } from 'src/app/Models/Activite';
import { Projet } from 'src/app/Models/Projet';
import { Release } from 'src/app/Models/Release';
import { TimeEntry } from 'src/app/Models/TimeEntry';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-time-entry-dialog',
  templateUrl: './time-entry-dialog.component.html',
  styleUrls: ['./time-entry-dialog.component.scss']
})
export class TimeEntryDialogComponent {
  projects: Projet[];
  releases: Release[];
  activities: Activite[];
  timeEntryForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<TimeEntryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.projects = data.projects;
    this.releases = data.releases;
    this.activities = data.activities;

    this.timeEntryForm = this.fb.group({
      projet: [null, Validators.required],
      release: [null, Validators.required],
      activite: [null, Validators.required],
      heuresLundi: [0, [Validators.min(0), Validators.max(24)]],
      heuresMardi: [0, [Validators.min(0), Validators.max(24)]],
      heuresMercredi: [0, [Validators.min(0), Validators.max(24)]],
      heuresJeudi: [0, [Validators.min(0), Validators.max(24)]],
      heuresVendredi: [0, [Validators.min(0), Validators.max(24)]]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    if (this.timeEntryForm.valid) {
      const formValues = this.timeEntryForm.value;
      const newEntry: TimeEntry = {
        id: 0,
        date: new Date(),
        heuresTravaillees: [
          formValues.heuresLundi,
          formValues.heuresMardi,
          formValues.heuresMercredi,
          formValues.heuresJeudi,
          formValues.heuresVendredi
        ],
        projet: formValues.projet,
        release: formValues.release,
        activite: formValues.activite,
        heuresLundi: formValues.heuresLundi,
        heuresMardi: formValues.heuresMardi,
        heuresMercredi: formValues.heuresMercredi,
        heuresJeudi: formValues.heuresJeudi,
        heuresVendredi: formValues.heuresVendredi,
        timesheet: this.data.timesheet,
      };

      console.log("new entry", newEntry); // Check the console for correct object structure
      this.dialogRef.close(newEntry);
      
    }
  }
}
