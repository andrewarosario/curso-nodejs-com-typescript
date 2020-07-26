import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-chat-usuario-mensagem',
  templateUrl: './chat-usuario-mensagem.component.html',
  styleUrls: ['./chat-usuario-mensagem.component.css']
})
export class ChatUsuarioMensagemComponent implements OnInit {

  @Input() mensagem;
  @Input() avatarUsuarioLogado;
  @Input() avatarUsuarioChat;

  constructor() { }

  ngOnInit(): void {
  }

}
