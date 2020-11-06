import { Injectable } from '@angular/core';
import {Todo} from './todolist/todo';
import {Observable,of} from 'rxjs';


@Injectable({
  providedIn: 'root'
})


export class TodoManagementService {

  todoArray = [];
  todoChecked = [];
  constructor() { }

  addTodo(todo: Todo){
    this.todoArray.push(todo);
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
}
