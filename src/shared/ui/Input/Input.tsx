import { Mods, classNames } from '@/shared/lib/classNames/classNames';
import cls from './Input.module.scss';

export enum InputSize {
    M = 'size_m',
    L = 'size_l',
    XL = 'size_xl',
}

interface InputProps extends  React.InputHTMLAttributes<InputProps> {
    className?: string;
    placeholder?: string;
    maxLength?: number;
    sizeInput?: InputSize; 
}

export const Input: React.FC<InputProps> = (props: InputProps) => {
    const { 
        className,
        maxLength,
        sizeInput = InputSize.M,
    } = props;
    
    const mods: Mods = {
        [cls[sizeInput]]: true,
    };

    return (
        <input 
            maxLength={maxLength} 
            className={classNames(cls.input, mods, [className])}
        />
    );
}