import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Navbar.module.scss';
import { useTranslation } from 'react-i18next';
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button/Button';
import {ReactComponent as ArrowUp} from '@/shared/assets/arrow-up-337-svgrepo-com.svg';
import {ReactComponent as ArrowDown} from '@/shared/assets/arrow-down-338-svgrepo-com.svg'

import { Text, TextSize } from '@/shared/ui/Text/Text';
import { useState } from 'react';
import { NavList } from '../NavList/NavList';

interface NavbarProps {
    className?: string;
}

export const Navbar: React.FC<NavbarProps> = (props: NavbarProps) => {
    const { className } = props;
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => {
        console.log("asd")
        setIsOpen(!isOpen);
    }

    const {t} = useTranslation();

    return (
        <div className={classNames(cls.navbar, {}, [className])}>
            <div className={classNames(cls.navbarBtn, {}, [className])}>
                <Button 
                    theme={ButtonTheme.OUTLINE} 
                    size={ButtonSize.XL} 
                    className={cls.navBtn}
                    onClick={toggleOpen}
                    showClick={false}
                >
                    <>
                        <Text
                            size={TextSize.M}
                            className={cls.navBtnText}
                            title={t("панель навигации") as string}
                        />
                        {isOpen === true?
                            <ArrowUp className={cls.arrow}/>
                            :<ArrowDown className={cls.arrow}/>
                        }
                    </>
                </Button>
            </div>
            <NavList visible={isOpen}/>
        </div>
    );
}