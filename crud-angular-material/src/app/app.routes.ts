import { Routes } from '@angular/router';
import { Cadastro } from './component/cadastro/cadastro';
import { Consulta } from './component/consulta/consulta';

export const routes: Routes = [
    { path: 'cadastro', component: Cadastro },
    { path: 'consulta', component: Consulta }
];
