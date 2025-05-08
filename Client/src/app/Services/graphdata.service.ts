import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Graphdata } from '../models/Graphdata';
import { Observable } from 'rxjs';
import { GraphdataRequest } from '../models/GraphdataRequest';
import { GraphListItem } from '../models/GraphListItem';

@Injectable({
  providedIn: 'root',
 
})
export class GraphdataService {
  private http = inject(HttpClient);
  baseUrl = 'http://localhost:5140/api/Graph/';

  constructor(){
  }

  getAllGraphs(): Observable<GraphListItem[]> {
    return this.http.get<GraphListItem[]>(`${this.baseUrl}`);
  }

  getGraph(graphId: string): Observable<Graphdata>{
    return this.http.get<Graphdata>(this.baseUrl+graphId);
  }

  createGraph(request: Graphdata): Observable<Graphdata> {
    console.log(request.name);
    return this.http.post<Graphdata>(`${this.baseUrl}creategraph`, request);
  }
  
  createGraphData(graphId: string, request: GraphdataRequest): Observable<Graphdata> {
    return this.http.post<Graphdata>(`${this.baseUrl}createData/${graphId}`, request);
  }

  deleteGraphData(graphId: string, request: GraphdataRequest): Observable<Graphdata> {
    return this.http.delete<Graphdata>(`${this.baseUrl}deleteData/${graphId}`, {
      body: request
    });
  }
  
}
