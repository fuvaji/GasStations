import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  template: `
    <div *ngFor="let dataItem of data">
      <div>{{ data.StationID }}</div>
    </div>
  `,
  styles: []
})
export class AppComponent implements OnInit {
  data: any = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getData().subscribe(response => {
      this.data = response;
    console.log(this);
    });
  }
}
