import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodolistComponent } from './todolist/todolist.component';
import {ShowInsertedComponent} from './show-inserted/show-inserted.component';
const routes: Routes = [
  {path: 'todolist' , component: TodolistComponent},
  {path: 'show-inserted', component: ShowInsertedComponent },
  {path: '', redirectTo: 'todolist', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
