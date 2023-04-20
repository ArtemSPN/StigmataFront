import { Mods, classNames } from '@/shared/lib/classNames/classNames';
import cls from './AddPostPage.module.scss';
import { useTranslation } from 'react-i18next';
import { PageTitle } from '@/shared/ui/PageTitle/PageTitle';
import { useState } from 'react';
import { Input, InputSize } from '@/shared/ui/Input/Input';
import { Text, TextSize, TextTheme } from '@/shared/ui/Text/Text';
import navItemList, { navItem } from '@/shared/const/section';
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';
import axios from 'axios';
import { getProfileData } from '@/widgets/ProfileModal/model/selectors/getProfileData';
import { useSelector } from 'react-redux';
import { User } from '@/entities/User/user';

interface AddPostPageProps {
    className?: string;
}

const AddPostPage: React.FC<AddPostPageProps> = (props: AddPostPageProps) => {
    const { className } = props;
    const user = useSelector(getProfileData)?.username;
    const [value, setValue] = useState("");
    const [title, setTitle] = useState("");
    const [section, setSection] = useState("");

    const [errorText, setErrorText] = useState(false);
    const [errorTitle, setErrorTitle] = useState(false);

    const {t} = useTranslation();

    const toggleAddBtn = async () => {
        if(value.length > 15 && title.length > 6){
            console.log({value,title, });
            await axios.post("http://localhost:4444/post", {
                text: value,
                title,
                section, 
                author: user
            }).then(() => {
                setErrorText(false);
                setErrorTitle(false);
                clearAll();
            }).catch(e => {
                console.log(e);
            })
            
        }
        else{
            if(value.length < 15)
                setErrorText(true);
            else
                setErrorText(false);
            if(title.length < 6)
                setErrorTitle(true);
            else
                setErrorTitle(false);
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


    return (
        <div className={classNames(cls.addPostPage, {}, [className])}>
            <PageTitle titleArrays={["Добавление записи"]}/>
            <div className={cls.head}>
                <Text title='Cодержание записи:'
                    size={TextSize.XL} 
                    className={classNames(cls.text)}
                />
                <select name="selectSection"
                    className={cls.select}
                    onChange={(e) => setSection(e.target.value)}
                >
                    {navItemList.map((item) => {
                        return <option 
                            value={item.link}
                            key={item.title}
                        >
                            {item.title}
                        </option>
                    })}
                </select>
            </div>

            <textarea  
                value={value} 
                onChange={(e) => setValue(e.target.value)}
                className={classNames(cls.textArea, modsText)}
            />
            <Text title='Заголовок записи:' size={TextSize.XL} className={cls.text}/>
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
                title={`Заполните корректно поля ввода. 
                ${errorText?"Содержание записи не меньше 15 символов":"Заголовок записи не меньше 6 символов"}`
                } 
                theme={TextTheme.ERROR}
            />}
            <div className={cls.btns}>
                <Button
                    className={cls.btnItem} 
                    onClick={toggleAddBtn}
                >
                    Добавить
                </Button>
                <Button 
                    className={cls.btnItem}
                >
                    Загрузить
                </Button>
                <Button 
                    className={cls.btnItem} 
                    theme={ButtonTheme.OUTLINE_RED}
                    onClick={clearAll}
                >
                    Очистить все
                </Button>
            </div>
        </div>
    );
}

export default AddPostPage;