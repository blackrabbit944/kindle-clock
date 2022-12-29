import { XMarkIcon } from '@heroicons/react/24/solid';
import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#__next');

export interface ModalProps {
    visible?: boolean;
    onClose?: () => void;
    children: React.ReactNode;
    closeIcon?: React.ReactNode;
    style?: React.CSSProperties;
    width?: string | number;
    title: string;
}

const ModalComponent: React.FC<ModalProps> = (props) => {
    const {
        visible = false,
        title = '',
        onClose,
        closeIcon = <XMarkIcon className="w-6 h-6" />,
        style,
        width
    } = props;

    const customStyles = {
        content: {
            top: '40px',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, 0%)',
            padding: undefined,
            border: undefined,
            borderRadius: undefined,
            backgroundColor: undefined,
            width: '400',
            ...style
        },
        overlay: {
            zIndex: 100,
            backgroundColor: 'rgba(0,0,0,0.5)'
        }
    };

    if (width) {
        customStyles.content.width = String(width);
    }

    return (
        <Modal
            isOpen={visible ? true : false}
            // onAfterOpen={afterOpenModal}
            onRequestClose={onClose}
            style={customStyles}
            closeTimeoutMS={200}
        >
            {title ? (
                <div className="font-bold text-xl pb-2 mb-2 border-b border-gray-600">{title}</div>
            ) : null}
            {props.children}

            <a onClick={onClose} className="modal-close-btn">
                {closeIcon}
            </a>
        </Modal>
    );
};
export default ModalComponent;
