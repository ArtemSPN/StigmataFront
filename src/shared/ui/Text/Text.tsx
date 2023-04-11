import { Mods, classNames } from '@/shared/lib/classNames/classNames';
import cls from './Text.module.scss';
import { memo } from 'react';

export enum TextTheme{
    PRIMARY = 'primary',
    ERROR = 'error'
}

export enum TextSize{
    M = 'size_m',
    L = 'size_l',
    XL = 'size_xl'
}

export enum TextAlign{
    CENTER = "center",
    LEFT = 'left',
    RIGHT = "right",
}


interface TextProps {
    className?: string;
    title?: string;
    text?: string;
    theme?: TextTheme;
    align?: TextAlign
    size?: TextSize;
}

export const Text: React.FC<TextProps> = memo((props: TextProps) => {
    const { 
        className,
        text,
        title,
        theme = TextTheme.PRIMARY,
        align = TextAlign.LEFT,
        size = TextSize.M,
    } = props;

    const mods: Mods = {
        [cls[theme]]: true,
        [cls[align]]: true,
        [cls[size]]: true,
    }

    return (
        <div className={classNames(cls.text, mods, [className])}>
            {title && <p className={classNames(cls.title, {[cls[size]]:true}, [])}>{title}</p>}
            {text && <p className={classNames(cls.text, {[cls[size]]:true}, [])}>{text}</p>}
        </div>
    );
});