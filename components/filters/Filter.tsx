import { useFilters } from "@/hooks/useFilters"
import clsx from "clsx"
import { FiltersIcon } from "../icons/FiltersIcon"
import { CheckboxCheckedIcon } from "../icons/CheckboxCheckedIcon"
import { useState } from "react"
import { UnwrappingElementIcon } from "../icons/UnwrappingElementIcon"

export type FilterProps = React.HTMLProps<HTMLDivElement> & {
    name: string
    options: string[]
    applyFilter: (option: string) => void
    isSelected: (option: string) => boolean
    unwrapping: boolean
    multiple: boolean
} 

const Filter: React.FC<FilterProps> = ({
    name,
    options,
    applyFilter,
    isSelected,
    unwrapping,
    multiple
}) => {
    const [isUnwrapped, setIsUnwrapped] = useState(false);
    const { filters, setFilter } = useFilters();

    return (
        <div className={clsx(
            'flex flex-col',
            'transition-all duration-200',
            !unwrapping && 'gap-2',
            unwrapping && isUnwrapped && 'gap-2',
            unwrapping && !isUnwrapped && 'gap-0'
        )}>
            {unwrapping ?
                <div
                    className={clsx(
                        'flex flex-row items-center select-none gap-2',
                        'transition-all duration-200',
                        'sm:hover:opacity-50',
                        'active:opacity-50 sm:active:opacity'
                    )}
                    onClick={() => setIsUnwrapped(prev => !prev)}
                >
                    <p>{name}</p>
                    <UnwrappingElementIcon
                        className={clsx(
                            'w-3',
                            'transition-all duration-200',
                            isUnwrapped && 'rotate-180'
                        )}
                    />
                </div>
            :
                <p className={clsx(
                    'font-interTight font-medium text-secondaryText text-sm'
                )}>{name}</p>
            }
            <ul className={clsx(
                'flex flex-wrap gap-2',
                'transition-all duration-200',
                multiple && 'flex-row',
                !multiple && 'flex-col',
                unwrapping && 'overflow-hidden',
                unwrapping && isUnwrapped && 'max-h-auto',
                unwrapping && !isUnwrapped && 'max-h-0'
            )}>
                {multiple && options.map(option =>
                    <li
                        className={clsx(
                            'flex flex-row items-center gap-2 pr-2 pl-2 pt-1 pb-1',
                            'rounded-full',
                            'border border-borderColor',
                            'font-interTight font-medium text-sm',
                            'transition-all duration-200',
                            isSelected(option) && 'bg-emphasizingColor2'
                        )}
                        onClick={() => applyFilter(option)}
                    >
                        {option}
                    </li>
                )}
                {!multiple && options.map(option =>
                    <li
                        className={clsx(
                            'flex flex-row items-center gap-2',
                            'font-interTight font-medium text-sm',
                            'transition-all duration-200',
                        )}
                        onClick={() => applyFilter(option)}
                    >
                        <div className={clsx(
                            'flex flex-row items-center p-1 rounded-full aspect-square',
                            'border border-borderColor'
                        )}>
                            <span className={clsx(
                                'w-2 h-2 bg-white rounded-full',
                                'transition-all duration-200',
                                !isSelected(option) && 'opacity-0'
                            )}></span>
                        </div>
                        {option}
                    </li>
                )}
            </ul>
        </div>
    );
}

export default Filter;