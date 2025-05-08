using MongoDB.Bson.Serialization.Attributes;

namespace API.Models
{
    public class Edge
    {
        [BsonElement("_id")]  //  Store Edge Id as "_id"
        public string Id { get; set; }

        [BsonElement("SourceId")]
        public required string SourceId { get; set; }

        [BsonElement("TargetId")]
        public required string TargetId { get; set; }
    }
}
