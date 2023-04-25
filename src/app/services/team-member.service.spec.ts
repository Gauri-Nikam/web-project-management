import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { TeamMemberService } from './team-member.service';

describe('TeamMemberService', () => {
  let service: TeamMemberService;
  let mockHttp: HttpClient;
  let memberId = 10001;
  let count = 8;
  let page = 1;

  beforeEach(() => {
    mockHttp = jasmine.createSpyObj("HttpClient", ["get"]);
    (mockHttp.get as jasmine.Spy).and.returnValue({});
    TestBed.configureTestingModule({
      providers:[{provide: HttpClient, useValue: mockHttp}]
    });
    service = TestBed.inject(TeamMemberService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getTaskById', () => {
    service.GetTaskById(memberId, count, page);
      expect(mockHttp.get).toHaveBeenCalled();
  });

  it('should call getTaskCountById', () => {
    service.GetTaskCountById(memberId);
      expect(mockHttp.get).toHaveBeenCalled();
  });
});
