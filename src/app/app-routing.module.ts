import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { HomeComponent } from './pages/home/home.component';
import { ServicesComponent } from './pages/services/services.component';
import { BlogComponent } from './pages/blog/blog.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { VolunteerComponent } from './pages/volunteer/volunteer.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminProjectsComponent } from './admin/admin-projects/admin-projects.component';
import { AdminRequestsComponent } from './admin/admin-requests/admin-requests.component';
import { AdminGalleryComponent } from './admin/admin-gallery/admin-gallery.component';
import { AdminVolunteersComponent } from './admin/admin-volunteers/admin-volunteers.component';
import { AdminBlogsComponent } from './admin/admin-blogs/admin-blogs.component';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminDashboardComponent,
    children: [
      { path: 'projects', component: AdminProjectsComponent },
      { path: 'gallery', component: AdminGalleryComponent },
      { path: 'blogs', component: AdminBlogsComponent },
      { path: 'admin-volunteers', component: AdminVolunteersComponent },
      { path: 'help-requests', component: AdminRequestsComponent },
    ],
  },
  { path: 'admin-login', component: AdminLoginComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent },
  { path: 'admin-projects', component: AdminProjectsComponent },
  { path: 'admin-requests', component: AdminRequestsComponent },

  { path: 'admin-volunteers/:id', component: AdminVolunteersComponent },
  { path: '', redirectTo: '/admin-volunteers', pathMatch: 'full' },

  {
    path: 'about-us',
    component: AboutUsComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'services',
    component: ServicesComponent,
  },
  {
    path: 'blog',
    component: BlogComponent,
  },
  {
    path: 'contact-us',
    component: ContactUsComponent,
  },
  {
    path: 'gallery',
    component: GalleryComponent,
  },
  {
    path: 'volunteer',
    component: VolunteerComponent,
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Default route
  { path: '**', redirectTo: '/home' }, // Wildcard route for 404
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
