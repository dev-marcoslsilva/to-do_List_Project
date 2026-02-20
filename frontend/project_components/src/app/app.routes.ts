import { Routes } from '@angular/router';
import {Login} from './pages/login/login';
import {UserRegister} from "./pages/user_register/user_register";
import { PasswordReset } from './pages/password-reset/password-reset';
import {NewTask} from './pages/new-task/new-task';

export const routes: Routes = [
    {path: 'login', component: Login},
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'register', component: UserRegister},
    {path: 'newPassword', component: PasswordReset},
    {path: 'newTask', component: NewTask}
];
