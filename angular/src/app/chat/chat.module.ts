import { NgModule } from '@angular/core';
import { ChatComponent } from './chat.component';
import { SharedModule } from '../shared/shared.module';
import { ChatMensagensComponent } from './chat-mensagens/chat-mensagens.component';
import { ChatRoutingModule } from './chat-routing.module';
import { ChatUsuarioComponent } from './components/chat-usuario/chat-usuario.component';
import { DataHoraMensagemPipe } from './pipes/data-hora-mensagem.pipe';
import { ChatUsuarioMensagemComponent } from './components/chat-usuario-mensagem/chat-usuario-mensagem.component';

@NgModule({
  declarations: [
    ChatComponent,
    ChatMensagensComponent,
    ChatUsuarioComponent,
    DataHoraMensagemPipe,
    ChatUsuarioMensagemComponent
  ],
  imports: [
    SharedModule,
    ChatRoutingModule
  ]
})
export class ChatModule { }
