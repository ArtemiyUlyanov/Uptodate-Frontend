import clsx from "clsx"
import { useMemo, useState } from "react"
import { UnwrappingElementIcon } from "../icons/UnwrappingElementIcon"
import { CheckboxCheckedIcon } from "../icons/CheckboxCheckedIcon"
import { splitQueryText } from "@/utils/text_utils"
import { UseLocalSearchResponse } from "@/hooks/explore/useLocalSearch"

export type RelativeOptionbarProps = React.HTMLProps<HTMLDivElement> & {
    name: string
    icon?: React.ReactNode
    options: OptionTemplate[]
    queryOptions?: QueryProps
    hideIfEmpty?: boolean
    textClassName?: string
}

export type QueryProps = {
    localSearch?: UseLocalSearchResponse
}

export type OptionTemplate = {
    name: string
    icon?: React.ReactNode
    selected: boolean
    action: () => void
}

const RelativeOptionbar: React.FC<RelativeOptionbarProps> = ({
    name,
    icon,
    options,
    hideIfEmpty,
    queryOptions,
    textClassName,
    ...props
}) => {
    const [isUnwrapped, setIsUnwrapped] = useState(false);

    const { query } = queryOptions?.localSearch || {query: ''}

    return (
        <div className={clsx(
            'relative flex flex-col items-start',
            isUnwrapped && 'gap-2',
            !isUnwrapped && 'gap-0',
            hideIfEmpty && options.length <= 0 && 'hidden'
        )}>
            <div
                className={clsx(
                    'flex flex-row items-center select-none',
                    icon && 'gap-4',
                    !icon && 'gap-2',
                    'transition-all duration-200',
                    'sm:hover:opacity-50',
                    'active:opacity-50 sm:active:opacity'
                )}
                onClick={() => setIsUnwrapped(prev => !prev)}
            >
                <div className={clsx(
                    'flex flex-row items-center gap-2'
                )}>
                    <div className='h-4'>
                        {icon}
                    </div>
                    <p className={clsx(
                        'font-interTight font-semibold text-primaryText',
                        textClassName
                    )}>{name}</p>
                </div>
                <div className={clsx(
                    'h-1.5'
                )}>
                    <UnwrappingElementIcon
                        className={clsx(
                            'w-auto h-full fill-primaryColor',
                            'transition-all duration-200',
                            isUnwrapped && 'rotate-180'
                        )}
                    />
                </div>
            </div>
            <ul className={clsx(
                'w-full relative space-y-1 flex flex-col',
                'bg-white rounded-md',
                'transition-all duration-200',
                'overflow-hidden',
                isUnwrapped && 'max-h-auto',
                !isUnwrapped && 'max-h-0'
            )}>
                {options.map((option, index) => 
                    <li
                        key={index}
                        className={clsx(
                            'select-none w-auto flex flex-row items-center gap-2',
                            'pl-2 pr-2 pt-1 pb-1 rounded-md',
                            'font-interTight font-medium text-primaryText text-sm',
                            'transition-all duration-200',
                            !option.selected && 'sm:hover:bg-emphasizingColor2',
                            option.selected && 'bg-emphasizingColor2'
                        )}
                        onClick={option.action}
                    >
                        <div className={clsx(
                            'w-auto rounded-md h-auto p-1 box-border',
                            !option.selected && 'border border-borderColor',
                            option.selected && 'bg-primaryColor border border-[transparent]',
                            'transition-all duration-200',
                        )}>
                            <div className={clsx(
                                'w-2',
                                'transition-all duration-200',
                                option.selected && 'opacity-100',
                                !option.selected && 'opacity-0'
                            )}>
                                <CheckboxCheckedIcon
                                    className={clsx(
                                        'w-full h-auto fill-oppositeText',
                                        'transition-all duration-200',
                                    )}
                                />
                                </div>
                        </div>
                        <p className={clsx(
                            'font-interTight font-medium text-left'
                        )}>{splitQueryText(option.name, query, 'bg-redText text-primaryText')}</p>
                    </li>
                )}
            </ul>
        </div>
    );
}

export default RelativeOptionbar;