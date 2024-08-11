import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewOrderProductComponent } from './review-order-product.component';

describe('ReviewOrderProductComponent', () => {
  let component: ReviewOrderProductComponent;
  let fixture: ComponentFixture<ReviewOrderProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewOrderProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewOrderProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
