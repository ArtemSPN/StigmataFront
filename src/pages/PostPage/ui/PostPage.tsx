import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './PostPage.module.scss';
import { useEffect } from 'react';
import { Post} from '@/entities/Post';
import { fetchPostSectionData } from '@/pages/PostPage/model/services/fetchPostSectionData';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader';
import { postSectionReducer } from '@/pages/PostPage/model/slice/postSectionData';
import { getPostSectionIsLoading } from '@/pages/PostPage/model/selectors/getPostSectionIsLoading';
import { getPostSectionData } from '@/pages/PostPage/model/selectors/getPostSectionData';
import { PostCard } from '@/widgets/PostCard';
import { PageTitle } from '@/shared/ui/PageTitle/PageTitle';
import { navItem } from '@/shared/const/section';
import { Text, TextSize } from '@/shared/ui/Text/Text';
import { Loader } from '@/shared/ui/Loader/Loader';
import { useTranslation } from 'react-i18next';

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
    const { sec } = useParams<{ sec: string }>();

    useEffect(() => {
        dispatch(fetchPostSectionData(sec || ""));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sec])

    {!isLoading && console.log(postsSection)}

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
            <div className={classNames(cls.postPage, {}, [className])}>
                <div className={cls.header}>
                    <PageTitle titleArrays={[t("Обсуждение"), navItem[sec]]}/>
                </div>
                {isLoading &&
                <div className={cls.loaderWrap}><Loader className={cls.loader}/></div>}
                {!isLoading && postsSection?.length == 0?
                    <div className={cls.fullPage}>
                        <Text title='В этом разделе пока нет записей' size={TextSize.XL} className={cls.text}/>
                    </div>   
                    :postsSection?.map((item: Post) => 
                    {return <PostCard className={cls.postCard} post={item} key={item._id}/>})
                }
            </div>
        </DynamicModuleLoader>
    );
}

export default PostPage;