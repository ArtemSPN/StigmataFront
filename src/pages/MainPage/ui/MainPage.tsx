/* eslint-disable max-len */
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './MainPage.module.scss';
import { PostCard } from '@/widgets/PostCard';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';
import { PageTitle } from '@/shared/ui/PageTitle/PageTitle';
import { Post, fetchPostData, getPostData, getPostError, getPostIsLoading } from '@/entities/Post';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useState } from 'react';
import { TextTheme, TextSize, Text } from '@/shared/ui/Text/Text';
import { useTranslation } from 'react-i18next';
import { Page } from '@/shared/ui/Page/Page';
import { HeaderPage } from '@/widgets/HeaderPage';

interface MainPageProps {
    className?: string;
}

const MainPage: React.FC<MainPageProps> = (props: MainPageProps) => {
    const {t} = useTranslation();
    const { className } = props;
    const [full, setFull] = useState(true);
    const dispatch = useAppDispatch();
    const posts = useSelector(getPostData);
    const isLoading = useSelector(getPostIsLoading);
    const error = useSelector(getPostError);

    useInitialEffect(() => {
        dispatch(fetchPostData());
        console.log(isLoading);
    });


    const changeView = () => {
        setFull(!full);
    }

    //if(!isLoading) posts.map((item: Post) => console.log(item));

    const listSkeleton = [
        <Skeleton className={cls.skeleton} width="100%" height={250} border={20} key={1}/>,
        <Skeleton className={cls.skeleton} width="100%" height={250} border={20} key={2}/>,
        <Skeleton className={cls.skeleton} width="100%" height={250} border={20} key={3}/>,
        <Skeleton className={cls.skeleton} width="100%" height={250} border={20} key={4}/>,
        <Skeleton className={cls.skeleton} width="100%" height={250} border={20} key={5}/>,
    ]

    return (
        <Page>
            <div className={classNames(cls.mainPage, {}, [className])}>
                <HeaderPage tittlePage={[t("Главная страница")]} changeView={changeView} className={cls.header}/>
                {error && <Text theme={TextTheme.ERROR} size={TextSize.XL} title="Произошла ошибка при загрузке записи"/>}
                {!isLoading?
                    posts?.map((item: Post) => {return <PostCard post={item} key={item?.title} className={cls.postCard} full={full}/>})
                    :listSkeleton
                } 
            </div>
        </Page>
    );
}

export default MainPage;