import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../config/globals';

@Injectable({
  providedIn: 'root'
})
export class FrontContentService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get(API_URL + 'frontcontent');
  }
  add(data: object | FormData): Observable<any> {
    if (data instanceof FormData) {
      return this.http.post(API_URL + 'frontcontent', data);
    } else {
      return this.http.post(API_URL + 'frontcontent', data);
    }
  }
  delete(id: any): Observable<any> {
    return this.http.delete(API_URL + `frontcontent/${id}`);
  }
  update(id: any, object: any): Observable<any> {
    return this.http.put(API_URL + `frontcontent/${id}`, object);
  }
  getById(id: any): Observable<any> {
    return this.http.get(API_URL + `frontcontent/${id}`);
  }
}
