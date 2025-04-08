import { Song as PrismaSong } from '@prisma/client';
export declare class Song implements PrismaSong {
    id: string;
    url: string;
    name: string;
    singer: string;
    genres: string[];
    createdAt: Date;
    updatedAt: Date;
    createdBy: string;
    updatedBy: string;
}
