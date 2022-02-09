import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotProductsComponent } from './hot-products.component';

describe('HotProductsComponent', () => {
  let component: HotProductsComponent;
  let fixture: ComponentFixture<HotProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HotProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
