import clsx from "clsx";
import { CustomLinkProps } from "./custom_link_props";
import Link from "next/link";

export type BlueLinkProps = CustomLinkProps

const BlueLink: React.FC<BlueLinkProps> = ({
    text,
    link,
    actived,
    arrowActived,
    underliningActived,
    customClassName,
    ...props
}) => {
    return (
        <Link
            className={clsx(
                'relative font-interTight text-blueText whitespace-nowrap w-auto all-unset flex flex-row gap-1 hover:gap-3',
                'transition-all duration-200',
                underliningActived && "before:content-[''] before:absolute before:h-[1px] before:bg-[#ff0000] before:-bottom-1 before:bg-blueText",
                underliningActived && 'before:transition-all before:duration-200',
                !underliningActived && 'sm:hover:opacity-50',
                !underliningActived && 'active:opacity-50 sm:active:opacity',
                actived && 'hover:before:w-full before:w-0',
                customClassName
            )} 
            href={link}
            {...props}
        >
            {text}
            {arrowActived &&
                <p>→</p>
            }
        </Link>
    );
}

export default BlueLink;