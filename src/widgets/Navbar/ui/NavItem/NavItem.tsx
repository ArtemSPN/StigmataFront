import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './NavItem.module.scss';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { Link } from 'react-router-dom';

interface NavItemProps {
    className?: string;
    title?: string;
    link?: string;
}

export const NavItem: React.FC<NavItemProps> = memo((props: NavItemProps) => {
    const { className, title, link } = props;
    const {t} = useTranslation();

    return (
        <Link to={`/postList/${link}`} className={classNames(cls.navItem, {}, [className])}>
            {title}
        </Link>
    );
});