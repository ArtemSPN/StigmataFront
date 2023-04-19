import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Settings.module.scss';
import { LangSwitcher } from '@/shared/ui/LangSwitcher/LangSwitcher';
import { ThemeSwitcher } from '@/shared/ui/ThemeSwitcher/ThemeSwitcher';
import { memo, useState } from 'react';
import { ProfileSwitcher } from '@/shared/ui/ProfileSwitcher/ProfileSwitcher';
import { Modal } from '@/shared/ui/Modal/Modal';
import { ProfileModal } from '@/widgets/ProfileModal';

interface SettingsProps {
    className?: string;
}

export const Settings: React.FC<SettingsProps> = memo((props: SettingsProps) => {
    const { className } = props;
    const [open, setOpen] = useState(false);


    return (
        <div className={classNames(cls.settings, {}, [className])}>
            <ProfileSwitcher onClick={() => setOpen(true)}/>
            <LangSwitcher className={cls.lang}/>
            <ThemeSwitcher/>
            {open && 
            <Modal isOpen={open} onClose={() => setOpen(false)}>
                <ProfileModal/>
            </Modal>}
        </div>
    );
});