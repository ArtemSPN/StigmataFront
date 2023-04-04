import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './MainPage.module.scss';
import { PostCard } from '@/widgets/PostCard';
import { useEffect, useState } from 'react';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';

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
    

    return (
        <div className={classNames(cls.mainPage, {}, [className])}>
            {t("Главная страница")}
            {isLoading === true?
                <Skeleton className={cls.skeleton} width="100%" height={250} border={20}/>
                :
                <PostCard
                    className={cls.postCard}
                    // eslint-disable-next-line max-len
                    src='https://sun9-77.userapi.com/impg/uO-JL03g14Mj6Ow1vLtkSWDRrVQWf_auvOLgwA/uwggVJGcbI8.jpg?size=960x960&quality=95&sign=006323f7997bea24e1589f581dd13c8d&c_uniq_tag=1TM33WcVSMFywT3_sBtT9OUQ1lZ5OW1StAHXnRdIcuo&type=album'
                    postTitle='Программирование 1 семестр'
                    // eslint-disable-next-line max-len
                    postText='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
                    username='Иван Иванов'
                />
            }
            {isLoading === true?
                <Skeleton className={cls.skeleton} width="100%" height={250} border={20}/>
                :
                <PostCard
                    className={cls.postCard}
                    // eslint-disable-next-line max-len
                    src='https://avatars.mds.yandex.net/i?id=67b37700357cdc3ef2eca369e977db5d1b028b43-7755899-images-thumbs&n=13&exp=1'
                    postTitle='Математическая логика'
                    // eslint-disable-next-line max-len
                    postText='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
                    username='Петр Петров'
                />
            }
        </div>
    );
}

export default MainPage;