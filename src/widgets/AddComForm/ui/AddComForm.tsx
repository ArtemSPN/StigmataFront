import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './AddComForm.module.scss';
import { useTranslation } from 'react-i18next';
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';
import { useState } from 'react';
import  addComment  from '../model/addComment';
import { useParams } from 'react-router-dom';

interface AddComFormProps {
    className?: string;
}

export const AddComForm: React.FC<AddComFormProps> = (props: AddComFormProps) => {
    const { className } = props;
    const [value, setValue] = useState("");
    const { id } = useParams<{ id: string }>();
    const {t} = useTranslation();

    const toggleAddBtn = () => {
        addComment("user", value, id || "");
        setValue("");
    }

    return (
        <div className={classNames(cls.addComForm, {}, [className])}>
            <textarea className={cls.textArea} value={value} onChange={(e) => setValue(e.target.value)}/>
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
                    onClick={() => setValue("")}
                >
                    {t("Очистить")} 
                </Button>
            </div>
        </div>
    );
}