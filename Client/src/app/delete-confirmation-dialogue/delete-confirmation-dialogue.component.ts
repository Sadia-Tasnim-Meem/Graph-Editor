import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog'

@Component({
  selector: 'app-delete-confirmation-dialogue',
  imports: [MatButtonModule, MatDialogModule],
  templateUrl: './delete-confirmation-dialogue.component.html',
  styleUrl: './delete-confirmation-dialogue.component.css'
})
export class DeleteConfirmationDialogueComponent {
  constructor(
    private dialogRef: MatDialogRef<DeleteConfirmationDialogueComponent>
  ) {}

  onConfirm() {
    this.dialogRef.close(true)
  }

  onCancel() {
    this.dialogRef.close(false)
  }
}
