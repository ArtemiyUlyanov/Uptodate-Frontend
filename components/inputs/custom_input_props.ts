export type CustomInputProps = React.HTMLProps<HTMLInputElement> & {
    placeholder: string
    className?: string
    inputClassName?: string
    fullBordered: boolean
    handleChange?: (value: string) => void
}