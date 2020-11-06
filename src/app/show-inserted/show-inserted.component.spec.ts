import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowInsertedComponent } from './show-inserted.component';

describe('ShowInsertedComponent', () => {
  let component: ShowInsertedComponent;
  let fixture: ComponentFixture<ShowInsertedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowInsertedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowInsertedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
