import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatUsuarioComponent } from './chat-usuario.component';

describe('ChatUsuarioComponent', () => {
  let component: ChatUsuarioComponent;
  let fixture: ComponentFixture<ChatUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
