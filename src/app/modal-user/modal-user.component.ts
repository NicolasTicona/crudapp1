import { ActivatedRoute } from '@angular/router';
import { UserService } from './../Services/user.service';
import { NgForm } from '@angular/forms';
import { User } from './../Models/user';
import { Component, OnInit, Input, Inject, Optional } from '@angular/core';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-modal-user',
  templateUrl: './modal-user.component.html',
  styleUrls: ['./modal-user.component.css']
})
export class ModalUserComponent implements OnInit {

  @Input() user: User = new User();
  private id: string;

  constructor(
      private activatedRoute: ActivatedRoute,
      @Optional() public dialogRef: MatDialogRef<ModalUserComponent>,
      @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
      private userService: UserService
      ) { }

  ngOnInit() {
    
  }


  onSubmit(form: NgForm){
   
    if(!this.data.id){
      console.log('CREATE USER')
      this.userService.postUser(form.value).subscribe(resp => {
        console.log(resp)
        this.onNoClick()
      })
    }else{
      console.log('UPDATE USER')
      console.log(this.data.id)
      this.userService.updateUser(this.data.id, form.value).subscribe((resp: User) => {
     
        this.user = {id: this.data.id, ...resp};
        console.log(this.user)
        this.onNoClick()
      })
    } 
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
