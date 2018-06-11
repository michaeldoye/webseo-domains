import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './client/home/home.component';
import { LoginPageComponent } from './client/login-page/login-page.component';
import { AdminAuthGuard } from './core/admin-auth.guard';
import { DetailPageComponent } from './client/home/detail-page/detail-page.component';
import { ClientPageComponent } from './client/home/client-page/client-page.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'domain/:id',
    component: DetailPageComponent,
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'client/:id',
    component: ClientPageComponent,
    canActivate: [AdminAuthGuard]
  },  
  {
    path: 'login',
    component: LoginPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class RoutingModule { }
