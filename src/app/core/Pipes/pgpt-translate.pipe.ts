import { Pipe, PipeTransform } from "@angular/core";
import translatables from "./../../Translatables/translate.json";

@Pipe({
  name: "pgptTranslate",
  standalone: true,
})
export class PgptTranslatePipe implements PipeTransform {
  transform(key: string): string {
    const keys = key.split(".");
    let result: any = translatables;

    for (const key of keys) {
      result = result?.[key];
      if (!result) {
        return key;
      }
    }

    return result || key;
  }
}
