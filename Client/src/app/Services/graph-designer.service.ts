import { Injectable } from '@angular/core';
import { GraphBuilderService } from './graph-builder.service';
import { GraphLayoutService } from './graph-layout.service';
import { GraphComponent, GraphEditorInputMode, INode, Key, ModifierKeys } from 'yfiles';
import { Node } from '../models/Node';
import { Edge } from '../models/Edge';
import { GraphdataRequest } from '../models/GraphdataRequest';
import { v4 as uuidv4} from 'uuid';
import { GraphdataService } from './graphdata.service';
import { Graphdata } from '../models/Graphdata';
import objectid from 'bson-objectid';
import { DialogServiceService } from './dialog-service.service';
import { BehaviorSubject, throwError } from 'rxjs';
import { GraphListItem } from '../models/GraphListItem';

@Injectable({
  providedIn: 'root'
})

export class GraphDesignerService {
  private graphData!: Graphdata;
  private graphComponent!: GraphComponent;
  private graphListItem = new BehaviorSubject<GraphListItem>({name: "Main", id:"67fe3c5340d2a6dec8837667"});
  currentGraphListItem = this.graphListItem.asObservable();


  constructor(private dialogService: DialogServiceService, private graphBuilderService:GraphBuilderService, private layoutGraphService: GraphLayoutService, private graphDataService:GraphdataService) {
    
  }

  initialize(graphComponentId: string){
    this.createAndConfigureGraphComponent(graphComponentId);
  }

  loadGraph(graphData: Graphdata){
    this.graphData = graphData;
    this.graphBuilderService.buildGraph(this.graphComponent, graphData);
    this.layoutGraph('Hierarchical');
  }

  layoutGraph(option: string) {
    this.layoutGraphService.layout(this.graphComponent, option);
  }

  private createAndConfigureGraphComponent(id:string) {
    this.graphComponent = new GraphComponent(id);
    const graphEditorInputMode = new GraphEditorInputMode();
    graphEditorInputMode.createBendInputMode.enabled = false;
    graphEditorInputMode.allowCreateNode = false;
    graphEditorInputMode.allowCreateEdge = false;
    graphEditorInputMode.keyboardInputMode.enabled = true;
    this.graphComponent.inputMode = graphEditorInputMode;

    graphEditorInputMode.keyboardInputMode.addKeyBinding(
      Key.DELETE,
      ModifierKeys.NONE,
      () => {
        const selectedItems = this.graphComponent.selection.toArray();
        const selectedNodes = selectedItems
          .filter(item => item instanceof INode)
          .map(node => {
            const nodeId = (node as INode).tag.id;
            return this.graphData.nodes.find(n => n.id === nodeId);
          })
          .filter(node => node !== undefined) as Node[];
        if(selectedNodes.length != 0)
          this.deleteNodesDialogue(selectedNodes);
          return true;
      }
    )
  }

  addNewNodeDialogue() {
    const dialogRef = this.dialogService.openAddNodeDialog(this.graphData);
    dialogRef.afterClosed().subscribe((result) => {
      this.addNode({
        name: result.name, 
        parents: result.parents, 
        children: result.children})
      });
  }

  createNewGraphDialogue(){
    const dialogRef = this.dialogService.openCreateGraphDialoge();
    dialogRef.afterClosed().subscribe((result) => {
      this.createGraph(result.name);
    })
  }

  deleteNodesDialogue(nodes: Node[]){
    const dialogRef = this.dialogService.openDeleteConfirmation();
    dialogRef.afterClosed().subscribe((result) => {
      if(result){
        this.deleteNodes(nodes);
      }

    })
  }

  private addNode(data: {
    name: string,
    parents: string[],
    children: string[]
  }) {

      const newNode:Node = {
        id:uuidv4(),
        label: data.name
      }

      const edgeList: Edge[] = []; 
      if(data.parents && data.parents.length > 0){
        data.parents.forEach((parentLabel: string) => {
          const parent = this.graphData.nodes.find(n => n.label === parentLabel);
          if (parent) {
            edgeList.push({
              id: uuidv4(),
              sourceId: parent.id,
              targetId: newNode.id
            });
          }
        });
      }


    if(data.children && data.children.length > 0){
      data.children.forEach((childLabel: string) => {
        const child = this.graphData.nodes.find(n => n.label === childLabel);
        if (child) {
          edgeList.push({
            id: uuidv4(),
            sourceId: newNode.id,
            targetId: child.id
          });
        }
      });
    }

    this.graphBuilderService.addNode(this.graphComponent, newNode);

    if (edgeList && edgeList.length > 0) {
      edgeList.forEach((edge: Edge) => {
        this.graphBuilderService.addEdge(this.graphComponent, edge);
        console.log("adding new edge");
      });
    }

    //adding to local data
    this.graphData.nodes.push(newNode);
    edgeList.forEach((edge)=>  {
      this.graphData.edges.push(edge);
    })

    //adding to backend
    const request: GraphdataRequest = {
      node: newNode,
      edges : edgeList
    }
    this.graphDataService.createGraphData(this.graphData.id, request).subscribe();
    
  }

  deleteNodes(nodesToDelete: Node[]) {
    const graph = this.graphComponent.graph;
    for (const node of nodesToDelete) {
      const n = graph.nodes.find(n => n.tag?.id === node.id);

      //finding all the edges related to this node n
      const _node:Node = {
        id: n?.tag.id,
        label: n?.tag.label
      }
      const edgeList: Edge[] = [];
      this.graphData.edges.forEach((edge: Edge) => {
        if(edge.sourceId === _node.id || edge.targetId === _node.id){
          edgeList.push(edge);
        }
      })
      

      //deleting from view
      if (n) {
        graph.remove(n);
      }

      //deleting from local data
      const id = this.graphData.nodes.findIndex(n => n.id === node.id);
      if(id !== -1){
        this.graphData.nodes.splice(id,1);
      }
      edgeList.forEach( (edge) => {
        const id = this.graphData.edges.findIndex( e => e.id === edge.id );
        if(id !== -1){
          this.graphData.edges.splice(id,1);
        }
      })

      //deleting from backend
      const request: GraphdataRequest = {
        node: _node,
        edges: edgeList
      }
      this.graphDataService.deleteGraphData(this.graphData.id, request).subscribe({
        error: () => {
          throwError;
        }
      });
    }
  }

  createGraph(graphName: string){
    const graphData:Graphdata = {
      id:objectid().toHexString(),
      name: graphName,
      nodes: [],
      edges: []
    }

    this.graphListItem.next({id: graphData.id, name: graphData.name});
    this.loadGraph(graphData);

    this.graphDataService.createGraph(graphData).subscribe({
      error: () => {
        throwError;
      }
    });
  }
}

