import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './SearchPanel.module.scss';
import { Input } from '@/shared/ui/Input/Input';
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button/Button';
import {ReactComponent as Loop} from '@/shared/assets/loop-svgrepo-com.svg'
import { memo } from 'react';

interface SearchPanelProps {
    className?: string;
}

export const SearchPanel: React.FC<SearchPanelProps> = memo((props: SearchPanelProps) => {
    const { className } = props;

    return (
        <div className={cls.searchField}>
            <Input
                maxLength={50}
                className={cls.inputSearch}
            />
            <Button 
                theme={ButtonTheme.OUTLINE} square 
                size={ButtonSize.XL} 
                className={cls.loopBtn}
            >
                <Loop className={cls.loop}/>
            </Button>
        </div>
    );
});