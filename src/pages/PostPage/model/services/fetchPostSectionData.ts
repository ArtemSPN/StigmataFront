import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider/config/StateSchema';
import { Post } from '@/entities/Post/model/types/post';

export const fetchPostSectionData = createAsyncThunk<
    Post[],
    string,
    ThunkConfig<string>
    >(
        'post/fetchPostData',
        async (sec, thunkApi) => {
            const { extra, rejectWithValue } = thunkApi;

            try {
                const response = await extra.api.get<Post[]>(`/posts/${sec}`);
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
