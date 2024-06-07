import { ChangeDetectorRef, Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { NestjsService } from '../nestjs.service';
import { ChartDataService } from '../chart-data.service';
import { Router } from '@angular/router';
import { ChartComponent } from '../chart/chart.component';

@Component({
  selector: 'app-data-view',
  templateUrl: './data-view.component.html',
  styleUrl: './data-view.component.css'
})
export class DataViewComponent implements OnInit, AfterViewInit {
  stations: any[] = [];
  fetchedItems: any[] = [];
  displayItems: any[] = [];
  selectedDispenser: { stationId: number, dispenserId: number | string } = { stationId: -1, dispenserId: 'all' };
  metricOptions: { value: string, label: string }[] = [];
  footerMetricOptions: { value: string, label: string }[] = [
    { value: 'volume', label: 'Обєм залитого палива' },
    { value: 'cost', label: 'Вартість заправлення' },
  ];
  footerChartOptions: { value: string, label: string }[] = [
    { value: 'petrol', label: 'Тип палива' },
    { value: 'date', label: 'Дата заправлення' },
  ];
  selectedMetric: string = 'volume';
  selectedFooterMetric: string = 'volume';
  selectedFooterChart: string = 'petrol';
  startDate: string = '2000-01-01';
  endDate: string = '2025-01-01';
  openStations: number[] = [];

  @ViewChild(ChartComponent) chartComponent!: ChartComponent;

  constructor(private nestjsService: NestjsService, private chartDataService: ChartDataService, private cdr: ChangeDetectorRef) { }

  ngAfterViewInit(){
    this.chartComponent.resetChart();
  }
  reinitializeChart(){
    this.chartComponent.resetChart();
  }
  ngOnInit() {
    this.loadStations();
  }

  loadStations() {
    this.nestjsService.getStations().subscribe(response => {
      this.stations = response;
      console.log(this.stations);
    })
  }

  toggleStation(stationId: number) {
    if (this.openStations.includes(stationId)) {
      this.openStations = this.openStations.filter(id => id !== stationId);
    } else {
      this.openStations.push(stationId);
    }
  }

  isStationOpen(stationId: number): boolean {
    return this.openStations.includes(stationId);
  }

  isSelected(stationId: number, dispenserId: number | string): boolean {
    return this.selectedDispenser.stationId === stationId && this.selectedDispenser.dispenserId === dispenserId;
  }

  selectDispenser(stationId: number, dispenserId: number | string) {
    this.selectedDispenser = { stationId, dispenserId };
    this.loadDisplayItems();
    this.updateData();
  }

  loadDisplayItems() {
    const { stationId, dispenserId } = this.selectedDispenser;
    if (dispenserId === 'all') {
      this.metricOptions = [
        { value: 'volume', label: 'Обєм залитого палива' },
        { value: 'date', label: 'Дата заправлення' },
        { value: 'cost', label: 'Вартість заправлення' },
        { value: 'petrol', label: 'Тип палива' },
      ]
      this.nestjsService.getAllStationOrders(stationId).subscribe(response => {
        this.fetchedItems = response.map(order => ({ ...order, type: 'orderStation' }));
        console.log(this.fetchedItems);
        this.updateData();
      })
    } else if (dispenserId === 'supplies') {
      this.metricOptions = [
        { value: 'volume', label: 'Обєм доставленого палива' },
        { value: 'date', label: 'Дата доставки' },
        { value: 'petrol', label: 'Тип палива' },
      ]
      this.nestjsService.getAllStationDeliveries(stationId).subscribe(response => {
        this.fetchedItems = response.map(supply => ({ ...supply, type: 'delivery' }));
        console.log(this.fetchedItems);
        this.updateData();
      })
    } else {
      this.metricOptions = [
        { value: 'volume', label: 'Обєм залитого палива' },
        { value: 'date', label: 'Дата заправлення' },
        { value: 'cost', label: 'Вартість заправлення' },
      ]
      this.nestjsService.getAllDispenserOrders(Number(dispenserId)).subscribe(response => {
        this.fetchedItems = response.map(order => ({ ...order, type: 'orderDispenser' }));
        console.log(this.fetchedItems);
        this.updateData();
      })
    }
  }

  updateData() {
    // Implement data update logic based on selectedDispenser, startDate, endDate, and selectedMetric
    console.log('Updating data with:', this.selectedDispenser, this.startDate, this.endDate, this.selectedMetric);
    this.displayItems = this.fetchedItems.filter((item: any) => {
      return item.Timestamp >= this.startDate && item.Timestamp <= this.endDate;
    })
    switch (this.selectedMetric) {
      case 'volume':
        this.displayItems.sort((a: any, b: any) => {
          return b.Quantity - a.Quantity
        });
        break;
      case 'cost':
        this.displayItems.sort((a: any, b: any) => {
          return b.Amount - a.Amount
        });
        break;
      case 'date':
        this.displayItems.sort((a: any, b: any) => {
          const dateA = new Date(a.Timestamp);
          const dateB = new Date(b.Timestamp);
          return dateB.getTime() - dateA.getTime();
        });
        break;
      case 'petrol':
        if (this.selectedDispenser.dispenserId === 'supplies') {
          this.displayItems.sort((a: any, b: any) => {
            return a.Fuel.Name - b.Fuel.Name
          })
        }
        else {
          this.displayItems.sort((a: any, b: any) => {
            return a.Dispenser.FuelInStock.Fuel.Name - b.Dispenser.FuelInStock.Fuel.Name
          })
        }
    }
  }

  generateChart() {
    // Implement chart generation logic based on selectedDispenser and selectedFooterMetric
    const dates = this.getDateRanges();
    const granulation = this.getDataGranulation();
    console.log(dates);
    console.log('Generating chart with:', this.selectedDispenser, this.selectedFooterMetric, this.selectedFooterChart);
    if (this.selectedDispenser.dispenserId === 'supplies') {

      if (this.selectedFooterChart === 'petrol') {
        this.chartDataService.chartType = 'bar';
        const fuelSum = this.displayItems.reduce((accumulator, currentItem) => {
          const fuelName = currentItem.Fuel.Name;
          const quantity = currentItem.Quantity;

          if (!accumulator[fuelName]) {
            accumulator[fuelName] = +quantity;
          } else {
            accumulator[fuelName] += +quantity;
          }

          return accumulator;
        }, {});
        console.log(fuelSum);
        const labels: string[] = [];
        const data: number[] = [];

        for (const fuelName in fuelSum) {
          if (Object.prototype.hasOwnProperty.call(fuelSum, fuelName)) {
            labels.push(fuelName);
            data.push(fuelSum[fuelName]);
          }
        }
        console.log(labels);
        console.log(data);
        this.chartDataService.labels = labels;
        this.chartDataService.data = data;
      }
      else {
        this.chartDataService.chartType = 'line';
        const labels: string[] = [];
        const data: number[] = [];

        for (const dateRange of dates) {
          let label: string;
          if (granulation === 'days') {
            label = `${dateRange.itemStart.getDate()} ${dateRange.itemStart.toLocaleString('default', { month: 'short' })}`;
          } else if (granulation === 'months') {
            label = dateRange.itemStart.toLocaleString('default', { month: 'short' }) + ' ' + dateRange.itemStart.getFullYear();
          } else {
            label = dateRange.itemStart.getFullYear().toString();
          }

          const sumQuantity = this.displayItems.reduce((accumulator, currentItem) => {
            const itemDate = new Date(currentItem.Timestamp);
            if (itemDate >= dateRange.itemStart && itemDate < dateRange.itemEnd) {
              accumulator += +currentItem.Quantity;
            }
            return accumulator;
          }, 0);

          // Add label and sum to respective arrays
          labels.push(label);
          data.push(sumQuantity);
        }

        // Log labels and data
        console.log(labels);
        console.log(data);

        this.chartDataService.labels = labels;
        this.chartDataService.data = data;
      }
      this.chartDataService.label = 'Кількість отриманого бензину в л.';


    } else if (this.selectedDispenser.dispenserId === 'all') {

      if (this.selectedFooterChart === 'petrol') {
        this.chartDataService.chartType = 'bar';

        if (this.selectedFooterMetric === 'volume') {
          const fuelSum = this.displayItems.reduce((accumulator, currentItem) => {
            const fuelName = currentItem.Dispenser.FuelInStock.Fuel.Name;
            const quantity = currentItem.Quantity;

            if (!accumulator[fuelName]) {
              accumulator[fuelName] = +quantity;
            } else {
              accumulator[fuelName] += +quantity;
            }

            return accumulator;
          }, {});
          console.log(fuelSum);
          const labels: string[] = [];
          const data: number[] = [];

          for (const fuelName in fuelSum) {
            if (Object.prototype.hasOwnProperty.call(fuelSum, fuelName)) {
              labels.push(fuelName);
              data.push(fuelSum[fuelName]);
            }
          }
          console.log(labels);
          console.log(data);
          this.chartDataService.labels = labels;
          this.chartDataService.data = data;

          this.chartDataService.label = 'Кількість залитого бензину в л.';
        }
        else {
          const fuelSum = this.displayItems.reduce((accumulator, currentItem) => {
            const fuelName = currentItem.Dispenser.FuelInStock.Fuel.Name;
            const quantity = currentItem.Amount;

            if (!accumulator[fuelName]) {
              accumulator[fuelName] = +quantity;
            } else {
              accumulator[fuelName] += +quantity;
            }

            return accumulator;
          }, {});
          console.log(fuelSum);
          const labels: string[] = [];
          const data: number[] = [];

          for (const fuelName in fuelSum) {
            if (Object.prototype.hasOwnProperty.call(fuelSum, fuelName)) {
              labels.push(fuelName);
              data.push(fuelSum[fuelName]);
            }
          }
          console.log(labels);
          console.log(data);
          this.chartDataService.labels = labels;
          this.chartDataService.data = data;

          this.chartDataService.label = 'Вартість залитого бензину в грн.';
        }

      }
      else {
        this.chartDataService.chartType = 'line';

        if (this.selectedFooterMetric === 'volume') {
          const labels: string[] = [];
          const data: number[] = [];

          for (const dateRange of dates) {
            let label: string;
            if (granulation === 'days') {
              label = `${dateRange.itemStart.getDate()} ${dateRange.itemStart.toLocaleString('default', { month: 'short' })}`;
            } else if (granulation === 'months') {
              label = dateRange.itemStart.toLocaleString('default', { month: 'short' }) + ' ' + dateRange.itemStart.getFullYear();
            } else {
              label = dateRange.itemStart.getFullYear().toString();
            }

            const sumQuantity = this.displayItems.reduce((accumulator, currentItem) => {
              const itemDate = new Date(currentItem.Timestamp);
              if (itemDate >= dateRange.itemStart && itemDate < dateRange.itemEnd) {
                accumulator += +currentItem.Quantity;
              }
              return accumulator;
            }, 0);

            // Add label and sum to respective arrays
            labels.push(label);
            data.push(sumQuantity);
          }

          // Log labels and data
          console.log(labels);
          console.log(data);

          this.chartDataService.labels = labels;
          this.chartDataService.data = data;

          this.chartDataService.label = 'Кількість залитого бензину в л.';
        } else {
          const labels: string[] = [];
          const data: number[] = [];

          for (const dateRange of dates) {
            let label: string;
            if (granulation === 'days') {
              label = `${dateRange.itemStart.getDate()} ${dateRange.itemStart.toLocaleString('default', { month: 'short' })}`;
            } else if (granulation === 'months') {
              label = dateRange.itemStart.toLocaleString('default', { month: 'short' }) + ' ' + dateRange.itemStart.getFullYear();
            } else {
              label = dateRange.itemStart.getFullYear().toString();
            }

            const sumQuantity = this.displayItems.reduce((accumulator, currentItem) => {
              const itemDate = new Date(currentItem.Timestamp);
              if (itemDate >= dateRange.itemStart && itemDate < dateRange.itemEnd) {
                accumulator += +currentItem.Amount;
              }
              return accumulator;
            }, 0);

            // Add label and sum to respective arrays
            labels.push(label);
            data.push(sumQuantity);
          }

          // Log labels and data
          console.log(labels);
          console.log(data);

          this.chartDataService.labels = labels;
          this.chartDataService.data = data;
          this.chartDataService.label = 'Вартість залитого бензину в грн.';
        }
      }


    } else {

      this.chartDataService.chartType = 'line';

      if (this.selectedFooterMetric === 'volume') {
        const labels: string[] = [];
        const data: number[] = [];

        for (const dateRange of dates) {
          let label: string;
          if (granulation === 'days') {
            label = `${dateRange.itemStart.getDate()} ${dateRange.itemStart.toLocaleString('default', { month: 'short' })}`;
          } else if (granulation === 'months') {
            label = dateRange.itemStart.toLocaleString('default', { month: 'short' }) + ' ' + dateRange.itemStart.getFullYear();
          } else {
            label = dateRange.itemStart.getFullYear().toString();
          }

          const sumQuantity = this.displayItems.reduce((accumulator, currentItem) => {
            const itemDate = new Date(currentItem.Timestamp);
            if (itemDate >= dateRange.itemStart && itemDate < dateRange.itemEnd) {
              accumulator += +currentItem.Quantity;
            }
            return accumulator;
          }, 0);

          // Add label and sum to respective arrays
          labels.push(label);
          data.push(sumQuantity);
        }

        // Log labels and data
        console.log(labels);
        console.log(data);

        this.chartDataService.labels = labels;
        this.chartDataService.data = data;

        this.chartDataService.label = 'Кількість залитого бензину в л.';
      } else {
        const labels: string[] = [];
        const data: number[] = [];

        for (const dateRange of dates) {
          let label: string;
          if (granulation === 'days') {
            label = `${dateRange.itemStart.getDate()} ${dateRange.itemStart.toLocaleString('default', { month: 'short' })}`;
          } else if (granulation === 'months') {
            label = dateRange.itemStart.toLocaleString('default', { month: 'short' }) + ' ' + dateRange.itemStart.getFullYear();
          } else {
            label = dateRange.itemStart.getFullYear().toString();
          }

          const sumQuantity = this.displayItems.reduce((accumulator, currentItem) => {
            const itemDate = new Date(currentItem.Timestamp);
            if (itemDate >= dateRange.itemStart && itemDate < dateRange.itemEnd) {
              accumulator += +currentItem.Amount;
            }
            return accumulator;
          }, 0);

          // Add label and sum to respective arrays
          labels.push(label);
          data.push(sumQuantity);
        }

        // Log labels and data
        console.log(labels);
        console.log(data);

        this.chartDataService.labels = labels;
        this.chartDataService.data = data;
        this.chartDataService.label = 'Вартість залитого бензину в грн.';
      }

    }
    console.log(this.chartDataService);
    this.reinitializeChart();
  }
  
  getDataGranulation(): string {
    const durationInDays = Math.abs((new Date(this.endDate).getTime() - new Date(this.startDate).getTime()) / (1000 * 60 * 60 * 24));
    if (durationInDays < 60) {
      return 'days';
    } else if (durationInDays < 365 * 2) { // Less than 2 years
      return 'months';
    } else {
      return 'years';
    }
  }
  getDateRanges(): { itemStart: Date, itemEnd: Date }[] {
    const startDate = new Date(this.startDate);
    const endDate = new Date(this.endDate);
    const granulation = this.getDataGranulation();
    const dateRanges: { itemStart: Date, itemEnd: Date }[] = [];
    let currentItemStart = new Date(startDate);
    let currentItemEnd = new Date(startDate);

    if (granulation === 'days') {
      currentItemEnd.setDate(currentItemStart.getDate() + 1);
    } else if (granulation === 'months') {
      currentItemEnd.setMonth(currentItemStart.getMonth() + 1);
      currentItemEnd.setDate(1);
    } else if (granulation === 'years') {
      currentItemEnd.setFullYear(currentItemStart.getFullYear() + 1);
      currentItemEnd.setMonth(0);
      currentItemEnd.setDate(1);
    }

    while (currentItemEnd <= endDate) {
      dateRanges.push({ itemStart: new Date(currentItemStart), itemEnd: new Date(currentItemEnd) });

      if (granulation === 'days') {
        currentItemStart.setDate(currentItemStart.getDate() + 1);
        currentItemEnd.setDate(currentItemEnd.getDate() + 1);
      } else if (granulation === 'months') {
        currentItemStart.setDate(1);
        currentItemStart.setMonth(currentItemStart.getMonth() + 1);
        currentItemEnd.setMonth(currentItemEnd.getMonth() + 1);
      } else if (granulation === 'years') {
        currentItemStart.setDate(1);
        currentItemStart.setMonth(0);
        currentItemStart.setFullYear(currentItemStart.getFullYear() + 1);
        currentItemEnd.setFullYear(currentItemEnd.getFullYear() + 1);
      }
    }
    dateRanges.push({ itemStart: new Date(currentItemStart), itemEnd: new Date(currentItemEnd) });
    endDate.setDate(endDate.getDate() + 1);
    dateRanges[dateRanges.length - 1].itemEnd = new Date(endDate);

    return dateRanges;
  }
}
