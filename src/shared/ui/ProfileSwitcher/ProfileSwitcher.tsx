import { classNames } from '@/shared/lib/classNames/classNames';
import {ReactComponent as UserIcon} from '@/shared/assets/user_icon_251753.svg'
import cls from './ProfileSwitcher.module.scss';
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';
import { Avatar } from '@/shared/ui/Avatar/Avatar';
import { getProfileData } from '@/widgets/ProfileModal/model/selectors/getProfileData';
import { useSelector } from 'react-redux';
import jwt_decode from "jwt-decode";
import { User } from '@/entities/User/user';
import { useState } from 'react';

interface ProfileSwitcherProps {
    className?: string;
    onClick?: () => void;
}

export const ProfileSwitcher: React.FC<ProfileSwitcherProps> = (props: ProfileSwitcherProps) => {
    const { className, onClick } = props;
    let user = useSelector(getProfileData);

    if(window.localStorage.getItem("user")){
        user = jwt_decode(window.localStorage.getItem("user") || "");
        console.log(user);
    }

    return (
        <Button 
            className={classNames(cls.profileSwitcher, {}, [className])}
            theme={ButtonTheme.CLEAR}
            onClick={onClick}
        >
            {window.localStorage.getItem("user") == undefined
                ?<UserIcon/>
                :<Avatar src={user?.link} size={50}/>}
        </Button>
    );
}