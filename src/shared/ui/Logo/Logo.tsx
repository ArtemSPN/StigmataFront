import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Logo.module.scss';

interface LogoProps {
    className?: string;
}

export const Logo: React.FC<LogoProps> = (props: LogoProps) => {
    const { className } = props;

    return (
        <div className={classNames(cls.logo, {}, [className])}>
            {"Stigmata"}
        </div>
    );
}