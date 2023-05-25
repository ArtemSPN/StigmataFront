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
    const [img, setImg] = useState<Blob>();
    const [username, setUsername] = useState("");
    const [error, setError] = useState(false);
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

        if(username.length == 0 ||  password.length == 0 || img == undefined){
            setErrUsm(username.length == 0);
            setErrPas(password.length == 0);
            setErrLink(img == undefined);
        }
        else{
            setErrUsm(false);
            setErrLink(false);
            setErrPas(false);
            const id = Date.now();
            const formData = new FormData();
            const nameFile = id+"$"+img.name.split(".")[0].replace(' ', '_').slice(0,100)+ "." + img.name.split('.')[1]
            // eslint-disable-next-line max-len
            const new_file = new File([img], "file$"+nameFile, {type: img.type});
            formData.append('file', new_file);
            await axios.post(`${process.env.REACT_APP_API_URL}/upload`, formData);
            await axios.post(`${process.env.REACT_APP_API_URL}/createUser`, {
                username,
                password,
                link: "file$"+nameFile,
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
                <Text title={t('Загрузите аватар') || " "}/>
                <Input 
                    type='file' 
                    className={classNames(cls.input, linkMods)}  
                    // @ts-ignore
                    onChange={(e) => setImg(e.target.files[0])}/>
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