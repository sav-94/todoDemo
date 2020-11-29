import { Component, Inject, OnInit } from '@angular/core';
import { MatCalendarCellCssClasses } from '@angular/material/datepicker';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TodoManagementService } from '../service/todo-management.service';
import { TodoDialogComponent } from '../todo-dialog/todo-dialog.component';

@Component({
  selector: 'app-dialog-calendar',
  templateUrl: './dialog-calendar.component.html',
  styleUrls: ['./dialog-calendar.component.css']
})
export class DialogCalendarComponent implements OnInit {
  todoDate = [];
  selectedDate : any;
  todoArray = [];
  showDelete : boolean = false;

  constructor(public dialog : MatDialog, public todoService : TodoManagementService, public dialogRef: MatDialogRef<DialogCalendarComponent>,
    @Inject(MAT_DIALOG_DATA) public data : any) {
        this.todoDate = this.todoService.getDates();
        this.todoArray=this.todoService.getTodoArray();
     }


  ngOnInit(): void {
    this.todoDate = this.todoService.getDates();
    this.todoArray=this.todoService.getTodoArray();
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
    data: { todo, delete : this.showDelete},
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


  closeDialog() {
    this.dialogRef.close({ event: 'close'});
  }

}
