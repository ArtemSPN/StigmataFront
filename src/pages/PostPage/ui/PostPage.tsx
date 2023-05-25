import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './PostPage.module.scss';
import { useCallback, useEffect } from 'react';
import { Post} from '@/entities/Post';
import { fetchPostSectionData } from '@/pages/PostPage/model/services/fetchPostSectionData';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader';
import { postSectionActions, postSectionReducer } from '@/pages/PostPage/model/slice/postSectionData';
import { getPostSectionIsLoading } from '@/pages/PostPage/model/selectors/getPostSectionIsLoading';
import { getPostSectionData } from '@/pages/PostPage/model/selectors/getPostSectionData';
import { PostCard } from '@/widgets/PostCard';
import { PageTitle } from '@/shared/ui/PageTitle/PageTitle';
import { navItem } from '@/shared/const/section';
import { Text, TextSize } from '@/shared/ui/Text/Text';
import { Loader } from '@/shared/ui/Loader/Loader';
import { useTranslation } from 'react-i18next';
import { Page } from '@/shared/ui/Page/Page';
import { getPostSectionPage } from '@/pages/PostPage/model/selectors/getPostSectionPage';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';
import { getPostSectionHasMore } from '@/pages/PostPage/model/selectors/getPostSectionHasMore';
import { HeaderPage } from '@/widgets/HeaderPage';

interface PostPageProps {
    className?: string;
}

const reducers: ReducersList = {
    postSection: postSectionReducer,
};

const PostPage: React.FC<PostPageProps> = (props: PostPageProps) => {
    const { className } = props;
    const {t} = useTranslation();
    const dispatch = useAppDispatch();
    const postsSection = useSelector(getPostSectionData);
    const isLoading = useSelector(getPostSectionIsLoading);
    const page = useSelector(getPostSectionPage);
    const hasMore = useSelector(getPostSectionHasMore);

    const { sec } = useParams<{ sec: string }>();

    
    useEffect(() => {
        window.scrollTo(0,0);
        dispatch(postSectionActions.setPage(1));
        console.log(page + " - do");
        console.log();
        dispatch(fetchPostSectionData({
            page: 1,
            // @ts-ignore
            sec,
        }));
        console.log(page + " - posle");
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sec])

    const onLoadNextPart = useCallback(() => { 
        dispatch(postSectionActions.setLoading(true));
        dispatch(fetchPostSectionData({
            // @ts-ignore
            page,
            // @ts-ignore
            sec,
        }));
    }, [dispatch, page, sec]);

    const listSkeleton = [
        <Skeleton className={cls.skeleton} width="100%" height={250} border={20} key={1}/>,
        <Skeleton className={cls.skeleton} width="100%" height={250} border={20} key={2}/>,
        <Skeleton className={cls.skeleton} width="100%" height={250} border={20} key={3}/>,
        <Skeleton className={cls.skeleton} width="100%" height={250} border={20} key={4}/>,
        <Skeleton className={cls.skeleton} width="100%" height={250} border={20} key={5}/>,
    ]

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
            <Page onScrollEnd={hasMore?onLoadNextPart:undefined}>
                <div className={classNames(cls.postPage, {}, [className])}>
                    {/* @ts-ignore */}
                    <HeaderPage tittlePage={[t("Обсуждение"), navItem[sec]]}/>
                    {!isLoading && postsSection?.length == 0?
                        <div className={cls.fullPage}>
                            <Text title='В этом разделе пока нет записей' size={TextSize.XL} className={cls.text}/>
                        </div>   
                        :postsSection?.map((item: Post) => 
                        {return <PostCard className={cls.postCard} post={item} key={item._id}/>})
                    }
                    {isLoading &&
                    listSkeleton}

                </div>
            </Page>
        </DynamicModuleLoader>
    );
}

export default PostPage;

