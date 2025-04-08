import { UserSetting as PrismaUserSetting } from '@prisma/client';
export declare class UserSetting implements PrismaUserSetting {
    theme_color: string;
    background_url: string;
    createdAt: Date;
    updatedAt: Date;
    createdBy: string;
    updatedBy: string;
}
