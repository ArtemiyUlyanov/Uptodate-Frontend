import clsx from "clsx";
import Link from "next/link";

export type DefaultButtonProps = React.HTMLProps<HTMLDivElement> & {
    text: string
    link: string
    className?: string
}

const DefaultButton: React.FC<DefaultButtonProps> = ({
    text,
    link,
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
            href={link}
        >
            {text}
        </Link>
    );
}

export default DefaultButton;