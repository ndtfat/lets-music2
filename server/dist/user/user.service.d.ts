import { PrismaService } from 'src/prisma/prisma.service';
import { UserSetting } from './entities/user-setting.entity';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    getUserSetting(email: string): Promise<UserSetting>;
}
