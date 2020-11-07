import { Component, OnInit, Inject } from '@angular/core';
import {Todo} from '../todolist/todo';
import {MAT_DIALOG_DATA,MatDialogRef} from '@angular/material/dialog';
import {TodoManagementService} from '../todo-management.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'app-todo-dialog',
  templateUrl: './todo-dialog.component.html',
  styleUrls: ['./todo-dialog.component.css']
})
export class TodoDialogComponent implements OnInit {
  todoDialog : Todo ;
  fromDialog : Todo;
  constructor(
    public dialogRef: MatDialogRef<TodoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data : any
  ) {
    this.todoDialog=this.data.todo;
   }

  ngOnInit(): void {

  }

  closeDialog() {
    this.fromDialog=this.todoDialog;
    this.dialogRef.close({ event: 'close', data: this.fromDialog });
  }

  onDate(event){
    this.todoDialog.date=event;
  }

}
