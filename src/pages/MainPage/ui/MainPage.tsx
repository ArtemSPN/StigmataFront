/* eslint-disable max-len */
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './MainPage.module.scss';
import { PostCard } from '@/widgets/PostCard';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';
import { PageTitle } from '@/shared/ui/PageTitle/PageTitle';
import { Post, fetchPostData, getPostData, getPostIsLoading } from '@/entities/Post';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';

interface MainPageProps {
    className?: string;
}

const MainPage: React.FC<MainPageProps> = (props: MainPageProps) => {
    const { className } = props;
    const dispatch = useAppDispatch();
    const posts = useSelector(getPostData);
    const isLoading = useSelector(getPostIsLoading);

    useInitialEffect(() => {
        dispatch(fetchPostData());
        console.log("eban!!!");
    });

    //if(!isLoading) posts.map((item: Post) => console.log(item));

    const listSkeleton = [
        <Skeleton className={cls.skeleton} width="100%" height={250} border={20} key={1}/>,
        <Skeleton className={cls.skeleton} width="100%" height={250} border={20} key={2}/>,
        <Skeleton className={cls.skeleton} width="100%" height={250} border={20} key={3}/>,
        <Skeleton className={cls.skeleton} width="100%" height={250} border={20} key={4}/>,
        <Skeleton className={cls.skeleton} width="100%" height={250} border={20} key={5}/>,

    ]

    return (
        <div className={classNames(cls.mainPage, {}, [className])}>
            <PageTitle titleArrays={["Главная страница"]}/>
            {!isLoading?
                posts.map((item: Post) => {return <PostCard post={item} key={item?.title} className={cls.postCard}/>})
                :listSkeleton
            } 
        </div>
    );
}

export default MainPage;