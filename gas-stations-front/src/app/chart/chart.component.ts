import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import {Chart} from 'chart.js/auto';
import { ChartDataService } from '../chart-data.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.css'
})
export class ChartComponent {
  @ViewChild('myChart') myChartRef!: ElementRef;
  myChart: any;

  constructor(private chartDataService: ChartDataService) { }
  resetChart(): void{
    if(this.myChart != null){
      (this.myChart as Chart).destroy();
    }
    this.myChart = new Chart(this.myChartRef.nativeElement, {
      type: this.chartDataService.chartType,
      data: {
        labels: this.chartDataService.labels,
        datasets: [{
          label: this.chartDataService.label,
          data: this.chartDataService.data,
          backgroundColor: [
            'rgba(90, 255, 0, 0.3)', 
            'rgba(112, 191, 69, 0.3)', 
            'rgba(52, 94, 29, 0.3)', 
            'rgba(184, 246, 150, 0.3)', 
        ],
        borderColor: [
          'rgba(90, 255, 0, 1)', 
          'rgba(112, 191, 69, 1)', 
          'rgba(52, 94, 29, 1)', 
          'rgba(184, 246, 150, 1)', 
        ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
