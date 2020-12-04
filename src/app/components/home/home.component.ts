import { Component, OnInit } from '@angular/core';
import { Appoinment } from '../../model/appoinment';
import { AppoinmentsService } from '../../services/appoinments.service';


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

  constructor(private appoinmentsService: AppoinmentsService) { 
    this.displaySlots = [];
  }

  ngOnInit(): void {
    this.myDateValue = new Date();
  }

  onDateChange(newDate: Date) {
    console.log(newDate);
  }

  getAppoinmentList() {
    this.appoinmentsService.getAppoinmentList(this.calenderDate).subscribe((resp: any) => {
      if (resp.status) {
        const data = resp.data;
        this.appoinment = data;
        this.displaySlots = this.appoinment;
      } else {

      }
    });
  }

  onValueChange(value: Date): void {
    this.calenderDate = value.toLocaleDateString();
    this.getAppoinmentList();
  }

}
