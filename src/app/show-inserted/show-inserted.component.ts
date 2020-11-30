import { Component, OnInit, ViewChild, ViewEncapsulation, ɵConsole } from '@angular/core';
import { TodoManagementService } from '../service/todo-management.service';
import {Todo} from '../models/todo';
import {MatDialog} from '@angular/material/dialog';
import {TodoDialogComponent} from '../todo-dialog/todo-dialog.component';
import { MatCalendar, MatCalendarCellClassFunction, MatCalendarCellCssClasses } from '@angular/material/datepicker';
import { formatWithOptions } from 'util';
import { Router } from '@angular/router';
import {etichette} from '../models/etichette';
import { MatList } from '@angular/material/list';
import { DialogCalendarComponent } from '../dialog-calendar/dialog-calendar.component';
import { AddTodoDialogComponent } from '../add-todo-dialog/add-todo-dialog.component';


@Component({
  selector: 'app-show-inserted',
  templateUrl: './show-inserted.component.html',
  styleUrls: ['./show-inserted.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ShowInsertedComponent implements OnInit {
  @ViewChild(MatCalendar) _datePicker: MatCalendar<Date>;
  todoArray = [];
  todoChecked =[];
  todoDate =[];
  elencoDate = [];
  selectedDate : any;
  checked : boolean = false;
  public disabled : boolean =false;
  userId;
  todoTemp: any;
  showDelete : boolean = true;
  listaEtichette = [
    {name : 'All'},
    {name : 'shopping'},
    {name : 'hobby'},
    {name : 'work'},
    {name : 'free time'},
    {name : 'important'},
    {name : 'food'},
    {name : 'games'}

  ];
  etichetta : string = null;
  displayArray =[];
  isEmpty : boolean = true;
  todoTitle : string  =null;

  constructor(private todoService : TodoManagementService,public dialog: MatDialog, public router : Router) {
    this.userId=this.todoService.userId;
    this.todoService.getTodoList().subscribe(snapshots => {

    this.todoArray = snapshots.map( snapshot =>{
            return {
              id : snapshot.payload.child('id').val(),
              description : snapshot.payload.child('description').val(),
              title : snapshot.payload.child('title').val(),
              uid : snapshot.payload.child('uid').val(),
              date : snapshot.payload.child('date').val(),
              color : snapshot.payload.child('color').val(),
              etichetta : snapshot.payload.child('label').val(),
              checked : snapshot.payload.child('checked').val(),
              key : snapshot.key
            }
          }).filter (s => s.uid ===this.userId);
          this.todoService.todoArray=this.todoArray;

      const tempDate = this.todoArray.map( todo =>{
        return {
          date : new Date(todo.date),
        }
      })

     this.todoService.todoDate=tempDate;
     this.displayArray=this.todoArray;
     console.log(this.displayArray.length);
     console.log(this.todoArray.length);
     for(const element of this.todoDate){
       console.log(element.date);
     }

     this.dateClass();
      });

 // this.todoChecked non mi serve più perche non ho due pagine ma una in cui gli elementi completati sono checkati
 //devo solo discriminare il checked dal non checked ma credo che lo si possa fare

      this.todoService.getTodolistCompleted().subscribe(snapshots => {

        this.todoChecked = snapshots.map( snapshot =>{
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
  }

  openDialog(todo){
    const dialogRef = this.dialog.open(TodoDialogComponent, {
      width: '30%',
      data: { todo , delete : false, showDelete: this.showDelete }


    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result.delete);
        if (result.delete == true){
          this.cancelTodo(todo.key);
        }
    });
  }


  openAddDialog(){
    const dialogRef = this.dialog.open(AddTodoDialogComponent, {
      width: '30%'
    });


  }


  ngOnInit(): void {
    this.displayArray=this.todoArray;
    this.todoChecked=this.todoService.getChecked();
    this.todoDate=this.todoService.getDates();
  }


  filterByEtichetta(label){
    if(label === "All"){
      this.displayArray=this.todoArray;
      console.log(this.displayArray.length);
    }else{
      this.displayArray = this.todoArray.filter(todo => todo.etichetta.indexOf(label) > -1);
    }
  }

  filterByTitle(title){
    if(title === ""){
      this.displayArray=this.todoArray;
      console.log(this.displayArray.length);
    }else{
      this.displayArray = this.todoArray.filter(todo => todo.title.indexOf(title) > -1);
    }
  }

  cancelTodo(keyofTodo : string){
    this.todoService.deleteTodo(keyofTodo);
    const dateToDelete = new Date(this.todoArray.find(todo => todo.key === keyofTodo).date);
    console.log(' data da eliminare' +dateToDelete);
    const indiceDate = this.todoDate.indexOf(dateToDelete);
    if(indiceDate !== -1){
      this.todoDate.splice(indiceDate,1);
    }
  }

  checkedTodo(todo){
    todo.checked = !todo.checked;
    console.log(todo.checked);
    this.todoService.checkTodo(todo);
    // non mi servono più due array
    //this.todoService.onCheck(todo);
    console.log(this.todoChecked.length);
  }

  cancelChecked(keyofTodo){
    this.todoService.deleteChecked(keyofTodo);
  }




  dateClass() {
     return (date: Date) :  MatCalendarCellCssClasses => {
      const highlightDate =  this.todoDate
      .map(strDate => new Date(strDate.date))
      .some(d => d.getDate() === date.getDate() && d.getMonth() === date.getMonth() && d.getFullYear() === date.getFullYear())
      console.log(date);
    return highlightDate ? 'special-date' : '';

    };


  }



  onSelect(event){
    this.selectedDate=event;
    console.log(this.selectedDate);
    console.log(this.selectedDate);
    for(const element of this.todoArray){
      if(this.selectedDate.getDate() === element.date.getDate() && this.selectedDate.getMonth() === element.date.getMonth() && this.selectedDate.getFullYear() === element.date.getFullYear())
        {

         this.openDialog(this.todoArray.find(todo => todo.date ===element.date.getTime()));
        }
    }
  }


  openCalDialog(){
    const dialogRef = this.dialog.open(DialogCalendarComponent, {
      width: '40%',
    });

  }

}



