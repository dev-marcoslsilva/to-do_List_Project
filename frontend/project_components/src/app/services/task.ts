import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly API = "http://localhost:3000/tasks";

  constructor(private http: HttpClient){}

  getTasks(){
    return this.http.get<any[]>(this.API);
  }

  getSpecialTasks(){
    return this.http.get<any[]>(`${this.API}/special`);
  }

  getNextTask(){
    return this.http.get<any[]>(`${this.API}/daily`);
  }

  getSuggestons(term: string): Observable<any[]>{
    
    const params = new HttpParams().set('name' , term);

    return this.http.get<any[]>(`${this.API}/search`, { params });
  }
}
