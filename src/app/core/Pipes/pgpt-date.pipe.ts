import { Pipe, PipeTransform } from "@angular/core";

interface TimeSource {
  hours: string;
  minutes: string;
  year: number;
  month: string;
  day: string;
}

@Pipe({
  name: "pgptDate",
  standalone: true,
})
export class PgptDatePipe implements PipeTransform {
  transform(date: Date): string {
    const datetime: TimeSource = this.getTime(date);
    const time: string = `${datetime.hours}:${datetime.minutes}`;

    if (this.isToday(date)) {
      return `${time}`;
    } else if (this.isYesterday(date)) {
      return `Yesterday | ${time}`;
    }

    return `${datetime.year}/${datetime.month}/${datetime.day} | ${time}`;
  }

  private isToday(date: Date): boolean {
    return date.toDateString() === new Date().toDateString();
  }

  private isYesterday(date: Date): boolean {
    const yesterday: Date = new Date(Date.now() - 864e5);
    return date.toDateString() === yesterday.toDateString();
  }

  private getTime(date: Date): TimeSource {
    return {
      hours: date.getHours().toString().padStart(2, "0"),
      minutes: date.getMinutes().toString().padStart(2, "0"),
      year: date.getFullYear(),
      month: date.getMonth().toString().padStart(2, "0"),
      day: date.getDay().toString().padStart(2, "0"),
    };
  }
}
