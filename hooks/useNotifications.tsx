import clsx from "clsx"
import { useCallback, useMemo, useState } from "react"

export type NotificationProps = React.HTMLProps<HTMLDivElement> & {
    text: string
    index: number
    deleteNotification: (notificationIndex: number) => void
}

export const Notification: React.FC<NotificationProps> = ({
    text,
    index,
    deleteNotification
}) => {
    return (
        <div className={clsx(
            'flex flex-row items-center select-none gap-2',
            'p-2 rounded-md',
            'animate-in fade-in duration-500',
            'bg-emphasizingColor',
            'border border-borderColor'
        )}>
            <p className={clsx(
                'font-interTight font-medium text-sm text-primaryText'
            )}>{text}</p>
            <p
                className={clsx(
                    'font-interTight font-medium text-sm text-primaryText',
                    'transition-all duration-200',
                    'sm:hover:opacity-50',
                    'active:opacity-50 sm:active:opacity'
                )}
                onClick={() => deleteNotification(index)}
            >×</p>
        </div>
    );
}

export type UseNotificationsResponse = {
    notificationList: string[]

    addNotification: (text: string) => void
    deleteNotification: (notificationIndex: number) => void
    
    notifications: React.ReactNode[]
}

export const useNotifications = (): UseNotificationsResponse => {
    const [notificationList, setNotificationList] = useState<string[]>([]);
    
    const addNotification = useCallback((text: string) => {
        setNotificationList(prev => [...prev, text]);
    }, []);

    const deleteNotification = useCallback((notificationIndex: number) => {
        setNotificationList(prev => prev.filter((notification, index) => index !== notificationIndex));
    }, []);

    const notifications = useMemo(() =>
        notificationList.map((notification, index) => 
            <Notification 
                text={notification}
                index={index}
                deleteNotification={deleteNotification}
            />
        ) 
    , [notificationList]);

    return {notificationList: notificationList, addNotification: addNotification, deleteNotification: deleteNotification, notifications: notifications};
}