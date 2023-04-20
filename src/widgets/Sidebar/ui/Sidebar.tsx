import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Sidebar.module.scss';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Settings } from '@/widgets/Settings';
import { Logo } from '@/shared/ui/Logo/Logo';
import { Navbar } from '@/widgets/Navbar';
import { SearchPanel } from '@/widgets/SearchPanel';
import { memo, useState } from 'react';
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';
import { Modal } from '@/shared/ui/Modal/Modal';
import { ProfileModal } from '@/widgets/ProfileModal';
import { getProfileData } from '@/widgets/ProfileModal/model/selectors/getProfileData';
import { useSelector } from 'react-redux';

interface SidebarProps {
    className?: string;
}

export const Sidebar: React.FC<SidebarProps> = memo((props: SidebarProps) => {
    const { className } = props;
    const user = useSelector(getProfileData);

    // сбрасывается профиль при перезагрузке страницы!!!!!
    // if(user == undefined && window.localStorage.getItem("user")){
    //
    // }

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
                    <Link to={"/createPost"}>Добавить запись</Link>
                </Button>
            }
            <Navbar/>
            <Settings className={classNames(cls.settings, {},[className])}/>
        </div>
    );
});