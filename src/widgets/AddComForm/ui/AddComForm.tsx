import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './AddComForm.module.scss';
import { useTranslation } from 'react-i18next';
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';

interface AddComFormProps {
    className?: string;
}

export const AddComForm: React.FC<AddComFormProps> = (props: AddComFormProps) => {
    const { className } = props;
    const {t} = useTranslation();

    return (
        <div className={classNames(cls.addComForm, {}, [className])}>
            <textarea className={cls.textArea}/>
            <div className={cls.btns}>
                <Button className={cls.btnItem}>Добавить</Button>
                <Button className={cls.btnItem}>Загрузить</Button>
                <Button className={cls.btnItem} theme={ButtonTheme.OUTLINE_RED}>Очистить</Button>
            </div>
        </div>
    );
}