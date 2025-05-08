import {   Injectable } from '@angular/core';
import { GraphComponent, INode, NodeSizeConstraintProvider, Rect, ShapeNodeStyle, Size } from 'yfiles';
import { Node } from '../models/Node';
import { Edge } from '../models/Edge';
import { Graphdata } from '../models/Graphdata';

@Injectable({
  providedIn: 'root'
})
export class GraphBuilderService {

  buildGraph(graphComponent: GraphComponent, graphData: Graphdata) {
    graphComponent.graph.clear();
    graphData.nodes.forEach((node: Node) => {
      this.addNode(graphComponent, node);
    });

    graphData.edges.forEach((edge: Edge) => {
      this.addEdge(graphComponent, edge);
    });
  }

  addNode(graphComponent: GraphComponent, node:Node){
    const graph = graphComponent.graph;

    const nodeStyle = new ShapeNodeStyle({
      fill: 'yellow',
      stroke: 'black'
    })
    
    const n = graph.createNode(
      new Rect(0, 0, 70, 70),
      nodeStyle
    );
    
    graph.decorator.nodeDecorator.sizeConstraintProviderDecorator.setImplementation(
      new NodeSizeConstraintProvider(
        new Size(50, 50),
        new Size(200, 200)
      )
    )
    n.tag = {
      id: node['id'],
      label: node['label']
    };
    graph.addLabel(n, node['label']);
  } 


  addEdge(graphComponent: GraphComponent, edge: Edge){
    const graph = graphComponent.graph;
    const sourceId = edge.sourceId;
    const targetId = edge.targetId;

    let sourceNode: INode = graph.nodes.get(0);
    let targetNode: INode = graph.nodes.get(0);
    for (const node of graph.nodes) {
      if (node.tag.id == sourceId) {
        sourceNode = node as INode;
      }
      else if (node.tag.id == targetId) {
        targetNode = node;
      }
    }

    const e = graph.createEdge(sourceNode, targetNode);

    e.tag = {
      id: edge.id,
      sourceId: edge.sourceId,
      targetId: edge.targetId
    }
    
  }
  
}
