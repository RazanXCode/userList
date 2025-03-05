import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl1 = "https://jsonplaceholder.typicode.com/users"
  private apiUrl2 = "https://jsonplaceholder.typicode.com/posts"
  constructor(private http: HttpClient) { }
  getUsers(): Observable<any> {
    return this.http.get<any>(this.apiUrl1);
  }
  getPostsByUser(userId: number): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl2}?userId=${userId}`);
  }

}

