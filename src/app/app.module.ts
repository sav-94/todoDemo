import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule} from '@angular/forms';

import { TodolistComponent } from './todolist/todolist.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AngularMaterialModule} from './angular-material.module';
import { ShowInsertedComponent } from './show-inserted/show-inserted.component';
import {MatTabsModule} from '@angular/material/tabs';
import { TodoDialogComponent } from './todo-dialog/todo-dialog.component';

import {AngularFireModule} from '@angular/fire';
import {AngularFirestore, AngularFirestoreModule} from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { TodoLoginComponent } from './todo-login/todo-login.component';
import { SignupDialogComponent } from './signup-dialog/signup-dialog.component';
import { TodoCalendarComponent } from './todo-calendar/todo-calendar.component';

@NgModule({
  declarations: [
    AppComponent,
    TodolistComponent,
    NavbarComponent,
    ShowInsertedComponent,
    TodoDialogComponent,
    TodoLoginComponent,
    SignupDialogComponent,
    TodoCalendarComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AngularMaterialModule,
    MatTabsModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),




  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
