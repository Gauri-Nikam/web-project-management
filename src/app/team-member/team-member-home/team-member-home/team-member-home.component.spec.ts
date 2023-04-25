import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { of } from 'rxjs';
import { tasks } from 'src/app/models/tasks.model';
import { teamMember } from 'src/app/models/teamMember.model';
import { ManagerService } from 'src/app/services/manager.service';
import { TeamMemberService } from 'src/app/services/team-member.service';

import { TeamMemberHomeComponent } from './team-member-home.component';

describe('TeamMemberHomeComponent', () => {
  let component: TeamMemberHomeComponent;
  let fixture: ComponentFixture<TeamMemberHomeComponent>;
  let mockTeamMemberService: TeamMemberService;
  let mockManagerService: ManagerService;
  let searchedMember: teamMember;
  let tasksCount: number;
  let taskDetails: tasks[];
  let idForm = new FormGroup({
    Id: new FormControl(10001)
  });


  beforeEach(() => {

    mockTeamMemberService = jasmine.createSpyObj("TeamMemberService", ["GetTaskById", "GetTaskCountById"]);
    mockManagerService = jasmine.createSpyObj("ManagerService", ["GetMemberDetails", "GetMemberById"]);

    searchedMember ={
      memberId: 10001,
      memberName: "Robert Smith",
      experience: 5,
      skillset: [".net", "angular", "mongodb", "devops", "html"],
      currentProfileDescription: "worked with life sciences domain for last 5 years.",
      projectStartDate: "10/11/2022",
      projectEndDate: "11/11/2022",
      allocationPercentage: 100
    };
    tasksCount = 1;

    taskDetails = [{
      memberId :10001,
      memberName : "Robert Smith",
      taskName : "Dev",
      deliverables : "Complete manager screen development",
      taskStartDate : "10/15/2022",
      taskEndDate : "10/25/2022",
      startDate : undefined,
      endDate : undefined,
      isActive : false
    }];

    (mockManagerService.GetMemberById as jasmine.Spy).and.returnValue(of(searchedMember));
    (mockTeamMemberService.GetTaskCountById as jasmine.Spy).and.returnValue(of(tasksCount));
    (mockTeamMemberService.GetTaskById as jasmine.Spy).and.returnValue(of(taskDetails));

    TestBed.configureTestingModule({
      declarations: [TeamMemberHomeComponent],
      providers:[
        {provide: TeamMemberService, useValue: mockTeamMemberService},
        {provide: ManagerService, useValue: mockManagerService}
      ]
    }).compileComponents();
    component =  new TeamMemberHomeComponent(mockManagerService, mockTeamMemberService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('onSubmit', () => {
    component.onSubmit();
    mockManagerService.GetMemberById(10001).subscribe(response => {
      expect(response).toEqual(searchedMember);
    });
    mockTeamMemberService.GetTaskCountById(10001).subscribe(response => {
      expect(response).toEqual(tasksCount);
    });
    mockTeamMemberService.GetTaskById(10001, 8, 1).subscribe(response => {
      expect(response).toEqual(taskDetails);
    });
  });

  it('getPaginatedData', () => {
    tasksCount = 9;

    const task ={
      memberId :10001,
      memberName : "Robert Smith",
      taskName : "Test",
      deliverables : "Complete manager screen development",
      taskStartDate : "10/15/2022",
      taskEndDate : "10/25/2022",
      startDate : undefined,
      endDate : undefined,
      isActive : false
    };
    component.taskDetails = [task, task, task, task, task, task, task, task, task];
    component.searchedMember = searchedMember;
    const page ={pageNum : 2, active : false};
    component.getPaginatedData(page);
    expect(mockTeamMemberService.GetTaskById).toHaveBeenCalled();
    
  });
});
