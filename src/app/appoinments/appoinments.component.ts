import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-appoinments',
  templateUrl: './appoinments.component.html',
  styleUrls: ['./appoinments.component.scss'],
})
export class AppoinmentsComponent implements OnInit {
  modalRef: BsModalRef;
  currentDate = new Date();

  morning: any;
  morningLimit: any;
  mornigValid: any;
  msSelectedTime: any;
  meSelectedTime: any;
  slotDuration = 30;
 

  constructor(private modalService: BsModalService) { 
    /**
     * Set morning 9oc as default
     */
    this.morning = {
      from:  new Date(this.currentDate.setHours(9, 0, 0)),
      to: new Date(this.currentDate.setHours(9, 30, 0)),
    }

    /**
     * morning time limit
     */
    this.morningLimit = {
      start: this.getMinutesOf('09:00'),
      end: this.getMinutesOf('12:00'),
    }

    /**
     * morning validation
     */
    this.mornigValid = {
      from: false,
      to: false,
      fromFormat:false,
      toFormat: false,
      duration: false
    }
  }

  ngOnInit(): void {
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {ignoreBackdropClick: true});
  }

  isValidMS(event: boolean): void {
    let givenTime = new Date(this.morning.from);
    this.msSelectedTime = this.calcHours(givenTime);
    this.mornigValid.from = (this.msSelectedTime < this.morningLimit.start) || (this.msSelectedTime > this.morningLimit.end);
    this.mornigValid.fromFormat = event;
    this.validateTimeDiff();
  }

  isValidME(event: boolean): void {
    let givenTime = new Date(this.morning.to);
    this.meSelectedTime = this.calcHours(givenTime);
    this.mornigValid.to = (this.meSelectedTime < this.morningLimit.start) || (this.meSelectedTime > this.morningLimit.end);
    this.mornigValid.toFormat = event;
    this.validateTimeDiff();
  }

  validateTimeDiff() {
    if(this.meSelectedTime && this.msSelectedTime) {
      this.mornigValid.duration = (this.meSelectedTime - this.msSelectedTime !== this.slotDuration);
    }
  }

  modalClose(){
    this.modalRef.hide();
  }

  getMinutesOf(str: any) {
    const time = str.split(':');
    return time[0]*60+time[1]*1;
  }

  calcHours(givenTime: any) {
    return givenTime.getHours()*60+givenTime.getMinutes();
  }
}
