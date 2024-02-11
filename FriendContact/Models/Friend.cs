namespace FriendContact.Models
{
    public class Friend
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime LastContactDate { get; set; }
        public int CategoryId {  get; set; }
        public Category FriendCategory { get; set; }
        public int DesiredContactFrequency { get; set; }
    }
}
