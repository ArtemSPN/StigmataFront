import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './HeaderPage.module.scss';
import { useTranslation } from 'react-i18next';
import { PageTitle } from '@/shared/ui/PageTitle/PageTitle';
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';
import {ReactComponent as Format} from '@/shared/assets/format.svg'
import {ReactComponent as Menu} from '@/shared/assets/menu_burger.svg'
import { useDispatch, useSelector } from 'react-redux';
import { sidebarActions } from '@/widgets/Sidebar/model/slice/sidebarSlice';
import { getSidebarVisible } from '@/widgets/Sidebar/model/selectors/sidebarSelectors';



interface HeaderPageProps {
    className?: string;
    tittlePage?: string[];
    changeView?: () => void;
}

export const HeaderPage: React.FC<HeaderPageProps> = (props: HeaderPageProps) => {
    const { 
        className,
        tittlePage,
        changeView    
    } = props;
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const sidebarIsVisible = useSelector(getSidebarVisible); 


    const toggleMenu = () => {
        dispatch(sidebarActions.setVisible(!sidebarIsVisible));

    }


    return (
        <div className={classNames(cls.headerPage, {}, [className])}>
            <PageTitle titleArrays={tittlePage}/>
            <div className={cls.btns}>
                {
                    changeView && 
                    <Button theme={ButtonTheme.CLEAR} className={cls.viewBtn}>
                        <Format onClick={changeView}/>
                    </Button>
                }
                <Button 
                    theme={ButtonTheme.CLEAR} 
                    className={cls.menuBtn}
                    onClick={toggleMenu}
                >
                    <Menu/>
                </Button>
            </div>
        </div>
    );
}