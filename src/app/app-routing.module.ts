import { NgModule } from '@angular/core';
import {  RouterModule } from '@angular/router';
import { TodolistComponent } from './todolist/todolist.component';
import {ShowInsertedComponent} from './show-inserted/show-inserted.component';
import {TodoLoginComponent} from './todo-login/todo-login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { Routes, CanActivate } from '@angular/router';
import { AuthGuard } from './service/guard/auth.guard';
import { TodoCalendarComponent } from './todo-calendar/todo-calendar.component';


const routes: Routes = [
  {path: '', component: ShowInsertedComponent},
  {path: 'todolist', component: TodolistComponent, canActivate: [AuthGuard]},
  {path: 'todo-login', component: TodoLoginComponent},
  {path: 'todo-calendar', component : TodoCalendarComponent, canActivate: [AuthGuard]},
  {path: 'show-inserted', component: ShowInsertedComponent, canActivate : [AuthGuard]}




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
