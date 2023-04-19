import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ProfileModal.module.scss';
import { useTranslation } from 'react-i18next';
import { Text, TextSize } from '@/shared/ui/Text/Text';
import { Input } from '@/shared/ui/Input/Input';
import { Button } from '@/shared/ui/Button/Button';
import { useEffect, useState } from 'react';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader';
import { profileReducer } from '@/widgets/ProfileModal/model/slice/profileSlice';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getProfileData } from '@/widgets/ProfileModal/model/selectors/getProfileData';
import { getProfileError } from '@/widgets/ProfileModal/model/selectors/getProfileError';
import { getProfileIsLoading } from '@/widgets/ProfileModal/model/selectors/getProfileIsLoading';
import { useSelector, useStore } from 'react-redux';
import { fetchUserData } from '@/widgets/ProfileModal/model/services/fetchUserData';
import { StoreProvider } from '@/app/providers/StoreProvider';
import { ReduxStoreWithManager, StateSchemaKey } from '@/app/providers/StoreProvider/config/StateSchema';

interface ProfileModalProps {
    className?: string;
}

export const ProfileModal: React.FC<ProfileModalProps> = (props: ProfileModalProps) => {
    const { className } = props;
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isAuth, setIsAuth] = useState(window.localStorage.getItem("user") != undefined);
    const dispatch = useAppDispatch();
    const user = useSelector(getProfileData);
    const isLoading = useSelector(getProfileIsLoading);
    const error = useSelector(getProfileError)

    const {t} = useTranslation();

    const auth = async () => {
        await dispatch(fetchUserData([username,password])).then(() => {
            if(!isLoading && user){
                console.log({user}.user);
                window.localStorage.setItem("user", user.username);
                window.localStorage.setItem("avatar", user.link);
                setPassword("");
                setUsername("");
                setIsAuth(!isAuth);
            }
        });
    }


    const exit = () => {
        window.localStorage.removeItem("user");
        window.localStorage.removeItem("avatar");
        setIsAuth(!isAuth);
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