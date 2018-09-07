import { Component, OnInit } from '@angular/core';
import { Customer} from '../customer';
import {AuthService} from '../auth.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-my-list',
  templateUrl: './my-list.component.html',
  styleUrls: ['./my-list.component.css']
})

export class MyListComponent implements OnInit {
  allCustomers = new Array<Customer>();
  allCustomerSubscription: Subscription;
  snakeShow = false;
  playingSnake = false;
  gridWidth = new Array<number>();
  gridHeight = new Array<number>();
  auth: AuthService;
  constructor(auth: AuthService) {
    this.auth = auth;
    this.allCustomerSubscription = auth.myCustomerSubject.subscribe((value) => {
      this.allCustomers = value;
    });
  }
  showSnake(): void {
    if (this.snakeShow) {
      this.snakeShow = false;
      this.playingSnake = false;
    } else {
      this.snakeShow = true;
    }
  }
  playSnake(): void {
    this.playingSnake = true;
    for (let i = 0; i < 12; ++i ) {
      this.gridWidth[i] = i;
      this.gridHeight[i] = i;
    }
  }
  ngOnInit(): void {
  }
}
