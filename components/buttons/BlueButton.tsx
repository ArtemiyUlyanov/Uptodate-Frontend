import clsx from "clsx";
import Link from "next/link";
import { CustomButtonProps } from "./custom_button_props";

export type BlueButtonProps = CustomButtonProps

const BlueButton: React.FC<BlueButtonProps> = ({
    text,
    link,
    onClickButton,
    className,
    ...props
}) => {
    return (
        (link ?
            <Link
                className={clsx(
                    'font-interTight pt-2 pb-2 pl-3 pr-3 text-primaryText bg-blueColor select-none whitespace-nowrap',
                    'transition-all duration-200',
                    'sm:hover:opacity-[0.5]',
                    'active:opacity-[0.5] sm:active:opacity',
                    className
                )}
                href={link}
                legacyBehavior
            >
                <a {...props}>{text}</a>
            </Link>
        :
            <button
                className={clsx(
                    'font-interTight pt-2 pb-2 pl-3 pr-3 text-primaryText bg-blueColor text-center select-none whitespace-nowrap',
                    'transition-all duration-200',
                    'sm:hover:opacity-[0.5]',
                    'active:opacity-[0.5] sm:active:opacity',
                    'text text-align-center',
                    className
                )}
                onClick={onClickButton}
            >
                <a {...props}>{text}</a>
            </button>
        )
    );
}

export default BlueButton;