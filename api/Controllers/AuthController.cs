using api.Data;
using api.DTOs;
using api.Entities;
using api.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController(AppDbContext _context, JwtService _jwtService) : ControllerBase
    {

        [HttpPost("register")]
        public async Task<ActionResult> Register(RegisterRequest request)
        {
            var pwHasher = new PasswordHasher<object>();
            var newUser = new User
            {
                Id = Guid.NewGuid(),
                Email = request.Email,
                Password = pwHasher.HashPassword(new object(), request.Password),
                DisplayName = request.DisplayName,
                UpdatedAt = DateTime.UtcNow
            };

            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpPost("login")]
        public async Task<ActionResult<LoginResponse>> Login(LoginRequest request)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Email == request.Email);

            if (user == null)
            {
                return NotFound(new { message = "Email is not registed" });
            }

            var pwHasher = new PasswordHasher<object>();
            var result = pwHasher.VerifyHashedPassword(new object(), user.Password, request.Password);

            if (result == PasswordVerificationResult.Failed)
            {
                return Unauthorized(new { message = "Invalid credentials" });
            }

            var accessToken = _jwtService.GenerateToken(user, 1);
            var refreshToken = _jwtService.GenerateToken(user, 24);


            return Ok(new LoginResponse
            {
                AccessToken = accessToken,
                RefereshToken = refreshToken,
                ExpiresIn = 3600 // Example: 1 hour = 3600 seconds
            });
        }
    }
}
