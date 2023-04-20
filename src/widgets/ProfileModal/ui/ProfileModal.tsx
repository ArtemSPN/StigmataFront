import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ProfileModal.module.scss';
import { useTranslation } from 'react-i18next';
import { Text, TextSize, TextTheme } from '@/shared/ui/Text/Text';
import { Input } from '@/shared/ui/Input/Input';
import { Button } from '@/shared/ui/Button/Button';
import { useState } from 'react';
import { profileActions } from '@/widgets/ProfileModal/model/slice/profileSlice';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getProfileError } from '@/widgets/ProfileModal/model/selectors/getProfileError';
import { getProfileIsLoading } from '@/widgets/ProfileModal/model/selectors/getProfileIsLoading';
import { useSelector } from 'react-redux';
import { fetchUserData } from '@/widgets/ProfileModal/model/services/fetchUserData';

interface ProfileModalProps {
    className?: string;
    onClose: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = (props: ProfileModalProps) => {
    const { className, onClose } = props;
    const [username, setUsername] = useState("");
    const [link, setLink] = useState("");
    const [password, setPassword] = useState("");
    const [isAuth, setIsAuth] = useState(window.localStorage.getItem("user") != undefined);
    const dispatch = useAppDispatch();
    const isLoading = useSelector(getProfileIsLoading);
    const error = useSelector(getProfileError)

    const {t} = useTranslation();

    const auth = () => {
        dispatch(fetchUserData([username,password])).then((res) => {
            console.log();
            if(!isLoading && res.payload != "Неверный логин или пароль"){
                window.localStorage.setItem("user", "user");
                setPassword("");
                setUsername("");
                setIsAuth(!isAuth);
                onClose();
            }
        });
    }


    const exit = () => {
        window.localStorage.removeItem("user");
        setIsAuth(!isAuth);
        dispatch(profileActions.removeProfile())
    }

    const register = () => {
        window.localStorage.removeItem("user");
        setIsAuth(!isAuth);
        dispatch(profileActions.removeProfile())
    }

    return (
        <div>
            {!isAuth?
                <div className={classNames(cls.profileModal, {}, [className])}>
                    <Text title={t('Профиль') || " "} size={TextSize.XL}/>
                    <div className={cls.inputZone}>
                        <Text title='Имя пользователя:'/>
                        <Input 
                            className={cls.input} 
                            placeholder='username' 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <Text title='Пароль:'/>
                        <Input
                            className={cls.input}
                            placeholder='password'
                            value={password}
                            type='password'
                            onChange={(e) => setPassword(e.target.value)} 
                        />
                    </div>
                    {error && <Text title={error} theme={TextTheme.ERROR} className={cls.error}/>}
                    <div className={cls.btnZone}>
                        <Button>Регистрация</Button>
                        <Button onClick={auth}>Вход</Button>
                    </div>

                </div>
                :
                <div className={classNames(cls.profileModal, {}, [className])}>
                    <Text title={t('Профиль') || " "} size={TextSize.XL}/>
                    <div className={cls.inputZone}>
                        <Text title='Имя пользователя:'/>
                        <Input 
                            className={cls.input} 
                            placeholder='username' 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <Text title='Пароль:'/>
                        <Input
                            className={cls.input}
                            placeholder='password'
                            value={password}
                            type='password'
                            onChange={(e) => setPassword(e.target.value)} 
                        />
                    </div>
                    <div className={cls.btnZone}>
                        <Button onClick={exit}>Выход</Button>
                    </div>

                </div>
            }
        </div>
    );
}