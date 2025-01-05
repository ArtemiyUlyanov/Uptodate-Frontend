import clsx from "clsx";
import { StaticImageData } from "next/image";
import { CustomButtonProps } from "./custom_button_props";

export type TransparentIconButtonProps = CustomButtonProps & {
    text?: string
    image: React.ReactNode
}

const TransparentIconButton: React.FC<TransparentIconButtonProps> = ({
    text,
    image,
    onClickButton,
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
            onClick={onClickButton}
        >
            {image}
            {text}
        </button>
    );
}

export default TransparentIconButton;