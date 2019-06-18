import { Component, OnInit } from '@angular/core';
import { RequestsService } from '../requests.service';
import { ApiUserService } from '../api-user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  loggedIn : boolean;
  email : string;

  constructor(private _requests: RequestsService, private _user : ApiUserService) { 
    this.loggedIn = this._user.loggedIn;
    console.log(this.loggedIn);
    
  }

  ngOnInit() {
  }
  

}
