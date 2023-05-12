import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Slider.module.scss';
import { useTranslation } from 'react-i18next';
import { Button } from '@/shared/ui/Button/Button';
import { useState } from 'react';

interface SliderProps {
    className?: string;
    imgArr: string[];
}

export const Slider: React.FC<SliderProps> = (props: SliderProps) => {
    const { className, imgArr } = props;
    const [img, setImg] = useState(0);
    const {t} = useTranslation();

    const navList = imgArr?.map((item, id) => {
        return (
            <Button 
                key={id} 
                className={classNames(cls.navItem, {[cls.active]:id == img})}
                onClick={() => setImg(id)}
            >
                {`${id+1}`}
            </Button>)
    });

    const nextImg = () => {
        if(img != imgArr?.length-1)
            setImg(img+1)
        else
            setImg(0)
    }

    const prevImg = () => {
        if(img != 0)
            setImg(img-1)
        else
            setImg(imgArr?.length-1)
    }

    return (
        <div className={classNames(cls.slider, {}, [className])}>
            <img 
                className={cls.sliderItem}
                // eslint-disable-next-line max-len
                src={imgArr?.[img]}
            />
            <div className={cls.navigate}>
                <Button onClick={prevImg}>{t("Назад")}</Button>
                <div className={cls.navList}>
                    {navList}
                </div>
                <Button onClick={nextImg}>{t("Вперед")}</Button>
            </div>
        </div>
    );
}