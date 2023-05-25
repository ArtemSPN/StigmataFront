import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './FileList.module.scss';
import { useTranslation } from 'react-i18next';
import {ReactComponent as DocIcon} from '@/shared/assets/doc_icon.svg'
import {ReactComponent as JpegIcon} from '@/shared/assets/jpeg_icon.svg'
import {ReactComponent as JpgIcon} from '@/shared/assets/jpg_icon.svg'
import {ReactComponent as PdfIcon} from '@/shared/assets/pdf_icon.svg'
import {ReactComponent as PngIcon} from '@/shared/assets/png_icon.svg'
import {ReactComponent as PptIcon} from '@/shared/assets/ppt_icon.svg'
import {ReactComponent as TxtIcon} from '@/shared/assets/txt_icon.svg'
import {ReactComponent as UnFileIcon} from '@/shared/assets/unknownfile_icon.svg'
import {ReactComponent as ZipIcon} from '@/shared/assets/zip_icon.svg'
import { Text, TextSize } from '@/shared/ui/Text/Text';
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSidebarDesktop } from '@/widgets/Sidebar/model/selectors/sidebarSelectors';

interface FileListProps {
    className?: string;
    file: string;
}


export const FileList: React.FC<FileListProps> = (props: FileListProps) => {
    const { className, file } = props;
    const {t} = useTranslation();
    const isDesktop = useSelector(getSidebarDesktop);

    let icon = <UnFileIcon/>

    switch(file.split('.').pop()) { 
    case "docx":
    { 
        icon = <DocIcon className={cls.icon}/>; 
        break; 
    }  
    case "doc": { 
        icon = <DocIcon className={cls.icon}/>; 
        break; 
    }  
    case "jpeg": { 
        icon = <JpegIcon className={cls.icon}/>; 
        break; 
    } 
    case "jpg": { 
        icon = <JpgIcon className={cls.icon}/>; 
        break; 
    } 
    case "pdf": { 
        icon = <PdfIcon className={cls.icon}/>; 
        break; 
    } 
    case "png": { 
        icon = <PngIcon className={cls.icon}/>; 
        break; 
    } 
    case "ppt": { 
        icon = <PptIcon className={cls.icon}/>; 
        break; 
    }
    case "txt": { 
        icon = <TxtIcon className={cls.icon}/>; 
        break; 
    }
    case "rar":
    case "zip": { 
        icon = <ZipIcon className={cls.icon}/>; 
        break; 
    }
    }


    return (
        <div className={classNames(cls.fileList, {}, [className])}>
            {icon}
            <Link to={`${process.env.REACT_APP_API_URL}/download/${file}`}>
                <Text title={file.split('$')[2]} className={cls.filename} size={isDesktop?TextSize.L:TextSize.M}/>

            </Link>
        </div>
    );
}