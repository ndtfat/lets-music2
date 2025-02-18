using System;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace api.Entities;

public class Music
{
    public Guid Id { get; set; }
    public required string Title { get; set; }
    public required string Singer { get; set; }
    public required string Url { get; set; }
    public required Guid UploaderId { get; set; }
    public User? Uploader { get; set; }
    public DateTime UpdatedAt { get; set; }
}
