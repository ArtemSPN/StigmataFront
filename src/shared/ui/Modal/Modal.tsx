import { Mods, classNames } from '@/shared/lib/classNames/classNames';
import cls from './Modal.module.scss';
import { useTranslation } from 'react-i18next';
import { ReactNode, lazy } from 'react';
import { useModal } from '@/shared/lib/hooks/UseModal/useModal';
import { Portal } from '@/shared/ui/Portal/Portal';
import { Overlay } from '@/shared/ui/Overlay/Overlay';

interface ModalProps {
    className?: string;
    children?: ReactNode;
    isOpen?: boolean;
    full?: boolean;
    onClose?: () => void;
    lazy?: boolean;
}

const ANIMATION_DELAY = 300;

export const Modal: React.FC<ModalProps> = (props: ModalProps) => {
    const { 
        className,
        children,
        isOpen,
        onClose,
        full = false,
        lazy
    } = props;

    const { close, isClosing, isMounted } = useModal({
        animationDelay: ANIMATION_DELAY,
        onClose,
        isOpen,
    });


    const mods: Mods = {
        [cls.opened]: isOpen,
        [cls.isClosing]: isClosing,
    };

    const modsModal: Mods = {
        [cls.contentPadding]: !full
    };


    return (
        <Portal>
            <div
                className={classNames(cls.modal, mods, [
                    className,
                    'app_modal',
                ])}
            >
                <Overlay onClick={close} />
                <div className={classNames(cls.content, modsModal)}>{children}</div>
            </div>
        </Portal>
    );
}