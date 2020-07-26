import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-chat-usuario',
  templateUrl: './chat-usuario.component.html',
  styleUrls: ['./chat-usuario.component.css']
})
export class ChatUsuarioComponent implements OnInit {

  @Input() usuario;

  constructor() { }

  ngOnInit(): void {
  }

}
