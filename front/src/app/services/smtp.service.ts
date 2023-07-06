import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../config/globals';

@Injectable({
  providedIn: 'root'
})
export class SmtpService {
  constructor(private http: HttpClient) { }
  

  sendEmail(data: any): Observable<any> {
      return this.http.post(API_URL + 'smtp', data,{
        headers: { enctype : "multipart/form-data" },
      });
    
  }
}