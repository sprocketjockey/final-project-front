import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiUserService {

  userId : string;
  firstName : string;
  lastName : string;
  email : string;
  token : string;
  
  loggedIn : boolean;
  
  baseURL : string = 'http://meanstack-2019-3-jason-phortonssf.c9users.io:8080/api/appUsers';

  constructor(private _http: HttpClient, private _router : Router) {
    if(sessionStorage.length !== 0) {
      this.restoreSession();
    }
    
  }
  
  processResult(result : any) {
    console.log(result);
  }
  
  registerResult(result : any) {
    this.userId = result.userId;
    this.firstName = result.firstName;
    this.lastName = result.lastName;
    this.email = result.email;
    this.token = result.token;
    
    this.saveSession();
  }

  
  loginResult(result : any) {
    this.userId = result.userId;
    this.token = result.token;
    this.saveSession();
    this.getUserInfo();
    this._router.navigate(['/main']);
  }
  
  userInformationResult(result : any) {
    this.firstName = result.firstName;
    this.lastName = result.lastName;
    this.email = result.email;
  }
  
  registerError (err: any) {
    console.log(err);
  }
  
  loginError(err:any) {
    console.log(err);
  }
  
  registerUser(userData) {
    let url = `${this.baseURL}`;
    this._http.post(url, userData)
      .subscribe(
        (res) => this.registerResult(res),
        (err) => this.registerError(err)
      );
  }
  
  loginUser (userData) {
    let url = `${this.baseURL}/login`;
    this._http.post(url, userData)
      .subscribe(
        (res) => this.loginResult(res),
        (err) => this.loginError(err)
      );
  }
  
  getUserInfo () {
    let url = `${this.baseURL}/${this.userId}?access_token=${this.token}`;
    this._http.get(url).subscribe((res) => this.userInformationResult(res));
  }
  
  saveSession() {
    sessionStorage.setItem('userId', this.userId);
    sessionStorage.setItem('token', this.token);
    this.loggedIn = true;
    
  }
  
  restoreSession() {
    this.userId = sessionStorage.getItem("userId");
    this.token = sessionStorage.getItem("token");
    this.loggedIn = true;
    this.getUserInfo()
  }
}
