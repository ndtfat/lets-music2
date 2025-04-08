import { Role } from '@prisma/client';
export declare class UserDTO {
    email: string;
    role: Role;
    userName: string;
    createdAt: Date;
    updatedAt: Date;
    createdBy: string;
    updatedBy: string;
}
