import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import {CustomerService} from './customer.service';
import { AppComponent } from './app.component';
import { CustomersComponent } from './customers/customers.component';
import {HttpClientModule} from '@angular/common/http';
import {EmailService} from './email.service';
import { EmailComponent } from './email/email.component';
import { UploaderComponent } from './uploader/uploader.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomersComponent,
    EmailComponent,
    UploaderComponent,
    AddCustomerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    CustomerService,
    EmailService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
