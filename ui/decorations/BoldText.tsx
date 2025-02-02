export const BoldText: React.FC<React.HTMLProps<HTMLSpanElement>> = ({
    children,
    ...props
}) => {
    return (
        <span className="font-interTight font-semibold text-primaryText" key={Math.random()} {...props}>
            {children}
        </span>
    );
}