import { Location, CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { Cliente } from '../../model/cliente';
import { ClienteService } from '../../service/cliente';
import { BrasilApiService } from '../../service/brasilapi';
import { Estado, Municipio } from '../../model/brasilapi';

@Component({
  selector: 'app-cadastro',
  imports: [
    FlexLayoutModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    FormsModule,
    NgxMaskDirective,
    CommonModule,
  ],
  providers: [provideNgxMask()],
  templateUrl: './cadastro.html',
  styleUrls: ['./cadastro.scss'],
})
export class Cadastro implements OnInit {
  cliente: Cliente = Cliente.newCliente();
  atualizando: boolean = false;
  snackBar = inject(MatSnackBar);
  estados: Estado[] = [];
  municipios: Municipio[] = [];

  // Injecting services

  constructor(
    private readonly service: ClienteService,
    private readonly brasilApiService: BrasilApiService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly location: Location
  ) {}

  salvar() {
    if (!this.atualizando) {
      this.service.salvar(this.cliente);
      this.cliente = Cliente.newCliente();
      this.mostrarMensagem('Cliente cadastrado com sucesso!');
      this.router.navigate(['/cadastro']);
    } else {
      this.service.atualizar(this.cliente);
      this.mostrarMensagem('Cliente atualizado com sucesso!');
      this.location.back();
    }
  }

  carregarEstados() {
    this.brasilApiService.listarUf().subscribe({
      next: (estados) => {
        this.estados = estados;
      },
      error: (err) => {
        this.mostrarMensagem('Erro ao carregar estados: ' + err.message);
      },
    });
  }

  carregarMunicipios(event: MatSelectChange) {
    const siglaUf = event.value
    this.brasilApiService.listarMunicipios(siglaUf).subscribe({
      next: (municipios) => {
        this.municipios = municipios;
      },
      error: (err) => {
        this.mostrarMensagem('Erro ao carregar municípios: ' + err.message);
      },
    });
  }

  mostrarMensagem(mensagem: string) {
    this.snackBar.open(mensagem, 'ok');
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((query) => {
      const id = query.get('id');
      if (id) {
        let clienteEncontrado = this.service.pesquisarClientePorId(id);
        if (clienteEncontrado) {
          this.atualizando = true;
          this.cliente = clienteEncontrado;
          if (this.cliente.estado) {
            const event = { value: this.cliente.estado };
            this.carregarMunicipios(event as MatSelectChange);
          }
        } else {
          this.router.navigate(['/cadastro']);
        }
      } else {
        this.cliente = Cliente.newCliente();
        this.atualizando = false;
      }
    });
    this.carregarEstados();
  }
}
