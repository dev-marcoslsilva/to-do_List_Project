import { Component } from '@angular/core';
import { ReactiveFormsModule,  FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';


@Component({
  selector: 'app-user_register',
  imports: [ReactiveFormsModule],
  templateUrl: './user_register.html',
  styleUrl: './user_register.css',
})
 export class UserRegister {

  rangePercent: number = 0;

  registerForm = new FormGroup({
    login: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirmedPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
    name: new FormControl('', [Validators.required]),
    tasks: new FormControl<number | null>(null, {
      validators: [Validators.required, Validators.min(5)]
    })
  });

  constructor(private router: Router, private authService: AuthService){}



  onSubmit(){
    if (this.registerForm.valid) {
      const {login, password, confirmedPassword, name, tasks} = this.registerForm.value;

      if (password != confirmedPassword) {
        alert('As senhas não coincidem. Por favor, verifique e tente novamente!');
      }else{
          this.authService.newUser(login!, password!, name!, tasks!).subscribe({
            next: ()=>{
              alert('Usuário criado com sucesso!');
              this.router.navigate(['/login']);
            },
            error: (err) => {
              console.error('Erro ao criar usuário:', err);
              alert('Ocorreu um erro ao criar o usuário. Por favor, tente novamente.');
            }
          });
      }
    }
  }

  updateRange(event: Event){
    const input = event.target as HTMLInputElement;

    const min = Number(input.min);
    const max = Number(input.max);
    const value = Number(input.value);

    this.rangePercent = ((value - min) * 100) / (max - min);
  }
}
