import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToastrPresentationalComponent } from './toastr-presentational.component';

describe('ToastrPresentationalComponent', () => {
  let component: ToastrPresentationalComponent;
  let fixture: ComponentFixture<ToastrPresentationalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToastrPresentationalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ToastrPresentationalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
