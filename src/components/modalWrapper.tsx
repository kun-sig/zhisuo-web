import { Modal } from "antd";
import type { ReactNode } from "react";

interface ModalWrapperProps {
    open: boolean;
    onClose?: () => void;
    children: ReactNode;
}


export default function ModalWrapper({
    open,
    onClose,
    children,
}: ModalWrapperProps) {
    const onCancel = () => {
        if (onClose) {
            onClose();
        }
    }
    const onOk = () => {
        if (onClose) {
            onClose();
        }
    }
    return (
        <Modal title={null}
            open={open}
            footer={null}
            destroyOnHidden
            className="custom-modal"
            closable={false} onCancel={onCancel} onOk={onOk}>
            {children}
        </Modal>
    );
}