import { classNames } from '@/shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import cls from './PostPage.module.scss';
import { Text, TextAlign, TextSize, TextTheme } from '@/shared/ui/Text/Text';
import { useState, useEffect } from 'react';
import { Button } from '@/shared/ui/Button/Button';

interface PostPageProps {
    className?: string;
}

const PostPage: React.FC<PostPageProps> = (props: PostPageProps) => {
    const { className } = props;
    const {t} = useTranslation();

    const [error, setError] = useState(false);

    const onThrow = () => setError(true);

    useEffect(() => {
        if (error) {
            throw new Error();
        }
    }, [error]);



    return (
        <div className={classNames(cls.postPage, {}, [className])}>
            <Text
                theme={TextTheme.PRIMARY}
                title={t('Произошла ошибка при загрузке профиля') as string}
                text={'Попробуйте обновить страницу'}
                align={TextAlign.CENTER}
                size={TextSize.XL}
            />
            <Button onClick={onThrow}>
                error
            </Button>
        </div>
    );
}

export default PostPage;