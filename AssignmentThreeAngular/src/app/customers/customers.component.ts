import { Component, OnInit } from '@angular/core';
import { Customer} from '../customer';
import {CustomerService} from '../customer.service';
import {EmailService} from '../email.service';
import {Message} from '../message';
import {forEach} from '@angular/router/src/utils/collection';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  texasCustomers: Customer[] = new Array<Customer>();
  otherCustomers: Customer[] = new Array<Customer>();
  myCustomer: Customer = new Customer();
  success: String = '';
  constructor(private customerService: CustomerService, private emailService: EmailService, private newTitle: Title) { }

  getTexasCustomers(): void {
    this.customerService.getSimilarCustomers(this.myCustomer)
      .subscribe(customers => {
        this.texasCustomers = customers;
        let myString = 'TEXAS CUSTOMERS\n';
        for (let i = 0; i < this.texasCustomers.length; ++i) {
          myString += this.stringThis(this.texasCustomers[i]);
          this.emailService.addToMessage(myString);
          myString = '';
          }
        }
      );
  }
  getOtherCustomers(): void {
    this.customerService.getDifferentCustomers(this.myCustomer)
      .subscribe(customers => {
        this.otherCustomers = customers;
        let myString = 'OTHER CUSTOMERS\n';
        for (let i = 0; i < this.otherCustomers.length; ++i) {
          myString += this.stringThis(this.otherCustomers[i]);
          this.emailService.addToMessage(myString);
          myString = '';
          }
        }
      );
    }
    stringThis(c: Customer): string {
      let myString = '';
      myString += 'First Name: ' + c.firstName + '\n';
      myString += 'Last Name: ' + c.lastName + '\n';
      myString += 'Email Address: ' + c.emailAddress + '\n';
      myString += 'Home Address: ' + c.homeAddress + '\n';
      myString += 'City: ' + c.city + '\n';
      myString += 'State: ' + c.state + '\n';
      myString += 'Zip Code: ' + c.zipCode + '\'\n\n';
      return myString;
    }
  ngOnInit() {
    this.newTitle.setTitle('CUSTOMERS N STUFF');
    this.myCustomer.setState('\'TX\'');
    this.getTexasCustomers();
    this.getOtherCustomers();
  }
}
