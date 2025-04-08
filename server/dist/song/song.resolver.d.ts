import { SongService } from './song.service';
import { UserDTO } from 'src/user/dto/user-dto.model';
import { SongInput } from './dto/create-song-dto.input';
export declare class SongResolver {
    private readonly songService;
    constructor(songService: SongService);
    songs(): Promise<{
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
    song(user: UserDTO, payload: SongInput): Promise<{
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
