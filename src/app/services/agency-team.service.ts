import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { TeamMemberGridDto } from '../models/agency-team-management';

@Injectable({
  providedIn: 'root'
})
export class AgencyTeamService extends BaseService{

  private jsonUrl = 'assets/team-grid.json';
  constructor(protected override http: HttpClient) {
    super(http);
  }

  getTeamGrid(): Observable<{gridList: TeamMemberGridDto[]} | {error : string}> {
    return this.http.get<{gridList: TeamMemberGridDto[]}>(this.jsonUrl).pipe(
      catchError(this.handleError<{gridList: TeamMemberGridDto[]}>('getTeamGrid'))
    );
  }

}
