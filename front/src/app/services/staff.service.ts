import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../config/globals';
@Injectable({
    providedIn: 'root',
})
export class StaffService {

    constructor(private http: HttpClient) { }

    getAll(): Observable<any> {
        return this.http.get(API_URL + 'Staff');
    }
    add(object: any): Observable<any> {
        return this.http.post(API_URL + 'Staff', object);
    }
    delete(id: any): Observable<any> {
        return this.http.delete(API_URL + `Staff/${id}`);
    }
    update(id: any, object: any): Observable<any> {
        return this.http.put(API_URL + `Staff/${id}`, object);
    }
    getById(id: any): Observable<any> {
        return this.http.get(API_URL + `Staff/${id}`);
    }
}
