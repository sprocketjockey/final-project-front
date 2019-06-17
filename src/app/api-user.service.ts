import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiUserService {

  userId : string;
  firstName : string;
  lastName : string;
  email : string;
  loggedIn : boolean;

  constructor(private _http: HttpClient) { }
  
  processResult(result : any) {
    console.log(result);
  }
  
  registerResult(result : any) {
    console.log(result);
  }
  
  loginResult(result : any) {
    this.userId = result.userId;
    this.getUserInfo();
  }
  
  userInformationResult(result : any) {
    this.firstName = result.firstName;
    this.lastName = result.lastName;
    this.email = result.email;
    this.loggedIn = true;
    
    console.log(this.loggedIn);
  }
  
  registerError (err: any) {
    console.log(err);
  }
  
  loginError(err:any) {
    console.log(err);
  }
  
  getTestUser() {
    let url = 'http://meanstack-2019-3-jason-phortonssf.c9users.io:8080/api/appUsers';
    this._http.get(url).subscribe(this.processResult.bind(this));
  }
  
  registerUser(userData) {
    let url = "http://meanstack-2019-3-jason-phortonssf.c9users.io:8080/api/appUsers";
    this._http.post(url, userData)
      .subscribe(
        (res)=> this.registerResult(res),
        (err) => this.registerError(err)
      );
  }
  
  loginUser (userData) {
    let url = "http://meanstack-2019-3-jason-phortonssf.c9users.io:8080/api/appUsers/login";
    this._http.post(url, userData)
      .subscribe(
        (res)=> this.loginResult(res),
        (err) => this.loginError(err)
      );
  }
  
  getUserInfo () {
    let url = "http://meanstack-2019-3-jason-phortonssf.c9users.io:8080/api/appUsers/" + this.userId;
    this._http.get(url).subscribe(this.userInformationResult.bind(this));
  }
}
