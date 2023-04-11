import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ImageList.module.scss';
import { Image } from '@/shared/ui/Image/Image';

interface ImageListProps {
    className?: string;
    imgArr: string[];
}

export const ImageList: React.FC<ImageListProps> = (props: ImageListProps) => {
    const { className, imgArr } = props;

    const imgList = imgArr?.map((src, id) => {
        return <Image src={src} key={id}/>
    });

    return (
        <div className={classNames(cls.imageList, {}, [className])}>
            {
                (imgArr?.length > 4)
                    ?imgList?.slice(-3)
                    :imgList
            }
            {imgArr?.length > 4 
            &&
            <Image src={imgArr[0]} blur={true} num={imgArr.length - 4}/>
            }
        </div>
    );
}