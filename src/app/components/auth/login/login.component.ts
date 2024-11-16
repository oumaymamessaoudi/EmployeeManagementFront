import { Component } from '@angular/core';
import { Router } from '@angular/router';
 import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  error: string = '';

  constructor(
    private userService: UserService, // Inject your user service
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  onSubmit(): void {
    if (!this.email || !this.password) {
      this.error = 'Veuillez entrer à la fois l\'email et le mot de passe.';
      this.openSnackBar(this.error, 'Fermer', 'snackbar-error');
      return;
    }

    this.userService.login(this.email, this.password).subscribe(
      userData => {
        if (userData.token) {
          localStorage.setItem('token', userData.token);
          localStorage.setItem('role', userData.role);
          localStorage.setItem('userId', userData.userId); // Store user ID
console.log("userid",userData.userId);
          switch (userData.role) {
            case 'ADMIN':
              this.router.navigate(['admin/user-management']);
              break;
            case 'USER':
              this.router.navigate(['/collaborator-dashboard']);
              break;
            case 'MANAGER':
              this.router.navigate(['/manager-dashboard']);
              break;
              case 'COLLABORATOR':
                this.router.navigate(['collaborator-dashboard']);
                break;
            default:
              this.error = 'Unknown user role.';
              this.openSnackBar(this.error, 'Fermer', 'snackbar-error');
              break;
          }
        } else {
          this.error = userData.message;
          this.openSnackBar(this.error, 'Fermer', 'snackbar-error');
        }
      },
      error => {
        this.error = 'An error occurred while logging in. Please try again.';
        this.openSnackBar(this.error, 'Fermer', 'snackbar-error');
      }
    );
  }

  forgotPassword(): void {
    if (!this.email) {
      this.error = 'Veuillez entrer votre adresse email pour réinitialiser votre mot de passe.';
      this.openSnackBar(this.error, 'Fermer', 'snackbar-error');
      return;
    }

    this.userService.forgotPassword(this.email).subscribe(
      response => {
        this.openSnackBar('Un email avec des instructions pour réinitialiser votre mot de passe a été envoyé.', 'Fermer', 'snackbar-success');
      },
      error => {
        this.error = 'Email invalide. Veuillez réessayer.';
        this.openSnackBar(this.error, 'Fermer', 'snackbar-error');
      }
    );
  }

  private openSnackBar(message: string, action: string, panelClass: string): void {
    this.snackBar.open(message, action, {
      duration: 5000, // 5 seconds 
    });
  }
}
