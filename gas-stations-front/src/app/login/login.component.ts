import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginData = {username: '', password: ''};

  constructor(private authService: AuthService, private router: Router){}

  login(): void {
    console.log(this.loginData);
    this.authService.login(this.loginData).subscribe(response=>{
      if(response.success){
        console.log('Login successful');
        localStorage.setItem('token', response.token);
        this.router.navigate(['service']);
      } else{
        console.log('Login failed');
      }
    })
    
  }
}
