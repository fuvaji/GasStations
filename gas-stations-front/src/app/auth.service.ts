import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiURL = 'http://localhost:3000/auth/login';
  constructor(private http: HttpClient) { }

  login(credentials:{username: string, password: string}): Observable<any>{
    return this.http.post<any>(this.apiURL, credentials);
  }

  getAuthHeaders(){
    const token = localStorage.getItem('token');
    return{
      headers:{
        Authorization: `Bearer ${token}`
      }
    };
  }
}
