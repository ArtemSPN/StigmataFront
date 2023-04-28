import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Sidebar.module.scss';
import { Link } from 'react-router-dom';
import { Settings } from '@/widgets/Settings';
import { Logo } from '@/shared/ui/Logo/Logo';
import { Navbar } from '@/widgets/Navbar';
import { SearchPanel } from '@/widgets/SearchPanel';
import { memo} from 'react';
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';
import { getProfileData } from '@/widgets/ProfileModal/model/selectors/getProfileData';
import { useSelector } from 'react-redux';
import jwt_decode from "jwt-decode";
import { useTranslation } from 'react-i18next';


interface SidebarProps {
    className?: string;
}

export const Sidebar: React.FC<SidebarProps> = memo((props: SidebarProps) => {
    const { className } = props;
    let user = useSelector(getProfileData);
    const {t} = useTranslation();

    if(window.localStorage.getItem("user")){
        user = jwt_decode(window.localStorage.getItem("user") || "");
    }
    console.log(user);

    return (
        <div className={classNames(cls.sidebar, {}, [className])}>
            <Button theme={ButtonTheme.CLEAR} showClick={false}>
                <Link to={""}>
                    <Logo/>
                </Link>
            </Button>
            <SearchPanel/>
            {user &&   
                <Button className={cls.addPost}>
                    <Link to={"/createPost"}>{t("Добавить запись")}</Link>
                </Button>
            }
            <Navbar/>
            <Settings className={classNames(cls.settings, {},[className])}/>
        </div>
    );
});

