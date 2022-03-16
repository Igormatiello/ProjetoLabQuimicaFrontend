import { FormGroup } from '@angular/forms';

export class FormHelper {

  static getObjetoDoForm(objeto: any, form: FormGroup): any {

    if (objeto.id) {
      delete objeto.id;
    }

    for (const key in form.controls) {
      objeto[key] = form.get(key).value;
    }
  }

  static setFormDoObjeto(objeto: any, form: FormGroup): any {
    for (const key in Object.keys(objeto)) {
      form.get(key).setValue(objeto[key]);
      form.get(key).updateValueAndValidity();
    }
  }
}
