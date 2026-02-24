import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginForm = new FormGroup({
    login: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (this.loginForm.valid) {
      const { login, password } = this.loginForm.value;
      this.authService.login(login!, password!).subscribe({
        next: () => {
          this.router.navigate(['/Dashboard']);
        },
        error: (err) => {
          console.error('Login falhou', err);
          alert('Erro ao fazer login. Verifique suas credenciais e tente novamemente!');
        },
      });
    }
  }
}
