import clsx from "clsx"
import Link from "next/link"

export type TopMenuAccountOptionbarProps = React.HTMLProps<HTMLDivElement> & {
    options: TopMenuAccountOption[]
} 

export type TopMenuAccountOption = {
    text: string
    link: string
    textClassName?: string
    icon: React.ReactNode
}

const TopMenuAccountOptionbar: React.FC<TopMenuAccountOptionbarProps> = ({
    options
}) => {
    return (
        <div className={clsx(
            'flex flex-col gap-2'
        )}>
            <p className={clsx(
                'font-interTight font-semibold pl-1 text-sm text-secondaryText'
            )}>Account settings</p>
            <div className={clsx(
                'flex flex-col gap-1'
            )}>
                {options.map(({ text, link, textClassName, icon }) =>
                    <Link 
                        className={clsx(
                            'flex flex-row items-center gap-2',
                            'font-interTight font-medium pt-1 pb-1 pr-2 pl-2 rounded-md text-sm text-red-500',
                            'transition-all duration-200',
                            'sm:hover:bg-emphasizingColor3',
                            'active:bg-emphasizingColor3 sm:active:bg'
                        )}
                        href={link}
                    >
                        <div className={clsx(
                            'h-4'
                        )}>
                            {icon}
                        </div>
                        <p className={clsx(
                            textClassName
                        )}>{text}</p>    
                    </Link>
                )}
            </div>
        </div>
    );
}

export default TopMenuAccountOptionbar;