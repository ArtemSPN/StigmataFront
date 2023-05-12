import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './AddComForm.module.scss';
import { useTranslation } from 'react-i18next';
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';
import { useState } from 'react';
import jwt_decode from "jwt-decode";
import  addComment  from '../model/addComment';
import { useParams } from 'react-router-dom';
import { getProfileData } from '@/widgets/ProfileModal/model/selectors/getProfileData';
import { useSelector } from 'react-redux';
import { Input } from '@/shared/ui/Input/Input';
import { Text, TextSize } from '@/shared/ui/Text/Text';

interface AddComFormProps {
    className?: string;
}

export const AddComForm: React.FC<AddComFormProps> = (props: AddComFormProps) => {
    const { className } = props;
    const [value, setValue] = useState("");

    const [img, setImg] = useState<Blob>();
    const [file, setFile] = useState<FileList[]>([]);


    const { id } = useParams<{ id: string }>();
    const {t} = useTranslation();

    let user = useSelector(getProfileData);


    if(window.localStorage.getItem("user")){
        user = jwt_decode(window.localStorage.getItem("user") || "")
    }


    const toggleAddBtn = () => {
        addComment(user?.username || "",user?.link || "", value, id || "", img, file);
        setValue("");
    }

    return (
        <div className={classNames(cls.addComForm, {}, [className])}>
            <div className={cls.inputArea}>
                <textarea className={cls.textArea} value={value} onChange={(e) => setValue(e.target.value)}/>
                <div className={cls.imgInput}>
                    <Text title={t('Картинка')+':'} size={TextSize.L}/>
                    <Input type='file' className={cls.input}  onChange={(e) => setImg(e.target.files[0])}/>
                </div>
                <div className={cls.fileInput}>
                    <Text title={t('Файлы')+':'} size={TextSize.L}/>
                    <Input
                        type='file' 
                        multiple='multiple' 
                        className={cls.input}
                        onChange={(e) => setFile(e.target.files)}    
                    />
                </div>
            </div>
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
                    onClick={() => setValue("")}
                >
                    {t("Очистить")} 
                </Button>
            </div>
        </div>
    );
}