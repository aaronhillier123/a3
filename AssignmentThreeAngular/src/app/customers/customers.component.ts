import { Component, OnInit } from '@angular/core';
import { Customer} from '../customer';
import {CustomerService} from '../customer.service';
import {EmailService} from '../email.service';
import {Message} from '../message';
import {forEach} from '@angular/router/src/utils/collection';
import {Title} from '@angular/platform-browser';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  allCustomers: Customer[] = new Array<Customer>();
  myCustomer: Customer = new Customer();
  numberOfPages = 0;
  currentPage = 0;
  pageArray = new Array<Number>();
  page = 0;
  order = 0;
  sortField = 'firstName';
  refreshSubscription: Subscription;
  constructor(private customerService: CustomerService, private emailService: EmailService, private newTitle: Title) {
    this.refreshSubscription = customerService.refreshSubject.subscribe((value) => {
      this.myCustomer = value;
      this.getAllCustomers();
    });
  }
  setSort(sortString: string) {
    if (this.sortField === sortString) {
      this.order = (this.order === 0) ? 1 : 0;
    }
    this.page = 0;
    this.sortField = sortString;
    this.getAllCustomers();
  }
  getAllCustomers(): void {
    this.customerService.getAllCustomers(this.myCustomer, this.order, this.sortField, this.page)
      .subscribe(customers => {
        this.allCustomers = customers.content;
        this.pageArray = new Array<Number>(customers.totalPages)
        if (this.page >= this.pageArray.length) {
          this.page = 0;
        }
        this.customerService.setAllCustomer(this.allCustomers);
        this.customerService.setCurrent(this.myCustomer);
        this.setMessage();
        }
      );
  }
  setCustomer(myCustomer: Customer): void {
    const newCustomer = JSON.parse(JSON.stringify(myCustomer));
    this.customerService.setCurrent(newCustomer);
  }
  setPage(newPage: number): void {
    this.page = newPage;
    this.getAllCustomers();
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
    setMessage(): void {
    let messageString = '';
    for (let c = 0; c < this.allCustomers.length; ++c) {
      messageString += this.stringThis(this.allCustomers[c]);
    }
    this.emailService.setMessage(messageString);
    }
    clear(): void {
    this.myCustomer = new Customer();
    this.getAllCustomers();
    }
  ngOnInit() {
    this.newTitle.setTitle('CUSTOMERS N STUFF');
    this.getAllCustomers();
  }
}
