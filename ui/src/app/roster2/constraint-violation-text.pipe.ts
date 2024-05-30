import { Pipe, PipeTransform } from "@angular/core";
import { ConstraintViolationList } from "@tierklinik-dobersberg/apis";

@Pipe({
  name: 'constraintViolation',
  pure: true
})
export class TkdConstraintViolationPipe implements PipeTransform {
  transform(value: ConstraintViolationList): string[] {
    if (value.violations.length === 0) {
      return [];
    }

    return value.violations.map(val => {
      let prefix = '';
      let name: string | null | undefined = '';

      switch (val.kind.case) {
        case 'evaluation':
          prefix = 'Regel'
          name = val.kind.value.description
          break;

        case 'offTime':
          prefix = 'Abwesenheit'
          name = val.kind.value.entry?.description;
          break;

        case "NoWorkTime":
          prefix = "Arbeitsverhältnis beendet"
          break;
      }

      if (!name) {
        return prefix;
      }

      return `${prefix}: ${name}`
    })
  }
}

@Pipe({
  name: 'isHardViolation',
  pure: true
})
export class TkdConstraintIsHardPipe implements PipeTransform {
  transform(value: ConstraintViolationList): boolean {
    if (value.violations.length === 0) {
      return false;
    }

    if (value.violations.some(v => v.hard)) {
      return true
    }

    return false;
  }
}
