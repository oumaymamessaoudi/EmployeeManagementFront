import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../service/user.service'; // Adjust the path as necessary

@Injectable({
  providedIn: 'root'
})
export class ManagerGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(): boolean {
    if (this.userService.managerOnly()) { // Assuming hasRole is a method to check user roles
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}