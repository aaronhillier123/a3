import { Injectable } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {Observable} from 'rxjs/Observable';
import {AngularFireDatabase, AngularFireList, AngularFireObject} from 'angularfire2/database';
import 'rxjs/add/operator/map';
import {CustomerService} from './customer.service';
import {Customer} from './customer';
import {Subject} from 'rxjs/Subject';
@Injectable()
export class AuthService {

  value: AngularFireObject<any>;
  myCustomerIds: Array<any>;
  myCustomers: Array<Customer>;
  myCustomerSubject = new Subject<Array<Customer>>();
  user: Observable<firebase.User>;
  userDetails: firebase.User = null;
  constructor(af: AngularFireDatabase, private customerService: CustomerService, private _firebaseAuth: AngularFireAuth) {
    this.user = _firebaseAuth.authState;
    this.user.subscribe(
      (user) => {
        if (user) {
          this.userDetails = user;
          this.value = af.object('/' + user.uid + '/myCustomers');
          af.list('/' + user.uid + '/myCustomers').valueChanges()
            .subscribe(val => {
              this.myCustomerIds = val;
              this.customerService.getListCustomers(this.myCustomerIds)
                .subscribe(customers => {
                  this.myCustomers = customers;
                  this.myCustomerSubject.next(this.myCustomers);
                });
            });
        } else {
          this.userDetails = null;
        }
      }
    );
  }
  setValue(data: any) {
    if (!this.myCustomerIds.includes(data.valueOf())) {
      this.myCustomerIds.push(data);
    } else {
      const index = this.myCustomerIds.indexOf(data.valueOf());
      this.myCustomerIds.splice(index, 1);
    }
    this.value.set(this.myCustomerIds);
  }
  deleteValue() {
    this.value.remove().then(_ => console.log('deleted!'));
  }
  signInWithGoogle() {
  return this._firebaseAuth.auth.signInWithPopup(
    new firebase.auth.GoogleAuthProvider()
  );
  }
  isLoggedIn() {
      if (this.userDetails == null) {
        return false;
      } else {
        return true;
      }
  }
  logout() {
      this._firebaseAuth.auth.signOut();
    }
}
