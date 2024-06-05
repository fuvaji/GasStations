import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { NestjsService } from '../nestjs.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginData = {username: '', password: ''};

  constructor(private authService: AuthService, private nestjs: NestjsService){}

  login(): void {
    console.log('Username:', this.loginData);
    this.nestjs.getProtectedResource().subscribe(response=>{
      console.log(response);
    })
    this.authService.login(this.loginData).subscribe(response=>{
      if(response.success){
        console.log('Login successful');
        localStorage.setItem('token', response.token);
      } else{
        console.log('Login failed');
      }
    })
  }
}
