using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using api.Entities;
using DotNetEnv;
using Microsoft.IdentityModel.Tokens;



namespace api.Services;

public class JwtService
{
    private readonly IConfiguration _config;
    public JwtService(IConfiguration config)
    {
        _config = config;
    }

    public string GenerateToken(User user, int expiresInHour)
    {
        var jwtSettings = _config.GetSection("JwtConfig");

        Env.Load();
        var key = Encoding.UTF8.GetBytes(Env.GetString("JWT_SECRET"));
        Console.WriteLine(user.Id);
        Console.WriteLine(user.DisplayName);
        var claims = new[]
        {
            new Claim("Id", user.Id.ToString()),
            new Claim("Email", user.Email),
            new Claim("DisplayName", user.DisplayName),
        };
        var token = new JwtSecurityToken(
            issuer: jwtSettings["Issuer"],
            // audience: jwtSettings["Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddHours(expiresInHour),
            signingCredentials: new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256)
        );
        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}

// To get values in Claim:
// var userClaims = User.Claims;
// Console.WriteLine(User.FindFirst("Id")?.Value);
// Console.WriteLine(User.FindFirst("Email")?.Value);
// Console.WriteLine(User.FindFirst("DisplayName")?.Value);