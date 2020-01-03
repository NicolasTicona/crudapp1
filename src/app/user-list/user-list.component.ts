import { ModalUserComponent } from './../modal-user/modal-user.component';
import { UserService } from './../Services/user.service';
import { User } from './../Models/user';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
// import { NgForm } from '@angular/forms';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {


  displayedColumns: string[] = ['nombres', 'cargo', 'salario', 'acciones'];
  users: User[] = [
  ];

  user = new User()

  dataSource: any;
  
  constructor(
      private userService: UserService,
      public dialog: MatDialog
      ) {
  }

  openDialog(){
    const dialogRef = this.dialog.open(ModalUserComponent, {
      width: '800px',
      data: {}
    })

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed')
      console.log(result)
    })
  }

  ngOnInit() {
    this.userService.getUsers().subscribe(resp => {
      this.users = resp;
      console.log(this.users)
      this.dataSource = new MatTableDataSource<any>(this.users || []);
    })
  }



}
