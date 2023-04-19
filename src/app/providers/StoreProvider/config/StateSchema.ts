import {
    AnyAction, EnhancedStore, Reducer, ReducersMapObject,
} from '@reduxjs/toolkit';
import { CombinedState } from 'redux';
import { AxiosInstance } from 'axios';
import { NavigateOptions } from 'react-router';
import { To } from 'react-router-dom';
import { PostsSchema } from '@/entities/Post/model/types/post';
import { PostItemSchema } from '@/pages/PostItemPage/model/types/postItem';
import { CommentSchema } from '@/entities/Comment/model/types/comment';
import { PostSectionSchema } from '@/pages/PostPage/model/types/postSection';
import { UserSchema } from '@/entities/User/user';

export interface StateSchema {
    posts: PostsSchema,
    comments: CommentSchema,
    user: UserSchema,
    // async
    postItem?: PostItemSchema,
    postSection?: PostSectionSchema,
}

export type StateSchemaKey = keyof StateSchema;

export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>;
    reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>;
    add: (key: StateSchemaKey, reducer: Reducer) => void;
    remove: (key: StateSchemaKey) => void;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
    reducerManager: ReducerManager;
}

export interface ThunkExtraArg {
    api: AxiosInstance;
    navigate?: (to: To, options?: NavigateOptions) => void,
}

export interface ThunkConfig<T> {
    rejectValue: T;
    extra: ThunkExtraArg;
    state: StateSchema;
}
