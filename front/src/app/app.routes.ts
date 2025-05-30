import { Routes } from '@angular/router';
import { Automate } from './automate/automate';

export const routes: Routes = [
  { path: 'automate', component: Automate },
  { path: '', redirectTo: 'automate', pathMatch: 'full' } // si tu veux que / redirige vers /automate
];