import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ChatUsuariosService } from './services/chat-usuarios.service';
import { UsuarioMensagem } from '../core/models/usuario';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  public usuarios$: Observable<UsuarioMensagem[]>;

  constructor(
    private chatUsuariosService: ChatUsuariosService,
  ) { }

  ngOnInit(): void {

    this.usuarios$ = this.chatUsuariosService.listar().pipe(
      switchMap(() => this.chatUsuariosService.chatUsuarios$)
    );
  }

}
