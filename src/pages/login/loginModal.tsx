import { Modal } from 'antd';
import LoginView from './loginView';

export default function LoginModal({ open = false, onOpenChange = () => { } }) {

    const handleOk = () => {
        onOpenChange()
    };

    const handleCancel = () => {
        onOpenChange()
    };

    return (
        <Modal
            title={null}
            open={open}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={null}
            className="custom-modal"
            closable={false}
        >
            <LoginView />
        </Modal>
    );
}