import { classNames } from '@/shared/lib/classNames/classNames';
import {ReactComponent as UserIcon} from '@/shared/assets/user_icon_251753.svg'
import cls from './ProfileSwitcher.module.scss';
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';
import { Avatar } from '@/shared/ui/Avatar/Avatar';
import { getProfileData } from '@/widgets/ProfileModal/model/selectors/getProfileData';
import { useSelector } from 'react-redux';
import { fetchPostById } from '@/pages/PostItemPage/model/services/fetchPostById';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useEffect } from 'react';


interface ProfileSwitcherProps {
    className?: string;
    onClick?: () => void;
}

export const ProfileSwitcher: React.FC<ProfileSwitcherProps> = (props: ProfileSwitcherProps) => {
    const { className, onClick } = props;

    return (
        <Button 
            className={classNames(cls.profileSwitcher, {}, [className])}
            theme={ButtonTheme.CLEAR}
            onClick={onClick}
        >
            {window.localStorage.getItem("user") == undefined
                ?<UserIcon/>
                :<Avatar src={window.localStorage.getItem("avatar") as string} size={50}/>}
        </Button>
    );
}