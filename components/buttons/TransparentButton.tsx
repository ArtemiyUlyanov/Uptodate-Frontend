import clsx from "clsx";
import Link from "next/link";
import { CustomButtonProps } from "./custom_button_props";
import DefaultLoader from "../loaders/DefaultLoader";
import { Button } from "@nextui-org/button";

export type TransparentButtonProps = CustomButtonProps

const TransparentButton: React.FC<TransparentButtonProps> = ({
    text,
    link,
    onClickButton,
    available,
    customClassName,
    ...props
}) => {
    return (
        <Button 
            className={clsx(
                'flex flex-row items-center justify-center bg-[transparent] font-interTight font-semibold rounded-md text-primaryText select-none whitespace-nowrap',
                'transition-all duration-200',
                'sm:hover:bg-emphasizingColor',
                'active:bg-emphasizingColor sm:active:bg',
                'border border-solid border-borderColor',
                customClassName
            )}
            onClick={onClickButton}
            {...props}
        >
            <p>{text}</p>
        </Button>
    );
}

export default TransparentButton;