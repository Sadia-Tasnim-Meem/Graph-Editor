import { Node } from "../models/Node"
import { Edge } from "../models/Edge"

export interface GraphdataRequest {
    node: Node;
    edges: Edge[];
  }