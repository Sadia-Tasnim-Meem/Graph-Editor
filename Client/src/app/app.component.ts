import { Component, inject, OnInit } from '@angular/core';
import { Graph, License } from 'yfiles';
import licenseData from '../assets/yfiles-2.6/license/license';
import { GraphdataService } from './Services/graphdata.service';
import { Graphdata } from './models/Graphdata';
import { GraphDesignerService } from './Services/graph-designer.service';
import { MenuComponent } from './menu/menu.component';

License.value = licenseData;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [MenuComponent]
})

export class AppComponent implements OnInit{

  title = 'yfiles_project';

  constructor(private graphdataService: GraphdataService, private graphDesignerService: GraphDesignerService){}

  private graphComponentId  = '#graphComponent';

  ngOnInit(): void {
    License.value = licenseData;
    this.graphDesignerService.initialize(this.graphComponentId);
    this.graphdataService.getGraph('67fe3c5340d2a6dec8837667').subscribe(
      (graphData: Graphdata) => {
        this.graphDesignerService.loadGraph(graphData);
      }
    )
  }  
}