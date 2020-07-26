import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, ViewChildren, QueryList } from '@angular/core';
import { ChatMensagensService } from '../services/chat-mensagens.service';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import { switchMap, map } from 'rxjs/operators';
import { ChatUsuariosService } from '../services/chat-usuarios.service';
import { FormControl } from '@angular/forms';
import { ChatUsuarioMensagemComponent } from '../components/chat-usuario-mensagem/chat-usuario-mensagem.component';
import { MensagemChat } from '../models/mensagem';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/core/models/usuario';

@Component({
  selector: 'app-chat-mensagens',
  templateUrl: './chat-mensagens.component.html',
  styleUrls: ['./chat-mensagens.component.css']
})
export class ChatMensagensComponent implements OnInit, AfterViewInit {

  @ViewChild('content') private content: ElementRef;
  @ViewChildren(ChatUsuarioMensagemComponent) private mensagensQueryList: QueryList<ChatUsuarioMensagemComponent>;

  public usuarioLogado: Usuario;
  public usuarioChat$: Observable<Usuario>;
  public mensagens$: Observable<MensagemChat[]>;

  mensagem = new FormControl('');

  constructor(
    private route: ActivatedRoute,
    private chatMensagensService: ChatMensagensService,
    private chatUsuariosService: ChatUsuariosService,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    this.usuarioLogado = this.usuarioService.usuario;

    const idUsuarioParam$ = this.route.paramMap.pipe(
      map(params => params.get('idUsuario'))
    );

    this.usuarioChat$ = idUsuarioParam$.pipe(
      switchMap(idUsuario => this.chatUsuariosService.getUsuario(idUsuario))
    );

    this.mensagens$ = idUsuarioParam$.pipe(
      switchMap(idUsuario => this.chatMensagensService.listar(idUsuario)),
      switchMap(() => this.chatMensagensService.mensagens$)
    );
  }

  public enviarMensagem() {
    const idUsuario = this.route.snapshot.paramMap.get('idUsuario');

    const mensagem = this.mensagem.value;
    if (!mensagem) {
       return;
    }

    const mensagemEviar: MensagemChat = {
      texto: mensagem,
      createdAt: new Date(),
      destinatario: idUsuario,
      remetente: this.usuarioLogado._id
    };

    this.chatMensagensService.enviar(idUsuario, mensagemEviar)
      .subscribe(res => this.mensagem.setValue(''));
  }

  ngAfterViewInit() {
    this.mensagensQueryList.changes.subscribe(() => {
      this.scrollParaOFim();
    });
  }

  scrollParaOFim() {
    setTimeout(() => {
      this.content.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }, 0);
  }


}
