import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {


  users: any[] = [];
  posts: { [key: number]: any[] } = {}; //-------

  constructor(private UsersService: UsersService) { }
  
  ngOnInit(): void {
    // Fetch users
    this.UsersService.getUsers().subscribe({
      next: (users) => {
        this.users = users;

        // Fetch posts for each user
        this.users.forEach(user => {
          this.UsersService.getPostsByUser(user.id).subscribe({
            next: (posts) => {
              user.posts = posts; // Add posts to the user object
              console.log(`Posts for user ${user.name}:`, posts); // Log posts for each user
            },
            error: (err) => {
              console.error(`Error fetching posts for user ${user.name}:`, err);
            }
          });
        });
      },
      error: (err) => {
        console.error('Error fetching users:', err);
      }
    });

  

  }
}

