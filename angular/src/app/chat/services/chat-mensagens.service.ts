import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SocketService } from 'src/app/core/services/socket.service';
import { BehaviorSubject, merge, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MensagemChat } from '../models/mensagem';

const API = environment.api;

@Injectable({
  providedIn: 'root'
})
export class ChatMensagensService {

  private mensagensSubject$ = new BehaviorSubject<MensagemChat[]>([]);
  public mensagens$ = this.mensagensSubject$.asObservable();

  constructor(
    private http: HttpClient,
    private socketService: SocketService
  ) { }

  public listarMensagens(idUsuario: string): Observable<MensagemChat[]> {
    this.mensagensSubject$.next([]);
    return this.http.get<MensagemChat[]>(API + 'mensagem/' + idUsuario).pipe(
      tap(mensagens => this.mensagensSubject$.next(mensagens))
    );
  }

  public enviar(idUsuario: string, mensagem: MensagemChat) {
    this.socketService.enviarMensagem(mensagem);
    return this.http.post(API + 'mensagem/' + idUsuario, { texto: mensagem.texto });
  }

  public listar(idUsuario: string) {
    return merge(
      this.listarMensagens(idUsuario),
      this.receberMensagem(idUsuario)
    );
  }

  private receberMensagem(idUsuario: string) {
    return this.socketService.recebimentoMensagem().pipe(
      tap(mensagem => this.organizaMensagens(mensagem, idUsuario))
    );
  }

  private organizaMensagens(mensagem: MensagemChat, idUsuario: string) {
    const mensagens = this.mensagensSubject$.getValue();

    if (mensagem.remetente === idUsuario || mensagem.destinatario === idUsuario) {

      const novaMensagem = {
        texto: mensagem.texto,
        createdAt: mensagem.createdAt,
        isRemetente: (mensagem.remetente !== idUsuario)
      };

      const mensagensAtualizadas = [ ...mensagens, novaMensagem ];
      this.mensagensSubject$.next(mensagensAtualizadas);
    }
  }
}
