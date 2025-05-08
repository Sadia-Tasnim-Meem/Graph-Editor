import { Injectable } from '@angular/core';
import { GraphComponent, HierarchicLayout, OrganicLayout, TreeLayout } from 'yfiles';

@Injectable({
  providedIn: 'root'
})
export class GraphLayoutService {
  constructor() { }

  layout(graphComponent: GraphComponent, layoutOption: string | null){   
    if(layoutOption == 'Organic'){
      const layout = new OrganicLayout();
      layout.considerNodeSizes = true;
      layout.minimumNodeDistance = 200;
    
      graphComponent.fitGraphBounds();
      graphComponent
      .morphLayout(layout)
      .then(() => {})
      .catch((e) => alert(`An error occurred during layout ${e}`)) 
    }

    else if(layoutOption == 'Tree'){
      const layout = new TreeLayout();
      graphComponent.fitGraphBounds();
      graphComponent
      .morphLayout(layout)
      .then(() => {})
      .catch((e) => alert(`An error occurred during layout ${e}`)) 
    }

    else if(layoutOption == 'Hierarchical'){
      const layout = new HierarchicLayout();
      graphComponent.fitGraphBounds();
      graphComponent
      .morphLayout(layout)
      .then(() => {})
      .catch((e) => alert(`An error occurred during layout ${e}`)) 
    }
  }
}
