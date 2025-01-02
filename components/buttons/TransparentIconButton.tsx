import clsx from "clsx";
import { StaticImageData } from "next/image";

export type TransparentIconButtonProps = React.HTMLProps<HTMLDivElement> & {
    text?: string
    image: React.ReactNode
    onClickEvent?: () => void
    className?: string
}

const TransparentIconButton: React.FC<TransparentIconButtonProps> = ({
    text,
    image,
    onClickEvent,
    className
}) => {
    return (
        <button
            className={clsx(
                'inline-flex gap-2 items-center justify-center',
                'font-interTight font-medium text-primaryText select-none',
                'transition-all duration-200',
                'sm:hover:bg-emphasizingColor',
                'active:bg-emphasizingColor sm:active:bg',
                className
            )}
            onClick={onClickEvent}
        >
            {image}
            {text}
        </button>
    );
}

export default TransparentIconButton;