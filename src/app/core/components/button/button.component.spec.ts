import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ButtonComponent } from "./button.component";
import { By } from "@angular/platform-browser";

describe("ButtonComponent", () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("Shallow tests", () => {
    it("should contain the base-button class if the button type is base", () => {
      component.buttonType = "base";
      fixture.detectChanges();

      const buttonDiv = fixture.debugElement.query(By.css(".base-button"));
      expect(buttonDiv.classes["base-button"]).toBeTruthy();
    });

    it("should not contain the base-button class if the button type is not base", () => {
      component.buttonType = "disabled";
      fixture.detectChanges();

      const buttonDiv = fixture.debugElement.query(By.css(".base-button"));
      expect(buttonDiv).toBeNull();
    });

    it("should contain the disabled class if the button type is disabled", () => {
      component.buttonType = "disabled";
      fixture.detectChanges();

      const buttonDiv = fixture.debugElement.query(By.css(".disabled"));
      expect(buttonDiv.classes["disabled"]).toBeTruthy();
    });

    it("should contain the disabled class if the button type is disabled", () => {
      component.buttonType = "base";
      fixture.detectChanges();

      const buttonDiv = fixture.debugElement.query(By.css(".disabled"));
      expect(buttonDiv).toBeNull();
    });

    it("should contain the primary class if the button type is primary", () => {
      component.buttonType = "primary";
      fixture.detectChanges();

      const buttonDiv = fixture.debugElement.query(By.css(".primary"));
      expect(buttonDiv.classes["primary"]).toBeTruthy();
    });

    it("should not contain the primary class if the button type is not primary", () => {
      component.buttonType = "base";
      fixture.detectChanges();

      const buttonDiv = fixture.debugElement.query(By.css(".primary"));
      expect(buttonDiv).toBeNull();
    });

    it("should contain the fill class if the button type is fill", () => {
      component.buttonType = "fill";
      fixture.detectChanges();

      const buttonDiv = fixture.debugElement.query(By.css(".fill"));
      expect(buttonDiv.classes["fill"]).toBeTruthy();
    });

    it("should not contain the fill class if the button type is not fill", () => {
      component.buttonType = "base";
      fixture.detectChanges();

      const buttonDiv = fixture.debugElement.query(By.css(".fill"));
      expect(buttonDiv).toBeNull();
    });

    it("should contain the small class if the button size is small", () => {
      component.buttonSize = "small";
      fixture.detectChanges();

      const buttonDiv = fixture.debugElement.query(By.css(".small"));
      expect(buttonDiv.classes["small"]).toBeTruthy();
    });

    it("should not contain the small class if the button size is not small", () => {
      component.buttonSize = "medium";
      fixture.detectChanges();

      const buttonDiv = fixture.debugElement.query(By.css(".small"));
      expect(buttonDiv).toBeNull();
    });

    it("should contain the medium class if the button size is medium", () => {
      component.buttonSize = "medium";
      fixture.detectChanges();

      const buttonDiv = fixture.debugElement.query(By.css(".medium"));
      expect(buttonDiv.classes["medium"]).toBeTruthy();
    });

    it("should not contain the medium class if the button size is not medium", () => {
      component.buttonSize = "small";
      fixture.detectChanges();

      const buttonDiv = fixture.debugElement.query(By.css(".medium"));
      expect(buttonDiv).toBeNull();
    });

    it("should contain the large class if the butto size is large", () => {
      component.buttonSize = "large";
      fixture.detectChanges();

      const buttonDiv = fixture.debugElement.query(By.css(".large"));
      expect(buttonDiv.classes["large"]).toBeTruthy();
    });

    it("should not contain the large class if the button size is not large", () => {
      component.buttonSize = "small";
      fixture.detectChanges();

      const buttonDiv = fixture.debugElement.query(By.css(".large"));
      expect(buttonDiv).toBeNull();
    });
  });
});
