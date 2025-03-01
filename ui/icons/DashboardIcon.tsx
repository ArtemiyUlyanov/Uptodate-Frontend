import clsx from "clsx"

export type DashboardIconProps = React.SVGAttributes<SVGSVGElement> & {
    wrapped: boolean
}

export const DashboardIcon: React.FC<DashboardIconProps> = ({ 
    wrapped,
    ...props 
}) => {
    const defaultIcon =
        <svg 
            width="12" 
            height="14" 
            viewBox="0 0 12 14"
            xmlns="http://www.w3.org/2000/svg"
            className={clsx(
                'w-auto h-full'
            )}
            {...props}
        >
            <path fillRule="evenodd" clipRule="evenodd" d="M8.64022 0.231804C9.06449 0.585368 9.12182 1.21593 8.76825 1.64021L5.13507 6.00003H11.1351L4.76825 13.6402C4.41469 14.0645 3.78412 14.1218 3.35985 13.7682C2.93557 13.4147 2.87825 12.7841 3.23181 12.3598L6.86499 8.00002H0.86499L7.23181 0.359841C7.58537 -0.0644363 8.21594 -0.12176 8.64022 0.231804Z" />
        </svg>

    const wrappedIcon =
        // <svg 
        //     width="25" 
        //     height="25" 
        //     viewBox="0 0 25 25"
        //     xmlns="http://www.w3.org/2000/svg"
        //     className={clsx(
        //         'w-auto h-full rounded-md'
        //     )}
        //     {...props}
        // >
        //     <path fillRule="evenodd" clipRule="evenodd" d="M25 0H0V25H25V0ZM15.7682 6.64018C16.1218 6.21591 16.0645 5.58534 15.6402 5.23178C15.2159 4.87821 14.5853 4.93554 14.2318 5.35982L9.23178 11.3598L7.86496 13H10H13.865L10.2318 17.3598C9.87821 17.7841 9.93554 18.4147 10.3598 18.7682C10.7841 19.1218 11.4147 19.0645 11.7682 18.6402L16.7682 12.6402L18.135 11H16H12.135L15.7682 6.64018Z" />
        // </svg>
        <svg 
            width="25" 
            height="25" 
            viewBox="0 0 25 25"
            xmlns="http://www.w3.org/2000/svg"
            className={clsx(
                'w-auto h-full'
            )}
            {...props}
        >
            <path fill-rule="evenodd" clip-rule="evenodd" d="M6 0C2.68629 0 0 2.68629 0 6V19C0 22.3137 2.68629 25 6 25H19C22.3137 25 25 22.3137 25 19V6C25 2.68629 22.3137 0 19 0H6ZM19 5C19.5523 5 20 5.44772 20 6V19C20 19.5523 19.5523 20 19 20H17C16.4477 20 16 19.5523 16 19V6C16 5.44772 16.4477 5 17 5H19ZM11.5 10C10.9477 10 10.5 10.4477 10.5 11V19C10.5 19.5523 10.9477 20 11.5 20H13.5C14.0523 20 14.5 19.5523 14.5 19V11C14.5 10.4477 14.0523 10 13.5 10H11.5ZM6 15C5.44772 15 5 15.4477 5 16V19C5 19.5523 5.44772 20 6 20H8C8.55228 20 9 19.5523 9 19V16C9 15.4477 8.55228 15 8 15H6Z" />
        </svg>


    return (
        wrapped ? wrappedIcon : defaultIcon
    );
}