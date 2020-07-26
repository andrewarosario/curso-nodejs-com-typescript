import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatUsuarioMensagemComponent } from './chat-usuario-mensagem.component';

describe('ChatUsuarioMensagemComponent', () => {
  let component: ChatUsuarioMensagemComponent;
  let fixture: ComponentFixture<ChatUsuarioMensagemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatUsuarioMensagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatUsuarioMensagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
