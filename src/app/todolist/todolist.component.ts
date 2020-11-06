import { Component, OnInit } from '@angular/core';
import { element } from 'protractor';
import {Todo} from './todo';
import {AngularMaterialModule} from '../angular-material.module';
import {TodoManagementService} from '../todo-management.service';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit {


  constructor(private todoService: TodoManagementService) { }
  submitted = false;
  todoArray = [];
  model = new Todo (1,'','',false);
  displayTodo = [];
  ngOnInit(): void {
  }

  onSubmit() {
    if(this.model.title== 'Inserisci il titolo'){
    }else{
      this.submitted = true;
      console.log(this.model.title);

      this.todoService.addTodo(this.model);
      //this.todoArray.push(this.model);
      console.log(this.todoArray.length);
      this.model = new Todo(this.todoService.todoArray.length+1,'','',false);
      //this.displayTodo=this.todoArray.values();
      for(const value of this.todoArray){
        console.log('id:'+ value.id + ' ,title: '+ value.title +" description: "+value.description);
      }
    }

}

  cancelTodo(todo: Todo){
    this.todoService.deleteTodo(todo);
  }
}

