import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { TeamMemberHomeComponent } from './team-member/team-member-home/team-member-home/team-member-home.component';

const routes: Routes = [
  { path: '', component: LoginPageComponent },
  { path: 'home', component: HomeComponent },
  { path: 'team-member-home', component: TeamMemberHomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
