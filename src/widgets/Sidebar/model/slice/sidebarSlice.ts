import { SidebarSchema } from '../types/sidebar';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: SidebarSchema = {
    isVisible: (window.screen.width >= 850)?true:false,
    isDesktop: (window.screen.width >= 850)?true:false,
    isLightTheme: (localStorage.getItem("theme") == 'app_light_theme')?true:false
};

export const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState,
    reducers: {
        setTheme: (state, action: PayloadAction<boolean>) => {
            state.isLightTheme = action.payload;
        },
        setVisible: (state, action: PayloadAction<boolean>) => {
            state.isVisible = action.payload;
        },
    },
});


// Action creators are generated for each case reducer function
export const { actions: sidebarActions } = sidebarSlice;
export const { reducer: sidebarReducer } = sidebarSlice;
