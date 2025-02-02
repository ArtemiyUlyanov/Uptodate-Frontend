export const Heading1Text: React.FC<React.HTMLProps<HTMLHeadingElement>> = ({
    children,
    ...props
}) => {
    return (
        <h1 className="font-interTight font-semibold text-xl text-primaryText" key={Math.random()} {...props}>
            {children}
        </h1>
    );
}