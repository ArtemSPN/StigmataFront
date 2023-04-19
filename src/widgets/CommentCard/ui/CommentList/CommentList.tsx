import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './CommentList.module.scss';
import { getCommentData, getCommentIsLoading, fetchCommentData, Comment } from '@/entities/Comment';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useSelector } from 'react-redux';
import { CommentCard } from '@/widgets/CommentCard/ui/CommentCard/CommentCard';

interface CommentListProps {
    className?: string;
    id: string;
}

export const CommentList: React.FC<CommentListProps> = (props: CommentListProps) => {
    const { className, id } = props;

    const dispatch = useAppDispatch();
    const comments = useSelector(getCommentData);
    const isLoading = useSelector(getCommentIsLoading);

    useInitialEffect(() => {
        dispatch(fetchCommentData(id));
    });
    return (
        <div className={classNames(cls.commentList, {}, [className])}>
            {!isLoading && 
            comments?.map((item: Comment, index: any) => <CommentCard comment={item} key={index}/>)
            }
        </div>
    );
}