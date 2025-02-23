import clsx from "clsx"

export type DashboardIconProps = React.SVGAttributes<SVGSVGElement>

export const DashboardIcon: React.FC<DashboardIconProps> = ({ 
    ...props 
}) => {
    return (
        <svg 
            width="25" 
            height="25" 
            viewBox="0 0 25 25"
            xmlns="http://www.w3.org/2000/svg"
            className={clsx(
                'w-auto h-full rounded-md'
            )}
            {...props}
        >
            <path fill-rule="evenodd" clip-rule="evenodd" d="M25 0H0V25H25V0ZM15.7682 6.64018C16.1218 6.21591 16.0645 5.58534 15.6402 5.23178C15.2159 4.87821 14.5853 4.93554 14.2318 5.35982L9.23178 11.3598L7.86496 13H10H13.865L10.2318 17.3598C9.87821 17.7841 9.93554 18.4147 10.3598 18.7682C10.7841 19.1218 11.4147 19.0645 11.7682 18.6402L16.7682 12.6402L18.135 11H16H12.135L15.7682 6.64018Z" />
        </svg>
    );
}