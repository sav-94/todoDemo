import { Component, OnInit } from '@angular/core';
import { TodoManagementService } from '../todo-management.service';
import {Todo} from '../todolist/todo';
import {MatDialog} from '@angular/material/dialog';
import {TodoDialogComponent} from '../todo-dialog/todo-dialog.component';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';


@Component({
  selector: 'app-show-inserted',
  templateUrl: './show-inserted.component.html',
  styleUrls: ['./show-inserted.component.css']
})
export class ShowInsertedComponent implements OnInit {
  todoArray = [];
  todoChecked =[];
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
}



