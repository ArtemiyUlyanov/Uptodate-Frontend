"use client";

import clsx from "clsx";
import { UptodateIcon } from "../icons/UptodateIcon";
import TopMenuLink from "./TopMenuLink";
import DefaultButton from "../buttons/DefaultButton";
import TransparentButton from "../buttons/TransparentButton";
import { useState } from "react";
import IconInput from "../inputs/IconInput";
import { SearchIcon } from "../icons/SearchIcon";
import HoveredText from "../texts/HoveredText";
import TextButton from "../buttons/TextButton";
import WhiteUnderlinedLink from "../links/WhiteUnderlinedLink";
import WhiteLink from "../links/WhiteLink";

export type TopMenuProps = React.HTMLProps<HTMLDivElement> & {
    templates: TopMenuTemplate[]
}

export type TopMenuTemplate = {
    text: string
    link: string
    selected: boolean
    className?: string
}

const TopMenu: React.FC<TopMenuProps> = ({
    templates
}) => {
    const [menuStatus, setMenuStatus] = useState(false);

    const changeMenuStatus = () => {
        setMenuStatus(!menuStatus);
    }

    return [
        <div className={clsx(
            'fixed flex w-[90%] sm:w-[75%] h-[60px] z-[9999] bg-backgroundColor/75 backdrop-blur-2xl',
            // 'border-b border-b-borderColor'
        )}>
            <div className={clsx(
                'absolute left-0 flex flex-row items-center w-auto h-full gap-8'
            )}>
                <div className={clsx(
                    'w-auto h-[30%]'
                )}>
                    <UptodateIcon
                        className='w-auto'
                    />
                </div>
            </div>
            <div className={clsx(
                'hidden lg:flex flex-row items-center gap-8 w-auto h-[100%] mx-auto'
            )}>
                {/* <IconInput
                    placeholder='Search by name'
                    className='w-full hidden lg:flex'
                    inputClassName='text-sm'
                    icon={<SearchIcon />}
                /> */}
                <div className={clsx(
                    'flex flex-row items-center gap-8 hidden md:flex'
                )}>
                    {templates.map(template => 
                        <TopMenuLink
                            text={template.text}
                            link={template.link}
                            actived={!template.selected}
                            
                            className={clsx(
                                'text-sm font-medium',
                                'transition-all duration-200',
                                template.selected && 'text-primaryText',
                                !template.selected && 'text-secondaryText hover:text-primaryText',
                                // template.selected && 'font-bold text-primaryText',
                                template.className
                            )}
                        />
                    )}
                    
                    {/* <TopMenuLink
                        text="Explore" 
                        link="/explore"
                        className={clsx(
                            'font-semibold text-sm text-secondaryText',
                            'transition-all duration-200',
                            'hover:text-primaryText'
                        )}
                    />
                    <TopMenuLink
                        text="About us" 
                        link="/about-us"
                        className={clsx(
                            'font-semibold text-sm text-secondaryText',
                            'transition-all duration-200',
                            'hover:text-primaryText'
                        )}
                    />
                    <TopMenuLink
                        text="Categories" 
                        link="/categories"
                        className={clsx(
                            'font-semibold text-sm text-secondaryText',
                            'transition-all duration-200',
                            'hover:text-primaryText'
                        )}
                    /> */}
                </div>
                <div 
                    className={clsx(
                        'flex flex-col gap-1 sm:hidden',
                        'transition-all duration-200',
                        'hover:opacity-[0.5]'
                    )}
                    onClick={() => changeMenuStatus()}
                >
                    <span className={clsx(
                        'w-7 h-1 bg-[#FFFFFF] rounded-full',
                        'transition-all duration-200',
                        menuStatus && 'rotate-45 absolute'
                    )}></span>
                    <span className={clsx(
                        'w-7 h-1 bg-[#FFFFFF] rounded-full',
                        'transition-all duration-200',
                        menuStatus && 'opacity-[0] pointer-events-none'
                    )}></span>
                    <span className={clsx(
                        'w-7 h-1 bg-[#FFFFFF] rounded-full',
                        'transition-all duration-200',
                        menuStatus && '-rotate-45 absolute'
                    )}></span>
                </div>
            </div>
            <div className={clsx(
                    'flex flex-row items-center gap-4 w-auto h-[100%] hidden md:flex right-0 absolute'
                )}>
                    <WhiteLink 
                        text="Sign up"
                        link="/reigster"
                        className="font-medium text-sm"
                    />
                    <DefaultButton
                        text="Sign in"
                        link='/login'
                        className="font-semibold text-sm"
                    />
                </div>
        </div>,
        <div className={clsx(
            'flex flex-col gap-4',
            'w-[100%] h-screen bg-backgroundColor fixed',
            'p-8',
            'transition-all duration-500',
            menuStatus && 'right-0',
            !menuStatus && 'right-[-100%]'
        )}>
            <div className={clsx(
                'flex flex-row justify-end w-[100%] h-[auto] bg-[#ff0000]'
            )}>
                <div 
                    className={clsx(
                        'flex flex-col gap-1',
                        'h-[auto] bg-[#ff00ff]',
                        'transition-all duration-200',
                        'hover:opacity-[0.5]'
                    )}
                    onClick={() => changeMenuStatus()}
                >
                    <span className={clsx(
                        'w-7 h-1 bg-[#FFFFFF] rounded-full',
                        'transition-all duration-200',
                        menuStatus && 'rotate-45 translate-y-2'
                    )}></span>
                    <span className={clsx(
                        'w-7 h-1 bg-[#FFFFFF] rounded-full',
                        'transition-all duration-200',
                        menuStatus && 'opacity-[0] pointer-events-none'
                    )}></span>
                    <span className={clsx(
                        'w-7 h-1 bg-[#FFFFFF] rounded-full',
                        'transition-all duration-200',
                        menuStatus && '-rotate-45 -translate-y-2'
                    )}></span>
                </div>
            </div>
        </div>
    ];
}

export default TopMenu;