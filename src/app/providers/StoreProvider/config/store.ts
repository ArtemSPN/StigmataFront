import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import { NavigateOptions } from 'react-router';
import { CombinedState, Reducer } from 'redux';
import { StateSchema, ThunkExtraArg } from './StateSchema';
import { createReducerManager } from './reducerManager';
import { $api } from '@/shared/api/api';
import { To } from 'react-router-dom';
import { postReducer } from '@/entities/Post';
import { commentReducer } from '@/entities/Comment/model/slice/commentSlice';
import { useReducer } from 'react';
import { profileReducer } from '@/widgets/ProfileModal/model/slice/profileSlice';
import { sidebarReducer } from '@/widgets/Sidebar/model/slice/sidebarSlice';

export function createReduxStore(
    initialState?: StateSchema,
    asyncReducers?: ReducersMapObject<StateSchema>,
    navigate?: (to: To, options?: NavigateOptions) => void,
) {
    const rootReducers: ReducersMapObject<StateSchema> = {
        posts: postReducer,
        comments: commentReducer,
        user: profileReducer,
        sidebar: sidebarReducer,
        ...asyncReducers,
    };

    const reducerManager = createReducerManager(rootReducers);

    const extraArg: ThunkExtraArg = {
        api: $api,
        navigate,
    };

    const store = configureStore({
        reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>,
        preloadedState: initialState,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({
            thunk: {
                extraArgument: extraArg,
            },
        }),
    });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    store.reducerManager = reducerManager;

    return store;
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
