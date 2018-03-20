import { Injectable } from '@angular/core';
import { Customer} from './customer';
import { Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {HttpClient, HttpParams} from '@angular/common/http';
import 'rxjs/add/operator/map';
import * as url from 'url';
import {Subject} from 'rxjs/Subject';
import {Subscriber} from 'rxjs/Subscriber';
import {FormControl, Validators} from '@angular/forms';
import {isEmpty} from 'rxjs/operators';
import {isNull, isNullOrUndefined} from 'util';


@Injectable()
export class CustomerService {

  baseUrl: String = 'http://localhost:8060/api/';
  Criteria: Customer = new Customer();
  Current: Customer;
  CurrentSubject: Subject<Customer> = new Subject<Customer>();
  refreshSubject: Subject<Customer> = new Subject<Customer>();
  isValid = new Array<number>(7);
  isValidSubject: Subject<number[]> = new Subject<number[]>();
  allCustomers: Customer[] = new Array<Customer>();
  listedCustomers: Customer[] = new Array<Customer>();
  /**
   * Gets page of customers from backend that match the criteria
   * @param {Customer} myCustomer criteria that we are trying to get from the server
   * @returns {Observable<any>} Page of customers that meet the criteria
   */
  getAllCustomers(myCustomer: Customer, order: number, sortField: string, page: number): Observable<any> {
    this.Current = myCustomer;
    const myParams = new HttpParams()
      .set('Customer', JSON.stringify(myCustomer))
      .set('page', page.toString())
      .set('order', order.toString())
      .set('sortField', sortField);
    return this.http.get<any>(this.baseUrl + 'customers/all', {params: myParams});
  }
  setAllCustomer(allCustomers: Customer[]): void {
    this.allCustomers = allCustomers.slice(0);
  }
  getListCustomers(ids: Array<number>): Observable<any> {
      const myParams = new HttpParams()
        .set('ids', JSON.stringify(ids));
      return this.http.get<any>(this.baseUrl + 'customers/one', {params: myParams});
  }
  addNewCustomer(myCustomer: Customer): Observable<any> {
    this.Current = myCustomer;
    this.Current.id = null;
    return this.http.post<any>(this.baseUrl + 'customers/add', this.Current);
  }
  saveCustomer(myCustomer: Customer): Observable<any> {
    this.Current = myCustomer;
    return this.http.post<any>(this.baseUrl + 'customers/edit', this.Current);
  }
  removeCustomer(myCustomer: Customer): Observable<any> {
    this.Current = myCustomer;
    return this.http.post<any>(this.baseUrl + 'customers/remove', this.Current);
  }
  /**
   * set the infocus customer and the isValid state
   * @param {Customer} myCustomer customer to set as the in focus customer
   */
  setCurrent(myCustomer: Customer): void {
    this.Current = myCustomer;
    this.CurrentSubject.next(this.Current);
    this.isFull(myCustomer);
    this.checkState();
    this.isWithin(this.Current);
    this.isValidSubject.next(this.isValid);
  }
  // 0 invalid 1 valid 2 contained
  isWithin(myCustomer: Customer): void {
    for (const c of this.allCustomers) {
      if (this.isEquivalent(myCustomer, c)) {
        this.isValid = [2, 2, 2, 2, 2, 2, 2];
      }
    }
  }
  isEquivalent(a, b): boolean {
    const aProps = Object.getOwnPropertyNames(a);
    const bProps = Object.getOwnPropertyNames(b);
    if (aProps.length !== bProps.length) {
      return false;
    }
    for (let i = 0; i < aProps.length; i++) {
      const propName = aProps[i];
      if (a[propName] !== b[propName] && propName !== 'id') {
        return false;
      }
    }
    return true;
  }
  /**
   * Look to see if current customer has all fields filled out
   * @param {Customer} myCustomer current customer
   * @returns {boolean} if all fields are filled
   */
  isFull(myCustomer: Customer): void {
    this.isValid[0] = isNullOrUndefined(this.Current.firstName) ? 0 : 1;
    this.isValid[1] = isNullOrUndefined(this.Current.lastName) ? 0 : 1;
    this.isValid[2] = isNullOrUndefined(this.Current.emailAddress) ? 0 : 1;
    this.isValid[3] = isNullOrUndefined(this.Current.homeAddress) ? 0 : 1;
    this.isValid[4] = isNullOrUndefined(this.Current.state) ? 0 : 1;
    this.isValid[5] = isNullOrUndefined(this.Current.city) ? 0 : 1;
    this.isValid[6] = isNullOrUndefined(this.Current.zipCode) ? 0 : 1;
  }
  checkState(): void {
    const states = [ 'AKAlaska',
      'AL',
      'AR',
      'AS',
      'AZ',
      'CA',
      'CO',
      'CT',
      'DC',
      'DE',
      'FL',
      'GA',
      'GU',
      'HI',
      'IA',
      'ID',
      'IL',
      'IN',
      'KS',
      'KY',
      'LA',
      'MA',
      'MD',
      'ME',
      'MI',
      'MN',
      'MO',
      'MS',
      'MT',
      'NC',
      'ND',
      'NE',
      'NH',
      'NJ',
      'NM',
      'NV',
      'NY',
      'OH',
      'OK',
      'OR',
      'PA',
      'PR',
      'RI',
      'SC',
      'SD',
      'TN',
      'TX',
      'UT',
      'VA',
      'VI',
      'VT',
      'WA',
      'WI',
      'WV',
      'WY'];
    const statesLong = ['Alaska',
      'Alabama',
      'Arkansas',
      'American Samoa',
      'Arizona',
      'California',
      'Colorado',
      'Connecticut',
      'District of Columbia',
      'Delaware',
      'Florida',
      'Georgia',
      'Guam',
      'Hawaii',
      'Iowa',
      'Idaho',
      'Illinois',
      'Indiana',
      'Kansas',
      'Kentucky',
      'Louisiana',
      'Massachusetts',
      'Maryland',
      'Maine',
      'Michigan',
      'Minnesota',
      'Missouri',
      'Mississippi',
      'Montana',
      'North Carolina',
      ' North Dakota',
      'Nebraska',
      'New Hampshire',
      'New Jersey',
      'New Mexico',
      'Nevada',
      'New York',
      'Ohio',
      'Oklahoma',
      'Oregon',
      'Pennsylvania',
      'Puerto Rico',
      'Rhode Island',
      'South Carolina',
      'South Dakota',
      'Tennessee',
      'Texas',
      'Utah',
      'Virginia',
      'Virgin Islands',
      'Vermont',
      'Washington',
      'Wisconsin',
      'West Virginia',
      'Wyoming'];
    this.isValid[4] = 0;
    for (let i = 0; i < statesLong.length; ++i) {
      if (this.Current.state === statesLong[i]) {
        this.Current.state = states[i];
      }
      if (this.Current.state === states[i]) {
        this.isValid[4] = 1;
      }
    }
  }

  /**
   * refresh the customers list and the current customer component
   */
  refresh(): void {
    this.Current = new Customer();
    this.setCurrent(this.Current);
    this.CurrentSubject.next(this.Current);
    this.refreshSubject.next(this.Current);
  }
  constructor(private http: HttpClient) {
  }
}
