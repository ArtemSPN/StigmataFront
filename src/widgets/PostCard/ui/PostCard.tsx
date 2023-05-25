import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './PostCard.module.scss';
import { Avatar } from '@/shared/ui/Avatar/Avatar';
import { Text, TextTheme } from '@/shared/ui/Text/Text';
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';
import { memo } from 'react';
import { Post } from '@/entities/Post';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ImageList } from '@/widgets/ImageList';
import { getProfileData } from '@/widgets/ProfileModal/model/selectors/getProfileData';
import { useSelector } from 'react-redux';
import jwt_decode from "jwt-decode";
import {ReactComponent as DeleteIcon} from '@/shared/assets/delete.svg'
import axios from 'axios';



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
    let user = useSelector(getProfileData);
    const {t} = useTranslation();


    const removePost = async () => {
        await axios.get(`${process.env.REACT_APP_API_URL}/postRemove/${post?._id}`)

    }


    if(window.localStorage.getItem("user")){
        user = jwt_decode(window.localStorage.getItem("user") || "");
    }


    return (
        <div className={classNames(cls.postCard, {}, [className])}>
            <div className={cls.headerPost}>
                <div className={cls.infoSection}>
                    <Avatar
                        className={cls.avatar}
                        // eslint-disable-next-line max-len
                        src={post?.authorUrl}
                        alt='user logo'
                        size={50}
                    />
                    <Text
                        theme={TextTheme.PRIMARY}
                        title={post?.title}
                        text={post?.author}
                    />
                </div>
                {user?.role == "admin" &&
                    <Button theme={ButtonTheme.CLEAR} className={cls.deleteBtn} onClick={removePost}>
                        <DeleteIcon/>
                    </Button>
                }
                {!full &&
                <div className={cls.btnNF}>
                    <Button
                        theme={ButtonTheme.OUTLINE}
                    >
                        <Link to={`/post/${post?._id}`}>{t("Читать обсуждение")}</Link>
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
                        <Link to={`/post/${post?._id}`}>{t("Читать обсуждение")}</Link>
                    </Button>
                </div>
            </div>
            }

        </div>
    );
});