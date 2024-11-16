import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../service/user.service'; // Adjust the path as necessary

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(): boolean {
    if (this.userService.adminOnly()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
