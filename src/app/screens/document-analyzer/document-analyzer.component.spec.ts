import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentAnalyzerComponent } from './document-analyzer.component';

describe('DocumentAnalyzerComponent', () => {
  let component: DocumentAnalyzerComponent;
  let fixture: ComponentFixture<DocumentAnalyzerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentAnalyzerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DocumentAnalyzerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
