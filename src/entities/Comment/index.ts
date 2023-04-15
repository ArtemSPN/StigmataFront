export type { Comment, CommentSchema } from './model/types/comment';

export {
    commentActions,
    commentReducer,
} from './model/slice/commentSlice';

export {
    fetchCommentData,
} from './model/services/fetchCommentData';


export { getCommentIsLoading } from './model/selectors/getCommentIsLoading/getCommentIsLoading';
export { getCommentData } from './model/selectors/getCommentData/getCommentData';
export { getCommentError } from './model/selectors/getCommentError/getCommetError';
