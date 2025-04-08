import { Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { UserFromToken } from 'src/decorators/user.decorator';
import { UserDTO } from './dto/user-dto.model';
import { UserSetting } from './entities/user-setting.entity';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => UserSetting)
  @UseGuards(JwtAuthGuard)
  async userSettings(@UserFromToken() user: UserDTO): Promise<UserSetting> {
    return this.userService.getUserSetting(user.email);
  }
}
