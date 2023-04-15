import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post} from '@/entities/Post/model/types/post';
import { fetchPostById } from '@/pages/PostItemPage/model/services/fetchPostById';
import { PostItemSchema } from '@/pages/PostItemPage/model/types/postItem';

const initialState: PostItemSchema = {
    isLoading: true,
    error: undefined,
};

export const postsItemSlice = createSlice({
    name: 'postsItem',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPostById.pending, (state) => {
                state.error = undefined;
            })
            .addCase(fetchPostById.fulfilled, (
                state,
                action: PayloadAction<Post>,
            ) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchPostById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
    },
});


// Action creators are generated for each case reducer function
export const { actions: postItemActions } = postsItemSlice;
export const { reducer: postItemReducer } = postsItemSlice;
