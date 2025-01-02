import clsx from "clsx";
import Link from "next/link";

export type WhiteUnderlinedLinkProps = React.HTMLProps<HTMLDivElement> & {
    text: string
    link: string
    actived: boolean
    arrowActived?: boolean
    className?: string
    // user?: Record<string, object>
}

const WhiteUnderlinedLink: React.FC<WhiteUnderlinedLinkProps> = ({
    text,
    link,
    actived,
    arrowActived,
    className
}) => {
    return (
        <Link className={clsx(
            'relative font-interTight text-primaryText whitespace-nowrap w-auto flex flex-row gap-1 hover:gap-3',
            'transition-all duration-400',
            "before:content-[''] before:absolute before:h-[1px] before:bg-[#ff0000] before:-bottom-1 before:bg-primaryColor",
            'before:transition-all before:duration-200',
            actived && 'hover:before:w-full before:w-0',
            
            className
        )} href={link}>
            {text}
            {arrowActived &&
                <p>→</p>
            }
        </Link>
    );
}

export default WhiteUnderlinedLink;