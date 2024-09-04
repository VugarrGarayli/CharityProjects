import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent implements OnInit {
  projects: any[] = [];
  galleryImages: any[] = [];
  blogs: any[] = [];
  volunteers: any[] = [];
  helpRequests: any[] = [];

  ngOnInit(): void {
    // Layihələr üçün nümunə məlumatlar
    this.projects = [
      {
        id: 1,
        title: 'Layihə 1',
        subtitle: 'Bu layihənin təsviri',
        image: 'project1.jpg',
      },
      {
        id: 2,
        title: 'Layihə 2',
        subtitle: 'Bu layihənin təsviri',
        image: 'project2.jpg',
      },
    ];

    // Qalereya üçün nümunə şəkillər
    this.galleryImages = [
      { id: 1, url: 'gallery1.jpg' },
      { id: 2, url: 'gallery2.jpg' },
    ];

    // Bloglar üçün nümunə məlumatlar
    this.blogs = [
      {
        id: 1,
        title: 'Blog Yazısı 1',
        subtitle: 'Qısa təsvir',
        image: 'blog1.jpg',
      },
      {
        id: 2,
        title: 'Blog Yazısı 2',
        subtitle: 'Qısa təsvir',
        image: 'blog2.jpg',
      },
    ];

    // Könüllü qeydiyyatları üçün nümunə məlumatlar
    this.volunteers = [
      { id: 1, name: 'Könüllü 1', email: 'volunteer1@example.com' },
      { id: 2, name: 'Könüllü 2', email: 'volunteer2@example.com' },
    ];

    // Yardım istəkləri üçün nümunə məlumatlar
    this.helpRequests = [
      {
        id: 1,
        name: 'Yardım İstək 1',
        description: 'Yardım istəyən şəxsin təsviri',
      },
      {
        id: 2,
        name: 'Yardım İstək 2',
        description: 'Yardım istəyən şəxsin təsviri',
      },
    ];
  }
}
