import clsx from "clsx";
import Link from "next/link";

export type WhiteLinkProps = React.HTMLProps<HTMLDivElement> & {
    text: string
    link: string
    className?: string
    // user?: Record<string, object>
}

const WhiteLink: React.FC<WhiteLinkProps> = ({
    text,
    link,
    className
}) => {
    return (
        <Link className={clsx(
            'relative font-interTight text-primaryText whitespace-nowrap w-auto flex flex-row gap-1 hover:gap-3',
            'transition-all duration-400',
            'sm:hover:opacity-[0.5]',
            'active:opacity-[0.5] sm:active:opacity',
            className
        )} href={link}>
            {text}
        </Link>
    );
}

export default WhiteLink;