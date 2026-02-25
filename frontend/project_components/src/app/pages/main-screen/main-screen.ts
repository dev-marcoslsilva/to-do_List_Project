import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task';
import { CommonModule } from '@angular/common';
import { FormControl } from '@angular/forms';
import { distinctUntilChanged, debounceTime } from 'rxjs';

@Component({
  selector: 'app-main-screen',
  imports: [CommonModule],
  templateUrl: './main-screen.html',
  styleUrl: './main-screen.css',
})
export class MainScreen implements OnInit {
  tasks: any[] = [];
  specialTasks: any[] = [];
  nextTask: any[] = [];
  name: String = localStorage.getItem('name') || 'seja bem vindo!';
  currentDate: Date = new Date();

  searchControl = new FormControl('');
  suggestons: any[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadingTasks();
    this.loadingSpecialTasks();
    this.loadingDailyTasks();
    this.searchConfig();
    
  }

  loadingTasks() {
    this.taskService.getTasks().subscribe({
      next: (data) => {
        this.tasks = data;
        console.log('Tarefas carregadas com sucesso');
        console.log("Tarefas, no total: ", this.tasks.length);
      },
      error: (error) => {
        console.error('Erro ao carregar as tarefas', error);
      },
    });
  }

  loadingSpecialTasks() {
    this.taskService.getSpecialTasks().subscribe({
      next: (data) => {
        this.specialTasks = data;
        console.log('Tarefas especiais carregadas com sucesso');
        console.log("Tarefas especiais: ", this.specialTasks.length);
        
      },
      error: (error) => {
        console.error('Erro ao carregar as tarefas especiais', error);
      },
    });
  }

  loadingDailyTasks() {
    this.taskService.getNextTask().subscribe({
      next: (data) => {
        this.nextTask = data;
        console.log('Tarefas diárias carregadas com sucesso');
        console.log("Tarefas diárias: ", this.nextTask.length);
        
      },
      error: (error) => {
        console.error('Erro ao carregar as tarefas diárias', error);
      },
    });
  }

  searchConfig() {
    this.searchControl.valueChanges
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe((value) => {
        if (value && value.length >= 4) {
          this.taskService.getSuggestons(value).subscribe((res) => (this.suggestons = res));
        } else {
          this.suggestons = [];
        }
      });
  }
}
