import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private myAppUrl: string
  private myApiUrl: string

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoints
    this.myApiUrl = 'api/users/'
  }

  loginUser(user: User): Observable<any> {
    return this.http.post<User>(`${this.myAppUrl}${this.myApiUrl}login`, user)
  }

  registerUser(user: User): Observable<any> {
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}`, user);
  }
}
