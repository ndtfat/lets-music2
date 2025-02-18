

using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using api.Data;
using api.DTOs;
using api.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [Authorize]
    [Route("api/musics")]
    [ApiController]
    public class MusicsController(AppDbContext _context) : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Music>>> GetMusics()
        {
            return await _context.Musics.Include(m => m.Uploader).ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Music>> GetMusicById(Guid id)
        {
            var music = await _context.Musics
                .Include(m => m.Uploader)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (music is null)
            {
                return NotFound();
            }
            return Ok(music);
        }


        [HttpPost]
        public async Task<IActionResult> CreateOrUpdateMusic([FromBody] CreateOrUpdateMusicRequest model)
        {
            var existingMusic = await _context.Musics
                .FirstOrDefaultAsync(m => m.Id == model.Id);

            if (existingMusic == null)
            {
                var userId = User.FindFirstValue("Id");
                Console.WriteLine(userId);
                if (userId == null) return Unauthorized();
                var newMusic = new Music
                {
                    Id = Guid.NewGuid(),
                    Title = model.Title,
                    Singer = model.Singer,
                    Url = model.Url,
                    UploaderId = Guid.Parse(userId),
                    UpdatedAt = DateTime.UtcNow
                };

                _context.Musics.Add(newMusic);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetMusicById), new { id = newMusic.Id }, newMusic);
            }
            else
            {
                existingMusic.Title = model.Title;
                existingMusic.Singer = model.Singer;
                existingMusic.Url = model.Url;
                existingMusic.UploaderId = existingMusic.UploaderId;
                existingMusic.UpdatedAt = DateTime.UtcNow;

                _context.Musics.Update(existingMusic);
                await _context.SaveChangesAsync();

                return Ok(existingMusic);
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteMusic(Guid id)
        {
            await _context.Musics.Where(m => m.Id == id).ExecuteDeleteAsync();
            await _context.SaveChangesAsync();
            return Ok(new { message = "Delete music success" });
        }
    }
}
