import { useState } from 'react';
import { RegForm } from '@/widgets/ProfileModal/ui/RegForm/RegForm';
import { AuthForm } from '@/widgets/ProfileModal/ui/AuthForm/AuthForm';

interface ProfileModalProps {
    className?: string;
    onClose: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = (props: ProfileModalProps) => {
    const { onClose } = props;
    const [isReg, setIsReg] = useState(false);  
    
    const changeReg = () => {
        setIsReg(!isReg);
    }


    return (
        <div>
            {isReg
                ?<RegForm changeReg={changeReg} onClose={onClose}/>
                :<AuthForm onClose={onClose} changeReg={changeReg}/>
            }
        </div>
    );
}