import { Component, OnInit } from '@angular/core';
import { MatCalendarCellCssClasses } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { TodoManagementService } from '../service/todo-management.service';
import { ShowInsertedComponent } from '../show-inserted/show-inserted.component';
import { TodoDialogComponent } from '../todo-dialog/todo-dialog.component';

@Component({
  selector: 'app-todo-calendar',
  templateUrl: './todo-calendar.component.html',
  styleUrls: ['./todo-calendar.component.css']
})
export class TodoCalendarComponent implements OnInit {
  todoDate = [];
  selectedDate : any;
  todoArray = [];

  constructor(public todoService : TodoManagementService, public dialog: MatDialog) {
    this.todoDate = this.todoService.getDates();
    this.todoArray=this.todoService.getTodoArray();
  }

  ngOnInit(): void {
  }

  dateClass() {

    return (date: Date) :  MatCalendarCellCssClasses => {
     const highlightDate = this.todoDate
     .map(strDate => new Date(strDate.date))
     .some(d => d.getDate() === date.getDate() && d.getMonth() === date.getMonth() && d.getFullYear() === date.getFullYear())

   return highlightDate ? 'special-date' : '';
   };


 }

 openDialog(todo){
  const dialogRef = this.dialog.open(TodoDialogComponent, {
    data: { todo },
  });

  dialogRef.afterClosed().subscribe(result => {
  });


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
