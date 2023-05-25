import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ImageList.module.scss';
import { Image } from '@/shared/ui/Image/Image';
import { useEffect, useState } from 'react';

interface ImageListProps {
    className?: string;
    imgArr: string[];
}

export const ImageList: React.FC<ImageListProps> = (props: ImageListProps) => {
    const { className, imgArr } = props;

    const [imgCount, setImgCount] = useState(4);

    const imgList = imgArr?.map((src, id) => {
        return <Image src={src} key={id}/>
    });

    console.log(window.screen.width);

    useEffect(() => {
        if(window.screen.width < 850)
            setImgCount(3);
        if(window.screen.width < 400)
            setImgCount(2);
    }, []);
    


    return (
        <div className={classNames(cls.imageList, {}, [className])}>
            {
                (imgArr?.length > imgCount)
                    ?imgList?.slice((imgCount - 1)*-1)
                    :imgList
            }
            {imgArr?.length > 4 && imgCount != 2
            &&
            <Image src={imgArr[0]} blur={true} num={imgArr.length - imgCount}/>
            }
        </div>
    );
}