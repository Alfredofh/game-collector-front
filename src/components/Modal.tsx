import React, { useEffect, useState } from "react";
import styled from "styled-components";

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    const [isVisible, setIsVisible] = useState(isOpen);

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
        } else {
            const timer = setTimeout(() => setIsVisible(false), 300);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!isVisible) return null;

    return (
        <Overlay className={isOpen ? "fade-in" : "fade-out"} onClick={onClose}>
            <ModalContainer onClick={(e) => e.stopPropagation()}>
                {children}
                <CloseButton onClick={onClose}>×</CloseButton>
            </ModalContainer>
        </Overlay>
    );
};

export default Modal;

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;

    &.fade-in {
        opacity: 1;
    }

    &.fade-out {
        opacity: 0;
    }
`;

const ModalContainer = styled.div`
    background: #2c2c2c;
    padding: 20px;
    border-radius: 8px;
    max-width: 500px;
    width: 100%;
    position: relative;
`;

const CloseButton = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    background: transparent;
    border: none;
    font-size: 18px;
    cursor: pointer;
`;
