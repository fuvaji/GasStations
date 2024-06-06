import { Component, OnInit } from '@angular/core';
import { NestjsService } from '../nestjs.service';

@Component({
  selector: 'app-data-view',
  templateUrl: './data-view.component.html',
  styleUrl: './data-view.component.css'
})
export class DataViewComponent implements OnInit {
  stations: any[] = [];
  fetchedItems: any[] = [];
  displayItems: any[] = [];
  selectedDispenser: { stationId: number, dispenserId: number | string } = { stationId: -1, dispenserId: 'all' };
  metricOptions: {value: string, label: string}[] = [];
  footerMetricOptions: {value: string, label: string}[] = [];
  selectedMetric: string = 'volume';
  selectedFooterMetric: string = 'volume';
  startDate: string = '2000-01-01';
  endDate: string = '2025-01-01';
  openStations: number[] = [];

  constructor(private nestjsService: NestjsService) {}

  ngOnInit() {
    this.loadStations();
  }

  loadStations() {
    this.nestjsService.getStations().subscribe(response=>{
      this.stations=response;
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
      this.footerMetricOptions = [
        { value: 'volume', label: 'Обєм залитого палива' },
        { value: 'cost', label: 'Вартість заправлення' },
      ]
      this.nestjsService.getAllStationOrders(stationId).subscribe(response=>{
        this.fetchedItems = response.map(order=>({...order, type: 'orderStation'}));
        console.log(this.fetchedItems);
        this.updateData();
      })
    } else if (dispenserId === 'supplies') {
      this.metricOptions = [
        { value: 'volume', label: 'Обєм доставленого палива' },
        { value: 'date', label: 'Дата доставки' },
        { value: 'petrol', label: 'Тип палива' },
      ]
      this.footerMetricOptions = [
        { value: 'volume', label: 'Обєм залитого палива' },
        { value: 'cost', label: 'Вартість заправлення' },
      ]
      this.nestjsService.getAllStationDeliveries(stationId).subscribe(response=>{
        this.fetchedItems = response.map(supply=>({...supply, type: 'delivery'}));
        console.log(this.fetchedItems);
        this.updateData();
      })
    } else {
      this.metricOptions = [
        { value: 'volume', label: 'Обєм залитого палива' },
        { value: 'date', label: 'Дата заправлення' },
        { value: 'cost', label: 'Вартість заправлення' },
      ]
      this.footerMetricOptions = [
        { value: 'volume', label: 'Обєм залитого палива' },
        { value: 'cost', label: 'Вартість заправлення' },
      ]
      this.nestjsService.getAllDispenserOrders(Number(dispenserId)).subscribe(response=>{
        this.fetchedItems = response.map(order=>({...order, type: 'orderDispenser'}));
        console.log(this.fetchedItems);
        this.updateData();
      })
    }
  }

  updateData() {
    // Implement data update logic based on selectedDispenser, startDate, endDate, and selectedMetric
    console.log('Updating data with:', this.selectedDispenser, this.startDate, this.endDate, this.selectedMetric);
    this.displayItems = this.fetchedItems.filter((item: any)=>{
      return item.Timestamp>this.startDate && item.Timestamp<this.endDate;
    })
    switch(this.selectedMetric)
    {
      case 'volume':
        this.displayItems.sort((a: any, b:any)=>{
            return b.Quantity - a.Quantity
      });
      break;
      case 'cost':
        this.displayItems.sort((a: any, b:any)=>{
          return b.Amount - a.Amount
        });
        break;
      case 'date':
        this.displayItems.sort((a: any, b: any)=>{
          return b.Timestamp - a.Timestamp
        });
        break;
      case 'petrol':
        if(this.selectedDispenser.dispenserId == 'supplies')
          {
          this.displayItems.sort((a: any, b: any)=>{
            return a.Fuel.Name - b.Fuel.Name
          })
        }
        else
        {
          this.displayItems.sort((a: any, b: any)=>{
            return a.Dispenser.FuelInStock.Fuel.Name - b.Dispenser.FuelInStock.Fuel.Name
          })
        }
  }
  }

  generateChart() {
    // Implement chart generation logic based on selectedDispenser and selectedFooterMetric
    console.log('Generating chart with:', this.selectedDispenser, this.selectedFooterMetric);
  }
}
