export type CustomLinkProps = React.HTMLProps<HTMLDivElement> & {
    text: string
    link: string
    actived: boolean
    arrowActived?: boolean
    underliningActived?: boolean
    className?: string
}