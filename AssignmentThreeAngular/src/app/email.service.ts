import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Customer} from './customer';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
@Injectable()
export class EmailService {

  baseUrl: String = 'http://localhost:8060/api/';
  currentMessage = '';
  constructor(private http: HttpClient) { }

  sendEmail(message: string, toAddress: string, fromAddress: string): Observable<String> {
    console.log(toAddress);
    console.log(fromAddress);
    const emailParams = new HttpParams()
      .set('message', message)
      .set('sendAddress', fromAddress)
      .set('recieveAddress', toAddress
  );
    return this.http.post<String>(this.baseUrl + 'email/send', {}, {params: emailParams});
  }
  addToMessage(message: string): void {
    this.currentMessage += message;
  }
  getMessage(): string {
    return this.currentMessage;
  }
}
