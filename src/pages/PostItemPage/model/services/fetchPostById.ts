import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider/config/StateSchema';
import { Post } from '@/entities/Post/model/types/post';

export const fetchPostById = createAsyncThunk<
    Post,
    string | undefined,
    ThunkConfig<string>
    >(
        'post/fetchPostById',
        async (postId, thunkApi) => {
            const { extra, rejectWithValue } = thunkApi;

            try {
                console.log(`/post/${postId}`);
                const response = await extra.api.get<Post>(`/post/${postId}`);
                console.log(response);
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
