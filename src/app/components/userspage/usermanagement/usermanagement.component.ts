import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usermanagement',
  templateUrl: './usermanagement.component.html',
  styleUrls: ['./usermanagement.component.scss']
})
export class UsermanagementComponent implements OnInit {
  users: any[] = [];

  constructor(
    public userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.userService.getAllUsers(token).subscribe(
        (response) => {
          this.users = response.ourUsersList; // Adjust based on your actual API response
        },
        (error) => {
          console.error('Error fetching users:', error);
        }
      );
    }
  }

  deleteUser(userId: string): void {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if (confirmDelete) {
      const token = localStorage.getItem('token');
      if (token) {
        this.userService.deleteUser(userId, token).subscribe(
          () => {
            this.fetchUsers(); // Refresh the list after deletion
          },
          (error) => {
            console.error('Error deleting user:', error);
          }
        );
      }
    }
  }
}