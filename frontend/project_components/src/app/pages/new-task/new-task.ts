import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService } from '../../services/task';

@Component({
  selector: 'app-new-task',
  imports: [ReactiveFormsModule],
  templateUrl: './new-task.html',
  styleUrl: './new-task.css',
})
export class NewTask {
  taskForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', [Validators.required]),
    deadline: new FormControl(''),
    cost: new FormControl(''),
    urlImage: new FormControl('')
  });

  constructor(private router: Router, private taskService: TaskService) {}


  
  onSubmit() {
    if (this.taskForm.valid) {
      const newTask = this.taskForm.value;
      // Here you would typically send the new task to your backend API
      const { name, description, deadline, cost, urlImage } = newTask;

      const taskReq = {
        name : name,
        description : description,
        deadline: deadline,
        cost : cost,
        urlImage: urlImage
      }
      

      this.taskService.createTask(taskReq).subscribe({
        next: () => {
          console.log('Task created successfully');
        },
        error: (error) => {
          console.error('Error creating task', error);
        }
      })
      // After saving the task, navigate back to the task list
      this.router.navigate(['/tasks']);
    }
  }
} 