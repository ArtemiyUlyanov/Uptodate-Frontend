import { Link } from "@nextui-org/react"
import clsx from "clsx"

export type ProfileNavigationProps = {
    templates: ProfileNavigationTemplate[]
}

export type ProfileNavigationTemplate = {
    name: string
    link: string
    selected: boolean
    icon?: React.ReactNode
    className?: string
}

export const ProfileNavigation: React.FC<ProfileNavigationProps> = ({
    templates
}) => {
    return (
        <div className="flex flex-col gap-4 w-1/5">
            <p className="font-interTight font-semibold text-base text-primaryText">Menu</p>
            <div className="flex flex-col">
                {templates.map(template =>
                    <Link
                        href={template.link}
                        className={clsx(
                            template.selected && 'text-primaryText',
                            !template.selected && 'text-secondaryText',
                            'flex flex-row items-center gap-2',
                            'transition-all duration-200',
                            'hover:text-primaryColor hover:fill-primaryColor hover:opacity-100',
                            'active:text-primaryColor active:fill-primaryColor active:opacity-100 sm:active:text sm:active:fill'
                        )}
                        disableAnimation={true}
                    >
                        {template.icon &&
                            <div className={clsx(
                                'h-4',
                                'transition-all duration-200',
                                template.selected && 'fill-primaryColor',
                                !template.selected && 'fill-secondaryColor'
                            )}>
                                {template.icon}               
                            </div> 
                        }
                        <p className={clsx(
                            "font-interTight font-semibold text-base",
                            template.className
                        )}>{template.name}</p>
                    </Link>
                )}
            </div>
        </div>
    );
}