import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../config/globals';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient) { }

  login(object: any ): Observable<any> {
    return this.http.post(API_URL + 'login', object);
  }
  register(object: any ): Observable<any> {
    return this.http.post(API_URL + 'register', object);
  }
}
