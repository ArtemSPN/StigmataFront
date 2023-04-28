import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './AuthForm.module.scss';
import { useTranslation } from 'react-i18next';
import { Button } from '@/shared/ui/Button/Button';
import { Input } from '@/shared/ui/Input/Input';
import { Text, TextSize, TextTheme } from '@/shared/ui/Text/Text';
import { error } from 'console';
import { exit } from 'process';
import { useState } from 'react';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getProfileError } from '@/widgets/ProfileModal/model/selectors/getProfileError';
import { getProfileIsLoading } from '@/widgets/ProfileModal/model/selectors/getProfileIsLoading';
import { fetchUserData } from '@/widgets/ProfileModal/model/services/fetchUserData';
import { useSelector } from 'react-redux';
import { profileActions } from '@/widgets/ProfileModal/model/slice/profileSlice';

interface AuthFormProps {
    className?: string;
    onClose: () => void;
    changeReg: () => void;
}

export const AuthForm: React.FC<AuthFormProps> = (props: AuthFormProps) => {
    const { 
        className,
        changeReg,
        onClose
    } = props;
    const {t} = useTranslation();
    const [username, setUsername] = useState("");
    const dispatch = useAppDispatch();
    const isLoading = useSelector(getProfileIsLoading);
    const error = useSelector(getProfileError)
    const [password, setPassword] = useState("");
    const [isAuth, setIsAuth] = useState(window.localStorage.getItem("user") != undefined);

    const auth = () => {
        dispatch(fetchUserData([username,password])).then((res) => {
            console.log(res.payload);
            if(!isLoading && res.payload != "Неверный логин или пароль"){
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

    return (
        <div className={classNames(cls.authForm, {}, [className])}>
            <div>
                {!isAuth?
                    <div className={classNames(cls.profileModal, {}, [className])}>
                        <Text title={t('Вход в профиль') || " "} size={TextSize.XL}/>
                        <div className={cls.inputZone}>
                            <Text title={t('Введите имя пользователя') || " "}/>
                            <Input 
                                className={cls.input} 
                                placeholder='username' 
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <Text title={t('Введите пароль') || " "}/>
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
                            <Button onClick={changeReg}>{t('Регистрация') || " "}</Button>
                            <Button onClick={auth}>{t('Войти') || " "}</Button>
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
        </div>
    );
}