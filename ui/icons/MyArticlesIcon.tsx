import clsx from "clsx"

export type ArticlesIconProps = React.SVGAttributes<SVGSVGElement>

export const ArticlesIcon: React.FC<ArticlesIconProps> = ({ ...props }) => {
    return (
        <svg 
            width="20" 
            height="15" 
            viewBox="0 0 20 15"
            xmlns="http://www.w3.org/2000/svg"
            className={clsx(
                'w-auto aspect-square h-full'
            )}
            {...props}
        >
            <path fillRule="evenodd" clipRule="evenodd" d="M0.75 2C0.75 1.30964 1.30964 0.75 2 0.75H18C18.6904 0.75 19.25 1.30964 19.25 2C19.25 2.69036 18.6904 3.25 18 3.25H2C1.30964 3.25 0.75 2.69036 0.75 2ZM0.75 13.5C0.75 12.8096 1.30964 12.25 2 12.25H14C14.6904 12.25 15.25 12.8096 15.25 13.5C15.25 14.1904 14.6904 14.75 14 14.75H2C1.30964 14.75 0.75 14.1904 0.75 13.5ZM2 6.5C1.30964 6.5 0.75 7.05964 0.75 7.75C0.75 8.44036 1.30964 9 2 9H18C18.6904 9 19.25 8.44036 19.25 7.75C19.25 7.05964 18.6904 6.5 18 6.5H2Z" />
        </svg>
    )
}