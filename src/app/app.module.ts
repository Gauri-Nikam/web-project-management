import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home/home.component';
import { TeamMemberHomeComponent } from './team-member/team-member-home/team-member-home/team-member-home.component';
import { NavBarComponent } from './nav-bar/nav-bar/nav-bar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginPageComponent } from './login-page/login-page.component';
import { CustomInterceptor } from './services/custom.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TeamMemberHomeComponent,
    NavBarComponent,
    LoginPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [{
   provide: HTTP_INTERCEPTORS, useClass: CustomInterceptor,
   multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
