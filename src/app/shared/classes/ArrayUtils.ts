import { FormGroup } from '@angular/forms';

export class ArrayUtils {

  static sortByPropriedade({ lista, propriedade = 'id', asc = true }:
    { lista: any[], propriedade?: string, asc?: boolean }) {
    if (asc) {
      lista.sort((a, b) => a[propriedade] > b[propriedade] ? 1 : -1);
    } else {
      lista.sort((a, b) => a[propriedade] < b[propriedade] ? 1 : -1);
    }
  }

}
