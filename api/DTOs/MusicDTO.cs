using System;

namespace api.DTOs;

public class CreateOrUpdateMusicRequest
{
    public Guid? Id { get; set; }
    public required string Title { get; set; }
    public required string Singer { get; set; }
    public required string Url { get; set; }
    public DateTime? UpdatedAt { get; set; }
}