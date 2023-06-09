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
import { HeaderPage } from '@/widgets/HeaderPage';
import { REACT_APP_API_URL } from '@/shared/const/url';
import { redirect, useNavigate } from 'react-router-dom';

interface AddPostPageProps {
    className?: string;
}

const AddPostPage: React.FC<AddPostPageProps> = (props: AddPostPageProps) => {
    const { className } = props;
    let user = useSelector(getProfileData);


    if(window.localStorage.getItem("user")){
        user = jwt_decode(window.localStorage.getItem("user") || "")
    }

    const navigate = useNavigate();

    const [value, setValue] = useState("");
    const [title, setTitle] = useState("");
    const [section, setSection] = useState("");

    const [img, setImg] = useState<Blob[]>([]);
    const [file, setFile] = useState<Blob[]>([]);

    const [errorText, setErrorText] = useState(false);
    const [errorSelect, setErrorSelect] = useState(false);
    const [errorTitle, setErrorTitle] = useState(false);

    const {t} = useTranslation();

    const toggleAddBtn = async () => {
        if(value.length > 15 && title.length > 6){
            const fileArr:string[] = [];
            const imgArr:string[] = [];
            if(img){
                Array.from(img).forEach(async (fileItem) => {
                    const formData = new FormData();
                    // eslint-disable-next-line max-len
                    const nameFile = Date.now()+"$"+fileItem.name.split(".")[0].replace(' ', '_').slice(0,100)+ "." + fileItem.name.split('.')[1]
                    const new_file = new File([fileItem], "file$"+nameFile, {type: fileItem.type});
                    formData.append('file', new_file);
                    console.log(new_file.name);
                    imgArr.push(new_file.name);
                    await axios.post(`${REACT_APP_API_URL}/upload`, formData);
                })
            }
        
            if(file){
        
                Array.from(file).forEach(async (fileItem) => {
                    const formData = new FormData();
                    // eslint-disable-next-line max-len
                    const nameFile = Date.now()+"$"+fileItem.name.split(".")[0].replace(' ', '_').slice(0,100)+ "." + fileItem.name.split('.')[1]
                    const new_file = new File([fileItem], "file$"+nameFile, {type: fileItem.type});
                    formData.append('file', new_file);
                    console.log(new_file.name);
                    fileArr.push(new_file.name);
                    await axios.post(`${REACT_APP_API_URL}/upload`, formData);
                })
            }
            console.log({value,title, });
            await axios.post(`${REACT_APP_API_URL}/post`, {
                text: value,
                title,
                section, 
                author: user?.username,
                authorUrl: user?.link,
                imgArr,
                fileArr
            }).then(() => {
                setErrorText(false);
                setErrorTitle(false);
                setErrorSelect(false);
                clearAll();
                navigate('/');
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
                <HeaderPage tittlePage={[t("Добавление записи")]} className={cls.header}/>
                <Text title={t('Категория записи:') || " "}
                    size={TextSize.L} 
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
                <Text title={t('Cодержание записи:') || " "}
                    size={TextSize.L} 
                    className={classNames(cls.text)}
                />
                <textarea  
                    value={value} 
                    onChange={(e) => setValue(e.target.value)}
                    className={classNames(cls.textArea, modsText)}
                />
                <Text title={t('Заголовок записи:') || " "} size={TextSize.L} className={cls.text}/>
                <Input 
                    sizeInput={InputSize.L}
                    maxLength={100}
                    value={title}
                    placeholder={'заголовок записи... (не более 100 символов)'}    
                    className={classNames(cls.input, modsTitle)}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <div className={cls.inputArea}>
                    <div className={cls.imgInput}>
                        <Text title={t('Картинка')+':'} size={TextSize.L}/>
                        <Input 
                            type='file' 
                            className={cls.input}  
                            // @ts-ignore
                            multiple='multiple'
                            // @ts-ignore 
                            onChange={(e) => setImg(e.target.files)}/>
                    </div>
                    <div className={cls.fileInput}>
                        <Text title={t('Файлы')+':'} size={TextSize.L}/>
                        <Input
                            type='file' 
                            // @ts-ignore
                            multiple='multiple' 
                            className={cls.input}
                            // @ts-ignore
                            onChange={(e) => setFile(e.target.files)}    
                        />
                    </div>
                </div>
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

