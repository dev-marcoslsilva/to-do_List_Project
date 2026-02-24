import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import {LoginResponse} from "../interfaces/auth.interface";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API_URL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  login(login: string, password: string ): Observable<LoginResponse>{
    return this.http.post<LoginResponse>(`${this.API_URL}/login`, {login, password}).pipe(
      tap((res) =>{
        localStorage.setItem('token', res.token);
        localStorage.setItem('Name', res.user.name);
      })
    );
  }
}
