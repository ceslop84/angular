import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Categoria } from './component/categoria';

const routes: Routes = [
  {
    path: '',
    component: Categoria
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriasRoutingModule { }
