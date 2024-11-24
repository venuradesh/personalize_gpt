import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ToastrComponent } from "./toastr.component";
import { CommonModule } from "@angular/common";

describe("ToastrComponent", () => {
  let component: ToastrComponent;
  let fixture: ComponentFixture<ToastrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, ToastrComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ToastrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
