import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Sidebar.module.scss';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Settings } from '@/widgets/Settings';
import { Logo } from '@/shared/ui/Logo/Logo';
import { Navbar } from '@/widgets/Navbar';
import { SearchPanel } from '@/widgets/SearchPanel';

interface SidebarProps {
    className?: string;
}

export const Sidebar: React.FC<SidebarProps> = (props: SidebarProps) => {
    const { className } = props;
    const {t} = useTranslation();

    


    return (
        <div className={classNames(cls.sidebar, {}, [className])}>
            <Logo/>
            <SearchPanel/>
            <Navbar/>
            <Link to={'/'}>{t("Главная страница")}</Link>
            <Link to={'/post'}>{t("Страница записей")}</Link>
            <Settings className={classNames(cls.settings, {},[className])}/>
        </div>
    );
}