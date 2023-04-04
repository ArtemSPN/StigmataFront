import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ThemeSwitcher.module.scss';
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';
import { Theme, useTheme } from '@/app/providers/ThemeProvider';
import {ReactComponent as DarkIcon} from '@/shared/assets/moon_star_icon_251867.svg'
import {ReactComponent as LightIcon} from '@/shared/assets/sun_icon_251784.svg'

interface ThemeSwitcherProps {
    className?: string;
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = (props: ThemeSwitcherProps) => {
    const { className } = props;
    const { theme, toggleTheme } = useTheme();


    return (
        <Button 
            onClick={toggleTheme} 
            theme={ButtonTheme.CLEAR}
            className={classNames(cls.themeSwitcher, {}, [className])}
        >
            {theme === Theme.DARK? <LightIcon/>: <DarkIcon/>}
        </Button>
    );
}