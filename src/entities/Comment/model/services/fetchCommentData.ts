import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider/config/StateSchema';
import { Comment } from '@/entities/Comment/model/types/comment';

export const fetchCommentData = createAsyncThunk<
    Comment[],
    string,
    ThunkConfig<string>
    >(
        'comment/fetchCommentData',
        async (commentId, thunkApi) => {
            const { extra, rejectWithValue } = thunkApi;

            try {
                const response = await extra.api.get<Comment[]>(`/comments/${commentId}`);

                if (!response.data) {
                    throw new Error();
                }

                return response.data;
            } catch (e) {
                console.log(e);
                return rejectWithValue('error');
            }
        },
    );
