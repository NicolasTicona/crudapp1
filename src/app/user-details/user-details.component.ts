import { User } from './../Models/user';
import { UserService } from './../Services/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalUserComponent } from './../modal-user/modal-user.component';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  user = new User();

  private id:string;
  constructor(
      private activatedRoute: ActivatedRoute,
      private userService: UserService,
      public dialog: MatDialog) {
   }

   openDialog(){
    const dialogRef = this.dialog.open(ModalUserComponent, {
      width: '800px',
      data: this.user
    })

    console.log(this.user)

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed')
      console.log(result)
    })
  }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id')
    console.log(this.id)
    this.userService.getUser(this.id)
      .subscribe(resp => {
        console.log(resp)
        this.user = resp;
      })
  }

}
