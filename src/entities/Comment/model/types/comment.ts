
export interface Comment {
    author: string;
    authorUrl: string;
    postId: string;
    text: string;
    imgArr: string[];
    _id: string;
}

export interface CommentSchema {
    isLoading: boolean;
    error?: string;
    data?: Comment[];
}