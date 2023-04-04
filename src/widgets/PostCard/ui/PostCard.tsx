import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './PostCard.module.scss';
import { Avatar } from '@/shared/ui/Avatar/Avatar';
import { Text, TextTheme } from '@/shared/ui/Text/Text';
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';

interface PostCardProps {
    className?: string;
    src?: string;
    username: string;
    postTitle: string;
    postText: string; 
}

export const PostCard: React.FC<PostCardProps> = (props: PostCardProps) => {
    const { 
        className,
        src,
        username,
        postText,
        postTitle
    } = props;

    return (
        <div className={classNames(cls.postCard, {}, [className])}>
            <div className={cls.headerPost}>
                <Avatar
                    className={cls.avatar}
                    // eslint-disable-next-line max-len
                    src={src}
                    alt='user logo'
                    size={50}
                />
                <Text
                    theme={TextTheme.PRIMARY}
                    title={postTitle}
                    text={username}
                />
            </div>
            <div className={cls.contentPost}>
                <Text
                    theme={TextTheme.PRIMARY}
                    // eslint-disable-next-line max-len
                    text={postText}/>
            </div>
            <div className={cls.btn}>
                <Button
                    theme={ButtonTheme.OUTLINE}
                >
                    читать обсуждение
                </Button>
            </div>

        </div>
    );
}