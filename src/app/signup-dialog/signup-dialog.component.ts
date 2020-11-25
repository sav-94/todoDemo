import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-signup-dialog',
  templateUrl: './signup-dialog.component.html',
  styleUrls: ['./signup-dialog.component.css']
})
export class SignupDialogComponent implements OnInit {
  email : string;
  password: string;

  constructor(public cloud : AuthService,public dialogRef: MatDialogRef<SignupDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data : any) {

     }

  ngOnInit(): void {
  }

  closeDialog() {
    this.cloud.doSignup(this.email,this.password);
    this.dialogRef.close({ event: 'close'});
  }

}
