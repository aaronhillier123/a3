import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import {CustomerService} from './customer.service';
import { AppComponent } from './app.component';
import { CustomersComponent } from './customers/customers.component';
import {HttpClientModule} from '@angular/common/http';
import {EmailService} from './email.service';
import { EmailComponent } from './email/email.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import {environment} from '../environments/environment';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AuthService} from './auth.service';
import { MyListComponent } from './my-list/my-list.component';
import { GridComponent } from './grid/grid.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomersComponent,
    EmailComponent,
    AddCustomerComponent,
    MyListComponent,
    GridComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase, 'angular-auth-firebase'),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
  ],
  providers: [
    CustomerService,
    EmailService,
    AuthService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
