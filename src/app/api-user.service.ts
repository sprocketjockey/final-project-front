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
  watchlist : any [];
  
  loggedIn : boolean;
  
  appUsersURL : string = 'http://meanstack-2019-3-jason-phortonssf.c9users.io:8080/api/appUsers';
  watchlistURL : string = 'http://meanstack-2019-3-jason-phortonssf.c9users.io:8080/api/watchlists';

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
    let url = `${this.appUsersURL}`;
    this._http.post(url, userData)
      .subscribe(
        (res) => this.registerResult(res),
        (err) => this.registerError(err)
      );
  }
  
  loginUser (userData) {
    let url = `${this.appUsersURL}/login`;
    this._http.post(url, userData)
      .subscribe(
        (res) => this.loginResult(res),
        (err) => this.loginError(err)
      );
  }
  
  getUserInfo () {
    let url = `${this.appUsersURL}/${this.userId}?access_token=${this.token}`;
    this._http.get(url).subscribe((res) => this.userInformationResult(res));
    this.getWatchlist()
    
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
  
  logOut(){
    this.loggedIn = false;
    this.userId = "";
    this.token = "";
    this.firstName = "";
    this.lastName = "";
    this.email = "";
    sessionStorage.clear();
    this._router.navigate(['/main'])
    
  }
  
  addToWatchlist(symbol:string, companyName:string) {
    let url = `${this.watchlistURL}?access_token=${this.token}`;
    let data = {
      symbol:symbol,
      companyName:companyName,
      userId:this.userId
    };
    
    this._http.post(url, data)
      .subscribe(
        (res) => this.addWatchlistResult(res),
        (err) => this.addWatchlistError(err)
      );
    

  }
  
  addWatchlistResult(res:any) {
    console.log(res);
    this.getWatchlist();
  }
  
  addWatchlistError(err:any) {
    console.log(err);
  }
  
  removeFromWatchlist(symbol:string) {
    for (let i = 0; i < this.watchlist.length; i++) {
      if (this.watchlist[i].symbol === symbol) {
        let url = `${this.watchlistURL}/${this.watchlist[i].id}?access_token=${this.token}`
        this._http.delete(url).subscribe((res) => this.itemRemovedFromWatchlist(res));
      }
    }
    
  }
  
  itemRemovedFromWatchlist(result:any) {
    this.getWatchlist();
  }
  
  getWatchlist() {
    let url = `${this.appUsersURL}/${this.userId}/watchlists?access_token=${this.token}`
    this._http.get(url).subscribe((res) => this.updateWatchlist(res));
  }
  
  updateWatchlist(result:any) {
    this.watchlist = result;
  }
  
}
