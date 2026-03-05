import { Component, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { FashionApiService } from '../myservices/fashion-api-service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  user: string = '';
  pwd: string = '';
  errMessage: string = '';
  successMessage: string = '';
  isRegisterMode: boolean = false;
  isLoading: boolean = false;
  showPassword: boolean = false;

  constructor(private _service: FashionApiService, private router: Router, private cd: ChangeDetectorRef) {}

  toggleMode() {
    this.isRegisterMode = !this.isRegisterMode;
    this.errMessage = '';
    this.successMessage = '';
  }

  onLogin() {
    if (!this.user.trim() || !this.pwd.trim()) {
      this.errMessage = 'Please enter both username and password.';
      this.cd.detectChanges();
      return;
    }
    this.errMessage = '';
    this.successMessage = '';
    this.isLoading = true;
    this.cd.detectChanges();
    this._service.login(this.user, this.pwd).subscribe({
      next: (res) => {
        localStorage.setItem('loggedUser', res.user);
        this.isLoading = false;
        this.router.navigate(['/ex53']);
      },
      error: (err) => {
        this.isLoading = false;
        this.errMessage = 'Incorrect username or password!';
        this.cd.detectChanges();
      }
    });
  }

  onRegister() {
    if (!this.user.trim() || !this.pwd.trim()) {
      this.errMessage = 'Please enter both username and password.';
      this.cd.detectChanges();
      return;
    }
    if (this.pwd.length < 4) {
      this.errMessage = 'Password must be at least 4 characters.';
      this.cd.detectChanges();
      return;
    }
    this.errMessage = '';
    this.successMessage = '';
    this.isLoading = true;
    this.cd.detectChanges();
    this._service.register(this.user, this.pwd).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.successMessage = 'Registration successful! You can now log in.';
        this.isRegisterMode = false;
        this.user = '';
        this.pwd = '';
        this.cd.detectChanges();
      },
      error: (err) => {
        this.isLoading = false;
        this.errMessage = err.message || 'Registration failed. Please try again.';
        this.cd.detectChanges();
      }
    });
  }
}
