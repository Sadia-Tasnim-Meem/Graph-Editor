using API.Models;
using API.Services;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GraphController : Controller
    {
        private readonly MongoDBService _mongoDBService;

        public GraphController(MongoDBService mongoDBService)
        {
            _mongoDBService = mongoDBService;
        }

        //get all graphs
        //api/graph
        [HttpGet]
        public async Task<ActionResult<List<GraphList>>> GetAllGraphsAsync()
        {
            var graphs = await _mongoDBService.GetAllGraphNamesAsync();
            return Ok(graphs);
        }

        //get a single graph
        [HttpGet("{graphId}")]
        public async Task<Graphdata> GetGraphdatasAsync(string graphId)
        {
            return await _mongoDBService.GetAsync(graphId);
        }

        //create
        //createdata
        [HttpPost("createData/{graphId}")]
        public async Task<ActionResult<Graphdata>> CreateGraphDataAsync(string graphId, [FromBody] GraphdataRequest request)
        {
            if (request == null)
            {
                return BadRequest("Invalid data.");
            }

            // Call the service layer to add the node and edges
            var updatedGraph = await _mongoDBService.AddNodeAndEdgesAsync(graphId, request.Node, request.Edges);

            if (updatedGraph == null)
            {
                return NotFound("Graphdata not found to update.");
            }

            return Ok(updatedGraph); // Return the updated Graphdata
        }

        //deletedata
        // DELETE: api/graph/deleteData/{graphId}
        [HttpDelete("deleteData/{graphId}")]
        public async Task<ActionResult<Graphdata>> DeleteGraphDataAsync(string graphId, [FromBody] GraphdataRequest request)
        {
            if (request == null)
            {
                return BadRequest("Invalid data.");
            }

            // Call the service layer to delete the node and edges
            var updatedGraph = await _mongoDBService.DeleteNodeAndEdgesAsync(graphId, request.Node, request.Edges);

            if (updatedGraph == null)
            {
                return NotFound("Graphdata not found to update.");
            }

            return Ok(updatedGraph); // Return the updated Graphdata
        }


        // POST: api/graph/creategraph
        [HttpPost("creategraph")]
        public async Task<ActionResult<Graphdata>> CreateNewGraphAsync([FromBody] Graphdata request)
        {
            if (string.IsNullOrWhiteSpace(request.Name))
            {
                return BadRequest("Graph name is required.");
            }

            var newGraph = await _mongoDBService.CreateNewGraphAsync(request);
            return Ok(newGraph);
            //return CreatedAtAction(nameof(GetGraphdatasAsync), new { graphId = request.Id }, newGraph);
        }

    }
}
