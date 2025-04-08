import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { SongService } from './song.service';
import { Song } from './entities/song.entity';
import { UserFromToken } from 'src/decorators/user.decorator';
import { UserDTO } from 'src/user/dto/user-dto.model';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { SongInput } from './dto/create-song-dto.input';

@Resolver('Song')
export class SongResolver {
  constructor(private readonly songService: SongService) {}

  @Query(() => [Song])
  async songs() {
    return this.songService.getSongs();
  }

  @Mutation(() => Song)
  @UseGuards(JwtAuthGuard)
  async song(
    @UserFromToken() user: UserDTO,
    @Args('payload') payload: SongInput,
  ) {
    return this.songService.createAndUpdateSong(user, payload);
  }

  // @Mutation(() => String)
  // @UseGuards(JwtAuthGuard)
  // async deleteSong(@Args('id') id: string) {
  //   return this.songService.deleteSong(id);
  // }
}
