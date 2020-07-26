import { TestBed } from '@angular/core/testing';

import { ChatMensagensService } from './chat-mensagens.service';

describe('ChatMensagensService', () => {
  let service: ChatMensagensService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatMensagensService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
