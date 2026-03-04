import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserServices } from '../../services/user-services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password-reset',
  imports: [ReactiveFormsModule],
  templateUrl: './password-reset.html',
  styleUrl: './password-reset.css',
})
export class PasswordReset {
  passwordForm = new FormGroup({
    login: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  constructor(private userServices: UserServices, private router: Router) {}

  onSubmit(){
    if (this.passwordForm.valid) {
      const {login, password, confirmPassword } = this.passwordForm.value;

      if (password !== confirmPassword) {
        alert('As senhas não coincidem. Por favor, verifique e tente novamente!');
        return;
      }

      // Call the AuthService to reset the password
      this.userServices.updatePassword(login!, password!, confirmPassword!).subscribe({
        next: () => {
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('Erro ao redefinir senha:', err);
          alert('Ocorreu um erro ao redefinir a senha. Por favor, tente novamente.');
        }
      });
    }
  }
}
