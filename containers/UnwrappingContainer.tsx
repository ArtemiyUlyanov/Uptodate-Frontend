import { CheckboxCheckedIcon } from "@/components/icons/CheckboxCheckedIcon"
import { UnwrappingElementIcon } from "@/components/icons/UnwrappingElementIcon"
import clsx from "clsx"
import { useState } from "react"

export type UnwrappingContainerProps = React.HTMLProps<HTMLDivElement> & {
    x_axis: 'left' | 'center' | 'right'
    y_axis: 'top' | 'bottom'
    customClassName?: string
    showUnwrappingIcon?: boolean
    toggler: React.ReactNode
}

const UnwrappingContainer: React.FC<UnwrappingContainerProps> = ({
    x_axis,
    y_axis,
    customClassName,
    toggler,
    showUnwrappingIcon,
    children
}) => {
    const [isUnwrapped, setIsUnwrapped] = useState<boolean>(false);

    return (
        <div className={clsx(
            'relative flex flex-col',
            x_axis === 'center' && 'items-center',
            x_axis === 'left' && 'items-end',
            x_axis === 'right' && 'items-start'
        )}>
            <div
                className={clsx(
                    'flex flex-row items-center select-none gap-2',
                    'transition-all duration-200',
                    'sm:hover:opacity-50',
                    'active:opacity-50 sm:active:opacity'
                )}
                onClick={() => setIsUnwrapped(prev => !prev)}
            >
                {toggler}
                <div className={clsx(
                    'h-1.5',
                    !showUnwrappingIcon && 'hidden'
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
                'absolute flex flex-col gap-1 z-[9999]',
                'p-2 bg-white rounded-md',
                'transition-all duration-200',
                y_axis === 'top' && 'bottom-full mb-2',
                y_axis === 'bottom' && 'top-full mt-2',
                'overflow-hidden',
                isUnwrapped && 'opacity-100',
                !isUnwrapped && 'opacity-0 pointer-events-none',
                customClassName
            )}>
                {children}
            </ul>
        </div>
    );
}

export type UnwrappingContainerButtonProps = React.HTMLProps<HTMLDivElement> & {
    text: string
    icon?: React.ReactNode
    textAlign?: 'center' | 'left'
    customClassName?: string
    textClassName?: string
    onClickButton?: (e: React.MouseEvent<HTMLLIElement>) => void
}

export const UnwrappingTransparentContainerButton: React.FC<UnwrappingContainerButtonProps> = ({
    text,
    icon,
    customClassName,
    textClassName,
    onClickButton
}) => {
    return (
        <li
            className={clsx(
                'select-none w-auto whitespace-nowrap flex flex-row items-center gap-4 justify-between',
                'rounded-md',
                'font-interTight font-medium text-primaryText text-sm',
                'transition-all duration-200',
                'sm:hover:bg-emphasizingColor2',
                customClassName
            )}
            onClick={onClickButton}
        >
            <div className={clsx(
                'flex flex-row items-center gap-2'
            )}>
                <div className={clsx(
                    "h-4",
                    !icon && 'hidden'
                )}>
                    {icon}
                </div>
                <p className={clsx(
                    'inline-block text-primaryText',
                    textClassName
                )}>
                    {text}
                </p>
            </div>
        </li>
    );
}

export const UnwrappingDefaultContainerButton: React.FC<UnwrappingContainerButtonProps> = ({
    text,
    icon,
    textAlign,
    customClassName,
    textClassName,
    onClickButton
}) => {
    return (
        <li
            className={clsx(
                'select-none w-auto whitespace-nowrap bg-primaryColor flex flex-row items-center',
                textAlign === 'left' && 'gap-4 justify-between',
                textAlign === 'center' && 'justify-center',
                'rounded-md',
                'font-interTight font-medium text-primaryText text-sm',
                'transition-all duration-200',
                'sm:hover:opacity-50',
                'active:opacity-50 sm:active:opacity',
                customClassName
            )}
            onClick={onClickButton}
        >
            <div className={clsx(
                'flex flex-row items-center gap-2'
            )}>
                <div className={clsx(
                    "h-4",
                    !icon && 'hidden'
                )}>
                    {icon}
                </div>
                <p className={clsx(
                    'inline-block',
                    textClassName
                )}>
                    {text}
                </p>
            </div>
        </li>
    );
}

export default UnwrappingContainer;