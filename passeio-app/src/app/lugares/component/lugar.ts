import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LugarService } from '../service/lugar';
import { Categoria } from '../../categorias/model/categoria';
import { CategoriaService } from '../../categorias/service/categoria';

@Component({
  selector: 'app-lugar',
  standalone: false,
  templateUrl: './lugar.html',
  styleUrl: './lugar.scss',
})
export class Lugar implements OnInit {
  camposForm: FormGroup;
  categorias: Categoria[] = [];

  constructor(private readonly categoriaService: CategoriaService, private readonly service: LugarService) {
    this.camposForm = new FormGroup({
      nome: new FormControl('', Validators.maxLength(5)),
      categoria: new FormControl('', Validators.required),
      localizacao: new FormControl('', Validators.required),
      urlFoto: new FormControl('', Validators.required),
      avaliacao: new FormControl('', Validators.required),
    });
  }

  salvar() {
    this.camposForm.markAllAsTouched();
    if (this.camposForm.valid) {
      console.log('Formulário válido', this.camposForm.value);
      this.service.salvar(this.camposForm.value).subscribe({
        next: (lugar) => {
          console.log('Categoria salva com sucesso', lugar);
          this.camposForm.reset();
        },
        error: (error) => {
          console.error('Erro ao salvar categoria', error);
        },
      });
    } else {
      console.log('Formulário inválido');
    }
  }

  isCampoInvalido(campo: string): boolean {
    const controle = this.camposForm.get(campo);
    return (controle?.invalid && controle?.touched) || false;
  }

  ngOnInit(): void {
    this.categoriaService.listarTodas().subscribe({
      next: (categorias) => {
        this.categorias = categorias;
      },
      error: (error) => {
        console.error('Erro ao carregar categorias', error);
      },
    });
  }     
}
