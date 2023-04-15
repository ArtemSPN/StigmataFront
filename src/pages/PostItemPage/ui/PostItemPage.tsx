/* eslint-disable max-len */
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './PostItemPage.module.scss';
import { PageTitle } from '@/shared/ui/PageTitle/PageTitle';
import { Text, TextTheme } from '@/shared/ui/Text/Text';
import { Avatar } from '@/shared/ui/Avatar/Avatar';
import { Slider } from '@/widgets/Slider';
import { AddComForm } from '@/widgets/AddComForm';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { fetchPostById } from '@/pages/PostItemPage/model/services/fetchPostById';
import { getPostItem } from '@/pages/PostItemPage/model/selectors/getPostItem';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader';
import { postItemReducer } from '@/pages/PostItemPage/model/slice/postItemSlice';
import { Loader } from '@/shared/ui/Loader/Loader';
import { getIsLoading } from '@/pages/PostItemPage/model/selectors/getIsLoading';
import { CommentList } from '@/widgets/CommentCard';

interface PostItemPageProps {
    className?: string;
}

const reducers: ReducersList = {
    postItem: postItemReducer,
};


const PostItemPage: React.FC<PostItemPageProps> = (props: PostItemPageProps) => {
    const { className} = props;
    const dispatch = useAppDispatch();
    const post = useSelector(getPostItem);
    const isLoading = useSelector(getIsLoading);
    const { id } = useParams<{ id: string }>();
    useInitialEffect(() => {
        dispatch(fetchPostById(id));
    });

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount> 
            <div className={classNames(cls.postItemPage, {}, [className])}>
                {!isLoading && <PageTitle titleArrays={["Обсуждение", post?.section || " ", post?.title  || " "]}/>}
                {!isLoading?
                    <div className={cls.contentWrap}>
                        <div className={cls.headerPost}>
                            <Avatar
                                className={cls.avatar}
                                // eslint-disable-next-line max-len
                                src={"https://cdn.dribbble.com/users/130163/screenshots/6209150/twitch-avatar.png"}
                                alt='user logo'
                                size={50}
                            />
                            <Text
                                theme={TextTheme.PRIMARY}
                                title={post?.title}
                                text={post?.author}
                            />
                        </div>
                        <Text
                            text={post?.text}
                        />
                        {post && post?.imgArr.length > 0 &&
                        <Slider className={cls.slider} imgArr={post.imgArr}/>
                        }
                    </div>
                    :<div className={cls.loaderWrap}><Loader className={cls.loader}/></div>
                }
                <CommentList id={id || ""}/>
                <AddComForm/>
            </div>
        </DynamicModuleLoader>
    );
}

export default PostItemPage;
