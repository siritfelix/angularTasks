import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../_services/storage.service';
import { User } from './user.model';
import { UsersService } from './users.service';

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent implements OnInit {
  users: User[] = []
  content: string = ''
  isLoggedIn = false;
  constructor(private usersService: UsersService, private storageService: StorageService, private router: Router) { }

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();
    if (!this.isLoggedIn) {
      this.router.navigate(['/home'])
    }
    this.getAllUsers()
  }
  getAllUsers() {
    this.usersService.getAllUsers().subscribe({
      next: data => {
        this.users = data;
      },
      error: err => {
        if (err.error) {
          try {
            const res = JSON.parse(err.error);
            this.content = res.message;
          } catch {
            this.content = `Error with status: ${err.status} - ${err.statusText}`;
          }
        } else {
          this.content = `Error with status: ${err.status}`;
        }
      }
    });
  }
  deleteUser(id: number) {
    this.usersService.removById(id).subscribe({
      next: data => {
        this.getAllUsers()
      },
      error: err => {
        if (err.error) {
          try {
            const res = JSON.parse(err.error);
            this.content = res.message;
          } catch {
            this.content = `Error with status: ${err.status} - ${err.statusText}`;
          }
        } else {
          this.content = `Error with status: ${err.status}`;
        }
      }
    })
  }
  toggleRole(user: User) {
    this.usersService.upDateRole(user.id, user.role == 'USER' ? 'ADMIN' : 'USER').subscribe({
      next: data => {
        this.getAllUsers()
      },
      error: err => {
        if (err.error) {
          try {
            const res = JSON.parse(err.error);
            this.content = res.message;
          } catch {
            this.content = `Error with status: ${err.status} - ${err.statusText}`;
          }
        } else {
          this.content = `Error with status: ${err.status}`;
        }
      }
    })
  }
}
