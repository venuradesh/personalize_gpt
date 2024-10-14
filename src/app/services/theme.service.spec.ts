import { TestBed } from "@angular/core/testing";

import { ThemeService } from "./theme.service";

describe("ThemeService", () => {
  let service: ThemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeService);

    const localStorageMock = (() => {
      let store: { [key: string]: string } = {};
      return {
        getItem: (key: string) => store[key] || null,
        setItem: (key: string, value: string) => {
          store[key] = value;
        },
        clear: () => {
          store = {};
        },
        removeItem: (key: string) => {
          delete store[key];
        },
      };
    })();

    Object.defineProperty(window, "localStorage", { value: localStorageMock });
  });

  afterEach(() => {
    localStorage.clear();
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  describe("isDarkTheme", () => {
    it("should return true if the body contain dark-theme class", () => {
      jest.spyOn(document.body.classList, "contains").mockReturnValue(true);

      const result = service.isDarkTheme();
      expect(result).toBeTruthy();
    });

    it("should return false if the body does not contain the dark-theme class", () => {
      jest.spyOn(document.body.classList, "contains").mockReturnValue(false);

      const result = service.isDarkTheme();
      expect(result).toBeFalsy();
    });
  });

  describe("enableDarkTheme", () => {
    it("should add the dark-theme class to the body element", () => {
      const addSpy = jest.spyOn(document.body.classList, "add");
      service.enableDarkTheme();

      expect(addSpy).toHaveBeenCalledWith("dark-theme");
    });

    it("should set the theme key of localStorage as dark-theme", () => {
      jest.spyOn(localStorage, "setItem").mockImplementation(() => {});
      service.enableDarkTheme();

      expect(localStorage.setItem).toHaveBeenCalledWith("app-theme", "dark-theme");
    });
  });

  describe("enableLightTheme", () => {
    it("should remove the dakr-theme class to the body element", () => {
      const addSpy = jest.spyOn(document.body.classList, "remove");
      service.enableLIghtTheme();

      expect(addSpy).toHaveBeenCalledWith("dark-theme");
    });

    it("should set the theme key of localStorage as light-theme", () => {
      jest.spyOn(localStorage, "setItem").mockImplementation(() => {});
      service.enableLIghtTheme();

      expect(localStorage.setItem).toHaveBeenCalledWith("app-theme", "light-theme");
    });
  });

  describe("toggleTheme", () => {
    it("should add the dark-theme class to the body if it is light theme", () => {
      jest.spyOn(document.body.classList, "contains").mockReturnValue(false);
      const spy = jest.spyOn(document.body.classList, "add");
      service.toggleTheme();

      expect(spy).toHaveBeenCalledWith("dark-theme");
    });

    it("should remove the dark-theme class from body if it is already dark-themed", () => {
      jest.spyOn(document.body.classList, "contains").mockReturnValue(true);
      const spy = jest.spyOn(document.body.classList, "remove");
      service.toggleTheme();

      expect(spy).toHaveBeenCalledWith("dark-theme");
    });
  });
});
