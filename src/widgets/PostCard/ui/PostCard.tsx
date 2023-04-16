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
    full?: boolean;
}

export const PostCard: React.FC<PostCardProps> = memo((props: PostCardProps) => {
    const { 
        className,
        post,
        full = true,
    } = props;
    const {t} = useTranslation();


    return (
        <div className={classNames(cls.postCard, {}, [className])}>
            <div className={cls.headerPost}>
                <div className={cls.infoSection}>
                    <Avatar
                        className={cls.avatar}
                        // eslint-disable-next-line max-len
                        src={'https://telegra.ph/file/8a0ab7869a199470720f0.jpg'}
                        alt='user logo'
                        size={50}
                    />
                    <Text
                        theme={TextTheme.PRIMARY}
                        title={post?.title}
                        text={post?.author}
                    />
                </div>
                {!full &&
                <div className={cls.btnNF}>
                    <Button
                        theme={ButtonTheme.OUTLINE}
                    >
                        <Link to={`/post/${post?._id}`}>{t("читать обсуждение")}</Link>
                    </Button>
                </div>
                }
            </div>

            {full &&
            <div>
                <div className={cls.contentPost}>
                    <Text
                        theme={TextTheme.PRIMARY}
                        // eslint-disable-next-line max-len
                        text={post?.text}/>
                </div>
                {post?.imgArr && 
                <ImageList
                    className={cls.imgList}
                    imgArr={post?.imgArr}
                />}
                <div className={cls.btn}>
                    <Button
                        theme={ButtonTheme.OUTLINE}
                    >
                        <Link to={`/post/${post?._id}`}>{t("читать обсуждение")}</Link>
                    </Button>
                </div>
            </div>
            }

        </div>
    );
});