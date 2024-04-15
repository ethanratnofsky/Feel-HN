export interface Comment {
    indent: number;
    id: string;
    author: string;
    comment: string;
    replies: Comment[];
}
