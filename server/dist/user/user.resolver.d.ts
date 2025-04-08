import { UserService } from './user.service';
import { UserDTO } from './dto/user-dto.model';
import { UserSetting } from './entities/user-setting.entity';
export declare class UserResolver {
    private readonly userService;
    constructor(userService: UserService);
    userSettings(user: UserDTO): Promise<UserSetting>;
}
