import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './CommentCard.module.scss';
import { Avatar } from '@/shared/ui/Avatar/Avatar';
import { Text, TextSize, TextTheme } from '@/shared/ui/Text/Text';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Comment } from '@/entities/Comment';
import jwt_decode from "jwt-decode";
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';
import { getProfileData } from '@/widgets/ProfileModal/model/selectors/getProfileData';
import { useSelector } from 'react-redux';
import {ReactComponent as DeleteIcon} from '@/shared/assets/delete.svg'
import axios from 'axios';
import { Image } from '@/shared/ui/Image/Image';
import { FileList } from '@/widgets/FileList/ui/FileList';



interface CommentCardProps {
    className?: string;
    comment?: Comment;
}

export const CommentCard: React.FC<CommentCardProps> = memo((props: CommentCardProps) => {
    const { 
        className,
        comment,
    } = props;
    let user = useSelector(getProfileData);
    const {t} = useTranslation();

    if(window.localStorage.getItem("user")){
        user = jwt_decode(window.localStorage.getItem("user") || "");
    }


    const removeCom = async () => {
        await axios.get(`http://localhost:4444/commentRemove/${comment?._id}`)
    }


    console.log(comment)

    return (
        <div className={classNames(cls.postCard, {}, [className])}>
            <div className={cls.headerPostWrap}>
                <div className={cls.headerPost}>
                    <Avatar
                        className={cls.avatar}
                        // eslint-disable-next-line max-len
                        src={comment?.authorUrl}
                        alt='user logo'
                        size={50}
                    />
                    <Text
                        theme={TextTheme.PRIMARY}
                        title={comment?.author}
                        size={TextSize.L}
                    />
                </div>
                {user?.role == "admin" &&
                <Button theme={ButtonTheme.CLEAR} className={cls.deleteBtn} onClick={removeCom}>
                    <DeleteIcon/>
                </Button>
                }
            </div>
            <div className={cls.contentPost}>
                <Text
                    theme={TextTheme.PRIMARY}
                    text={comment?.text}/>
                {comment?.img &&
                <img src={comment?.img} className={cls.img}/>
                }
                {
                    comment?.fileArr &&
                comment?.fileArr.map((item) =>  <FileList key={item} file={item}/>)
                }
            </div>

        </div>
    );
});