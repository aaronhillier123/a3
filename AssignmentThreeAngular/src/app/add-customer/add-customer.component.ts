import { Component, OnInit } from '@angular/core';
import { Customer} from '../customer';
import {CustomerService} from '../customer.service';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {

  constructor(private customerService: CustomerService) { }
  newCustomer: Customer = new Customer();
  errorMessage = '';
  success = 0;
  addCustomer(): void {
    if (this.newCustomer.emailAddress.includes('@')) {
      this.customerService.addCustomer(this.newCustomer)
        .subscribe(result => {
          console.log(result);
          if (result === 0) {
            this.success = 0;
            this.errorMessage = 'SUCCESSFUL ADD';
          } else if (result === 1062) {
            this.success = 1;
            this.errorMessage = 'ADD FAILED: DUPLICATE ENTRY ON EMAIL ADDRESS, PLEASE ENTER A DIFFERENT EMAIL ADDRESS';
          } else if (result === 1406) {
            this.success = 1;
            this.errorMessage = 'FAILED: INVALID STATE, PLEASE ENTER A STATE WITH THE 2 CHARACTER STATE CODE (TX, CA, NY, etc.)';
          }
        });
    } else {
      this.success = 1;
      this.errorMessage = 'Email invalid. Please enter a valid email address!';
    }
    this.newCustomer.clear();
  }
  clearError(): void {
    this.errorMessage = '';
    this.success = 0;
  }
  ngOnInit() {
  }
}
