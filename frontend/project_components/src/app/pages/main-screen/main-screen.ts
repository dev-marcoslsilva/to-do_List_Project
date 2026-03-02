import { Component, OnInit, OnDestroy } from '@angular/core';
import { TaskService } from '../../services/task';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { distinctUntilChanged, debounceTime, forkJoin } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';

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
  
  currentIndex: number = 0;

  current_name: string = '';
  current_deadline: Date = new Date();
  current_cost: Date = new Date();
  current_description: string = '';
  current_status: string = '';
  current_id: number = 0;

  editMode: boolean = false;
  newName: string = '';

  constructor(private taskService: TaskService, private cdr: ChangeDetectorRef) {}

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
        this.specialTasks = res.special;
        this.nextTask = res.next;
        this.loading = false;

        console.log("Tarefas do dia: ", this.nextTask.length);

        this.cdr.detectChanges();
        console.log('Forcei a atualização da tela');
      },
      error: (error) => {
        console.error('Erro ao carregar as tarefas', error);
        this.loading = false;
      },
    });
    this.searchConfig();

    console.log("next Task:", this.nextTask);

    this.current_name = this.nextTask[0].name;
    this.current_deadline = this.nextTask[0].deadline;
    this.current_cost = this.nextTask[0].cost;
    this.current_description = this.nextTask[0].description;
    this.current_status = this.nextTask[0].status;
    this.current_id = this.nextTask[0].id;

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
    this.searchControl.setValue(suggestion.name, { emitEvent: false });
    this.suggestons = [];
  }

  onTaskToggledUp() {
    console.log('Cliquei no botão');
    console.log('Valor atual de currentIndex:', this.currentIndex);

    if (this.currentIndex < this.nextTask.length - 1) {
      console.log("Entrei no if");

      this.current_id = this.nextTask[this.currentIndex + 1].id;
      this.current_name = this.nextTask[this.currentIndex + 1].name;
      this.current_deadline = this.nextTask[this.currentIndex + 1].deadline;
      this.current_cost = this.nextTask[this.currentIndex + 1].cost;
      this.current_description = this.nextTask[this.currentIndex + 1].description;
      this.current_status = this.nextTask[this.currentIndex + 1].status;
      this.currentIndex++;
      console.log('Valor atual de currentIndex:', this.currentIndex);
    } else {
      this.currentIndex = 0;

      this.current_id = this.nextTask[this.currentIndex].id;
      this.current_name = this.nextTask[this.currentIndex].name;
      this.current_deadline = this.nextTask[this.currentIndex].deadline;
      this.current_cost = this.nextTask[this.currentIndex].cost;
      this.current_description = this.nextTask[this.currentIndex].description;
      this.current_status = this.nextTask[this.currentIndex].status;
      
      console.log('Valor atual de currentIndex:', this.currentIndex);
    }
  }
  onTaskToggledDown() {
    console.log('Cliquei no botão');
    console.log('Valor atual de currentIndex:', this.currentIndex);

    if (this.currentIndex > 0) {
      console.log("Entrei no if");
      this.current_id = this.nextTask[this.currentIndex - 1].id;
      this.current_name = this.nextTask[this.currentIndex - 1].name;
      this.current_deadline = this.nextTask[this.currentIndex - 1].deadline;
      this.current_cost = this.nextTask[this.currentIndex - 1].cost;
      this.current_description = this.nextTask[this.currentIndex - 1].description;
      this.current_status = this.nextTask[this.currentIndex - 1].status;
      this.currentIndex--;
      console.log('Valor atual de currentIndex:', this.currentIndex);
    } else {
      this.currentIndex = this.nextTask.length - 1;

      console.log("Valor do currentIndex antes da operação: ", this.currentIndex);
      
      this.current_id = this.nextTask[this.currentIndex].id;
      this.current_name = this.nextTask[this.currentIndex].name;
      this.current_deadline = this.nextTask[this.currentIndex].deadline;
      this.current_cost = this.nextTask[this.currentIndex].cost;
      this.current_description = this.nextTask[this.currentIndex].description;
      this.current_status = this.nextTask[this.currentIndex].status;

      console.log('Valor atual de currentIndex:', this.currentIndex);
    }
  }

   onEditMode(id: number){
     this.editTaskId = id;
  //   this.editName = this.nextTask.find((task) => task.id === id)?.name || '';
  //   this.editCost = this.nextTask.find((task) => task.id === id)?.cost || '';
  //   this.editDeadline = this.nextTask.find((task) => task.id === id)?.deadline || '';
  //   this.editDescription = this.nextTask.find((task) => task.id === id)?.description || '';

  //   console.log("Descrição: ", this.editDescription);
  }

  onDeleteTask(id: number){

    console.log("Cliquei no botão");
    
    if(confirm("Tem certeza que deseja excluir a tarefa?"))
      this.taskService.deleteTask(id).subscribe({
        next: (res: any) => {
          console.log('Tarefa excluída com sucesso', res);
          this.nextTask = this.nextTask.filter((task) => task.id !== id);
          this.cdr.detectChanges();
          console.log("Task: ", this.tasks);
        },
        error: (error: any) => {
          console.error('Erro ao excluir a tarefa', error);
        }
      });
  }

  onSubmitEdit(id:number){
    console.log("Cliquei no Botão");
    this.cdr.detectChanges();

    

   const task = this.tasks.find((task) => task.id === id);

    console.log("dados editados: ", task);
    

    this.taskService.putTask(task.id, task).subscribe({
      next: (res: any) => {
        console.log('Tarefa atualizada com sucesso', res);
        
      },
      error: (error: any) => {
        console.error('Erro ao atualizar a tarefa', error);
      }
    });

    this.editTaskId = null;
  }


  onCancelEdit(){
    this.editTaskId = null;
    
  }
}
