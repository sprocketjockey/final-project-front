import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { ChartComponent } from './chart/chart.component';
import { RegistrationComponent } from './registration/registration.component';

const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: 'main', component: MainComponent },
  { path: 'login', component: LoginComponent },
  { path: 'chart', component: ChartComponent },
  { path: 'register', component: RegistrationComponent }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
