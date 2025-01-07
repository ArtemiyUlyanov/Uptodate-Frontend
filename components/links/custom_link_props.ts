export type CustomLinkProps = React.HTMLProps<HTMLAnchorElement> & {
    text: string
    link: string
    actived: boolean
    arrowActived?: boolean
    underliningActived?: boolean
    customClassName?: string
}