import { Component, OnInit } from '@angular/core';
import { SignupDialogComponent } from '../signup-dialog/signup-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import { AuthService } from '../service/auth.service';


@Component({
  selector: 'app-todo-login',
  templateUrl: './todo-login.component.html',
  styleUrls: ['./todo-login.component.css']
})
export class TodoLoginComponent implements OnInit {
  email: string;
  password: string;


  constructor( public cloud : AuthService, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  login(){
    this.cloud.doLogin(this.email,this.password);
    this.email = this.password ='';

  }

  openDialog(){
    const dialogRef = this.dialog.open(SignupDialogComponent, {
    });
    }
}
