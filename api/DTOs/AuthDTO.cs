using System;

namespace api.DTOs;

public class RegisterRequest
{
    public required string Email { get; set; }
    public required string Password { get; set; }
    public required string DisplayName { get; set; }
}

public class LoginRequest
{
    public required string Email { get; set; }
    public required string Password { get; set; }
}

public class LoginResponse
{
    public required string AccessToken { get; set; }
    public required string RefereshToken { get; set; }
    public required int ExpiresIn { get; set; }
}
