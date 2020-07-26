import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatMensagensComponent } from './chat-mensagens.component';

describe('ChatMensagensComponent', () => {
  let component: ChatMensagensComponent;
  let fixture: ComponentFixture<ChatMensagensComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatMensagensComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatMensagensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
