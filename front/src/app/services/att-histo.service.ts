import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../config/globals';
@Injectable({
  providedIn: 'root'
})
export class AttHistoService {
  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(API_URL + 'atthisto');
  }
  add(object: any): Observable<any> {
    return this.http.post(API_URL + 'atthisto', object);
  }
  getByStaffId(id: any): Observable<any> {
    return this.http.get(API_URL + `atthisto/staff/${id}`);
  }


}
