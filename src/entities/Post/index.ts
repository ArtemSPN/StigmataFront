export type {
    Post,
    PostsSchema,
} from './model/types/post';

export {
    postActions,
    postReducer,
} from './model/slice/postSlice';

export {
    fetchPostData,
} from './model/services/fetchPostData';


export { getPostIsLoading } from './model/selectors/getPostIsLoading/getPostIsLoading';
export { getPostData } from './model/selectors/getPostData/getPostData';
export { getPostError } from './model/selectors/getPostError/getPostError';
