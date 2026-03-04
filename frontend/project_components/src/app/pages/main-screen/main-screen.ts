import { Component, OnInit, OnDestroy } from '@angular/core';
import { TaskService } from '../../services/task';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { distinctUntilChanged, debounceTime, forkJoin } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';
import { Task } from '../../interfaces/tasks.interfaces';
import { Router } from '@angular/router'

@Component({
  selector: 'app-main-screen',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './main-screen.html',
  styleUrl: './main-screen.css',
})
export class MainScreen implements OnInit, OnDestroy {
  private intervalId: any;

  tasks: any[] = [];
  specialTasks: any[] = [];
  nextTask: any[] = [];
  name: String = localStorage.getItem('Name') ? localStorage.getItem('Name')! : 'seja bem vindo!';
  currentDate: Date = new Date();
  loading: boolean = true;

  searchControl = new FormControl('');
  editName = new FormControl('');
  editDescription = new FormControl('');
  editDeadline = new FormControl();
  editCost = new FormControl();

  editTaskId: number | null = null;

  suggestons: any[] = [];
  //completedTasks: any[] = [];

  cloneTasks!: any[];

  currentIndex: number = 0;

  currentTask!: Task;


  editMode: boolean = false;
  newName: string = '';

  constructor(private taskService: TaskService, 
              private cdr: ChangeDetectorRef,
              private router: Router) {}

  ngOnInit(): void {
    this.loading = true;

    this.intervalId = setInterval(() => {
      this.currentDate = new Date();
      this.cdr.detectChanges();
    }, 1000);

    forkJoin({
      general: this.loadingTasks(),
      special: this.loadingSpecialTasks(),
      next: this.loadingDailyTasks(),
    }).subscribe({
      next: (res: any) => {
        this.tasks = res.general;
        this.cloneTasks = [...this.tasks];
        this.specialTasks = res.special;
        this.nextTask = res.next;
        this.loading = false;

        if (this.nextTask && this.nextTask.length > 0) {
          console.log('next Task:', this.nextTask);

          this.currentTask = this.nextTask[0];

        }

        console.log('Tarefas do dia: ', this.nextTask.length);

        this.cdr.detectChanges();
        console.log('Forcei a atualização da tela');
      },
      error: (error) => {
        console.error('Erro ao carregar as tarefas', error);
        this.loading = false;
      },
    });
    this.searchConfig();
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  loadingTasks() {
    return this.taskService.getTasks();
  }

  loadingSpecialTasks() {
    return this.taskService.getSpecialTasks();
  }

  loadingDailyTasks() {
    return this.taskService.getNextTask();
  }

  searchConfig() {
    this.searchControl.valueChanges
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe((value) => {
        if (value && value.length >= 4) {
          this.taskService.getSuggestons(value).subscribe((res) => (this.suggestons = res));
          console.log('Sugestões: ', this.suggestons.length);
        } else {
          this.suggestons = [];
        }
      });
  }

  selectSuggestion(suggestion: any) {
    console.log("Suggestions: ", this.suggestons.length, this.suggestons);
    this.searchControl.setValue(suggestion.name, { emitEvent: false });
    
    console.log("Tarefas antes: ", this.tasks.length, this.tasks);
    this.tasks = this.cloneTasks.filter((task) => task.id === suggestion.id);
    console.log("Suggestions: ", this.suggestons);
    console.log("Tarefas depois: ", this.tasks.length, this.tasks);
    console.log("Tarefas: ", this.tasks);
    console.log("Quantidade de Tarefas: ", this.tasks.length);
    this.suggestons = [];
    this.cdr.detectChanges();
  }

  onCleanSearch() {
    this.searchControl.setValue('', { emitEvent: false });
    this.tasks = [...this.cloneTasks];
    this.suggestons = [];
    this.cdr.detectChanges();
  }

  onTaskToggledUp() {
    console.log('Cliquei no botão');
    console.log('Valor atual de currentIndex:', this.currentIndex);

    if (this.currentIndex < this.nextTask.length - 1) {

      this.currentTask! = this.nextTask[this.currentIndex + 1];
      this.currentIndex++;
    } else {
      this.currentIndex = 0;

      this.currentTask! = this.nextTask[this.currentIndex];
    }
  }
  onTaskToggledDown() {
    console.log('Cliquei no botão');
    console.log('Valor atual de currentIndex:', this.currentIndex);

    if (this.currentIndex > 0) {

      this.currentTask! = this.nextTask[this.currentIndex - 1];
      this.currentIndex--;
    } else {
      this.currentIndex = this.nextTask.length - 1;
      this.currentTask! = this.nextTask[this.currentIndex];
    }
  }

  onEditMode(id: number) {
    this.editTaskId = id;
  }

  onDeleteTask(id: number) {
    console.log('Cliquei no botão');

    if (confirm('Tem certeza que deseja excluir a tarefa?'))
      this.taskService.deleteTask(id).subscribe({
        next: (res: any) => {
          console.log('Tarefa excluída com sucesso', res);
          this.tasks = this.tasks.filter((task) => task.id !== id);
          this.cdr.detectChanges();
          console.log('Task: ', this.tasks);
        },
        error: (error: any) => {
          console.error('Erro ao excluir a tarefa', error);
        },
      });
  }

  onSubmitEdit(id: number) {
    console.log('Cliquei no Botão');
    this.cdr.detectChanges();

    const task = this.tasks.find((task) => task.id === id);

    console.log('dados editados: ', task);

    this.taskService.putTask(task.id, task).subscribe({
      next: (res: any) => {
        console.log('Tarefa atualizada com sucesso', res);
      },
      error: (error: any) => {
        console.error('Erro ao atualizar a tarefa', error);
      },
    });

    this.editTaskId = null;
  }

  onCancelEdit() {
    this.editTaskId = null;
  }

  onFinalizedTask(){
    console.log('Cliquei no botão');
    console.log('current id: ', this.currentTask.id);

    if(confirm('Tem certeza que deseja concluir a tarefa:')){
      this.taskService.toggleStatus(this.currentTask.id).subscribe({
        next: ()=>{
          console.log('Tarefa concluída com sucesso');
          
          this.ngOnInit();
        }
      })
    }
  }

  onLogout(){
    if (confirm("Tem certeza que deseja sair?")) {
      localStorage.clear();
      this.router.navigate(['/login']);
    }
  }

  isOverdue(deadline: any, id:number) : boolean{
    if(!deadline)
      return false;


    return new Date(deadline) < this.tasks.find((task)=> task.id === id).deadline;
  }
}
