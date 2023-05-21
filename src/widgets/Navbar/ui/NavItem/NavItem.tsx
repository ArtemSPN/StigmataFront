import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './NavItem.module.scss';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSidebarDesktop } from '@/widgets/Sidebar/model/selectors/sidebarSelectors';
import { sidebarActions } from '@/widgets/Sidebar/model/slice/sidebarSlice';

interface NavItemProps {
    className?: string;
    title?: string;
    link?: string;
}

export const NavItem: React.FC<NavItemProps> = memo((props: NavItemProps) => {
    const { className, title, link } = props;
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const isDesktop = useSelector(getSidebarDesktop)

    const closeMenu = () => {
        if(!isDesktop){
            dispatch(sidebarActions.setVisible(false));
        }
    }

    return (
        <Link to={`/postList/${link}`} className={classNames(cls.navItem, {}, [className])} onClick={closeMenu}>
            {title}
        </Link>
    );
});