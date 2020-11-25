import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { TodoManagementService } from '../service/todo-management.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  userId = null;
  email = null;
  username = null;
  constructor( private authService : AuthService, public todoService: TodoManagementService) {
    this.authService.afAuth.authState.subscribe(user => {
      if(user){
        this.userId =user.uid;
        this.email = user.email;
      }else{
        this.userId= null;
        this.email = null;
      }
    })

  }

  ngOnInit(): void {
  }

  doLogout(){
    this.authService.doLogout();
  }

}
