import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LlmChangeComponent } from './llm-change.component';

describe('LlmChangeComponent', () => {
  let component: LlmChangeComponent;
  let fixture: ComponentFixture<LlmChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LlmChangeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LlmChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
