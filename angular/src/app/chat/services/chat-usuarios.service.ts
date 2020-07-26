import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SocketService } from 'src/app/core/services/socket.service';
import { BehaviorSubject, Observable, merge } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UsuarioMensagem, Usuario } from 'src/app/core/models/usuario';
import { MensagemChat } from '../models/mensagem';

const API = environment.api;

@Injectable({
  providedIn: 'root'
})
export class ChatUsuariosService {

  private chatUsuariosSubject$ = new BehaviorSubject<UsuarioMensagem[]>([]);
  public chatUsuarios$ = this.chatUsuariosSubject$.asObservable();

  constructor(
    private http: HttpClient,
    private socketService: SocketService
  ) { }

  public getUsuario(idUsuario: string): Observable<Usuario> {
    return this.http.get<Usuario>(API + 'usuarios/' + idUsuario);
  }

  private listarUsuarios(): Observable<UsuarioMensagem[]> {
    return this.http.get<UsuarioMensagem[]>(API + 'usuarios').pipe(
      tap(usuarios => {
        this.chatUsuariosSubject$.next(usuarios);
      })
    );
  }

  private receberMensagem(): Observable<MensagemChat> {
    return this.socketService.recebimentoMensagem().pipe(
      tap(mensagem => this.organizaMensagens(mensagem))
    );
  }

  private organizaMensagens(mensagem: MensagemChat) {
    const chatUsuarios = this.chatUsuariosSubject$.getValue();
    const usuarioEncontrado = chatUsuarios.find(usuario =>
      mensagem.remetente === usuario._id || mensagem.destinatario === usuario._id
    );

    if (usuarioEncontrado) {

      const chatUsuariosFiltrados = chatUsuarios.filter(usuario => usuario !== usuarioEncontrado);
      const novoChatUsuarios = [{
        ...usuarioEncontrado, ultimaMensagem: mensagem.texto
      }, ...chatUsuariosFiltrados ];
      this.chatUsuariosSubject$.next(novoChatUsuarios);
    }
  }

  public listar() {
    return merge(
      this.listarUsuarios(),
      this.receberMensagem()
    );
  }
}
