import clsx from "clsx";
import Link from "next/link";

export type BlueButtonProps = React.HTMLProps<HTMLDivElement> & {
    text: string
    link?: string
    onClickButton?: () => void
    className?: string
}

const BlueButton: React.FC<BlueButtonProps> = ({
    text,
    link,
    onClickButton,
    className
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
                onClick={onClickButton}
            >
                {text}
            </Link>
        :
            <button
                className={clsx(
                    'font-interTight pt-2 pb-2 pl-3 pr-3 text-primaryText bg-blueColor select-none whitespace-nowrap',
                    'transition-all duration-200',
                    'sm:hover:opacity-[0.5]',
                    'active:opacity-[0.5] sm:active:opacity',
                    className
                )}
                onClick={onClickButton}
            >
                {text}
            </button>
        )
    );
}

export default BlueButton;