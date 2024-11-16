import { Component } from '@angular/core';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  formData = {
    username: '',
    email: '',
    password: '',
    role: ''
  };
  error: string = '';
  emailExists = false;


  constructor(public userService: UserService, private router: Router) {}

  handleInputChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const { name, value } = target;
    this.formData = { ...this.formData, [name]: value };
    if (target.name === 'email') {
      this.checkEmailExists(target.value);
    }
  }
  checkEmailExists(email: string): void {
  
    this.userService.checkEmailExists(email).subscribe(
      (exists: boolean) => {
        this.emailExists = exists;
        console.log("aaaaaaaaaa",exists)
      },
      (error: any) => {
        console.error('Error checking email existence:', error);
        this.error = 'Error checking email existence';
      }
    );
  }

  handleSubmit(form: NgForm) {
    if (form.invalid || this.emailExists) {
      this.error = 'Please correct the errors in the form or use a different email address.';
      return;
    }

    // Show confirmation dialog
    const confirm = window.confirm('Êtes-vous sûr de vouloir enregistrer?');
    if (!confirm) {
      return; // If the user cancels, stop the submission
    }

    const token = localStorage.getItem('token') || ''; // Default to an empty string if token is null

    this.userService.register(this.formData, token).subscribe(
      () => {
        this.formData = {
          username: '',
          email: '',
          password: '',
          role: ''
        };
        alert('Utilisateur enregistré avec succès');
    window.location.reload(); // Reload the current page
    this.router.navigate(['/admin/user-management']); // Navigate to the user management page
    },
      error => {
        console.error('Error registering user:', error);
        this.error = 'Une erreur est survenue lors de l\'enregistrement de l\'utilisateur.';
      }
    );
  }}
