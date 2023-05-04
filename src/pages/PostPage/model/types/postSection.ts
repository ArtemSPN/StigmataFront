import { Post } from "@/entities/Post";

export interface PostSectionSchema {
    isLoading: boolean;
    error?: string;
    data?: Post[];
    page: number;
    hasMore?: boolean; 
}