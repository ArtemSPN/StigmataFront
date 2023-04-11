import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Settings.module.scss';
import { LangSwitcher } from '@/shared/ui/LangSwitcher/LangSwitcher';
import { ThemeSwitcher } from '@/shared/ui/ThemeSwitcher/ThemeSwitcher';
import { memo } from 'react';

interface SettingsProps {
    className?: string;
}

export const Settings: React.FC<SettingsProps> = memo((props: SettingsProps) => {
    const { className } = props;

    return (
        <div className={classNames(cls.settings, {}, [className])}>
            <LangSwitcher className={cls.lang}/>
            <ThemeSwitcher/>
        </div>
    );
});