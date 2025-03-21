import { NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { Component, computed, CUSTOM_ELEMENTS_SCHEMA, effect, Input, OnInit, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { TeamMemberGridDto } from '../../../models/agency-team-management';

@Component({
  selector: 'app-agency-team-grid',
  imports: [TranslateModule, FormsModule, NgFor, UpperCasePipe, NgIf],
  templateUrl: './agency-team-grid.component.html',
  styleUrl: './agency-team-grid.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AgencyTeamGridComponent{
  _searchInput: WritableSignal<string> = signal('');
  viewModes = signal([
    {iconName: 'material-symbols:format-list-bulleted-rounded', name: 'table', isActive: true},
    {iconName: 'material-symbols:grid-on-outline', name: 'list', isActive: false}
  ]);
  currentMode = "table";

  constructor() {
    effect(() => {
      this.updateFilterList();
    });
    
  }

  @Input() teamList: WritableSignal<TeamMemberGridDto[]> = signal([]);
  filteredList: WritableSignal<TeamMemberGridDto[]> = signal([]);
  updateViewMode(item: {iconName: string, name: string, isActive: boolean}){
    this.viewModes().forEach(x => x.isActive = false);
    item.isActive = true;
    this.currentMode = item.name
  }

  updateFilterList(): void {
    console.log(this.teamList())
    this.filteredList.set(this.teamList());
  }

  get searchInput(){
    return this._searchInput();
  }
  set searchInput(value){
    this._searchInput.set(value);
    //console.log(this.teamList().forEach(x => console.log(this.getString(x))));
    this.filteredList.set(this.teamList().filter(x => this.getString(x).toLowerCase().includes(value.toLowerCase())) );
  }

  public getString(dto: any){
    return dto.UserFullName + ''+
    dto.UserMail + ''+
    dto.UserContactNo + ''+
    dto.UserCategoryName + ''+
    dto.UserRoleName + ''+
    dto.UserName + '';
}
}
