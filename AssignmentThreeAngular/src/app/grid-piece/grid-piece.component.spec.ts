import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridPieceComponent } from './grid-piece.component';

describe('GridPieceComponent', () => {
  let component: GridPieceComponent;
  let fixture: ComponentFixture<GridPieceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridPieceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridPieceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
