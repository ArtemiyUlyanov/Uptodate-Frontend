import clsx from "clsx";

export type DefaultLoaderProps = React.HTMLProps<HTMLDivElement> & {
    customClassName?: string
}

const DefaultLoader: React.FC<DefaultLoaderProps> = ({
    customClassName,
    ...props
}) => {
    return (
        <div className={clsx(
            'rounded-full',
            'border border-[3px] border-t-primaryColor border-borderColor loader-animation',
            customClassName
        )}>
        </div>
    );
}

export default DefaultLoader;