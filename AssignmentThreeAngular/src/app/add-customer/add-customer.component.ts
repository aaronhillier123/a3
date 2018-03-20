import { Component, OnInit } from '@angular/core';
import { Customer} from '../customer';
import {CustomerService} from '../customer.service';
import {Subject} from 'rxjs/Subject';
import {Subscription} from 'rxjs/Subscription';
import {FormBuilder, FormControl, PatternValidator} from '@angular/forms';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {
  editingCustomer = false;
  validArray = new Array<number>();
  valid = 0;
  currentCustomer: Customer = new Customer();
  currentSubscription: Subscription;
  validSubscription: Subscription;
  constructor(private customerService: CustomerService, private auth: AuthService) {
    this.currentSubscription = customerService.CurrentSubject.subscribe((value) => {
      this.currentCustomer = value;
    });
    this.validSubscription = customerService.isValidSubject.subscribe((value) => {
      this.validArray = value;
      this.valid = 2;
      for (const c of this.validArray) {
        if ( c !== 2 && this.valid !== 0 ) {
          this.valid = 1;
          if ( c === 0) {
            this.valid = 0;
          }
        }
      }
    });
  }
  checkState(): boolean {
    return false;
  }
  addCustomer(): void {
    this.customerService.addNewCustomer(this.currentCustomer)
      .subscribe(value => {
        this.customerService.refresh();
      });
  }
  saveCustomer(): void {
    this.editingCustomer = false;
    this.customerService.saveCustomer(this.currentCustomer)
      .subscribe(value => {
        this.customerService.refresh();
      });
  }
  removeCustomer(): void {
    const self = this;
    this.customerService.removeCustomer(this.currentCustomer)
      .subscribe(value => {
        self.customerService.refresh();
      });
  }
  editCustomer(): void {
    this.editingCustomer = true;
  }
  cancel(): void {
    this.editingCustomer = false;
  }
  setCriteria(myCustomer: Customer) {
    this.customerService.setCurrent(myCustomer);
  }
  addToMyList() {
    this.auth.setValue(this.currentCustomer.id);
  }
  ngOnInit() {
    this.currentCustomer = this.customerService.Current;
    this.validArray = this.customerService.isValid;
  }

}
