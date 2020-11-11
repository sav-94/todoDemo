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


@NgModule({
  declarations: [
    AppComponent,
    TodolistComponent,
    NavbarComponent,
    ShowInsertedComponent,
    TodoDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AngularMaterialModule,
    MatTabsModule,
    BrowserAnimationsModule,



  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
