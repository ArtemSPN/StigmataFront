import { Mods, classNames } from '@/shared/lib/classNames/classNames';
import cls from './RegForm.module.scss';
import { useTranslation } from 'react-i18next';
import { Button } from '@/shared/ui/Button/Button';
import { Input } from '@/shared/ui/Input/Input';
import { Text, TextSize, TextTheme } from '@/shared/ui/Text/Text';
import { useState } from 'react';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchUserData } from '@/widgets/ProfileModal/model/services/fetchUserData';
import axios from 'axios';

interface RegFormProps {
    className?: string;
    changeReg: () => void;
    onClose: () => void;
}

export const RegForm: React.FC<RegFormProps> = (props: RegFormProps) => {
    const { 
        className,
        changeReg,
        onClose
    } = props;
    const dispatch = useAppDispatch();
    const {t} = useTranslation();
    const [username, setUsername] = useState("");
    const [error, setError] = useState(false);
    const [link, setLink] = useState("");
    const [password, setPassword] = useState("");

    const [errUsm, setErrUsm] = useState(false);
    const [errLink, setErrLink] = useState(false);
    const [errPas, setErrPas] = useState(false);

    const usernameMods: Mods = {
        [cls.errorInput]: errUsm
    }

    const passwordMods: Mods = {
        [cls.errorInput]: errPas
    }

    const linkMods: Mods = {
        [cls.errorInput]: errLink
    }

    const reg = async () => {
        if(username.length == 0 || link.length == 0 || password.length == 0){
            setErrUsm(username.length == 0);
            setErrLink(link.length == 0);
            setErrPas(password.length == 0);
        }
        else{
            setErrUsm(false);
            setErrLink(false);
            setErrPas(false);
            await axios.post("http://localhost:4444/createUser", {
                username,
                password,
                link,
                role: "user"
            }).then((res) => {
                console.log(res.data);
                dispatch(fetchUserData([username,password])).then(() => {
                    setPassword("");
                    setUsername("");
                    setError(false);
                    onClose();
                });
            }).catch((e) => {
                console.log(e);
                setError(true);  
            });
        }
    }

    return (
        <div className={classNames(cls.profileModal, {}, [className])}>
            <Text title={t('Регистрация') || " "} size={TextSize.XL}/>
            <div className={cls.inputZone}>
                <Text title={t('Введите имя пользователя') || " "}/>
                <Input 
                    className={classNames(cls.input, usernameMods)} 
                    placeholder='username' 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <Text title={t('Введите ссылку на аватарку') || " "}/>
                <Input 
                    className={classNames(cls.input, linkMods)}  
                    placeholder='avatar' 
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                />
                <Text title={t('Введите пароль') || " "}/>
                <Input
                    className={classNames(cls.input, passwordMods)} 
                    placeholder='password'
                    value={password}
                    type='password'
                    onChange={(e) => setPassword(e.target.value)} 
                />
            </div>
            {error
            && 
            <Text title={"Пользователь с таким именем уже существует"} theme={TextTheme.ERROR} className={cls.error}/>}
            <div className={cls.btnZone}>
                <Button onClick={reg}>{t('Регистрация') || " "}</Button>
                <Button onClick={changeReg}>{t('Войти') || " "}</Button>
            </div>

        </div>
    );
}