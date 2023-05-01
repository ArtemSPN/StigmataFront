import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider/config/StateSchema';
import { Post } from '@/entities/Post/model/types/post';
import { postSectionActions } from '@/pages/PostPage/model/slice/postSectionData';


interface fetchPostSectionDataInterface {
    page: number,
    sec: string
}


export const fetchPostSectionData = createAsyncThunk<
    Post[],
    fetchPostSectionDataInterface,
    ThunkConfig<string>
    >(
        'post/fetchPostSectionData',
        async (props, thunkApi) => {
            const { extra, rejectWithValue, dispatch } = thunkApi;
            const {page = 1, sec} = props;


            try {
                const response = await extra.api.get<Post[]>(`/posts/${sec}/${page}`);
                if (!response.data) {
                    throw new Error();
                }
                dispatch(postSectionActions.setPage(page + 1));

                return response.data;
            } catch (e) {
                console.log(e);
                return rejectWithValue('error');
            }
        },
    );
