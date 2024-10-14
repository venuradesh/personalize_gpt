import { ComponentFixture, TestBed } from "@angular/core/testing";

import { NavBarComponent } from "./nav-bar.component";
import { Router } from "@angular/router";
import { ThemeService } from "../../../services/theme.service";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";

describe("NavBarComponent", () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;
  let mockThemeService: Partial<ThemeService>;
  let mockRouter: Partial<Router>;

  beforeEach(async () => {
    mockThemeService = {
      toggleTheme: jest.fn(),
    };

    mockRouter = {
      url: "/start",
    };

    await TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      imports: [NavBarComponent],
      providers: [
        { provide: ThemeService, useValue: mockThemeService },
        { provide: Router, useValue: mockRouter },
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
    it("should reset the Buttons when the router url is start", () => {
      mockRouter = {
        url: "/start",
      };
      component.ngOnInit();

      expect(component.navBarButtonStatus).toEqual({
        loginButton: true,
        registerButton: true,
        themeButton: true,
      });
    });

    it("should set the login button as false when the router url is login", () => {
      component["router"] = { url: "/login" } as Router;
      component.ngOnInit();

      expect(component.navBarButtonStatus.loginButton).toBeFalsy();
    });

    it("should set the register button false when the router url is register", () => {
      component["router"] = { url: "/register" } as Router;
      component.ngOnInit();

      expect(component.navBarButtonStatus.registerButton).toBeFalsy();
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
