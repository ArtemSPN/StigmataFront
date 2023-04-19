import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './NavList.module.scss';
import { useTranslation } from 'react-i18next';
import { NavItem } from '../NavItem/NavItem';
import { memo } from 'react';
import navItemList from '@/shared/const/section';

interface NavListProps {
    className?: string;
    visible?: boolean;

}

export const NavList: React.FC<NavListProps> = memo((props: NavListProps) => {
    const { visible } = props;

    return (
        <div className={classNames(cls.navList,  { [cls.visible]: visible })}>
            {navItemList.map((item) => {return <NavItem title={item.title} link={item.link} key={item.link}/>})}
        </div>
    );
});