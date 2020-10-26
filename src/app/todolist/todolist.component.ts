import { Component, OnInit } from '@angular/core';
import {Todo} from './todo';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit {
  inputTodo ='';
  todo: Todo;
  todoArray = [];
  constructor() { }

  ngOnInit(): void {
  }

  addTodo(todo){
    if(this.todo.name!==""){
      this.todoArray.push(todo);
      console.log(todo.value);
      this.todo = "";
    }else{
      alert('inserire todo');
    }
  }

  deleteTodo(todo){
    for(let i=0;i<this.todoArray.length; i++){
      if(todo== this.todoArray[i]){
        this.todoArray.splice(i,1);
      }
    }
  }

  todoSubmit(todo){
    if(this.todo.name!==""){
   this.todoArray.push(todo);
    console.log(todo);
    this.todo = "";
   }else{
     alert('campo richiesto **');
   }
  }
}
