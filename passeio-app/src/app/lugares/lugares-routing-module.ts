import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Lugar } from './component/lugar';

const routes: Routes = [
  {
    path: '',
    component: Lugar,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LugaresRoutingModule { }
