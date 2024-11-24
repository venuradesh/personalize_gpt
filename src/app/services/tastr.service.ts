import { Injectable } from "@angular/core";
import { Toastr, ToastrTypes } from "../core/models/toastr-model";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class TastrService {
  private toasts: Toastr[] = [];
  private toastrObs$ = new BehaviorSubject<Toastr[]>([]);
  public toasts$ = this.toastrObs$.asObservable();

  constructor() {}

  private show(toastData: { type: ToastrTypes; message: string; title: string }): number {
    const id: number = new Date().getMilliseconds();
    const toast: Toastr = { _id: id, title: toastData.title, message: toastData.message, type: toastData.type };
    this.toasts.push(toast);
    this.toastrObs$.next(this.toasts);
    return id;
  }

  public remove(id: number): void {
    this.toasts = this.toasts.filter((toast) => toast._id !== id);
    this.toastrObs$.next(this.toasts);
  }

  public success(message: string, title?: string): void {
    this.show({ type: "success", title: title ?? "Success", message: message });
  }

  public error(message: string, title?: string): void {
    this.show({ type: "error", title: title ?? "Error", message: message });
  }

  public warning(message: string, title?: string): void {
    this.show({ type: "warning", title: title ?? "Warning!", message: message });
  }

  public info(message: string, title?: string): void {
    this.show({ type: "info", title: title ?? "Info", message: message });
  }
}
