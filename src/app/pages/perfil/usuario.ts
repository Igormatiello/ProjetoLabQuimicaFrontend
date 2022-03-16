import { Pessoa } from '../pessoa/pessoa';

export class Usuario{
  id: number;
  username: string;
  password: string;
  lastPasswordReset: string;
  enabled: boolean;
  pessoa: Pessoa;
}