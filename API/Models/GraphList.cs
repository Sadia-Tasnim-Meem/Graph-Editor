using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace API.Models
{
    public class GraphList
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        [BsonElement("_id")] //  Ensure MongoDB uses "_id" consistently
        public string Id { get; set; }  // Store MongoDB _id as string

        [BsonElement("Name")]
        public string Name { get; set; }
    }
}
