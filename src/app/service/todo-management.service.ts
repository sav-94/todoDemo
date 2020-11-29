import { Injectable } from '@angular/core';
import {Todo} from '../models/todo';
import { AngularFireDatabase, AngularFireList, AngularFireObject} from '@angular/fire/database';
import { AuthService } from './auth.service';
import {formatDate} from '@angular/common';
import { Observable } from 'rxjs';
import {etichette} from '../models/etichette';

@Injectable({
  providedIn: 'root'
})


export class TodoManagementService {

  todoArray = [];
  todoChecked = [];
  todoDate= [];
  userId : string;
  todoList : AngularFireList<Todo> = null;
  todoCompleted : AngularFireList<Todo> = null;
  labels : etichette [] = [
    {name: "All"},
    {name: "shopping"},
    {name: "hobby"},
    {name: "work"},
    {name: "free time"},
    {name: "important"},
    {name: "food"},
    {name: "games"},
  ]
  constructor(private authService : AuthService, private db : AngularFireDatabase) {
    this.authService.afAuth.authState.subscribe(user => {
      if(user) this.userId =user.uid;
    })
   }

  getTodoList(){
    this.todoList = this.db.list('/todolist');
    return this.todoList.snapshotChanges();
  }

  getTodolistCompleted(){
    this.todoCompleted = this.db.list('/completed');
    return this.todoCompleted.snapshotChanges();
  }


  updateTodo(todo){
    console.log(' Sono nel updateTodo' + todo.key);
    this.todoList.update(todo.key, {
      description : todo.description,
      title : todo.title,
      date: todo.date.getTime()
    })

  }

  checkTodo(todo){
    console.log(' Sono nel updateTodo' + todo.key);
    this.todoList.update(todo.key, {
      description : todo.description,
      title : todo.title,
      checked : todo.checked
    })

  }



  addTodo(todo){
    this.todoList.push(todo);
  }

  getTodos() {
    this.getTodoList().subscribe(snapshots => {
      this.todoArray = snapshots.map( snapshot =>{
        return {
          id : snapshot.payload.child('id').val(),
          description : snapshot.payload.child('description').val(),
          title : snapshot.payload.child('title').val(),
          uid : snapshot.payload.child('uid').val(),
          date : snapshot.payload.child('date').val(),
          checked : snapshot.payload.child('checked').val(),
          key : snapshot.key
        }
      });
    });
       /*
        const milliseconds = snapshot.date *1000;
        const date = new Date(milliseconds);
        add this date nell'array per visualizzare i giorni in cui ci sono impegni sul calendario


        */
    return this.todoArray;
  }

  searchTodo(todoKey : string){
    return this.todoArray.indexOf(todoKey);
  }

  deleteTodo(todoKey : string){
    this.todoList.remove(todoKey);

  }

  onCheck(todo){
    /*
    const valore : boolean = todo.checked;
    if( valore == false){
      todo.checked=true;
      this.todoChecked.push(todo);
      //this.deleteTodo(todo);
    }else{
      todo.checked=false;
      const indice: number = this.todoChecked.indexOf(todo);
      if(indice !== -1){
        this.todoChecked.splice(indice,1);
      }
    }
*/
    this.deleteTodo(todo.key);
    this.todoCompleted.push(todo);
  }

  getChecked() {
    return this.todoChecked;
  }

  deleteChecked(todoKey : string){
    this.todoCompleted.remove(todoKey);
  }

  addDate(todo: Todo){
    this.todoDate.push(todo.date);
  }

  getDates(){
    return this.todoDate;

  }

  getTodoArray(){
    return this.todoArray;
  }



}
