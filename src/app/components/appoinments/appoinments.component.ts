import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Appoinment } from '../../model/appoinment';
import { AppoinmentsService } from '../../services/appoinments.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-appoinments',
  templateUrl: './appoinments.component.html',
  styleUrls: ['./appoinments.component.scss'],
})
export class AppoinmentsComponent implements OnInit {
  modalRef: BsModalRef;
  selectedDate: Date;
  bsInlineValue = new Date();
  calenderDate: any;

  time: any;
  timeLimit: any;
  timeValid: any;
  fromSelectedTime: any;
  toSelectedTime: any;
  slotDuration = 30;

  displaySlots: any;
  modalOpenFrom: boolean;

  appoinment: Appoinment;

  constructor(
    private modalService: BsModalService,
    private appoinmentsService: AppoinmentsService,
    private toastrService: ToastrService) {
    /**
     * time validation
     */
    this.timeValid = {
      from: false,
      to: false,
      fromFormat: false,
      toFormat: false,
      duration: false,
      message: '',
    }

    this.displaySlots = [];
  }

  ngOnInit(): void {
  }

  /**
   * To get appoinment list method
   */
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

  /**
   * To create new slot
   * @param payload (contain date, session (true/false - morning/aftenoon), from time, to time)
   */
  createAppoinment(payload: any) {
    this.appoinmentsService.createAppoinemnt(payload).subscribe((resp: any) => {
      if (resp.status) {
        this.displaySlots.push(resp.data);
        this.toastrService.success(resp.message);
      } else {
        this.toastrService.error(resp.message);
      }
      this.modalClose();
    });
  }

  openModal(template: TemplateRef<any>, from: boolean) {
    this.modalOpenFrom = from;
    if (from) {
      /**
     * Set time 9oc as default
     */
      this.time = {
        from: new Date(this.selectedDate.setHours(9, 0, 0)),
        to: new Date(this.selectedDate.setHours(9, 30, 0)),
      }

      /**
       * morning time limit
       */
      this.timeLimit = {
        start: this.getMinutesOf('09:00'),
        end: this.getMinutesOf('12:00'),
      }
    } else {
      /**
     * Set morning 9oc as default
     */
      this.time = {
        from: new Date(this.selectedDate.setHours(12, 0, 0)),
        to: new Date(this.selectedDate.setHours(12, 30, 0)),
      }

      /**
       * morning time limit
       */
      this.timeLimit = {
        start: this.getMinutesOf('12:00'),
        end: this.getMinutesOf('21:00'),
      }
    }
    this.modalRef = this.modalService.show(template, { ignoreBackdropClick: true });
  }

  isValid(event: boolean, from: boolean): void {
    if (from) {
      let givenTime = new Date(this.time.from);
      this.fromSelectedTime = this.calcHours(givenTime);
      this.timeValid.from = (this.fromSelectedTime < this.timeLimit.start) || (this.fromSelectedTime > this.timeLimit.end);
      this.timeValid.fromFormat = event;
    } else {
      let givenTime = new Date(this.time.to);
      this.toSelectedTime = this.calcHours(givenTime);
      this.timeValid.to = (this.toSelectedTime < this.timeLimit.start) || (this.toSelectedTime > this.timeLimit.end);
      this.timeValid.toFormat = event;
    }

    this.timeValid.message = this.modalOpenFrom ? '09:00 - 12:00' : '12:00 - 09:00';
    this.validateTimeDiff();
  }


  timeSubmit() {
    if (!this.timeValid.duration && !this.timeValid.from && !this.timeValid.to && this.timeValid.fromFormat && this.timeValid.toFormat) {
      let payload = {
        date: this.calenderDate,
        session: this.modalOpenFrom,
        from: this.time.from,
        to: this.time.to
      }
      this.createAppoinment(payload);
    }
  }

  validateTimeDiff() {
    if (this.toSelectedTime && this.fromSelectedTime) {
      this.timeValid.duration = (this.toSelectedTime - this.fromSelectedTime !== this.slotDuration);
    }
  }

  modalClose() {
    this.modalRef.hide();
  }

  getMinutesOf(str: any) {
    const time = str.split(':');
    return time[0] * 60 + time[1] * 1;
  }

  calcHours(givenTime: any) {
    return givenTime.getHours() * 60 + givenTime.getMinutes();
  }

  onValueChange(value: Date): void {
    console.log(value);
    this.selectedDate = value;
    this.calenderDate = value.toLocaleDateString();
    this.getAppoinmentList();
  }
}
