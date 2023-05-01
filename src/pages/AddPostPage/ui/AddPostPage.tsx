import { Mods, classNames } from '@/shared/lib/classNames/classNames';
import cls from './AddPostPage.module.scss';
import { useTranslation } from 'react-i18next';
import { PageTitle } from '@/shared/ui/PageTitle/PageTitle';
import { useState } from 'react';
import { Input, InputSize } from '@/shared/ui/Input/Input';
import { Text, TextSize, TextTheme } from '@/shared/ui/Text/Text';
import navItemList from '@/shared/const/section';
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { getProfileData } from '@/widgets/ProfileModal/model/selectors/getProfileData';
import { useSelector } from 'react-redux';
import { Page } from '@/shared/ui/Page/Page';

interface AddPostPageProps {
    className?: string;
}

const AddPostPage: React.FC<AddPostPageProps> = (props: AddPostPageProps) => {
    const { className } = props;
    let user = useSelector(getProfileData);


    if(window.localStorage.getItem("user")){
        user = jwt_decode(window.localStorage.getItem("user") || "")
    }


    const [value, setValue] = useState("");
    const [title, setTitle] = useState("");
    const [section, setSection] = useState("");

    const [errorText, setErrorText] = useState(false);
    const [errorSelect, setErrorSelect] = useState(false);
    const [errorTitle, setErrorTitle] = useState(false);

    const {t} = useTranslation();

    const toggleAddBtn = async () => {
        if(value.length > 15 && title.length > 6){
            console.log({value,title, });
            await axios.post("http://localhost:4444/post", {
                text: value,
                title,
                section, 
                author: user?.username,
                authorUrl: user?.link
            }).then(() => {
                setErrorText(false);
                setErrorTitle(false);
                setErrorSelect(false);
                clearAll();
            }).catch(e => {
                console.log(e);
            })
            
        }
        else{
            value.length < 15?setErrorText(true):setErrorText(false);
            title.length < 6?setErrorTitle(true):setErrorTitle(false);
            section.length == 0?setErrorSelect(true):setErrorSelect(false);
        }
    }

    const clearAll = () => {
        setTitle("");
        setValue("");
    }

    const modsText: Mods = {
        [cls.errorStyle]: errorText,
    };

    const modsTitle: Mods = {
        [cls.errorStyle]: errorTitle,
    };

    const modsSelect: Mods = {
        [cls.errorStyle]: errorSelect,
    };


    return (
        <Page>
            <div className={classNames(cls.addPostPage, {}, [className])}>
                <PageTitle titleArrays={[t('Добавление записи')]}/>
                <div className={cls.head}>
                    <Text title={t('Cодержание записи:') || " "}
                        size={TextSize.XL} 
                        className={classNames(cls.text)}
                    />
                    <select name="selectSection"
                        className={classNames(cls.select, modsSelect)}
                        onChange={(e) => setSection(e.target.value)}
                    >
                        {navItemList.map((item, id) => {
                            return <option 
                                value={item.link}
                                key={item.title}
                            >
                                {item.title}
                            </option>
                        })}
                        <option value={''} selected disabled></option>
                    </select>
                </div>

                <textarea  
                    value={value} 
                    onChange={(e) => setValue(e.target.value)}
                    className={classNames(cls.textArea, modsText)}
                />
                <Text title={t('Заголовок записи:') || " "} size={TextSize.XL} className={cls.text}/>
                <Input 
                    sizeInput={InputSize.L}
                    maxLength={100}
                    value={title}
                    placeholder={'заголовок записи... (не более 100 символов)'}    
                    className={classNames(cls.input, modsTitle)}
                    onChange={(e) => setTitle(e.target.value)}
                />
                {(errorText || errorTitle) && 
                <Text 
                    title={`${t('Заполните корректно поля ввода. ')}
                ${errorText?t("Содержание записи не меньше 15 символов"):t("Заголовок записи не меньше 6 символов")}`
                    } 
                    theme={TextTheme.ERROR}
                />}
                <div className={cls.btns}>
                    <Button
                        className={cls.btnItem} 
                        onClick={toggleAddBtn}
                    >
                        {t("Добавить")}
                    </Button>
                    <Button 
                        className={cls.btnItem}
                    >
                        {t("Загрузить")}
                    </Button>
                    <Button 
                        className={cls.btnItem} 
                        theme={ButtonTheme.OUTLINE_RED}
                        onClick={clearAll}
                    >
                        {t("Очистить")}
                    </Button>
                </div>
            </div>
        </Page>
    );
}

export default AddPostPage;

