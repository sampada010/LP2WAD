import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div *ngIf="!showProfile">
      <!-- LOGIN FORM -->
      <div *ngIf="isLogin">
        <h2>Login</h2>
        <input [(ngModel)]="loginEmail" placeholder="Email">
        <input [(ngModel)]="loginPassword" placeholder="Password" type="password">
        <button (click)="login()">Login</button>
        <p class="toggle-msg">
          Don't have an account?
          <a (click)="isLogin = false">Register</a>
        </p>
      </div>

      <!-- REGISTER FORM -->
      <div *ngIf="!isLogin">
        <h2>Register</h2>
        <input [(ngModel)]="reg.name" placeholder="Name">
        <input [(ngModel)]="reg.email" placeholder="Email">
        <input [(ngModel)]="reg.password" placeholder="Password" type="password">
        <button (click)="register()">Register</button>
        <p class="toggle-msg">
          Already have an account?
          <a (click)="isLogin = true">Login</a>
        </p>
      </div>
    </div>

    <!-- PROFILE VIEW -->
    <div *ngIf="showProfile" class="profile">
      <h2>Welcome, {{ user?.name }}</h2>
      <p>Email: {{ user?.email }}</p>
      <button (click)="logout()">Logout</button>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      max-width: 400px;
      margin: 20px auto;
      padding: 20px;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
      border-radius: 8px;
      font-family: Arial, sans-serif;
    }

    h2 {
      color: #333;
      margin-bottom: 20px;
      text-align: center;
    }

    input {
      display: block;
      width: 100%;
      padding: 8px;
      margin-bottom: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
      box-sizing: border-box;
    }

    button {
      background-color: #4CAF50;
      color: white;
      padding: 10px 15px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      margin-bottom: 20px;
      width: 100%;
    }

    button:hover {
      background-color: #45a049;
    }

    .toggle-msg {
      text-align: center;
      font-size: 0.9rem;
      color: #666;
    }

    .toggle-msg a {
      color: #007bff;
      cursor: pointer;
      text-decoration: none;
      margin-left: 5px;
    }

    .toggle-msg a:hover {
      text-decoration: underline;
    }

    .profile {
      text-align: center;
    }

    .profile button {
      background-color: #f44336;
    }

    .profile button:hover {
      background-color: #da190b;
    }
  `]
})
export class AppComponent {
  reg = { name: '', email: '', password: '' };
  loginEmail = '';
  loginPassword = '';
  user: any;
  showProfile = false;
  isLogin = true;

  constructor(private auth: AuthService) {}

  register() {
    this.auth.register(this.reg);
    alert('Registered! Please log in.');
    this.isLogin = true;
    this.reg = { name: '', email: '', password: '' };
  }

  login() {
    if (this.auth.login(this.loginEmail, this.loginPassword)) {
      this.user = this.auth.getUser();
      this.showProfile = true;
    } else {
      alert('Invalid credentials');
    }
  }

  logout() {
    this.showProfile = false;
    this.loginEmail = '';
    this.loginPassword = '';
    this.isLogin = true;
  }
}
