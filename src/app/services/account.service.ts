import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginModel } from '../models/login.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  onLogin(loginCreds: LoginModel): Observable<any> {
    return this.http.post("http://localhost:8011/api/Account", loginCreds);
  }
}
