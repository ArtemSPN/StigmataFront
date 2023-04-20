import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider/config/StateSchema';
import { User } from '@/entities/User/user';

export const fetchUserData = createAsyncThunk<
    User,
    string[],
    ThunkConfig<string>
    >(
        'user/fetchUserData',
        async ([username, pas], thunkApi) => {
            const { extra, rejectWithValue } = thunkApi;

            try {
                const response = await extra.api.get<User>(`/user/${username}/${pas}`);
                console.log(username + " " + pas);
                console.log(response);
                if (!response.data) {
                    throw new Error();
                }

                return response.data?.user;
            } catch (e) {
                console.log(e);
                return rejectWithValue('Неверный логин или пароль');
            }
        },
    );
