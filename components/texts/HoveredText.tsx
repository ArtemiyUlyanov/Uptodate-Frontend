import clsx from "clsx";

export type HoveredTextProps = React.HTMLProps<HTMLDivElement> & {
    className?: string
}

const HoveredText: React.FC<HoveredTextProps> = ({
    className,
    children,
    ...props
}) => {
    return (
        <div className={clsx(
            'w-auto h-auto relative',
            "before:content-[''] before:h-[1px] before:-bottom-[1px] before:z-[999] before:rounded-full before:absolute",
            'before:transition-all before:duration-200 before:w-0 hover:before:w-full',
            className
        )}>
            {children}
        </div>
    );
}

export default HoveredText;