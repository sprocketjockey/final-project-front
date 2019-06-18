import { Component, OnInit } from '@angular/core';
import { ApiUserService } from '../api-user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  verify_password: string;
  passwordMismatch : boolean;
  existingUser : boolean;
  
  
  constructor(private _user:ApiUserService) { 
    this.passwordMismatch = false;
    this.existingUser = false;
  }

  ngOnInit() {
  }
  
  register () {
    
    let user = {};
    
    if(this.password === this.verify_password) {
      user = {
        firstName : this.firstName,
        lastName : this.lastName,
        email : this.email,
        password : this.password 
      }
      this._user.registerUser(user);
    } else {
      this.passwordMismatch = true;
    }

  }

}
