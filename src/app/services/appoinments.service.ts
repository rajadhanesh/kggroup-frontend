import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppoinmentsService {
  baseURL: any;
  constructor(private http: HttpClient) { 
    this.baseURL = environment.baseUrl;
  }

  getAppoinmentList(date: Date) {
    return this.http.get(`${this.baseURL}/admin/appoinment?date=${date}`);
  }

  createAppoinemnt(payload: any) {
    return this.http.post(`${this.baseURL}/admin/appoinment`, payload);
  }
}
