import { Routes } from '@angular/router';
import { Automate } from './automate/automate';
import { Socket } from './socket/socket/socket';  
export const routes: Routes = [
  { path: 'automate', component: Automate },
  { path: '', redirectTo: 'automate', pathMatch: 'full' } ,
  { path: 'socket', component: Socket }  
];