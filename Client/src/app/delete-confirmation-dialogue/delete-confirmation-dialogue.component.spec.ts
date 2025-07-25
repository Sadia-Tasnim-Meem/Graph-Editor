import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteConfirmationDialogueComponent } from './delete-confirmation-dialogue.component';

describe('DeleteConfirmationDialogueComponent', () => {
  let component: DeleteConfirmationDialogueComponent;
  let fixture: ComponentFixture<DeleteConfirmationDialogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteConfirmationDialogueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteConfirmationDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
