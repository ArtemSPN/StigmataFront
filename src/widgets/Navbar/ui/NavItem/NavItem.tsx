import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './NavItem.module.scss';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';

interface NavItemProps {
    className?: string;
}

export const NavItem: React.FC<NavItemProps> = memo((props: NavItemProps) => {
    const { className } = props;
    const {t} = useTranslation();

    return (
        <div className={classNames(cls.navItem, {}, [className])}>
            {t('NavItem')}
        </div>
    );
});