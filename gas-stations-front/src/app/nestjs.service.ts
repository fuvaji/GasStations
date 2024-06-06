import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NestjsService {
  private apiUrl = 'http://localhost:3000/';
  constructor(private http: HttpClient, private authService: AuthService) { }

  getStations() : Observable<any[]> {
    return this.http.get<any>(this.apiUrl + 'gas-station', this.authService.getAuthHeaders());
  }

  getAllStationOrders(StationID: number): Observable<any[]>{
    return this.http.get<any>(this.apiUrl + 'order/station/' + StationID, this.authService.getAuthHeaders());
  }
  
  getAllDispenserOrders(DispenserID: number) : Observable<any[]>{
    return this.http.get<any>(this.apiUrl + 'order/dispenser/' + DispenserID, this.authService.getAuthHeaders());
  }

  getAllStationDeliveries(StationID: number): Observable<any[]>{
    return this.http.get<any>(this.apiUrl + 'delivery/station/' + StationID, this.authService.getAuthHeaders());
  }
}
