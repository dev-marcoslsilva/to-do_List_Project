import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../interfaces/tasks.interfaces';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly API = "http://localhost:3000/tasks";

  constructor(private http: HttpClient){}
  
  createTask(task: any): Observable<Task>{
    return this.http.post<Task>(this.API, task);
  }

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

  putTask(id: number, task: any): Observable<Task>{
    return this.http.put<Task>(`${this.API}/${id}`, {id, task});
  }

  putStatus(id: number): Observable<Task>{
    return this.http.put<Task>(`${this.API}/updateStatus/${id}`, { id });
  }
  
  deleteTask(id: number): Observable<any>{
    return this.http.delete<void>(`${this.API}/${id}`);
  }

}
