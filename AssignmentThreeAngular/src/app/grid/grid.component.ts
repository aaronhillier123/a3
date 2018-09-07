import {Component, HostListener, OnInit} from '@angular/core';
import { Piece } from '../piece';
export enum KEY_CODE {
  DOWN_ARROW = 40,
  RIGHT_ARROW = 39,
  UP_ARROW = 38,
  LEFT_ARROW = 37,
}
@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {
  pieces = new Array<Array<Piece>>();
  emptyPieces = new Array<Piece>();
  direction = 0;
  gameOver = false;
  train = new Array<Piece>();
  head = new Piece();
  food = new Piece();
  ateFood = false;
  bodyLength = 0;
  constructor() { }
  timer: any;
  ngOnInit() {
    this.createGrid();
  }
  createGrid(): void {
    for (let i = 0; i < 12; ++i) {
      const rowPieces = new Array<Piece>();
      for ( let j = 0; j < 12; ++j ) {
        const piece = new Piece();
        piece.xValue = i;
        piece.yValue = j;
        this.emptyPieces.push(piece);
        rowPieces.push(piece);
      }
      this.pieces.push(rowPieces);
    }
  }
  getPiece(x: number, y: number): Piece {
    if (x >= 0 && x < this.pieces.length ) {
      if (y >= 0 && y < this.pieces[x].length) {
        return this.pieces[x][y];
      }
    }
    this.endGame();
    return new Piece();
  }
  endGame(): void {
    clearInterval(this.timer);
    this.gameOver = true;
  }
  moveRight(): void {
    if (this.getPiece(this.head.xValue, this.head.yValue + 1) === this.food) {
      this.ateFood = true;
    }
    if (this.inTrain(this.getPiece(this.head.xValue, this.head.yValue + 1))) {
      this.endGame();
    }
    this.adjustTrain(this.getPiece(this.head.xValue, this.head.yValue + 1));
  }
  moveLeft(): void {
    if (this.getPiece(this.head.xValue, this.head.yValue - 1) === this.food) {
      this.ateFood = true;
    }
    if (this.inTrain(this.getPiece(this.head.xValue, this.head.yValue - 1))) {
      this.endGame();
    }
      this.adjustTrain(this.getPiece(this.head.xValue, this.head.yValue - 1));
  }
  moveUp(): void {
    if (this.getPiece(this.head.xValue + 1, this.head.yValue) === this.food) {
      this.ateFood = true;
    }
    if (this.inTrain(this.getPiece(this.head.xValue + 1, this.head.yValue))) {
      this.endGame();
    }
      this.adjustTrain(this.getPiece(this.head.xValue + 1, this.head.yValue));
  }
  moveDown(): void {
    if (this.getPiece(this.head.xValue - 1, this.head.yValue) === this.food) {
      this.ateFood = true;
    }
    if (this.inTrain(this.getPiece(this.head.xValue - 1, this.head.yValue))) {
      this.endGame();
    }
      this.adjustTrain(this.getPiece(this.head.xValue - 1, this.head.yValue));
  }
  run(): void {
    switch (this.direction) {
      case 0:
        this.moveRight();
        break;
      case 1:
        this.moveLeft();
        break;
      case 2:
        this.moveDown();
        break;
      case 3:
        this.moveUp();
        break;
      default:
        break;
    }
  }
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    switch (event.keyCode) {
      case KEY_CODE.RIGHT_ARROW:
        if (this.direction !== 1) {
          this.direction = 0;
        }
        break;
      case KEY_CODE.LEFT_ARROW:
        if (this.direction !== 0) {
          this.direction = 1;
        }
        break;
      case KEY_CODE.UP_ARROW:
        if (this.direction !== 3) {
          this.direction = 2;
        }
        break;
      case KEY_CODE.DOWN_ARROW:
        if (this.direction !== 2) {
          this.direction = 3;
        }
        break;
      default:
    }
  }
  removeFromEmpty(myPiece: Piece) {
    const index = this.emptyPieces.indexOf(myPiece);
    if (index !== -1) {
      this.emptyPieces.splice(index, 1);
    }
  }
  generateRandomFood() {
    const empty = Math.floor(Math.random() * this.emptyPieces.length) + 1;
    this.food = this.emptyPieces[empty];
  }
  startGame(myHead: Piece): void {
    this.head = myHead;
    this.generateRandomFood();
    this.timer = setInterval(() => {
      this.run();
    }, 350);
  }
  inTrain(myPiece: Piece) {
    if (this.train.includes(myPiece)) {
      return true;
    }
    return false;
  }
  adjustTrain(nextPiece: Piece): void {
    this.train.unshift(this.head);
    this.head = nextPiece;
       if (this.ateFood === false) {
         if (this.train.length > this.bodyLength) {
           this.train.splice(this.train.length - 1, 1);
         }
       } else {
         this.bodyLength++;
         this.generateRandomFood();
         this.ateFood = false;
      }
    }
  }
