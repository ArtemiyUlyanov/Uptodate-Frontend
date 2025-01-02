import clsx from "clsx";
import { useState } from "react";
import { UnwrappingElementIcon } from "../icons/UnwrappingElementIcon";

export type FilterSetProps = React.HTMLProps<HTMLDivElement> & {
    name: string
}

const FilterSet: React.FC<FilterSetProps> = ({
    name,
    children
}) => {
    const [isUnwrapped, setIsUnwrapped] = useState(false);

    return (
        <div
            className={clsx(
                'flex flex-col',
                'transition-all duration-200',
                !isUnwrapped && 'gap-0',
                isUnwrapped && 'gap-2'
            )}
        >
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
                <div className={clsx(
                    'h-1.5'
                )}>
                    <UnwrappingElementIcon 
                        className={clsx(
                            'w-auto h-full',
                            'transition-all duration-200',
                            isUnwrapped && 'rotate-180'
                        )}
                    />
                </div>
            </div>
            <div className={clsx(
                'flex flex-col gap-4',
                'transition-all duration-200',
                'overflow-hidden',
                isUnwrapped && 'max-h-auto',
                !isUnwrapped && 'max-h-0'
            )}>
                {children}
            </div>
        </div>
    );
}

export default FilterSet;