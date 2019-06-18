import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiFinanceService {

  priceData : any [] = [];
  volumeData : any [] = [];
  
  constructor(private _http: HttpClient) { }
  
  getMarketData() {
    //let url = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=SPY&interval=1min&apikey=89YK8CQ8NUGC4UQ0'
    //let url = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=SPY&outputsize=compact&apikey=89YK8CQ8NUGC4UQ0'
    let url = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=5min&apikey=demo'
    return this._http.get(url);
  }
  
  processMarketData(result: any) {
    console.log(result);
    
    let symbol = result["Meta Data"]["2. Symbol"];
    console.log(symbol);
    
    let timeSeries = result["Time Series (5min)"];
    console.log(timeSeries);
    
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
}
