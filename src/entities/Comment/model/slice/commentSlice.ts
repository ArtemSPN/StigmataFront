import { fetchCommentData } from '@/entities/Comment/model/services/fetchCommentData';
import { Comment, CommentSchema } from '@/entities/Comment/model/types/comment';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


const initialState: CommentSchema = {
    isLoading: true,
    error: undefined,
    data: [],
};

export const commentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCommentData.pending, (state) => {
                state.error = undefined;
            })
            .addCase(fetchCommentData.fulfilled, (
                state,
                action: PayloadAction<Comment[]>,
            ) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchCommentData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
    },
});


// Action creators are generated for each case reducer function
export const { actions: commentActions } = commentSlice;
export const { reducer: commentReducer } = commentSlice;
