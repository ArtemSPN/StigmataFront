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

interface SidebarProps {
    className?: string;
}

export const Sidebar: React.FC<SidebarProps> = memo((props: SidebarProps) => {
    const { className } = props;
    const [open, setOpen] = useState(false);
    const {t} = useTranslation();

    


    return (
        <div className={classNames(cls.sidebar, {}, [className])}>
            <Button theme={ButtonTheme.CLEAR} showClick={false}>
                <Link to={""}>
                    <Logo/>
                </Link>
            </Button>
            <SearchPanel/>
            <Navbar/>
            <Settings className={classNames(cls.settings, {},[className])}/>

        </div>
    );
});