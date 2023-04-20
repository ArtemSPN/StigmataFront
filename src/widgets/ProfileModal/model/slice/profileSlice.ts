import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, UserSchema } from '@/entities/User/user';
import { fetchUserData } from '@/widgets/ProfileModal/model/services/fetchUserData';

const initialState: UserSchema = {
    isLoading: true,
    error: undefined,
};

export const profileSlice = createSlice({
    name: 'User',
    initialState,
    reducers: {
        removeProfile: (state) => {
            state.data = undefined;
        }
        // updateProfile: (state, action: PayloadAction<User>) => {

        // },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserData.pending, (state) => {
                state.error = undefined;
            })
            .addCase(fetchUserData.fulfilled, (
                state,
                action: PayloadAction<User>,
            ) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchUserData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
    },
});


// Action creators are generated for each case reducer function
export const { actions: profileActions } = profileSlice;
export const { reducer: profileReducer } = profileSlice;
