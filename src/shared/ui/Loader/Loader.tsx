import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Loader.module.scss';

interface LoaderProps {
    className?: string;
}

export const Loader: React.FC<LoaderProps> = (props: LoaderProps) => {
    const {
        className,
    } = props;


    return (
        <div className={classNames(cls.loader, {}, [className])}>
            <div className={classNames(cls['lds-facebook'], {}, [className])}><div></div><div></div><div></div></div>
        </div>
    );
}