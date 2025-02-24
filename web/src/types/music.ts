import type { User } from "./user";

export type Music = {
    id: string;
    title: string;
    singer: string;
    uploader: User;
    url: string;
    thumbnailUrl: string,
    updatedAt: Date;
}