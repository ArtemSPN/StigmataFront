import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Loader.module.scss';
import { memo } from 'react';

interface LoaderProps {
    className?: string;
}

export const Loader: React.FC<LoaderProps> = memo((props: LoaderProps) => {
    const {
        className,
    } = props;


    return (
        <div className={classNames(cls.loader, {}, [className])}>
            <div className={classNames(cls['lds-facebook'], {}, [className])}><div></div><div></div><div></div></div>
        </div>
    );
});