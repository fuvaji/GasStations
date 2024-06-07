import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import {Chart} from 'chart.js/auto';
import { ChartDataService } from '../chart-data.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.css'
})
export class ChartComponent implements OnInit, AfterViewInit {
  @ViewChild('myChart') myChartRef!: ElementRef;
  myChart: any;

  constructor(private chartDataService: ChartDataService) { }

  ngOnInit(): void {
    // Chart initialization logic moved to ngAfterViewInit
  }

  ngAfterViewInit(): void {
    this.myChart = new Chart(this.myChartRef.nativeElement, {
      type: this.chartDataService.chartType,
      data: {
        labels: this.chartDataService.labels,
        datasets: [{
          label: this.chartDataService.label,
          data: this.chartDataService.data,
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
