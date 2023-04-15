import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './CommentCard.module.scss';
import { Avatar } from '@/shared/ui/Avatar/Avatar';
import { Text, TextSize, TextTheme } from '@/shared/ui/Text/Text';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { ImageList } from '@/widgets/ImageList';
import { Comment } from '@/entities/Comment';

interface CommentCardProps {
    className?: string;
    comment?: Comment;
    imgArr?: string[];
}

export const CommentCard: React.FC<CommentCardProps> = memo((props: CommentCardProps) => {
    const { 
        className,
        comment,
        imgArr
    } = props;
    const {t} = useTranslation();

    return (
        <div className={classNames(cls.postCard, {}, [className])}>
            <div className={cls.headerPost}>
                <Avatar
                    className={cls.avatar}
                    // eslint-disable-next-line max-len
                    src={"https://catherineasquithgallery.com/uploads/posts/2023-02/1676647959_catherineasquithgallery-com-p-emodzi-na-zelenom-fone-231.jpg"}
                    alt='user logo'
                    size={50}
                />
                <Text
                    theme={TextTheme.PRIMARY}
                    title={comment?.author}
                    size={TextSize.L}
                />
            </div>
            <div className={cls.contentPost}>
                <Text
                    theme={TextTheme.PRIMARY}
                    text={comment?.text}/>
            </div>
            {imgArr &&
            <ImageList
                className={cls.imgList}
                imgArr={imgArr}
            />}
        </div>
    );
});