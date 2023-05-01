import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchPostSectionData } from '@/pages/PostPage/model/services/fetchPostSectionData';
import { PostSectionSchema } from '@/pages/PostPage/model/types/postSection';
import { Post } from '@/entities/Post';

const initialState: PostSectionSchema = {
    isLoading: true,
    error: undefined,
    data: [],
    page: 1,
};

export const postSectionSlice = createSlice({
    name: 'postSection',
    initialState,
    reducers: {
        searchPost: (state, action) => {
            console.log(action);
            console.log(state.data?.filter((item) => item.title.includes(action.payload.text)))
            state.data = state.data?.filter((item) => item.title.includes(action.payload.text));
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
        // addPost: (state, action) => {
        //     state.data = {
        //         ...state.data,
        //         action.payload
        //     };
        // }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPostSectionData.pending, (state) => {
                state.error = undefined;
            })
            .addCase(fetchPostSectionData.fulfilled, (
                state,
                action: PayloadAction<Post[]>,
            ) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchPostSectionData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
    },
});


// Action creators are generated for each case reducer function
export const { actions: postSectionActions } = postSectionSlice;
export const { reducer: postSectionReducer } = postSectionSlice;
