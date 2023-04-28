
export interface Post {
    _id: string,
    author: string;
    title: string;
    text: string;
    section: string;
    imgArr: string[];
}

export interface PostsSchema {
    isLoading: boolean;
    error?: string;
    data?: Post[];
}