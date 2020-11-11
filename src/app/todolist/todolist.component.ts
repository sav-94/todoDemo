import { Component, OnInit } from '@angular/core';
import { element } from 'protractor';
import {Todo} from './todo';
import {AngularMaterialModule} from '../angular-material.module';
import {TodoManagementService} from '../todo-management.service';
import { dateInputsHaveChanged } from '@angular/material/datepicker/datepicker-input-base';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit {


  constructor(private todoService: TodoManagementService) { }
  submitted = false;
  todoArray = [];
  date = null;
  model = new Todo (1,'','',false, this.date);
  displayTodo = [];


  ngOnInit(): void {

  }

  onSubmit() {
    if(this.model.title== 'Inserisci il titolo'){
    }else{
      this.submitted = true;
      console.log(this.model.title +" "+ this.model.date);
      const newDate = new Date();
      this.todoService.addTodo(this.model);
      console.log(this.model.date.getMonth());
      this.model = new Todo(this.todoService.todoArray.length+1,'','',false,newDate);
      for(const value of this.todoArray){
        console.log('id:'+ value.id + ' ,title: '+ value.title +" description: "+value.description);
      }
    }

}

  cancelTodo(todo: Todo){
    this.todoService.deleteTodo(todo);
  }

  onDate(event) {
    this.model.date=event;
  }
}


 /*dateClass : MatCalendarCellClassFunction<Date> = (cellDate, view) => {
      if(view === 'month'){
        const date = cellDate.getDate();
      return (date ===1 || date ===20) ? 'special-date' : '';
      }
      return '';
    }*/
