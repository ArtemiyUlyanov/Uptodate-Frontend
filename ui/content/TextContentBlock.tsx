export const TextContentBlock: React.FC<React.HTMLProps<HTMLPreElement>> = ({
    children,
    ...props
}) => {
    return (
        <pre className="font-interTight font-medium text-base text-primaryText" key={Math.random()} {...props}>
            {children}
        </pre>
    );
}