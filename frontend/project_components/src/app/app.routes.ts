import { Routes } from '@angular/router';
import {Login} from './pages/login/login';
import {UserRegister} from "./pages/user_register/user_register";

export const routes: Routes = [
    {path: 'login', component: Login},
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'register', component: UserRegister}
];
