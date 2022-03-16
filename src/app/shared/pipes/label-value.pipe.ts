import { Pipe, PipeTransform } from '@angular/core';

import { LabelValue } from '../classes/LabelValue';

@Pipe({
  name: 'labelValue'
})
export class LabelValuePipe implements PipeTransform {

  transform(valor: any, opcoes: LabelValue[]): string{
      const labelValue = opcoes.find(opcao => opcao.value === valor);
      return labelValue != null ? labelValue.label : null;
  }

}
