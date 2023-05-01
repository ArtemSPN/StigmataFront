import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './LoaderPage.module.scss';
import { Loader } from '@/shared/ui/Loader/Loader';
import { Page } from '@/shared/ui/Page/Page';

interface LoaderPageProps {
    className?: string;
}

export const LoaderPage: React.FC<LoaderPageProps> = (props: LoaderPageProps) => {
    const { className } = props;

    return (
        <Page>
            <div className={classNames(cls.loaderPage, {}, [className])}>
                <Loader/>
            </div>
        </Page>
    );
}