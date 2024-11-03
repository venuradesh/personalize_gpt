import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelTileComponent } from './panel-tile.component';

describe('PanelTileComponent', () => {
  let component: PanelTileComponent;
  let fixture: ComponentFixture<PanelTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelTileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PanelTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
