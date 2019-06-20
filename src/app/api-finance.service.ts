import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiFinanceService {

  priceData : any [] = [];
  volumeData : any [] = [];
  
  rootURL : string = 'https://www.alphavantage.co/query?';
  apiKey : string = '&apikey=89YK8CQ8NUGC4UQ0';
  
  search_ticker_list : any [] = [];
  
  constructor(private _http: HttpClient) { }
  
  getMarketData(symbol: string) {
    //let url = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=SPY&interval=1min&apikey=89YK8CQ8NUGC4UQ0'
    //let url = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=SPY&outputsize=compact&apikey=89YK8CQ8NUGC4UQ0'
    //let url = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=5min&apikey=demo'
    let url = `${this.rootURL}function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=1min${this.apiKey}`;
    return this._http.get(url);
  }
  
  processMarketData(result: any) {
    //console.log(result);
    
    let symbol = result["Meta Data"]["2. Symbol"];
    //console.log(symbol);
    
    let timeSeries = result["Time Series (1min)"];
    //console.log(timeSeries);
    
    let tempPriceData = [];
    let tempVolumeData = [];
    
    for (var time in timeSeries) {
      let closePrice = timeSeries[time]["4. close"];
      let volume = timeSeries[time]["5. volume"];
      let priceIndex = { t: time, y:closePrice};
      let volumeIndex = { t:time, y:volume};
      tempPriceData.push(priceIndex)
      tempVolumeData.push(volumeIndex)
    }
    this.priceData = tempPriceData;
    this.volumeData = tempVolumeData;
  }
  
  symbolSearch(symbol:string) {
    let url = `${this.rootURL}function=SYMBOL_SEARCH&keywords=${symbol}${this.apiKey}`;
    //console.log(url)
    this._http.get(url).subscribe(
      (res) => this.searchResult(res)
      );
  }
  
  searchResult(result:any) {
    this.search_ticker_list.length = 0;
    let result_array = result['bestMatches'];
    //console.log(result_array)
    for (var ticker in result_array) {
      let item = {
        symbol : result_array[ticker]['1. symbol'],
        name : result_array[ticker]['2. name']
      }
      this.search_ticker_list.push(item);
    }
    //console.log(this.search_ticker_list);
  }
}
