import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { RequestsService } from './requests.service';
import { ApiFinanceService } from './api-finance.service';
import { ApiUserService } from './api-user.service';

import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { ChartComponent } from './chart/chart.component';
import { RegistrationComponent } from './registration/registration.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LoginComponent,
    ChartComponent,
    RegistrationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClarityModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ 
    RequestsService,
    ApiFinanceService,
    ApiUserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
