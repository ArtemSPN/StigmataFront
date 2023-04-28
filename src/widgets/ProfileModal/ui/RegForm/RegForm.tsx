import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './RegForm.module.scss';
import { useTranslation } from 'react-i18next';
import { Button } from '@/shared/ui/Button/Button';
import { Input } from '@/shared/ui/Input/Input';
import { Text, TextSize, TextTheme } from '@/shared/ui/Text/Text';
import { error } from 'console';
import { useState } from 'react';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getProfileError } from '@/widgets/ProfileModal/model/selectors/getProfileError';
import { getProfileIsLoading } from '@/widgets/ProfileModal/model/selectors/getProfileIsLoading';
import { useSelector } from 'react-redux';
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


    const reg = async () => {
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
        // const r = await register(username,password,link).then((res) => {
        //     console.log(res);
        // }).catch((e) => {
        //     console.log(e);
        // });
        // console.log(r)
        
        // .then((res) => {
        //     console.log(res);
        //     if(!res){
        //     }
        //     else{
        //         dispatch(fetchUserData([username,password])).then(() => {
        //             setPassword("");
        //             setUsername("");
        //             setError(false);
        //             onClose();
        //         });
        //     }
        // });
    }

    return (
        <div className={classNames(cls.profileModal, {}, [className])}>
            <Text title={t('Регистрация') || " "} size={TextSize.XL}/>
            <div className={cls.inputZone}>
                <Text title={t('Введите имя пользователя') || " "}/>
                <Input 
                    className={cls.input} 
                    placeholder='username' 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <Text title={t('Введите ссылку на аватарку') || " "}/>
                <Input 
                    className={cls.input} 
                    placeholder='avatar' 
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
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