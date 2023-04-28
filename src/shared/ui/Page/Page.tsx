import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Page.module.scss';
import { ReactNode } from 'react';

interface PageProps {
    className?: string;
    children: ReactNode;
}

export const Page: React.FC<PageProps> = (props: PageProps) => {
    const { 
        className,
        children
    } = props;

    return (
        <div className={classNames(cls.page, {}, [className])}>
            {children}
        </div>
    );
}