import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { LoginModel } from '../models/login.model';
import { AccountService } from './account.service';

describe('AccountService', () => {
  let service: AccountService;
  let mockHttp: HttpClient;
  let loginCredentials: LoginModel = new LoginModel();

  beforeEach(() => {
    mockHttp = jasmine.createSpyObj("HttpClient", ["post"]);
    (mockHttp.post as jasmine.Spy).and.returnValue({});
    TestBed.configureTestingModule({
      providers:[{provide: HttpClient, useValue: mockHttp}]
    });
   
    service = TestBed.inject(AccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call onLogin', () => {
    loginCredentials.userName = "test";
    loginCredentials.password = "test";

    service.onLogin(loginCredentials);
      expect(mockHttp.post).toHaveBeenCalled();
  });
});
