
import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { CommonModule } from '@angular/common';

interface User {
  id: number;
  name: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
  posts?: any[]; // Optional posts property
  showPosts?: boolean; // Optional property to track post visibility
}

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {

  users: User[] = []; // Use the User interface for type safety

  constructor(private UsersService: UsersService) { }
  
  ngOnInit(): void {
    // Fetch users
    this.UsersService.getUsers().subscribe({
      next: (users: User[]) => {
        // Add showPosts property to each user
        this.users = users.map((user: User) => ({ ...user, showPosts: false }));

        // Fetch posts for each user
        this.users.forEach((user: User) => {
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

  // Method to toggle posts visibility
  togglePosts(user: User): void {
    user.showPosts = !user.showPosts;
  }
}