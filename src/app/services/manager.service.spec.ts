import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { ManagerService } from './manager.service';

describe('ManagerService', () => {
  let service: ManagerService;
  let mockHttp: HttpClient;
  let memberId = 10001;

  beforeEach(() => {
    mockHttp = jasmine.createSpyObj("HttpClient", ["get"]);
    (mockHttp.get as jasmine.Spy).and.returnValue({});
    TestBed.configureTestingModule({
      providers:[{provide: HttpClient, useValue: mockHttp}]
    });
    service = TestBed.inject(ManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getMemberDetails', () => {
    service.GetMemberDetails();
      expect(mockHttp.get).toHaveBeenCalled();
  });

  it('should call getMemberById', () => {
    service.GetMemberById(memberId);
      expect(mockHttp.get).toHaveBeenCalled();
  });
});
