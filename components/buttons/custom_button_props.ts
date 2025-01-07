export type CustomButtonProps = React.HTMLProps<HTMLAnchorElement> & {
    text: string
    link?: string
    onClickButton?: () => void
    customClassName?: string
    available?: boolean
}