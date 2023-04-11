import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './LangSwitcher.module.scss';
import i18n from '@/shared/config/i18n/i18n';
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';
import { memo } from 'react';

interface LangSwitcherProps {
    className?: string;
}

export const LangSwitcher: React.FC<LangSwitcherProps> = memo((props: LangSwitcherProps) => {
    const { className } = props;

    const toggle = () => {
        i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
    };

    return (
        <Button theme={ButtonTheme.OUTLINE} onClick={toggle} className={classNames(cls.langSwitcher, {}, [className])}>
            {i18n.language === 'ru' ? 'En' : 'Ru'}
        </Button>
    );
});