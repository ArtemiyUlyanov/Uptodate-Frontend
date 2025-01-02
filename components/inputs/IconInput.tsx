"use client";

import clsx from "clsx";
import { use, useEffect, useState } from "react";

export type IconInputProps = React.HTMLProps<HTMLDivElement> & {
    placeholder: string
    className?: string
    inputClassName?: string
    onValueChange: (value: string) => void
    icon?: React.ReactNode
}

const IconInput: React.FC<IconInputProps> = ({
    placeholder,
    icon,
    className,
    onValueChange,
    inputClassName
}) => {
    const [value, setValue] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const [isWrong, setIsWrong] = useState(false);

    const handleChange = (event: any) => {
        setValue(event.target.value);
    }

    const clearInput = () => {
        setValue('');
    }

    const onFocus = () => {
        setIsFocused(true);
    }

    const onBlur = () => {
        setIsFocused(false);
    }

    useEffect(() => {
        onValueChange(value);
    }, [value]);

    return (
        <div className={clsx(
            'inline-flex flex-row items-center gap-2',
            'pl-[10px] pr-[10px] pt-[5px] pb-[5px]',
            'border border-[transparent] border-b-borderColor',
            'transition-all duration-200',
            // isFocused && 'ring-2 ring-white/75',
            className
        )}>
            <div className={clsx(
                'h-4'
            )}>
                {icon}
            </div>
            <input 
                placeholder={placeholder}
                onChange={handleChange}
                value={value}
                className={clsx(
                    'bg-[transparent] appearance-none outline-none text-primaryText placeholder-secondaryText w-[100%]',
                    inputClassName
                )}
                onFocus={() => onFocus()}
                onBlur={() => onBlur()}
            />
            <p
                className={clsx(
                    'font-interTight font-medium text-md text-secondaryText select-none',
                    'transition-all duration-200',
                    'active:opacity-[0.5] sm:active:opacity sm:hover:opacity-[0.5]',
                    value.length > 0 ? 'pointer' : 'opacity-[0] pointer-events-none'
                )}
                onClick={clearInput}
            >
                ×
            </p>
        </div>
    );
}

export default IconInput;