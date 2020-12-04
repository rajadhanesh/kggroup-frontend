import { Component, OnInit } from '@angular/core';
import { Appoinment } from '../../model/appoinment';
import { AppoinmentsService } from '../../services/appoinments.service';

import { PatientService } from '../../services/patient.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  myDateValue: Date;
  minDate: Date;
  calenderDate: any;
  appoinment: Appoinment;
  displaySlots: any;

  constructor(private patientService: PatientService) {
    this.displaySlots = [];
  }

  ngOnInit(): void {
    this.myDateValue = new Date();
  }

  /**
   * To get appoinment List method
   */
  getAppoinmentList() {
    this.patientService.getBookedList(this.calenderDate).subscribe((resp: any) => {
      if (resp.status) {
        const data = resp.data;
        this.appoinment = data;
        this.displaySlots = this.appoinment;
      } else {

      }
    });
  }

  /**
   * To to selected date and get appoinment list
   * @param value (calender selected date)
   */
  onValueChange(value: Date): void {
    this.calenderDate = value.toLocaleDateString();
    this.getAppoinmentList();
  }

}
