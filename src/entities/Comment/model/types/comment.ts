
export interface Comment {
    author: string;
    postId: string;
    text: string;
    imgArr: string[];
}

export interface CommentSchema {
    isLoading: boolean;
    error?: string;
    data?: Comment[];
}