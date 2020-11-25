import { Component, OnInit } from '@angular/core';
import { element } from 'protractor';
import {BrowserModule} from '@angular/platform-browser';
import {Todo} from '../models/todo';
import {AngularMaterialModule} from '../angular-material.module';
import {TodoManagementService} from '../service/todo-management.service';
import { dateInputsHaveChanged } from '@angular/material/datepicker/datepicker-input-base';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { MatDialog } from '@angular/material/dialog';
import { SignupDialogComponent } from '../signup-dialog/signup-dialog.component';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit {
  user : Observable<firebase.User>;
  userId : string;
  title : string;
  description : string;

  constructor(private todoService: TodoManagementService) {
    this.userId=this.todoService.userId;
    console.log('on constructor of todolist userid: '+this.userId);
   }

  todoList;
  submitted = false;
  todoArray = [];
  date = null;
  model = new Todo (1,'','','',false, this.date);
  displayTodo = [];
  email: string;
  password: string;
  model_with_timestamp;
  ngOnInit(): void {
    this.todoList = this.todoService.getTodoList();
  }

  onSubmit() {
    if(this.model.title== 'Inserisci il titolo'){
    }else{
      this.submitted = true;
      console.log(this.model.title +" "+ this.model.date);
      const newDate = new Date();
      this.model.uid=this.userId;
      console.log(this.model.uid);
      this.model_with_timestamp=this.model;
      this.model_with_timestamp.date = this.model_with_timestamp.date.getTime();
      this.todoService.addTodo(this.model_with_timestamp);
      this.model = new Todo(this.todoService.todoArray.length+1,'','','',false,newDate);
      for(const value of this.todoArray){
        console.log('id:'+ value.id + ' ,title: '+ value.title +" description: "+value.description);
      }
    }

}


  onDate(event) {
    this.model.date=event;
  }
}

