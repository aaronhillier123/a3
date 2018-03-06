import {Component, Input, OnInit} from '@angular/core';
import {EmailService} from '../email.service';
import {CustomersComponent} from '../customers/customers.component';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {

  status: String;
  fromAddress: string;
  toAddress: string;
  message: string;
  constructor( private emailService: EmailService) { }
  sendEmail(): void {
    this.setMessage();
    this.emailService.sendEmail(this.message, this.fromAddress, this.toAddress)
      .subscribe(result => this.status = result.toString());
    this.fromAddress = '';
    this.toAddress = '';
  }
  setMessage(): void {
    this.message = this.emailService.getMessage();
  }
  ngOnInit() {
  }
}
