import { SongInput } from './dto/create-song-dto.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDTO } from 'src/user/dto/user-dto.model';
export declare class SongService {
    private prisma;
    constructor(prisma: PrismaService);
    getSongs(): Promise<{
        id: string;
        url: string;
        name: string;
        singer: string;
        genres: string[];
        createdAt: Date;
        updatedAt: Date;
        createdBy: string;
        updatedBy: string;
    }[]>;
    createAndUpdateSong(user: UserDTO, payload: SongInput): Promise<{
        id: string;
        url: string;
        name: string;
        singer: string;
        genres: string[];
        createdAt: Date;
        updatedAt: Date;
        createdBy: string;
        updatedBy: string;
    }>;
}
