import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './NavList.module.scss';
import { useTranslation } from 'react-i18next';
import { NavItem } from '../NavItem/NavItem';
import { memo } from 'react';

interface NavListProps {
    className?: string;
    visible?: boolean;

}

export const NavList: React.FC<NavListProps> = memo((props: NavListProps) => {
    const { visible } = props;
    const {t} = useTranslation();

    return (
        <div className={classNames(cls.navList,  { [cls.visible]: visible })}>
            <NavItem/>
            <NavItem/>
            <NavItem/>
            <NavItem/>
            <NavItem/>
        </div>
    );
});