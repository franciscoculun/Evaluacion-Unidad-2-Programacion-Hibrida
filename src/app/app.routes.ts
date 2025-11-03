import { Routes } from '@angular/router';
import { HomePage } from './paginas/home/home.page';
import { GestionPage } from './paginas/gestion/gestion.page';
import { ConfigPage } from './paginas/config/config.page';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePage },
  { path: 'gestion', component: GestionPage },
  { path: 'config', component: ConfigPage },
];
