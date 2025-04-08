import { Injectable, NotFoundException } from '@nestjs/common';
import { SongInput } from './dto/create-song-dto.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDTO } from 'src/user/dto/user-dto.model';
import { Song } from '@prisma/client';

@Injectable()
export class SongService {
  constructor(private prisma: PrismaService) {}

  async getSongs() {
    return await this.prisma.song.findMany();
  }

  async createAndUpdateSong(user: UserDTO, payload: SongInput) {
    let song: Song;
    const data = {
      ...payload,
      createdBy: user.email,
      updatedBy: user.email,
      updatedAt: new Date(),
    };
    if (!payload.id) {
      song = await this.prisma.song.create({ data });
    } else {
      try {
        song = await this.prisma.song.update({
          where: { id: payload.id },
          data,
        });
      } catch (error) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`Song not found`);
        }
        throw error;
      }
    }
    return song;
  }
}
