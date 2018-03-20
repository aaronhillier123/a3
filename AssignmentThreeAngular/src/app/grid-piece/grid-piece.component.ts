import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grid-piece',
  templateUrl: './grid-piece.component.html',
  styleUrls: ['./grid-piece.component.css']
})
export class GridPieceComponent implements OnInit {

  xValue = 0;
  yValue = 0;

  constructor() { }

  ngOnInit() {
  }

}
