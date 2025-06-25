import { Injectable } from '@angular/core';
import { Cliente } from '../model/cliente';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  static readonly REPO_CLIENTES = '_CLIENTES';
  constructor() {}

  salvar(cliente: Cliente) {
    const clientes = this.obterStorage();
    clientes.push(cliente);
    localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(clientes));
  }

  atualizar(cliente: Cliente) {
    const clientes = this.obterStorage();
    clientes.forEach((c, index) => {
      if (c.id === cliente.id) {
        Object.assign(c, cliente);
      }
    })
    localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(clientes));
  }

  apagar(cliente: Cliente) {
    const clientes = this.obterStorage();
    const clientesApagado = clientes.filter(c => c.id !== cliente.id);
    localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(clientesApagado));
  }

  pesquisarClientePorId(id: string): Cliente | undefined {
    const clientes = this.obterStorage();
    return clientes.find((cliente) => cliente.id === id);
  }

  pesquisarClientes(nome: string): Cliente[] {
    const clientes = this.obterStorage();
    if (!nome) {
      return clientes;
    }
    return clientes.filter((cliente) =>
      cliente.nome?.toLowerCase().includes(nome.toLowerCase())
    );
  }

  private obterStorage(): Cliente[] {
    const repositorioClientes = localStorage.getItem(
      ClienteService.REPO_CLIENTES
    );
    if (repositorioClientes) {
      const clientes: Cliente[] = JSON.parse(repositorioClientes);
      return clientes;
    }
    const clientes: Cliente[] = [];
    localStorage.setItem(
      ClienteService.REPO_CLIENTES,
      JSON.stringify(clientes)
    );
    return clientes;
  }
}
