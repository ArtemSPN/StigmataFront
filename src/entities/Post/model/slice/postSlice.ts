import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post, PostsSchema } from '@/entities/Post/model/types/post';
import { fetchPostData } from '@/entities/Post/model/services/fetchPostData';

const initialState: PostsSchema = {
    isLoading: true,
    error: undefined,
    data: [],
};

export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        searchPost: (state, action) => {
            console.log(action);
            console.log(state.data?.posts.filter((item: Post) => item.title.includes(action.payload.text)))
            state.data.posts = state.data?.posts.filter((item: Post) => item.title.includes(action.payload.text));
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPostData.pending, (state) => {
                state.error = undefined;
            })
            .addCase(fetchPostData.fulfilled, (
                state,
                action: PayloadAction<Post[]>,
            ) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchPostData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
    },
});


// Action creators are generated for each case reducer function
export const { actions: postActions } = postsSlice;
export const { reducer: postReducer } = postsSlice;
