import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class RequestsService {


  constructor(private _http: HttpClient) { }
  
  getTestRequest() {
    let url = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=SPY&interval=1min&apikey=89YK8CQ8NUGC4UQ0'
    this._http.get(url).subscribe(this.processRequest.bind(this));
  }
  
  processRequest(result: any) {
    console.log(result);
  }
  
  getTestUser() {
    let url = 'http://meanstack-2019-3-jason-phortonssf.c9users.io:8080/api/appUsers';
    this._http.get(url).subscribe(this.processRequest.bind(this));
  }
  
  postTestUser() {
   let url =  "http://meanstack-2019-3-jason-phortonssf.c9users.io:8080/api/appUsers"
   let data = {
     "firstName": "BOB",
     "lastName": "BOB",
     "email": "Bob@Bob.com",
     "password":"bob"

   };
   
   this._http.post(url,data).subscribe(this.processRequest.bind(this));
  }
}
