import clsx from "clsx";
import { StaticImageData } from "next/image";

export type TextButtonProps = React.HTMLProps<HTMLDivElement> & {
    text: string
    icon?: React.ReactNode
    toggleClickEvent?: () => void
    textClassName?: string
    iconClassName?: string
    customClassName?: string
}

const TextButton: React.FC<TextButtonProps> = ({
    text,
    icon,
    toggleClickEvent,
    textClassName,
    iconClassName,
    customClassName
}) => {
    return (
        <div 
            className={clsx(
                'flex flex-row items-center gap-2 rounded-md',
                'transition-all duration-200',
                'sm:hover:bg-emphasizingColor',
                'active:bg-emphasizingColor sm:active:bg',
                customClassName
            )}
            onClick={() => toggleClickEvent && toggleClickEvent()}
        >
            <span className={clsx(
                'font-interTight select-none leading-none',
                textClassName
            )}>{text}</span>
            {icon &&
                <div className={clsx(
                    'flex flex-row items-center justify-center',
                    iconClassName
                )}>
                    {icon}
                </div>
            }
        </div>
    );
}

export default TextButton;