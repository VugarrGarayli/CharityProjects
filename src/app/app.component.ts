import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'CharityProject';

  isAdminPage: boolean = false; // Başlanğıc dəyəri təyin edin

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      this.isAdminPage = this.router.url.startsWith('/admin');
    });
  }
}
