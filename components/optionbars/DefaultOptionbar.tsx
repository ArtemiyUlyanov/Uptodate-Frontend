import clsx from "clsx"
import { CheckboxCheckedIcon } from "../icons/CheckboxCheckedIcon"
import { UnwrappingElementIcon } from "../icons/UnwrappingElementIcon"
import React, { useState } from "react"

export type DefaultOptionbarProps = React.HTMLProps<HTMLDivElement> & {
    name: string
    icon?: React.ReactNode
    up?: boolean
    options: OptionTemplate[]
}

export type OptionTemplate = {
    name: string
    icon?: React.ReactNode
    selected: boolean
    action: () => void
}

const DefaultOptionbar: React.FC<DefaultOptionbarProps> = ({
    up,
    name,
    icon,
    options,
    ...props
}) => {
    const [isUnwrapped, setIsUnwrapped] = useState(false);

    return (
        <div className={clsx(
            'relative flex flex-col items-end'
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
                        'font-interTight font-semibold text-primaryText text-sm'
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
                'absolute flex flex-col gap-1',
                'p-2 bg-white rounded-md',
                'transition-all duration-200',
                up && 'bottom-full mb-1',
                !up && 'top-full mt-1',
                'overflow-hidden',
                isUnwrapped && 'opacity-100',
                !isUnwrapped && 'opacity-0 pointer-events-none'
            )}>
                {options.map((option, index) => 
                    <li
                        key={index}
                        className={clsx(
                            'select-none whitespace-nowrap flex flex-row items-center gap-4 justify-between',
                            'pl-2 pr-2 pt-1 pb-1 rounded-md',
                            'font-interTight font-medium text-primaryText text-sm',
                            'transition-all duration-200',
                            !option.selected && 'sm:hover:bg-emphasizingColor2',
                            option.selected && 'bg-emphasizingColor2'
                        )}
                        onClick={option.action}
                    >
                        <div className={clsx(
                            'flex flex-row items-center gap-2'
                        )}>
                            {option.icon}
                            <p className={clsx(
                                'text-primaryText'
                            )}>
                                {option.name}
                            </p>
                        </div>
                        <div className={clsx(
                            'w-3',
                            'transition-all duration-200',
                            option.selected && 'opacity-100',
                            !option.selected && 'opacity-0'
                        )}>
                            <CheckboxCheckedIcon
                                className={clsx(
                                    'w-full h-auto fill-blueText',
                                    'transition-all duration-200',
                                )}
                            />
                        </div>
                    </li>
                )}
            </ul>
        </div>
    );
}

export default DefaultOptionbar;