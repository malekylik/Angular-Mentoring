import { Author } from './author.model';

export interface Course {
    id: string;
    name: string;
    date: string;
    length: number;
    description: string;
    isTopRated: boolean;
    authors: Author[];
}
