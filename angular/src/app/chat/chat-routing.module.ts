import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatComponent } from './chat.component';
import { ChatMensagensComponent } from './chat-mensagens/chat-mensagens.component';

const routes: Routes = [
  {
    path: '',
    component: ChatComponent,
    children: [
      { path: ':idUsuario', component: ChatMensagensComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutingModule { }
