import { ReactNode } from "react";
import ReactDOM from "react-dom";

interface PortalProps {
    children: ReactNode;
    element?: HTMLElement;
}

export const Portal: React.FC<PortalProps> = (props: PortalProps) => {
    const {
        children,
        element = document.body,
    } = props;

    return (
        ReactDOM.createPortal(children,element)
    );
}