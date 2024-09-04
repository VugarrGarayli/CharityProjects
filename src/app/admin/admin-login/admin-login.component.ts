import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.scss',
})
export class AdminLoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router) {}

  onLogin() {
    // Sadə yoxlama (bu hissəni backendə bağlayıb daha təhlükəsiz edə bilərsiniz)
    if (this.username === 'admin' && this.password === '0') {
      // Uğurlu login olduqda admin-dashboard səhifəsinə yönləndirir
      this.router.navigate(['/admin-dashboard']);
    } else {
      alert('İstifadəçi adı və ya parol yanlışdır.');
    }
  }
}
