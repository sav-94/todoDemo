import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { etichette } from '../models/etichette';
import { Todo } from '../models/todo';
import { TodoManagementService } from '../service/todo-management.service';
import firebase from 'firebase/app';
@Component({
  selector: 'app-add-todo-dialog',
  templateUrl: './add-todo-dialog.component.html',
  styleUrls: ['./add-todo-dialog.component.css']
})
export class AddTodoDialogComponent implements OnInit {

  user : Observable<firebase.User>;
  userId : string = null;
  title : string;
  description : string;
  labels : etichette[];
  color = null;
  todoList;
  submitted = false;
  todoArray = [];
  date = null;
  model = new Todo (1,'','','',false, this.date);
  displayTodo = [];
  email: string;
  password: string;
  model_with_timestamp;
  selectedValue : string = null ;

  constructor(private todoService: TodoManagementService) {
    this.userId=this.todoService.userId;
    console.log('on constructor of todolist userid: '+this.userId);
   }

   ngOnInit(): void {
    this.todoList = this.todoService.getTodoList();
    this.labels=this.todoService.labels;
  }

  onDate(event) {
    console.log("i'm in onDate");
    this.model.date=event;
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
      this.model_with_timestamp.label = this.selectedValue;

      for(const element of this.labels){
        if(element.name === this.selectedValue){
          this.color = element.color;
        }
      }

      this.model_with_timestamp.color = this.color;
      console.log(this.color);
      console.log(this.model_with_timestamp.label);
      this.todoService.addTodo(this.model_with_timestamp);
      this.selectedValue= null;
      this.model = new Todo(this.todoService.todoArray.length+1,'','','',false,null);
      for(const value of this.todoArray){
        console.log('id:'+ value.id + ' ,title: '+ value.title +" description: "+value.description);
      }
    }

}

}
