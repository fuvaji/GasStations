import { Injectable } from '@angular/core';
import { ChartTypeRegistry } from 'chart.js';

@Injectable({
  providedIn: 'root'
})
export class ChartDataService {
  chartType: keyof ChartTypeRegistry = 'bar';
  labels: string[] = [];
  label: string = '';
  data: number[] = [];
  constructor() { }
}
