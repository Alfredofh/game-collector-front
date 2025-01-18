import React, { createContext, useContext, useState, ReactNode } from 'react';
import styled from 'styled-components';

interface Notification {
    id: number;
    message: string;
    type: 'success' | 'error' | 'info';
}

interface NotificationContextProps {
    addNotification: (message: string, type: 'success' | 'error' | 'info') => void;
}

const NotificationContext = createContext<NotificationContextProps | undefined>(undefined);

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotification must be used within a NotificationProvider');
    }
    return context;
};

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    const addNotification = (message: string, type: 'success' | 'error' | 'info') => {
        const id = Date.now();
        setNotifications((prev) => [...prev, { id, message, type }]);
        setTimeout(() => {
            setNotifications((prev) => prev.filter((notif) => notif.id !== id));
        }, 3000);
    };

    return (
        <NotificationContext.Provider value={{ addNotification }}>
            {children}
            <NotificationContainer>
                {notifications.map((notif) => (
                    <Notification key={notif.id} type={notif.type}>
                        {notif.message}
                    </Notification>
                ))}
            </NotificationContainer>
        </NotificationContext.Provider>
    );
};

const NotificationContainer = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
`;

const Notification = styled.div<{ type: "success" | "error" | "info" }>`
    background-color: ${({ type }) =>
        type === "success" ? "#1b9aaa" : type === "error" ? "#e63946" : "#3c3c3c"};
    color: #ffffff;
    padding: 20px 30px;
    border: 3px solid #000000;
    box-shadow: 4px 4px #000000;
    font-family: "Roboto Mono", monospace;
    font-size: 16px;
    border-radius: 10px;
    text-align: center;
    animation: fade-in-out 0.3s ease;
    max-width: 80%;
    word-wrap: break-word;
    position: relative;

    &::before {
        content: ${({ type }) =>
        type === "success" ? '"✅ "' : type === "error" ? '"❌ "' : '"ℹ️ "'};
        font-size: 20px;
        margin-right: 8px;
    }

    @keyframes fade-in-out {
        0% {
            opacity: 0;
            transform: scale(0.9);
        }
        100% {
            opacity: 1;
            transform: scale(1);
        }
    }
`;
