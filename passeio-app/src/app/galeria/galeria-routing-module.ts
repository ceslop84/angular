import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Galeria } from './component/galeria/galeria';

const routes: Routes = [
  {
    path: '',
    component: Galeria,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GaleriaRoutingModule { }
