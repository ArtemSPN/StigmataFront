import cls from './Image.module.scss';
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';
import { useState } from 'react';
import { Modal } from '@/shared/ui/Modal/Modal';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text, TextSize } from '@/shared/ui/Text/Text';

interface ImageProps {
    className?: string;
    src?: string;
    num?: number;
    blur?: boolean;
}

export const Image: React.FC<ImageProps> = (props: ImageProps) => {
    const { 
        className,
        src,
        blur,
        num,
    } = props;

    const [isOpen, setIsOpen] = useState(false);

    const onClose = () => {
        setIsOpen(false);
    }

    const onOpen = () => {
        setIsOpen(true);
    }


    return (
        <div>
            <Button 
                theme={ButtonTheme.CLEAR}
                onClick={blur?() => console.log('click'):onOpen}
                showClick={false}
            >    
                {!blur
                    ?<img className={classNames(cls.image,{},[className])} src={src}/> 
                    :
                    <div  className={classNames(cls.imageLastWrap,{},[className])}>
                        <Text title={`+${num}`} className={cls.text} size={TextSize.XL}/>
                        <img                
                            className={classNames(cls.imageLast,{},[className])}
                            src={src}
                        />
                    </div>
                } 
            </Button>
            {isOpen && 
            <Modal isOpen={isOpen} onClose={onClose} full={true}>
                <img src={src} className={cls.imageModal}/>
            </Modal>}
        </div>
    );
}