import { ComponentFixture, TestBed } from "@angular/core/testing";

import { NavBarComponent } from "./nav-bar.component";
import { Router } from "@angular/router";
import { ThemeService } from "../../../services/theme.service";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { Location } from "@angular/common";

describe("NavBarComponent", () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;
  let mockThemeService: Partial<ThemeService>;
  let mockRouter: Partial<Router>;
  let mockLocation: Partial<Location>;

  beforeEach(async () => {
    mockThemeService = { toggleTheme: jest.fn() };
    mockRouter = { url: "/start" };
    mockLocation = { onUrlChange: jest.fn() };

    await TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      imports: [NavBarComponent],
      providers: [
        { provide: ThemeService, useValue: mockThemeService },
        { provide: Router, useValue: mockRouter },
        { provide: Location, useValue: mockLocation },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("ngOnInit", () => {
    let spy: jest.SpyInstance;

    it("should call the onUrlhange Function", () => {
      spy = jest.spyOn(mockLocation, "onUrlChange");
      component.ngOnInit();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe("setButtonStatus", () => {
    it("should reset the Buttons when the router url is start", () => {
      component.setButtonStatus("/start");

      expect(component.navBarButtonStatus).toEqual({
        loginButton: true,
        registerButton: true,
        themeButton: true,
      });
    });

    it("should set the login button as false and register button as true when the router url is login", () => {
      component.setButtonStatus("/login");

      expect(component.navBarButtonStatus).toEqual({
        loginButton: false,
        registerButton: true,
        themeButton: true,
      });
    });

    it("should set the register button false and login button as true when the router url is register", () => {
      component.setButtonStatus("/register");

      expect(component.navBarButtonStatus).toEqual({
        loginButton: true,
        registerButton: false,
        themeButton: true,
      });
    });
  });

  describe("toggleTheme", () => {
    let spy: jest.SpyInstance;

    beforeEach(() => {
      spy = jest.spyOn(mockThemeService, "toggleTheme");
    });

    it("should toggle the theme if the theme is dark", () => {
      component.isDarkMode = false;
      component.toggleTheme();

      expect(component.isDarkMode).toBeTruthy();
    });

    it("should set isDarkMode as false if it was true", () => {
      component.isDarkMode = true;
      component.toggleTheme();

      expect(component.isDarkMode).toBeFalsy();
    });

    it("should call toggle theme", () => {
      component.toggleTheme();
      expect(spy).toHaveBeenCalled();
    });
  });
});
