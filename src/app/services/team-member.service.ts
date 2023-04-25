import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tasks } from '../models/tasks.model';

@Injectable({
  providedIn: 'root'
})
export class TeamMemberService {

  readonly ROOT_URL = 'http://localhost:8010/Member';

  constructor(private http: HttpClient) { }

  GetTaskById(memberId: number, count: number, page: number): Observable<tasks[]>
  {
    return this.http.get<tasks[]>(this.ROOT_URL + "/GetTasksById/" + memberId + "/" + count + "/" + page);
  }

  GetTaskCountById(memberId: number): Observable<number>
  {
    // let queryParams = new HttpParams();
    // queryParams = queryParams.append("memberId",memberId);
    var count = this.http.get<number>(this.ROOT_URL + "/GetTaskCountById/" + memberId);
    return count;
  }

}
