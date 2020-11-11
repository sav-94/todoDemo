import { Injectable } from '@angular/core';
import {Todo} from './todolist/todo';
import {Observable,of} from 'rxjs';
import {ShowInsertedComponent} from './show-inserted/show-inserted.component';
import { MatCalendarCellCssClasses } from '@angular/material/datepicker';

@Injectable({
  providedIn: 'root'
})


export class TodoManagementService {

  todoArray = [];
  todoChecked = [];
  todoDate=[];
  constructor() { }

  addTodo(todo: Todo){
    this.todoArray.push(todo);
    this.addDate(todo);

  }

  getTodos() {
    return this.todoArray;
  }

  searchTodo(todo: Todo){
    return this.todoArray.indexOf(todo);
  }

  deleteTodo(todo: Todo){
    const indice: number = this.searchTodo(todo);
    if( indice !==-1){
      this.todoArray.splice(indice,1);
    }
  }

  onCheck(todo: Todo){
    const valore : boolean = todo.checked;
    if( valore == false){
      todo.checked=true;
      this.todoChecked.push(todo);
      this.deleteTodo(todo);
    }else{
      todo.checked=false;
      const indice: number = this.todoChecked.indexOf(todo);
      if(indice !== -1){
        this.todoChecked.splice(indice,1);
      }
    }


  }

  getChecked() {
    return this.todoChecked;
  }

  deleteChecked(todo: Todo){
    const indice: number = this.todoChecked.indexOf(todo);
      if(indice !== -1){
        this.todoChecked.splice(indice,1);
  }
  }

  addDate(todo: Todo){
    this.todoDate.push(todo.date);
  }

  getDates(){
    return this.todoDate;

  }




}
