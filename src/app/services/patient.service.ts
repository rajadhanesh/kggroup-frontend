import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  baseURL: any;
  constructor(private http: HttpClient) { 
    this.baseURL = environment.baseUrl;
  }
  
  getBookedList(date: Date) {
    return this.http.get(`${this.baseURL}/patient/booklist?date=${date}`);
  }
}
