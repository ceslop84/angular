import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoriaService } from '../service/categoria';

@Component({
  selector: 'app-categoria',
  standalone: false,
  templateUrl: './categoria.html',
  styleUrl: './categoria.scss',
})
export class Categoria {
  camposForm: FormGroup;

  constructor(private readonly service: CategoriaService) {
    this.camposForm = new FormGroup({
      nome: new FormControl('', Validators.maxLength(5)),
      descricao: new FormControl('', Validators.required),
    });
  }
  salvar() {
    this.camposForm.markAllAsTouched();
    if (this.camposForm.valid) {
      console.log('Formulário válido', this.camposForm.value);
      this.service.salvar(this.camposForm.value).subscribe({
        next: (categoria) => {
          console.log('Categoria salva com sucesso', categoria);
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
}
