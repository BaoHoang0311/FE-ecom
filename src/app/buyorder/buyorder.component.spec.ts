import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyorderComponent } from './buyorder.component';

describe('BuyorderComponent', () => {
  let component: BuyorderComponent;
  let fixture: ComponentFixture<BuyorderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyorderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
