import { Component, OnInit, ViewChild, ViewEncapsulation, ɵConsole } from '@angular/core';
import { TodoManagementService } from '../service/todo-management.service';
import {Todo} from '../models/todo';
import {MatDialog} from '@angular/material/dialog';
import {TodoDialogComponent} from '../todo-dialog/todo-dialog.component';
import { MatCalendar, MatCalendarCellClassFunction, MatCalendarCellCssClasses } from '@angular/material/datepicker';
import { formatWithOptions } from 'util';
import { Router } from '@angular/router';





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
  public disabled : boolean =false;
  userId;
  todoTemp: any;


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
              checked : snapshot.payload.child('checked').val(),
              key : snapshot.key
            }
          });
          this.todoService.todoArray=this.todoArray;
      const tempDate = snapshots.map( snapshot =>{
        return {
          date : new Date(snapshot.payload.child('date').val()),
        }
      })





     this.todoService.todoDate=tempDate;

     this.todoDate.forEach(element =>{
       console.log(this.todoDate.length +" ... "+ element.date.getDate());
     })
     this.dateClass();
      });



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
      data: { todo },
    });

    dialogRef.afterClosed().subscribe(result => {
    });


  }


  ngOnInit(): void {


    this.todoChecked=this.todoService.getChecked();
    this.todoDate=this.todoService.getDates();


  }


  cancelTodo(keyofTodo : string){
    this.todoService.deleteTodo(keyofTodo);
    const dateToDelete = new Date(this.todoArray.find(todo => todo.key === keyofTodo).date);
    console.log(' data da eliminare' +dateToDelete);
    const indiceDate = this.todoDate.indexOf(dateToDelete);
    if(indiceDate !== -1){
      this.todoDate.splice(indiceDate,1);
    }
    this.router.navigate(['/show-inserted']);

  }

  checkedTodo(todo){
    todo.checked = true;
    this.todoService.onCheck(todo);
    console.log(this.todoChecked.length);
  }

  cancelChecked(keyofTodo){
    this.todoService.deleteChecked(keyofTodo);
  }




  dateClass() {

     return (date: Date) :  MatCalendarCellCssClasses => {
      const highlightDate =   this.todoDate
      .map(strDate => new Date(strDate.date))
      .some(d => d.getDate() === date.getDate() && d.getMonth() === date.getMonth() && d.getFullYear() === date.getFullYear())

    return highlightDate ? 'special-date' : '';
    };


  }



  onSelect(event){
    this.selectedDate=event;
    console.log(this.selectedDate);
    for(const element of this.todoDate){
      if(this.selectedDate.getDate() === element.date.getDate() && this.selectedDate.getMonth() === element.date.getMonth() && this.selectedDate.getFullYear() === element.date.getFullYear())
        {

         this.openDialog(this.todoArray.find(todo => todo.date ===element.date.getTime()));
        }
    }
  }


}



