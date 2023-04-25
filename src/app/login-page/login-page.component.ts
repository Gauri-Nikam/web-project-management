import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginModel } from '../models/login.model';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  loginCredentials: LoginModel = new LoginModel();
  loginForm!: FormGroup;
  
  constructor(private accountService: AccountService, private fb: FormBuilder, private route: Router) { }

  ngOnInit(): void {
    this.buildForm();
  }

  onSubmit() {
    this.accountService.onLogin(this.loginCredentials).subscribe((res: any) =>{
      console.log('res',res);
      localStorage.setItem('token',res.jwtToken)
      if(res.jwtToken)
      {
        this.route.navigateByUrl('home');
      }
    });
  }

  private buildForm() {
    this.loginForm = this.fb.group({
      login: ["", Validators.required],
      password: ["", Validators.required]
    });
  }
}
