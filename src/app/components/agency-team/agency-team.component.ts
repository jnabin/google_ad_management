import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AgencyTeamGridComponent } from './agency-team-grid/agency-team-grid.component';
import { TeamMemberFormDto, TeamMemberGridDto } from '../../models/agency-team-management';
import { AgencyTeamService } from '../../services/agency-team.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AgencyFormDto } from '../../models/agency-profile';
import { AgencyTeamFormComponent } from './agency-team-form/agency-team-form.component';

@Component({
  selector: 'app-agency-team',
  imports: [
    FormsModule, 
    CommonModule, 
    TranslateModule, 
    MatButtonModule, 
    AgencyTeamGridComponent
  ],
  templateUrl: './agency-team.component.html',
  styleUrl: './agency-team.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AgencyTeamComponent {
    teamGridService: AgencyTeamService = inject(AgencyTeamService);
    errorMessage = signal<string | null>(null);
    categories = [
      { id: 1, name: 'Admin' },
      { id: 2, name: 'User' },
      { id: 3, name: 'Manager' }
    ];
    roles = [
      { id: 1, name: 'Super Admin' },
      { id: 2, name: 'Editor' },
      { id: 3, name: 'Viewer' }
    ];
    constructor(
      private tralateService: TranslateService,
      private modalService: NgbModal
    ) {
      this.loadGrid();
    }

    teamGridList = signal<TeamMemberGridDto[] | []>([]);

    private loadGrid(){
      this.teamGridService.getTeamGrid().subscribe({
        next: (data) => {
          if('error' in data){
            this.errorMessage.set(data.error)
            this.teamGridList.set([]);
          } else {
            this.teamGridList.set(data.gridList);
            this.errorMessage.set(null);
  
            console.log(this.teamGridList());
            console.log(this.errorMessage());
          }
        },
        error: (err) => {
          this.errorMessage.set(err.message);
          this.teamGridList.set([]);
        }
      })
    }

    openModal() {
      const modalRef = this.modalService.open(AgencyTeamFormComponent,
         {
          size: 'lg',
          backdrop: 'static', keyboard: false
         }
        );
      modalRef.componentInstance.teamData = new AgencyFormDto();
      modalRef.componentInstance.categories = this.categories;
      modalRef.componentInstance.roles = this.roles;

      modalRef.result.then(
        (result) => {
          if (result) {
            // Save the data returned from the modal
            console.log('Data received from modal:', result);
            this.teamGridList.update(data => [...data, this.getGridDtoFromForm(result)])
            // Optionally, save it via a service or further processing
          }
        },
        (reason) => {
          console.log('Modal dismissed:', reason);
        }
      );
    }

    getGridDtoFromForm(teamMemberFormDto: TeamMemberFormDto){
      let t =  new TeamMemberGridDto();
      t.UserSystemId = teamMemberFormDto.UserSystemId;
      t.UserFullName = teamMemberFormDto.UserFirstName+' '+teamMemberFormDto.UserLastName;
      t.UserMail = teamMemberFormDto.UserMail;
      t.UserContactNo = teamMemberFormDto.UserContactNo;
      t.UserRoleName = this.roles.find(x => x.id == teamMemberFormDto.UserRoleId)?.name as string;
      t.UserCategoryName = this.categories.find(x => x.id == teamMemberFormDto.UserCategoryId)?.name as string;
      t.UserName = teamMemberFormDto.UserName;
      t.UserActiveStatus = 1;

      return t;
    }
}
