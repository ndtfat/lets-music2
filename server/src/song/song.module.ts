import { Module } from '@nestjs/common';
import { SongService } from './song.service';
import { SongResolver } from './song.resolver';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [SongResolver, SongService, PrismaService],
})
export class SongModule {}
