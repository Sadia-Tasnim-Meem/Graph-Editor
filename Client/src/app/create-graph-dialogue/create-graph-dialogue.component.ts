import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-graph-dialogue',
  imports: [ MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, ReactiveFormsModule],
  templateUrl: './create-graph-dialogue.component.html',
  styleUrl: './create-graph-dialogue.component.css'
})
export class CreateGraphDialogueComponent {

  form: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<CreateGraphDialogueComponent>,
    private fb: FormBuilder,
  ) {

    this.form = this.fb.group({
      name: [''],
    });
  }
  
  onSave() {
    if(this.form.valid){
      this.dialogRef.close(this.form.value);
    }

  }

  onCancel() {
    this.dialogRef.close();
  }
}
