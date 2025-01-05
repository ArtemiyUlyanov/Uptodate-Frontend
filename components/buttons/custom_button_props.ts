export type CustomButtonProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    text: string
    link?: string
    onClickButton?: () => void
    className?: string
}