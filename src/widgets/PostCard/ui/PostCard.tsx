import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './PostCard.module.scss';
import { Avatar } from '@/shared/ui/Avatar/Avatar';
import { Text, TextTheme } from '@/shared/ui/Text/Text';
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';
import { memo } from 'react';
import { Post } from '@/entities/Post';
import { Link } from 'react-router-dom';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';
import { ImageList } from '@/widgets/ImageList';

interface PostCardProps {
    className?: string;
    post?: Post;
    imgArr?: string[];
}

export const PostCard: React.FC<PostCardProps> = memo((props: PostCardProps) => {
    const { 
        className,
        post,
        imgArr
    } = props;
    const {t} = useTranslation();

    return (
        <div className={classNames(cls.postCard, {}, [className])}>
            <div className={cls.headerPost}>
                <Avatar
                    className={cls.avatar}
                    // eslint-disable-next-line max-len
                    src={post?.src}
                    alt='user logo'
                    size={50}
                />
                <Text
                    theme={TextTheme.PRIMARY}
                    title={post?.postTitle}
                    text={post?.username}
                />
            </div>
            <div className={cls.contentPost}>
                <Text
                    theme={TextTheme.PRIMARY}
                    // eslint-disable-next-line max-len
                    text={post?.postText}/>
            </div>
            {imgArr &&
            <ImageList
                className={cls.imgList}
                imgArr={imgArr}
            />}
            <div className={cls.btn}>
                <Button
                    theme={ButtonTheme.OUTLINE}
                >
                    <Link to={'/post'}>{t("читать обсуждение")}</Link>
                </Button>
            </div>

        </div>
    );
});