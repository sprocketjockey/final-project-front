import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Chart } from 'chart.js';
import { ApiFinanceService } from '../api-finance.service'


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  @ViewChild('lineChart') private chartRef;
  @Input() private symbol;
  chart: any;
  
  constructor(private _apiFinance: ApiFinanceService) { 
    
  }

  ngOnInit() { }
  
  ngOnChanges() {
    if (this.symbol) {
      this._apiFinance.getMarketData(this.symbol).subscribe((result) => {this._apiFinance.processMarketData(result); this.render()})
    }
  }
  
  render() {
    let labels = {t:"Time", y:"Price"};
    
    this.chart = new Chart("myCanvas", {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Price Data',
            yAxisID: 'price',
            data: this._apiFinance.priceData,
            borderColor: '00AEFF',
            lineTension: 0,
            fill: false,
            type: 'line'
          }, {
            label: 'Volume Data',
            yAxisID: 'volume',
            data: this._apiFinance.volumeData,
            backgroundColor: '006400',
            type: 'bar'
          }
        ]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            type: 'time',
            time: {
              displayFormats: {
                unit: 'hour'
              }
            }
          }],
          yAxes: [{
            id: 'volume',
            type: 'linear',
            position: 'right'
          }, {
            id: 'price',
            type: 'linear',
            position: 'left'
          }]
        }
      }
    });
  }
}
