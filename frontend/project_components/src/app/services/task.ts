import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly API = "http://localhost:3000/tasks";

  constructor(private http: HttpClient){}

  getTasks(){
    return this.http.get<any[]>(this.API);
  }
}
