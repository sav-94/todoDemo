import { NgModule } from '@angular/core';
import {  RouterModule } from '@angular/router';
import {ShowInsertedComponent} from './show-inserted/show-inserted.component';
import {TodoLoginComponent} from './todo-login/todo-login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { Routes, CanActivate } from '@angular/router';
import { AuthGuard } from './service/guard/auth.guard';


const routes: Routes = [
  {path: '', component: ShowInsertedComponent},
  {path: 'todo-login', component: TodoLoginComponent},
  {path: 'show-inserted', component: ShowInsertedComponent, canActivate : [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
