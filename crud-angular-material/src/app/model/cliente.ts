import { v4 as uuid } from 'uuid';

export class Cliente {
  id?: string;
  nome?: string;
  email?: string;
  cpf?: string;
  dataNascimento?: string;
  estado?: string;
  municipio?: string;
  deletando: boolean = false;

  static newCliente() {
    const cliente = new Cliente();
    cliente.id = uuid();
    return cliente;
  }
}
