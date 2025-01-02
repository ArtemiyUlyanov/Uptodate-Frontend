import clsx from "clsx";
import Link from "next/link";
import WhiteUnderlinedLink from "../links/WhiteUnderlinedLink";

export type TopMenuLinkProps = React.HTMLProps<HTMLDivElement> & {
    link: string
    text: string
    actived: boolean
    arrowActived?: boolean
    className?: string
}

const TopMenuLink: React.FC<TopMenuLinkProps> = ({
    link,
    text,
    actived,
    arrowActived,
    className
}) => {
    return (
        <WhiteUnderlinedLink
            text={text}
            link={link}
            className={className}
            actived={actived}
            arrowActived={arrowActived}
        />
    );
}

export default TopMenuLink;