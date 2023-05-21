import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Logo.module.scss';
import { memo } from 'react';
import {ReactComponent as Menu} from '@/shared/assets/menu_burger.svg'
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';
import { getSidebarDesktop, getSidebarVisible } from '@/widgets/Sidebar/model/selectors/sidebarSelectors';
import { sidebarActions } from '@/widgets/Sidebar/model/slice/sidebarSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


interface LogoProps {
    className?: string;
}

export const Logo: React.FC<LogoProps> = memo((props: LogoProps) => {
    const { className } = props;
    const dispatch = useDispatch();
    const sidebarIsVisible = useSelector(getSidebarVisible); 


    const toggleMenu = () => {
        dispatch(sidebarActions.setVisible(!sidebarIsVisible));

    }

    const isDesktop = useSelector(getSidebarDesktop)

    const closeMenu = () => {
        if(!isDesktop){
            dispatch(sidebarActions.setVisible(false));
        }
    }


    return (
        <div className={classNames(cls.logo, {}, [className])}>
            <Link to={''} onClick={closeMenu}>
                {"Stigmata"}
            </Link>

            {
                window.screen.width < 850 && 
                <Button 
                    theme={ButtonTheme.CLEAR} 
                    className={cls.menuBtn}
                    onClick={toggleMenu}
                >
                    <Menu/>
                </Button>
            }
        </div>
    );
});