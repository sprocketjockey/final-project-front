import { Component, OnInit } from '@angular/core';
import { ApiUserService } from '../api-user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email : string;
  password : string;
  rememberMe : boolean;
  loginError : boolean;

  constructor(private _user:ApiUserService) { 
    this.loginError = false;
  }

  ngOnInit() {
  }
  
  login () {
    let user = {
      email : this.email,
      password : this.password
    };
    
    this._user.loginUser(user);
    
  }

}
