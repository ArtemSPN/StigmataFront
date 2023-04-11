/* eslint-disable max-len */
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './PostItemPage.module.scss';
import { PageTitle } from '@/shared/ui/PageTitle/PageTitle';
import { Post } from '@/entities/Post';
import { Text, TextTheme } from '@/shared/ui/Text/Text';
import { Avatar } from '@/shared/ui/Avatar/Avatar';
import { Slider } from '@/widgets/Slider';

interface PostItemPageProps {
    className?: string;
}

const PostItemPage: React.FC<PostItemPageProps> = (props: PostItemPageProps) => {
    const { className} = props;
    
    const post: Post = {
        id: '1',
        src:'https://sun9-77.userapi.com/impg/uO-JL03g14Mj6Ow1vLtkSWDRrVQWf_auvOLgwA/uwggVJGcbI8.jpg?size=960x960&quality=95&sign=006323f7997bea24e1589f581dd13c8d&c_uniq_tag=1TM33WcVSMFywT3_sBtT9OUQ1lZ5OW1StAHXnRdIcuo&type=album',
        postTitle:'Программирование 1 семестр',
        postText:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        username:'Иван Иванов'
    }

    const imgArr = [
        'https://animego.org/upload/anime/images/6432fa3ceadeb599444317.jpg',
        'https://vsegda-pomnim.com/uploads/posts/2022-04/1649121796_28-vsegda-pomnim-com-p-zhivopisnaya-priroda-foto-29.jpg',
        'https://sportishka.com/uploads/posts/2022-11/1667561336_85-sportishka-com-p-samarskie-dostoprimechatelnosti-pinterest-86.jpg',
        'https://klike.net/uploads/posts/2019-11/1574605225_22.jpg',
        'https://vsegda-pomnim.com/uploads/posts/2022-04/1649282154_4-vsegda-pomnim-com-p-plyazhi-brazilii-foto-4.jpg'
    ];

    return (
        <div className={classNames(cls.postItemPage, {}, [className])}>
            <PageTitle titleArrays={["Обсуждение", post.postTitle]}/>
            <div className={cls.contentWrap}>
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
                <Text
                    text={post.postText}
                />
                <Slider className={cls.slider} imgArr={imgArr}/>
            </div>

        </div>
    );
}

export default PostItemPage;