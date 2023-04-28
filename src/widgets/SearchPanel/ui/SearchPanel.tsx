import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './SearchPanel.module.scss';
import { Input } from '@/shared/ui/Input/Input';
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button/Button';
import {ReactComponent as Loop} from '@/shared/assets/loop-svgrepo-com.svg'
import { memo, useState } from 'react';
import { searchPost } from '@/widgets/SearchPanel/model/searchPost';
import { getPostSectionData } from '@/pages/PostPage/model/selectors/getPostSectionData';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { getPostData, postActions } from '@/entities/Post';
import { postSectionActions } from '@/pages/PostPage/model/slice/postSectionData';

interface SearchPanelProps {
    className?: string;
}

export const SearchPanel: React.FC<SearchPanelProps> = memo((props: SearchPanelProps) => {
    const { className } = props;
    const [text, setText] = useState("");
    const dispatch = useAppDispatch();
    const postsSection = useSelector(getPostSectionData);
    const postsMain = useSelector(getPostData);

    const link = window.location.href.split("/")[4];

    const search = () => {
        if(text.length != 0){
            link
                ?dispatch(postSectionActions.searchPost({text}))
                :dispatch(postActions.searchPost({text}));
        }
    }

    return (
        <div className={cls.searchField}>
            <Input
                maxLength={50}
                className={cls.inputSearch}
                value={text}
                onChange={(e) => {setText(e.target.value)}}
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