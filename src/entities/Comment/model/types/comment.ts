
export interface Comment {
    author: string;
    authorUrl: string;
    postId: string;
    text: string;
    img: string;
    fileArr: string[];
    _id: string;
}

export interface CommentSchema {
    isLoading: boolean;
    error?: string;
    data?: Comment[];
}