import { Post } from "@/entities/Post";

export interface PostItemSchema {
    isLoading: boolean;
    error?: string;
    data?: Post;
}