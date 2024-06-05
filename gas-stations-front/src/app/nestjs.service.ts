import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class NestjsService {
  private apiUrl = 'http://localhost:3000/gas-station';
  constructor(private http: HttpClient, private authService: AuthService) { }

  getProtectedResource() {
    return this.http.get(this.apiUrl, this.authService.getAuthHeaders());
  }
}
