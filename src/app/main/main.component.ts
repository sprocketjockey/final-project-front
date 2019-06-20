import { Component, OnInit } from '@angular/core';
import { RequestsService } from '../requests.service';
import { ApiUserService } from '../api-user.service';
import { ApiFinanceService } from '../api-finance.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  loggedIn : boolean;
  email : string;
  error : boolean;
  search : string;
  ticker_results : any [];
  active_symbol : string;
  active_symbol_company : string;

  constructor(private _finance : ApiFinanceService, private _user : ApiUserService) { 
    this.error = false;
    this.loggedIn = this._user.loggedIn;
    this.ticker_results = this._finance.search_ticker_list;
  }

  ngOnInit() {
    
  }
  
  symbolSearch() {
    if (this.search) {
      //console.log("Symbol Search");
      //console.log(this.search);
      this._finance.symbolSearch(this.search);
    } else {
      this.ticker_results.length = 0;
    }
  }
  
  display(ticker_symbol : string, company : string) {
    //console.log(this.active_symbol);
    this.active_symbol=ticker_symbol;
    this.active_symbol_company = company;
  }
  
  logOut() {
    this._user.logOut();
    this.loggedIn = this._user.loggedIn;
    console.log(this.loggedIn);
  }
}
