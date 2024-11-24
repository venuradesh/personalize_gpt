import { Pipe, PipeTransform } from "@angular/core";
import translatables from "./../../Translatables/translate.json";

@Pipe({
  name: "pgptTranslate",
  standalone: true,
})
export class PgptTranslatePipe implements PipeTransform {
  transform(key: string, args?: { [key: string]: string }): string {
    const keys = key.split(".");
    let result: any = translatables;

    for (const key of keys) {
      result = result?.[key];
      if (!result) {
        return key;
      }
    }

    if (args) {
      Object.keys(args).forEach((argKey) => {
        result = result.replace(`{{${argKey}}}`, args[argKey]);
      });
    }

    return result || key;
  }
}
