import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGraphDialogueComponent } from './create-graph-dialogue.component';

describe('CreateGraphDialogueComponent', () => {
  let component: CreateGraphDialogueComponent;
  let fixture: ComponentFixture<CreateGraphDialogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateGraphDialogueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateGraphDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
