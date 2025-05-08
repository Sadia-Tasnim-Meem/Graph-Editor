using MongoDB.Bson.Serialization.Attributes;

namespace API.Models
{
    public class Node
    {
        [BsonId] // Ensure Node Id is properly serialized
        [BsonElement("_id")]  //  Store Node Id as "_id"
        public string Id { get; set; }

        [BsonElement("Label")]
        public required string Label { get; set; }
    }
}
