import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserSetting } from './entities/user-setting.entity';
import { userSettingDefault } from 'src/constants/user.constants';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async getUserSetting(email: string) {
    const userSetting: UserSetting | null =
      await this.prisma.userSetting.findUnique({
        where: { createdBy: email },
        include: { user: true },
      });
    return userSetting ?? userSettingDefault;
  }
}
