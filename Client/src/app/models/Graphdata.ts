import { Edge } from "./Edge";
import { Node } from "./Node";

export interface Graphdata {
    id: string;
    name: string;
    nodes: Node[];
    edges: Edge[];
  }