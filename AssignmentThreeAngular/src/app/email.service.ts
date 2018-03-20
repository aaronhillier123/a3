import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Customer} from './customer';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
@Injectable()
export class EmailService {

  baseUrl: String = 'http://localhost:8060/api/';
  currentMessage = '';
  preMessageString = '';
  constructor(private http: HttpClient) { }

  sendEmail(toAddress: string, fromAddress: string, subject: string, smtpAddress: string): Observable<String> {
    const message = this.preMessageString + '\n' + this.currentMessage;
    const emailParams = new HttpParams()
      .set('message', message)
      .set('sendAddress', fromAddress)
      .set('recieveAddress', toAddress)
      .set('subject', subject)
      .set('smtpAddress', smtpAddress
  );
    return this.http.post<String>(this.baseUrl + 'email/send', {}, {params: emailParams});
  }
  setMessage(message: string): void {
    this.currentMessage = message;
  }
  preMessage(message: string): void {
    this.preMessageString = message;
  }
  getMessage(): string {
    return this.currentMessage;
  }
}
