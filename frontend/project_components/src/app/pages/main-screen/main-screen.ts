import { Component, OnInit} from '@angular/core';
import { TaskService } from '../../services/task';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-screen',
  imports: [CommonModule],
  templateUrl: './main-screen.html',
  styleUrl: './main-screen.css',
})
export class MainScreen implements OnInit{
  tasks: any[] = [];
  name: String = localStorage.getItem('name') || 'seja bem vindo!';
  currentDate: Date = new Date();

  constructor(private taskService: TaskService){}

  ngOnInit(): void {
    this.loadingTasks();
  }

  loadingTasks(){
    this.taskService.getTasks().subscribe({
      next: (data) => {
        this.tasks = data;
        console.log("Tarefas carregadas com sucesso");
      },
      error: (error) =>{
        console.error("Erro ao carregar as tarefas", error);
      }
    });
      
    
  }
  
}
