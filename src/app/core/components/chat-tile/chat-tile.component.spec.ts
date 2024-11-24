import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatTileComponent } from './chat-tile.component';

describe('ChatTileComponent', () => {
  let component: ChatTileComponent;
  let fixture: ComponentFixture<ChatTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatTileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChatTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
