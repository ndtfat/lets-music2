using System;
using System.ComponentModel.DataAnnotations;

namespace api.Entities;
public class User
{
    [Key]
    public required Guid Id { get; set; }
    public required string Email { get; set; } = string.Empty;
    public required string Password { get; set; } = string.Empty;
    public required string DisplayName { get; set; } = string.Empty;
    public DateTime UpdatedAt { get; set; }
}