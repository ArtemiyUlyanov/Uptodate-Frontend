import clsx from "clsx";
import Link from "next/link";
import { CustomButtonProps } from "./custom_button_props";
import DefaultLoader from "../loaders/DefaultLoader";

export type TransparentButtonProps = CustomButtonProps

const TransparentButton: React.FC<TransparentButtonProps> = ({
    text,
    link,
    onClickButton,
    available,
    customClassName
}) => {
    return (
        <Link 
            className={clsx(
                'flex flex-row items-center justify-center font-interTight font-semibold rounded-md text-primaryText select-none whitespace-nowrap',
                'transition-all duration-200',
                'sm:hover:bg-emphasizingColor',
                'active:bg-emphasizingColor sm:active:bg',
                'border border-solid border-borderColor',
                customClassName
            )}
            onClick={() => onClickButton && onClickButton()}
            href={link || ''}
        >
            <p className={clsx(
                !available && 'opacity-0'
            )}>{text}</p>
            <DefaultLoader 
                customClassName={clsx(
                    'absolute w-5 h-5',
                    available && 'hidden'
                )} 
            />
        </Link>
    );
}

export default TransparentButton;