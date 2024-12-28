import React, { useState, useEffect, createContext, useContext, ReactNode } from "react";
import styled from "styled-components";

interface Notification {
    id: number;
    type: "success" | "error" | "warning" | "info";
    message: string;
}

interface NotificationContextProps {
    addNotification: (type: Notification["type"], message: string) => void;
}

const NotificationContext = createContext<NotificationContextProps | null>(null);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    const addNotification = (type: Notification["type"], message: string) => {
        const id = Date.now(); // Usar timestamp como ID único
        setNotifications((prev) => [...prev, { id, type, message }]);

        // Eliminar la notificación automáticamente después de 3 segundos
        setTimeout(() => {
            setNotifications((prev) => prev.filter((notification) => notification.id !== id));
        }, 3000);
    };

    return (
        <NotificationContext.Provider value={{ addNotification }}>
            {children}
            <NotificationContainer>
                {notifications.map((notification) => (
                    <NotificationItem key={notification.id} type={notification.type}>
                        {notification.message}
                    </NotificationItem>
                ))}
            </NotificationContainer>
        </NotificationContext.Provider>
    );
};

export const useNotifications = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error("useNotifications must be used within a NotificationProvider");
    }
    return context;
};

// Styled Components
const NotificationContainer = styled.div`
    position: fixed;
    top: 20px;
    right: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    z-index: 1000;
`;

const NotificationItem = styled.div<{ type: Notification["type"] }>`
    background-color: ${({ type }) =>
        type === "success"
            ? "#4caf50"
            : type === "error"
                ? "#f44336"
                : type === "warning"
                    ? "#ff9800"
                    : "#2196f3"};
    color: #fff;
    padding: 10px 15px;
    border-radius: 5px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
    font-size: 14px;
    font-weight: bold;
    display: flex;
    align-items: center;
    gap: 10px;
    animation: fadeIn 0.3s, fadeOut 0.5s 2.5s;

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(-10px);
        }
    }
`;
