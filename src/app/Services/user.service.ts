import { User } from './../Models/user';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users: User[] = [];

  private URL = 'https://crud-830aa.firebaseio.com/users'

  constructor(private http: HttpClient) { }


  getUsers(){
    return this.http.get(`${this.URL}.json`)
      .pipe(
        map(resp => {
          if(resp == null){
            return []
          }
          let usersObj: User[] = [];
          Object.keys(resp).forEach(key => {
            let user = resp[key];
            user.id = key;
            usersObj.push(user)
          })
          this.users = usersObj;
          return this.users;
        })

      )
  }

  postUser(user: User){
    return this.http.post(`${this.URL}.json`, user)
      .pipe(
        map((resp: any) => {
          user.id = resp.name;
          return user;
        })
      )
  }

  getUser(id: string){
    console.log(id)
    return this.http.get(`${this.URL}/${id}.json`)
      .pipe(
        map((user: User) => {
          user.id = id;
          return user;
        })
      )
  }

  updateUser(id: string, user: any){
    console.log(user)
    console.log('ID UPTADE' + id)
    return this.http.put(`${this.URL}/${id}.json`, user)
      .pipe(
        map(resp => {
          return resp;
        })
      )
  }

}
