import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyorderDetailComponent } from './buyorder-detail.component';

describe('BuyorderDetailComponent', () => {
  let component: BuyorderDetailComponent;
  let fixture: ComponentFixture<BuyorderDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyorderDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyorderDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
