import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Page.module.scss';
import { MutableRefObject, ReactNode, useRef } from 'react';
import { useInfiniteScroll } from '@/shared/lib/hooks/useInfiniteScroll/useInfiniteScroll';

interface PageProps {
    className?: string;
    children: ReactNode;
    onScrollEnd?: () => void;
}

export const Page: React.FC<PageProps> = (props: PageProps) => {
    const { 
        className,
        children,
        onScrollEnd,
    } = props;
    const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
    const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;

    useInfiniteScroll({
        triggerRef,
        wrapperRef,
        callback: onScrollEnd,
    });

    return (
        <div
            ref={wrapperRef}
            className={classNames(cls.page, {}, [className])}>
            {children}
            {onScrollEnd? (
                <div className={cls.trigger} ref={triggerRef} />
            ) : null}
        </div>
    );
}