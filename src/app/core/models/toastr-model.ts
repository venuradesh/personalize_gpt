export interface Toastr {
  _id: number;
  type: ToastrTypes;
  message: string;
  title?: string;
}

export type ToastrTypes = "success" | "warning" | "error" | "info";

export const TOAST_DELAY = 3000;
