import { TestBed } from '@angular/core/testing';

import { ChatUsuariosService } from './chat-usuarios.service';

describe('ChatUsuariosService', () => {
  let service: ChatUsuariosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatUsuariosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
