import { classNames } from '@/shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import cls from './NotFoundPage.module.scss';
import { Page } from '@/shared/ui/Page/Page';

interface NotFoundPageProps {
    className?: string;
}

const NotFoundPage = ({ className }: NotFoundPageProps) => {
    const { t } = useTranslation();
    return (
        <Page>
            <div className={classNames(cls.NotFoundPage, {}, [className])}>
                {t('Страница не найдена')}
            </div>
        </Page>

    );
};

export default NotFoundPage;