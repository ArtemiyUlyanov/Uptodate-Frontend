export const Heading3Text: React.FC<React.HTMLProps<HTMLHeadingElement>> = ({
    children,
    ...props
}) => {
    return (
        <h3 className="font-interTight font-semibold text-base text-primaryText" key={Math.random()} {...props}>
            {children}
        </h3>
    );
}