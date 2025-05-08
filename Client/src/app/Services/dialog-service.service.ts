import { Injectable } from '@angular/core';
import { Graphdata } from '../models/Graphdata';
import { MatDialog } from '@angular/material/dialog';
import { AddnodedialogueComponent } from '../addnodedialogue/addnodedialogue.component';
import { DeleteConfirmationDialogueComponent } from '../delete-confirmation-dialogue/delete-confirmation-dialogue.component';
import { CreateGraphDialogueComponent } from '../create-graph-dialogue/create-graph-dialogue.component';

@Injectable({
  providedIn: 'root'
})
export class DialogServiceService {

  constructor(private dialog: MatDialog) { }

  openAddNodeDialog(graphData: Graphdata) {
    return this.dialog.open(AddnodedialogueComponent, {
      width: '400px',
      data: { graphData: graphData },
      disableClose: true
    });
  }

  openDeleteConfirmation() {
    return this.dialog.open(DeleteConfirmationDialogueComponent, {
      width: '400px',
      disableClose: true
    });
  }
  
  openCreateGraphDialoge(){
    return this.dialog.open(CreateGraphDialogueComponent, {
      width: '400px',
      disableClose: true
    });
  }

}
