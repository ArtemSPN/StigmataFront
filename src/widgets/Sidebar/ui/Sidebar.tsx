import { Mods, classNames } from '@/shared/lib/classNames/classNames';
import cls from './Sidebar.module.scss';
import { Link } from 'react-router-dom';
import { Settings } from '@/widgets/Settings';
import { Logo } from '@/shared/ui/Logo/Logo';
import { Navbar } from '@/widgets/Navbar';
import { SearchPanel } from '@/widgets/SearchPanel';
import { memo} from 'react';
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';
import { getProfileData } from '@/widgets/ProfileModal/model/selectors/getProfileData';
import { useDispatch, useSelector } from 'react-redux';
import jwt_decode from "jwt-decode";
import { useTranslation } from 'react-i18next';
import { getSidebarVisible } from '@/widgets/Sidebar/model/selectors/sidebarSelectors';


interface SidebarProps {
    className?: string;
}

export const Sidebar: React.FC<SidebarProps> = memo((props: SidebarProps) => {
    const { className } = props;
    let user = useSelector(getProfileData);
    const {t} = useTranslation();
    const sidebarIsVisible = useSelector(getSidebarVisible); 

    if(window.localStorage.getItem("user")){
        user = jwt_decode(window.localStorage.getItem("user") || "");
    }
    
    const mods: Mods = {
        [cls['sidebar-active']]: sidebarIsVisible,
    };

    return (
        <div className={classNames(cls.sidebar, mods, [className])}>
            <Button theme={ButtonTheme.CLEAR} showClick={false} className={cls.logo}>
                <Logo/>
            </Button>
            <SearchPanel/>
            {user &&   
            <Link to={"/createPost"} className={cls.addPost}>
                <Button className={cls.addPostBtn}>
                    {t("Добавить запись")}    
                </Button>
            </Link>
            }
            <Navbar/>
            <Settings className={classNames(cls.settings, {},[className])}/>
        </div>
    );
});

