import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './LoaderPage.module.scss';
import { Loader } from '@/shared/ui/Loader/Loader';

interface LoaderPageProps {
    className?: string;
}

export const LoaderPage: React.FC<LoaderPageProps> = (props: LoaderPageProps) => {
    const { className } = props;

    return (
        <div className={classNames(cls.loaderPage, {}, [className])}>
            <Loader/>
        </div>
    );
}