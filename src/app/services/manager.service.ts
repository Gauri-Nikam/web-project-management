import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { teamMember } from '../models/teamMember.model';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  readonly ROOT_URL = 'http://localhost:8010/Manager';  

  constructor(private http: HttpClient) { }

  GetMemberDetails():Observable<teamMember[]>
  {
    return this.http.get<teamMember[]>(this.ROOT_URL + "/GetMemberDetails");
  }

  GetMemberById(memberId: number):Observable<teamMember>
  {
    return this.http.get<teamMember>(this.ROOT_URL + "/GetMemberById/" + memberId);
  }

}
