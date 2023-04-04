import {
    ButtonHTMLAttributes, CSSProperties, ReactNode, useMemo,
} from 'react';
import cls from './Button.module.scss';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';

export enum ButtonTheme {
    CLEAR = 'clear',
    CLEAR_INVERTED = 'clearInverted',
    OUTLINE = 'outline',
    OUTLINE_RED = 'outline_red',
    BACKGROUND = 'background',
    BACKGROUND_INVERTED = 'backgroundInverted',
}

export enum ButtonSize {
    M = 'size_m',
    L = 'size_l',
    XL = 'size_xl',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    className?: string;
    theme?: ButtonTheme;
    square?: boolean;
    size?: ButtonSize;
    disabled?: boolean;
    children?: ReactNode;
    showClick?: boolean;
}

export const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
    const {
        className,
        children,
        theme = ButtonTheme.OUTLINE,
        square,
        disabled,
        size = ButtonSize.M,
        showClick = true,
        ...otherProps
    } = props;

    

    const mods: Mods = {
        [cls[theme]]: true,
        [cls.square]: square,
        [cls[size]]: true,
        [cls.disabled]: disabled,
    };

    return (
        <button
            type="button"
            className={classNames(showClick === true?cls.ButtonActive:cls.ButtonStatic, mods, [className])}
            disabled={disabled}
            {...otherProps}
        >
            {children}
        </button>
    );
}









