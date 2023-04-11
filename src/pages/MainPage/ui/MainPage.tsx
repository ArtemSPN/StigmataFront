/* eslint-disable max-len */
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './MainPage.module.scss';
import { PostCard } from '@/widgets/PostCard';
import { useEffect, useState } from 'react';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';
import { PageTitle } from '@/shared/ui/PageTitle/PageTitle';

interface MainPageProps {
    className?: string;
}

const MainPage: React.FC<MainPageProps> = (props: MainPageProps) => {
    const { className } = props;
    const [isLoading, setIsLoading] = useState(true);
    const {t} = useTranslation(); 

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 2000)
    }, []);
    

    const posts = [
        {
            id: '1',
            src:'https://sun9-77.userapi.com/impg/uO-JL03g14Mj6Ow1vLtkSWDRrVQWf_auvOLgwA/uwggVJGcbI8.jpg?size=960x960&quality=95&sign=006323f7997bea24e1589f581dd13c8d&c_uniq_tag=1TM33WcVSMFywT3_sBtT9OUQ1lZ5OW1StAHXnRdIcuo&type=album',
            postTitle:'Программирование 1 семестр',
            postText:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            username:'Иван Иванов'
        },
        {
            id: '2',
            src:'https://avatars.mds.yandex.net/i?id=67b37700357cdc3ef2eca369e977db5d1b028b43-7755899-images-thumbs&n=13&exp=1',
            postTitle:'Математическая логика',
            postText:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            username:'Петр Петров',
        },

    ]

    const imgArr = [
        'https://animego.org/upload/anime/images/6432fa3ceadeb599444317.jpg',
        'https://vsegda-pomnim.com/uploads/posts/2022-04/1649121796_28-vsegda-pomnim-com-p-zhivopisnaya-priroda-foto-29.jpg',
        'https://sportishka.com/uploads/posts/2022-11/1667561336_85-sportishka-com-p-samarskie-dostoprimechatelnosti-pinterest-86.jpg',
        'https://klike.net/uploads/posts/2019-11/1574605225_22.jpg',
        'https://vsegda-pomnim.com/uploads/posts/2022-04/1649282154_4-vsegda-pomnim-com-p-plyazhi-brazilii-foto-4.jpg'
    ];


    return (
        <div className={classNames(cls.mainPage, {}, [className])}>
            <PageTitle titleArrays={["Главная страница"]}/>
            {isLoading === true?
                <Skeleton className={cls.skeleton} width="100%" height={250} border={20}/>
                :
                <PostCard
                    className={cls.postCard}
                    post={posts[0]}
                    imgArr={imgArr}
                />
                
            }
            {isLoading === true?
                <Skeleton className={cls.skeleton} width="100%" height={250} border={20}/>
                :
                <PostCard
                    className={cls.postCard}
                    post={posts[1]}
                />
            }
        </div>
    );
}

export default MainPage;