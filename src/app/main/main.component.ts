import { Component, OnInit } from '@angular/core';
import { RequestsService } from '../requests.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private _requests: RequestsService) { }

  ngOnInit() {
  }
  
  getTestFin () {
    this._requests.getTestRequest();
  }
  
  getTestUser() {
    this._requests.getTestUser();
  }
  
  postTestUser() {
    this._requests.postTestUser();
  }

}
