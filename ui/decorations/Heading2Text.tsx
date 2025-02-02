export const Heading2Text: React.FC<React.HTMLProps<HTMLHeadingElement>> = ({
    children,
    ...props
}) => {
    return (
        <h2 className="font-interTight font-semibold text-lg text-primaryText" key={Math.random()} {...props}>
            {children}
        </h2>
    );
}