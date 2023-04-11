import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './PageTitle.module.scss';
import { useTranslation } from 'react-i18next';

interface PageTitleProps {
    className?: string;
    titleArrays?: string[];
}

export const PageTitle: React.FC<PageTitleProps> = (props: PageTitleProps) => {
    const { 
        className,
        titleArrays,
    } = props;
    const {t} = useTranslation();

    const strTitle = titleArrays?.map(
        (item, id) =>
            (
                <span key={id} className={cls.titleItem}>
                    {`${item}${(id !== titleArrays.length-1)?"/":" "}`}
                </span>)
    );

    return (
        <div className={classNames(cls.pageTitle, {}, [className])}>
            {strTitle}
        </div>
    );
}