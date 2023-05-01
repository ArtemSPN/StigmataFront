import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ErrorPage.module.scss';
import { useTranslation } from 'react-i18next';
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';
import { Text, TextAlign, TextSize, TextTheme } from '@/shared/ui/Text/Text';
import { Page } from '@/shared/ui/Page/Page';

interface ErrorPageProps {
    className?: string;
}

export const ErrorPage: React.FC<ErrorPageProps> = (props: ErrorPageProps) => {
    const { className } = props;
    const {t} = useTranslation();

    const reloadPage = () => {
        location.reload();
    }

    return (
        <Page>
            <div className={classNames(cls.errorPage, {}, [className])}>
                <Text 
                    title={t('Что-то пошло не так, попробуйте перезагрузить страницу') as string}
                    theme={TextTheme.ERROR}
                    align={TextAlign.CENTER}
                    size={TextSize.L}
                />
                <Button onClick={reloadPage} theme={ButtonTheme.OUTLINE}>
                    {t('Перезагрузить страницу')}
                </Button>
            </div>
        </Page>
    );
}