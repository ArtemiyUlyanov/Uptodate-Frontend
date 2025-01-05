import clsx from "clsx";
import Link from "next/link";
import { CustomButtonProps } from "./custom_button_props";

export type DefaultButtonProps = CustomButtonProps

const DefaultButton: React.FC<DefaultButtonProps> = ({
    text,
    link,
    onClickButton,
    className
}) => {
    return (
        <Link
            className={clsx(
                'font-interTight pt-2 pb-2 pl-3 pr-3 rounded-full text-darkText bg-primaryColor select-none whitespace-nowrap',
                'transition-all duration-200',
                'sm:hover:opacity-[0.5]',
                'active:opacity-[0.5] sm:active:opacity',
                className
            )}
            onClick={onClickButton}
            href={link || ''}
        >
            {text}
        </Link>
    );
}

export default DefaultButton;