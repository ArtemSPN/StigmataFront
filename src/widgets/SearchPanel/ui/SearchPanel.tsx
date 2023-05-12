import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './SearchPanel.module.scss';
import { Input } from '@/shared/ui/Input/Input';
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button/Button';
import {ReactComponent as Loop} from '@/shared/assets/loop-svgrepo-com.svg'
import { ChangeEvent, memo, useState } from 'react';
import { searchPost } from '@/widgets/SearchPanel/model/searchPost';
import { getPostSectionData } from '@/pages/PostPage/model/selectors/getPostSectionData';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { fetchPostData, getPostData, postActions } from '@/entities/Post';
import { postSectionActions } from '@/pages/PostPage/model/slice/postSectionData';
import { fetchPostSectionData } from '@/pages/PostPage/model/services/fetchPostSectionData';
import { useParams } from 'react-router-dom';
import { getPostSectionPage } from '@/pages/PostPage/model/selectors/getPostSectionPage';

interface SearchPanelProps {
    className?: string;
}

export const SearchPanel: React.FC<SearchPanelProps> = memo((props: SearchPanelProps) => {
    const { className } = props;
    const [text, setText] = useState("");
    const dispatch = useAppDispatch();
    const page = useSelector(getPostSectionPage) || 1;


    const link = window.location.href.split("/")[4];

    const search = () => {
        if(text.length != 0){
            link
                ?dispatch(postSectionActions.searchPost({text}))
                :dispatch(postActions.searchPost({text}));
        }
    }


    const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value)
        console.log(link);         
        if(e.target.value == "")
            link
                ?dispatch(fetchPostSectionData({sec: link, page:1}))
                :dispatch(fetchPostData());     
    }

    return (
        <div className={cls.searchField}>
            <Input
                maxLength={50}
                className={cls.inputSearch}
                value={text}
                onChange={onChangeSearch}
            />
            <Button 
                theme={ButtonTheme.OUTLINE} square 
                size={ButtonSize.XL} 
                className={cls.loopBtn}
                onClick={search}
            >
                <Loop className={cls.loop}/>
            </Button>
        </div>
    );
});