export const UnderlinedText: React.FC<React.HTMLProps<HTMLSpanElement>> = ({
    children,
    ...props
}) => {
    return (
        <u className="font-interTight font-medium text-primaryText" key={Math.random()} {...props}>
            {children}
        </u>
    );
}