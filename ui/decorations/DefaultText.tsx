export const DefaultText: React.FC<React.HTMLProps<HTMLSpanElement>> = ({
    children,
    ...props
}) => {
    return (
        <span className="font-interTight font-medium text-base text-primaryText" key={Math.random()} {...props}>
            {children}
        </span>
    );
}