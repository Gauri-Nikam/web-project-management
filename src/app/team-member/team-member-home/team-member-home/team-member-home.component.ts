import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { pagination } from 'src/app/models/pagination.model';
import { tasks } from 'src/app/models/tasks.model';
import { teamMember } from 'src/app/models/teamMember.model';
import { ManagerService } from 'src/app/services/manager.service';
import { TeamMemberService } from 'src/app/services/team-member.service';

@Component({
  selector: 'app-team-member-home',
  templateUrl: './team-member-home.component.html',
  styleUrls: ['./team-member-home.component.css']
})
export class TeamMemberHomeComponent implements OnInit {

  heading = "Team member details";
  isSubmitted = false;
  searchedMember= new teamMember();
  projectEndDate= new Date();
  projectStartDate = new Date();
  taskStartDate= new Date();
  taskEndDate = new Date();
  showDetails = false;
  showTasks = false;
  taskDetails : tasks[]= [];
  tasksCount =0;
  count = 4;
  currentPage :  pagination = {pageNum : 1, active : true};
  totalPages = 1
  paginationArray : pagination[] = [];

  //idForm = new FormGroup({});
  idForm = new FormGroup({
    Id: new FormControl('',([Validators.minLength(5), 
      Validators.maxLength(5), 
      Validators.pattern("^[0-9]*$")]))
  });

  constructor(
    private managerService: ManagerService,
    private teamMemberService: TeamMemberService) { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.isSubmitted = true;
    this.paginationArray = [];

    if(this.idForm.valid){
      this.managerService.GetMemberById(this.idForm.controls['Id'].value as number).subscribe(response => {
        console.log(response);
        if(response != null){
          this.searchedMember = response;
          this.projectStartDate = this.searchedMember.projectStartDate ? new Date(this.searchedMember.projectStartDate) : this.projectStartDate;
          this.projectEndDate = this.searchedMember.projectEndDate ? new Date(this.searchedMember.projectEndDate) : this.projectEndDate;
          this.showDetails = true;

        }
        else{
          this.showDetails = false;
          this.searchedMember.memberId = this.idForm.controls['Id'].value;
          this.searchedMember.memberName =undefined;
        }
      });

      this.teamMemberService.GetTaskCountById(this.idForm.controls['Id'].value as number).subscribe(response => {
        this.tasksCount = response;
        this.totalPages = Math.ceil(this.tasksCount/this.count);
        
        if(this.tasksCount !=0){
          this.teamMemberService.GetTaskById(this.idForm.controls['Id'].value as number, this.count, this.currentPage.pageNum).subscribe(response => {
            console.log(response);

            if(response.length > 0){
              this.taskDetails = response;
              this.formatDate();
              this.showTasks = true;

              if(this.tasksCount > this.count){
                  this.paginationArray.push(this.currentPage);
                  for(var i = 1; i < this.totalPages; i++){
                  var obj : pagination = { pageNum : i+1 , active : false};
                  this.paginationArray.push(obj);
                }                
              }

            }
          });
        }
        else {
          this.taskDetails = [];
          this.showTasks = false;
        }


      });
    }
  }

  toggleAccordian(event: any, index: number) {
    var element = event.target;
    element.classList.toggle('active');
    if (this.taskDetails[index].isActive) {
      this.taskDetails[index].isActive = false;
    } else {
      this.taskDetails[index].isActive = true;
    }
    var panel = element.parentElement;
    panel = panel.parentElement;
    panel = panel.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  }

  getPaginatedData(page: pagination) {    
    this.currentPage = page;
    if(this.searchedMember.memberId != undefined){
      this.teamMemberService.GetTaskById(this.searchedMember?.memberId, this.count, page.pageNum).subscribe(response => {
        this.taskDetails = response;
        this.formatDate();
        this.paginationArray.forEach(element => {
          element.active = false;
        })
        page.active = true;    
      });
    }
    
  }

  getPaginatedDataOnNext(currentPage: pagination){
    if(currentPage.pageNum < this.paginationArray.length){ 
      this.getPaginatedData(this.paginationArray[currentPage.pageNum]);    
    }
  }

  getPaginatedDataOnPrevious(currentPage: pagination){
    if(currentPage.pageNum != 1){ 
      this.getPaginatedData(this.paginationArray[currentPage.pageNum - 2]);     
    }
  }

  formatDate() {
  this.taskDetails.forEach(element => {
    element.startDate = element.taskStartDate ? new Date(element.taskStartDate) : this.taskStartDate;
    element.endDate = element.taskEndDate ? new Date(element.taskEndDate) : this.taskEndDate;
  });
}

}
