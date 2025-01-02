import clsx from "clsx";
import { useState } from "react";
import { CheckboxCheckedIcon } from "../icons/CheckboxCheckedIcon";

export type CheckboxProps = React.HTMLProps<HTMLDivElement> & {
    text: string
    checked?: boolean
    className?: string
}

const Checkbox: React.FC<CheckboxProps> = ({
    text,
    checked,
    className,
    ...props
}) => {
    const [isChecked, setIsChecked] = useState(checked);

    const toggleChecked = () => {
        setIsChecked(!isChecked);
    }

    return (
        <div 
            className={clsx(
                'flex flex-row items-center gap-2',
                'transition-all duration-200',
                'sm:hover:opacity-[0.5]',
                'active:opacity-[0.5] sm:active:opacity',
                className
            )}
            onClick={toggleChecked}
        >
            <input 
                type='checkbox'
                checked={isChecked}
                onChange={toggleChecked}
                className='hidden'
            />
            <div className={clsx(
                'flex flex-col items-center p-1',
                'border border-borderColor rounded',
            )}>
                <CheckboxCheckedIcon
                    className={clsx(
                        'w-2 h-auto aspect-square',
                        'transition-all duration-200',
                        !isChecked && 'opacity-0'
                    )}
                />
            </div>
            <p className={clsx(
                'select-none'
            )}>{text}</p>
        </div>
    );
}

export default Checkbox;