import { Severidade } from '../../consts/error-severity.enum';

export class Toast {
  severidade: Severidade;
  titulo: string;
  detalhes: string;
  duracao = 2500;
  closable = true;
}
