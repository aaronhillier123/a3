import { Injectable } from '@angular/core';
import { Customer} from './customer';
import { Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {HttpClient, HttpParams} from '@angular/common/http';
import 'rxjs/add/operator/map';
import * as url from 'url';


@Injectable()
export class CustomerService {

   baseUrl: String = 'http://localhost:8060/api/';
   Criteria: Customer = new Customer();
   CustomerText = '';
  getSimilarCustomers(criteria: Customer): Observable<Customer[]> {
    const texasParams = new HttpParams()
      .set('CriteriaString', JSON.stringify(criteria));
    return this.http.get<Customer[]>(this.baseUrl + 'customers/similar', {params: texasParams});
  }
  getDifferentCustomers(criteria: Customer): Observable<Customer[]> {
    const texasParams = new HttpParams()
      .set('CriteriaString', JSON.stringify(criteria));
    return this.http.get<Customer[]>(this.baseUrl + 'customers/different', {params: texasParams});
  }
  addCustomer(newCustomer: Customer): Observable<any> {
    return this.http.post<Customer>(this.baseUrl + 'customers/addCustomer', JSON.stringify(newCustomer));
  }
  postCustomerFormData(formText: String): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'customers/uploadForm', formText);
  }
  private handleError(error: Response) {
    return Observable.throw(error.statusText);
  }
  constructor(private http: HttpClient) { }

}
