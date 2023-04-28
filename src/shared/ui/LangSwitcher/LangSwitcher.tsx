import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './LangSwitcher.module.scss';
import i18n from '@/shared/config/i18n/i18n';
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';
import { memo, useState } from 'react';

interface LangSwitcherProps {
    className?: string;
}

export const LangSwitcher: React.FC<LangSwitcherProps> = memo((props: LangSwitcherProps) => {
    const { className } = props;
    const [lang, setLang] = useState("Ru");

    const toggle = () => {
        i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
        setLang(i18n.language === 'ru' ? 'En' : 'Ru');
    };

    return (
        <Button theme={ButtonTheme.OUTLINE} onClick={toggle} className={classNames(cls.langSwitcher, {}, [className])}>
            {lang}
        </Button>
    );
});