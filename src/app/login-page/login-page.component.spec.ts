import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginModel } from '../models/login.model';
import { AccountService } from '../services/account.service';

import { LoginPageComponent } from './login-page.component';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let mockHttp: HttpClient;
  let fixture: ComponentFixture<LoginPageComponent>;
  let formBuilder: FormBuilder
  let mockAccountService: AccountService;
  let loginCredentials: LoginModel = new LoginModel();

  beforeEach(async () => {
    mockHttp = jasmine.createSpyObj("HttpClient", ["get"]);
    (mockHttp.get as jasmine.Spy).and.returnValue({});
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers:[{provide: HttpClient, useValue: mockHttp},{provide: FormBuilder, useVlaue:formBuilder}],
      declarations: [ LoginPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
