import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar } from '@angular/material/snack-bar'
import { FormsModule } from '@angular/forms';
import { ClienteService } from '../../service/cliente';
import { Cliente } from '../../model/cliente';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consulta',
  imports: [
    CommonModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatTooltipModule,
    FlexLayoutModule,
    FormsModule,
  ],
  templateUrl: './consulta.html',
  styleUrl: './consulta.scss',
})
export class Consulta implements OnInit {
  nomeBusca: string = '';
  listaClientes: Cliente[] = [];
  colunasTable: string[] = [
    'id',
    'nome',
    'email',
    'cpf',
    'dataNascimento',
    'estado',
    'municipio',
    'acoes',
  ];
  snackBar = inject(MatSnackBar);

  constructor(
    private readonly service: ClienteService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.listaClientes = this.service.pesquisarClientes('');
  }

  pesquisar(nome: string) {
    this.listaClientes = this.service.pesquisarClientes(this.nomeBusca);
  }

  prepararEditar(id: number) {
    this.router.navigate(['/cadastro'], { queryParams: { id: id } });
  }

  prepararApagar(cliente: Cliente) {
    cliente.deletando = true;
  }

  mostrarMensagem(mensagem: string) {
    this.snackBar.open(mensagem, 'ok')
  }

  apagar(cliente: Cliente) {
    this.service.apagar(cliente);
    this.listaClientes = this.service.pesquisarClientes('');
    this.mostrarMensagem('Cliente apagado com sucesso!');
  }

}
