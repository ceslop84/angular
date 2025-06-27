import { Component, OnInit } from '@angular/core';
// Import or define the Lugar type below. Adjust the import path as needed.
import { Lugar } from '../../../lugares/model/lugar';
import { Categoria } from '../../../categorias/model/categoria';
import { LugarService } from '../../../lugares/service/lugar';
import { CategoriaService } from '../../../categorias/service/categoria';

@Component({
  selector: 'app-galeria',
  standalone: false,
  templateUrl: './galeria.html',
  styleUrl: './galeria.scss',
})
export class Galeria implements OnInit {
  lugares: Lugar[] = [];
  categorias: Categoria[] = [];

  constructor(
    private readonly lugarService: LugarService,
    private readonly categoriaService: CategoriaService
  ) {}

  ngOnInit(): void {
    this.categoriaService.listarTodas().subscribe((categorias) => {
      this.categorias = categorias;
    });
    this.lugarService.listarTodas().subscribe((lugares) => {
      this.lugares = lugares;
    });
  }
}
