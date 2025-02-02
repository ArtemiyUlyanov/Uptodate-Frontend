export type Decoration = {
    type: 'heading1' | 'heading2' | 'heading3' | 'bold' | 'underlined' | 'breakline' | 'image' | 'default'
    text?: string
    get: (props?: Partial<React.HTMLProps<HTMLSpanElement>>) => React.ReactNode
}