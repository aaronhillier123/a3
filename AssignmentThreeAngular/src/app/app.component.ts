import { Component } from '@angular/core';
import {Title} from '@angular/platform-browser';
import {AuthService} from './auth.service';
import * as firebase from 'firebase/app';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'All CUSTOMERS';
  userDetails: firebase.User = null;
  userSubscription: Subscription;
  constructor(private auth: AuthService) {
    this.userSubscription = auth.user.subscribe((value) => {
      this.userDetails = value;
      console.log(this.userDetails);
    });
  }
  signIn(): void {
    this.auth.signInWithGoogle();
  }
  signOut(): void {
    this.auth.logout();
  }
}
