import { Component, OnInit, ViewChild, ViewEncapsulation, ɵConsole } from '@angular/core';
import { TodoManagementService } from '../todo-management.service';
import {Todo} from '../todolist/todo';
import {MatDialog} from '@angular/material/dialog';
import {TodoDialogComponent} from '../todo-dialog/todo-dialog.component';
import { MatCalendar, MatCalendarCellClassFunction, MatCalendarCellCssClasses } from '@angular/material/datepicker';


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
  constructor(private todoService : TodoManagementService,public dialog: MatDialog) { }

  openDialog(todo: Todo){
    const dialogRef = this.dialog.open(TodoDialogComponent, {
      disableClose: true,
      data: { todo },
    });

    dialogRef.afterClosed().subscribe(result =>
    todo = result.data.todo);
  }


  ngOnInit(): void {
    this.todoArray= this.todoService.getTodos();
    this.todoChecked=this.todoService.getChecked();
    this.todoDate=this.todoService.getDates();
    this.dateClass();

    console.log('TODO DATE IS ' +this.todoDate);

  }


  cancelTodo(todo: Todo){
    this.todoService.deleteTodo(todo);

  }

  checkedTodo(todo: Todo){
    this.todoService.onCheck(todo);
    console.log(this.todoChecked.length);
  }

  cancelChecked(todo:Todo){
    this.todoService.deleteChecked(todo);
  }


  dateClass() {
    return (date: Date): MatCalendarCellCssClasses => {
      const highlightDate = this.todoDate
      .map(strDate => new Date(strDate))
      .some(d => d.getDate() === date.getDate() && d.getMonth() === date.getMonth() && d.getFullYear() === date.getFullYear());

    return highlightDate ? 'special-date' : '';


    };
  }

  onSelect(event){
    this.selectedDate=event;
    console.log(this.selectedDate);
    for(const element of this.todoDate){
      if(this.selectedDate.getDate() === element.getDate() && this.selectedDate.getMonth() === element.getMonth() && this.selectedDate.getFullYear() === element.getFullYear())
        {
         this.openDialog(this.todoArray.find(todo => todo.date.getDate()===element.getDate() && todo.date.getMonth() === element.getMonth() && todo.date.getFullYear()===element.getFullYear()));
        }
    }
  }


}



