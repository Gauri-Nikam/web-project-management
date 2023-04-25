import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { teamMember } from './models/teamMember.model';
import { ManagerService } from './services/manager.service';
import { TeamMemberService } from './services/team-member.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = "Project Management";
  
  constructor(){   
  }
}
