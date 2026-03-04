import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserServices {

  private readonly API = "http://localhost:3000/users";

  constructor(private http : HttpClient){}

  updatePassword(login: string, newPassword: string, newPasswordConfirmed: string): Observable<any> {
    return this.http.put<any>(`${this.API}/password`, { login, newPassword, newPasswordConfirmed});
  }
}
