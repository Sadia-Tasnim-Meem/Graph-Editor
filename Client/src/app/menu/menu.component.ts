import { Component, OnInit } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { Graphdata } from '../models/Graphdata';
import { CommonModule } from '@angular/common';
import { GraphdataService } from '../Services/graphdata.service';
import { GraphListItem } from '../models/GraphListItem';
import { GraphDesignerService } from '../Services/graph-designer.service';

@Component({
  selector: 'app-menu',
  imports: [MatButtonModule, MatMenuModule,   MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent implements OnInit {

  constructor(private graphDesignerService: GraphDesignerService, private graphDataService: GraphdataService){
  }

  selectedGraph: string = '';
  availableGraphs: GraphListItem[] = [];
  graphData!: Graphdata;

  ngOnInit(): void {
    this.graphDataService.getAllGraphs().subscribe((graphs) => {                                                 
      this.availableGraphs = graphs;
    });
    this.graphDesignerService.currentGraphListItem.subscribe( item => {
      this.selectedGraph = item.name;
      this.availableGraphs.push(item);
    }
    );

  }

  openAddNodeDialog() {
    this.graphDesignerService.addNewNodeDialogue();
  }

  openCreateGraphDialogue(){
    this.graphDesignerService.createNewGraphDialogue();
  }

  onGraphSelection(graphListItem: GraphListItem) {
    this.selectedGraph = graphListItem.name;
    this.graphDataService.getGraph(graphListItem.id).subscribe((graphData) => {
      this.graphDesignerService.loadGraph(graphData);
    });
  }

  onLayoutClick(option: string) {
    this.graphDesignerService.layoutGraph(option);
  }

}


