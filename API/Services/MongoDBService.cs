using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace API.Services
{
    public class MongoDBService
    {
        private readonly IMongoCollection<Graphdata> _graphdataCollection;

        public MongoDBService(IOptions<MongoDBSettings> mongoDBSettings)
        {
            MongoClient client = new MongoClient(mongoDBSettings.Value.ConnectionURI);
            IMongoDatabase database = client.GetDatabase(mongoDBSettings.Value.DataBaseName);
            _graphdataCollection = database.GetCollection<Graphdata>(mongoDBSettings.Value.CollectionName);
        }

        //get all graph id and name
        public async Task<List<GraphList>> GetAllGraphNamesAsync()
        {
            var projection = Builders<Graphdata>.Projection.Expression(g => new GraphList
            {
                Id = g.Id,
                Name = g.Name
            });

            return await _graphdataCollection.Find(_ => true).Project(projection).ToListAsync();
        }


        //get a graph
        public async Task<Graphdata> GetAsync(string graphId)
        {
            return await _graphdataCollection.Find(g => g.Id == graphId).FirstOrDefaultAsync();
            //return  await _graphdataCollection.Find(new BsonDocument()).FirstOrDefaultAsync();
        }

        //createData
        public async Task<Graphdata> AddNodeAndEdgesAsync(string graphId, Node node, List<Edge> edges)
        {
            // Find the graph by its ID
            var graph = await _graphdataCollection.Find(g => g.Id == graphId).FirstOrDefaultAsync();

            if (graph == null)
            {
                return null; // Graph with the given ID not found
            }

            // Add the new node to the graph's node list
            graph.Nodes.Add(node);


            // Add the edges to the graph's edge list (even if empty)
            if (edges != null && edges.Any())
            {
                graph.Edges.AddRange(edges);
            }

            // Update the graph in the database
            var filter = Builders<Graphdata>.Filter.Eq(g => g.Id, graphId);
            var update = Builders<Graphdata>.Update
                .Set(g => g.Nodes, graph.Nodes)
                .Set(g => g.Edges, graph.Edges);

            // Perform the update operation
            var result = await _graphdataCollection.UpdateOneAsync(filter, update);

            if (result.MatchedCount == 0)
            {
                return null;
            }

            // Return the updated graph data
            return await _graphdataCollection.Find(filter).FirstOrDefaultAsync();
        }

        //createData
        public async Task<Graphdata> DeleteNodeAndEdgesAsync(string graphId, Node node, List<Edge> edges)
        {
            // Find the graph by its ID
            var graph = await _graphdataCollection.Find(g => g.Id == graphId).FirstOrDefaultAsync();

            if (graph == null)
            {
                return null; // Graph with the given ID not found
            }

            // Remove the node from the graph's node list
            graph.Nodes.RemoveAll(n => n.Id == node.Id);


            // Remove the specified edges from the graph's edge list (even if empty)
            if (edges != null && edges.Any())
            {
                foreach (var edge in edges)
                {
                    graph.Edges.RemoveAll(e => e.Id == edge.Id);
                }
            }

            // Update the graph in the database
            var filter = Builders<Graphdata>.Filter.Eq(g => g.Id, graphId);
            var update = Builders<Graphdata>.Update
                .Set(g => g.Nodes, graph.Nodes)
                .Set(g => g.Edges, graph.Edges);

            // Perform the update operation
            var result = await _graphdataCollection.UpdateOneAsync(filter, update);

            if (result.MatchedCount == 0)
            {
                return null;
            }

            // Return the updated graph data
            return await _graphdataCollection.Find(filter).FirstOrDefaultAsync();
        }

        //create new graph

        public async Task<Graphdata> CreateNewGraphAsync(Graphdata graph)
        {
   

            await _graphdataCollection.InsertOneAsync(graph);
            return graph;
        }


    }
}
