import {Component, Input, OnInit} from '@angular/core';
import {EmailService} from '../email.service';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {

  status: String;
  fromAddress: string;
  toAddress: string;
  smptAddress = 'exchange.heb.com';
  subject: string;
  message: string;
  constructor( private emailService: EmailService) { }
  sendEmail(): void {
    this.setMessage();
    this.emailService.sendEmail(this.fromAddress, this.toAddress, this.subject, this.smptAddress)
      .subscribe(result => {
      });
    this.fromAddress = '';
    this.toAddress = '';
    this.message = '';
    this.subject = '';
  }
  setMessage(): void {
    this.emailService.preMessage(this.message);
  }
  ngOnInit() {
  }
}
