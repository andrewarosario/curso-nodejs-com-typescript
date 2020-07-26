import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { LoginAutomaticoGuard } from './core/guards/login-automatico.guard';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    canActivate: [ LoginAutomaticoGuard ],
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'chat',
    canActivate: [ AuthGuard ],
    canActivateChild: [ AuthGuard ],
    loadChildren: () => import('./chat/chat.module').then(m => m.ChatModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
