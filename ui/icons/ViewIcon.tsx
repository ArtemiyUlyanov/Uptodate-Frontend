import clsx from "clsx"

export type ViewIconProps = React.SVGAttributes<SVGSVGElement>

export const ViewIcon: React.FC<ViewIconProps> = ({ 
    ...props 
}) => {
    return (
        <svg 
            width="22" 
            height="14" 
            viewBox="0 0 22 14" 
            xmlns="http://www.w3.org/2000/svg"
            className={clsx(
                'w-auto h-full'
            )}
            {...props}
        >
            <path fillRule="evenodd" clipRule="evenodd" d="M0 7C2.30798 3.05798 6.06396 0 11 0C15.9351 0 19.693 3.05798 22 7C19.693 10.942 15.936 14 11 14C6.06396 14 2.30798 10.942 0 7ZM2.37598 7C3.99097 9.28699 6.68994 12 11 12C15.311 12 18.01 9.28699 19.624 7C18.01 4.71301 15.311 2 11 2C6.68994 2 3.99097 4.71301 2.37598 7ZM14 7C14 8.65686 12.6569 10 11 10C9.34314 10 8 8.65686 8 7C8 5.34314 9.34314 4 11 4C12.6569 4 14 5.34314 14 7Z" />
        </svg>
    );
}