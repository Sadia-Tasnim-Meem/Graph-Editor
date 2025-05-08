import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { Graphdata } from '../models/Graphdata';
import { Node } from '../models/Node';

@Component({
  selector: 'app-addnodedialogue',
  imports: [    
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule],
  templateUrl: './addnodedialogue.component.html',
  styleUrl: './addnodedialogue.component.css'
})
export class AddnodedialogueComponent {

  form: FormGroup;
  nodes: string[] = [];

  constructor(
    private dialogRef: MatDialogRef<AddnodedialogueComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { graphData: Graphdata },
    private fb: FormBuilder
  ) {

    data.graphData.nodes.forEach((node: Node) => {
      this.nodes.push(node.label);
    })
    this.form = this.fb.group({
      name: [''],
      parents: [],
      children: [],
    });
  }

  onSave() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
