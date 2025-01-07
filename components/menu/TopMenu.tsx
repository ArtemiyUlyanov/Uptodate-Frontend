'use client';

import clsx from "clsx";
import { UptodateIcon } from "../icons/UptodateIcon";
import DefaultButton from "../buttons/DefaultButton";
import TransparentButton from "../buttons/TransparentButton";
import { useEffect, useState } from "react";
import IconInput from "../inputs/IconInput";
import { SearchIcon } from "../icons/SearchIcon";
import HoveredText from "../texts/HoveredText";
import TextButton from "../buttons/TextButton";
import { UserCoverIcon } from "../icons/UserCoverIcon";
import { EllipsisIcon } from "../icons/EllipsisIcon";
import DefaultLink from "../links/DefaultLink";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { logout } from "@/store/features/auth/authSlice";
import { SettingsIcon } from "../icons/SettingsIcon";
import { LogoutIcon } from "../icons/LogoutIcon";
import TopMenuAccountOptionbar from "./TopMenuAccountOptionbar";
import TopMenuSearch from "./TopMenuSearch";

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
    const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();

    const [isProfileSettingsUnwrapped, setIsProfileSettingsUnwrapped] = useState<boolean>(false);
    const [menuStatus, setMenuStatus] = useState<boolean>(false);
    const [isSearchUnwrapped, setIsSearchUnwrapped] = useState<boolean>(false);
    
    const toggleMenuStatus = () => {
        setMenuStatus(prev => !prev);
    }

    return [
        <div className={clsx(
            'fixed w-full z-[9999]',
            'transition-all duration-500',
            !isSearchUnwrapped && 'h-auto max-h-auto bg-black/0',
            isSearchUnwrapped && 'h-full max-h-full bg-black/15'
        )}>
            <div className={clsx(
                'flex w-full pr-8 pl-8 justify-between h-[60px] z-[9999] bg-backgroundColor',
                // 'border border-[transparent] border-b-borderColor'
            )}>
                <div className={clsx(
                    'flex flex-row items-center w-auto h-full gap-8'
                )}>
                    <div className={clsx(
                        'w-auto h-1/3'
                    )}>
                        <UptodateIcon
                            className='w-auto'
                        />
                    </div>
                    <div className={clsx(
                        'flex flex-row items-center gap-4 hidden md:flex'
                    )}>
                        {templates.map((template, index) => 
                            <DefaultLink
                                key={index}
                                text={template.text}
                                link={template.link}
                                actived={!template.selected}
                                underliningActived={!template.selected}
                                customClassName={clsx(
                                    'text-base font-semibold',
                                    'transition-all duration-200',
                                    template.selected && 'text-primaryText',
                                    !template.selected && 'text-secondaryText hover:text-primaryText',
                                    template.className
                                )}
                            />
                        )}
                    </div>
                </div>
                {/* <div className={clsx(
                    'hidden lg:flex flex-row items-center gap-8 w-auto h-[100%] mx-auto'
                )}>
                    
                    <div 
                        className={clsx(
                            'flex flex-col gap-1 sm:hidden',
                            'transition-all duration-200',
                            'hover:opacity-[0.5]'
                        )}
                        onClick={() => toggleMenuStatus()}
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
                </div> */}
                {isAuthenticated && 
                    <div
                        className={clsx(
                            'flex flex-row w-auto h-[100%] hidden md:flex'
                        )}
                    >
                        <div
                            className={clsx(
                                'flex flex-row items-center gap-3 select-none h-auto',
                                'transition-all duration-200',
                                'sm:hover:opacity-50',
                                'active:opacity-50 sm:active:opacity'
                            )}
                            onClick={() => setIsProfileSettingsUnwrapped(prev => !prev)}
                        >
                            <div className={clsx(
                                'relative w-6 aspect-square overflow-hidden rounded-full'
                            )}>
                                <UserCoverIcon 
                                    url={'/api/files/get?path=' + (user?.icon)}
                                    className='w-full h-full object-cover'
                                />
                            </div>
                            <p className={clsx(
                                'font-interTight font-medium text-sm'
                            )}>{`${user?.firstName} ${user?.lastName}`}</p>
                        </div>
                        <div className={clsx(
                            'flex flex-col gap-1',
                            'absolute right-0 w-[200px] rounded-md p-2 bg-emphasizingColor',
                            'transition-all duration-200',
                            'overflow-hidden',
                            isProfileSettingsUnwrapped && 'top-full',
                            !isProfileSettingsUnwrapped && 'top-0 opacity-0 pointer-events-none'
                        )}>
                            <TopMenuAccountOptionbar
                                options={[
                                    {
                                        text: 'Settings',
                                        link: '/account/settings',
                                        textClassName: 'text-primaryText',
                                        icon: <SettingsIcon />
                                    },
                                    {
                                        text: 'Log out',
                                        link: '/logout',
                                        textClassName: 'text-red-500',
                                        icon: <LogoutIcon />
                                    }
                                ]}
                            />
                        </div>
                    </div>
                }
                {!isAuthenticated && 
                    <div className={clsx(
                        'flex flex-row items-center gap-6 w-auto h-[100%] hidden md:flex'
                    )}>
                        <div className={clsx(
                            'h-4'
                        )}>
                            <SearchIcon 
                                className={clsx(
                                    'fill-primaryColor',
                                    'transition-all duration-200',
                                    'sm:hover:opacity-50',
                                    'active:opacity-50 sm:active:opacity'
                                )}
                                onClick={() => setIsSearchUnwrapped(prev => !prev)}
                            />
                        </div>
                        <DefaultLink
                            text="Sign in"
                            link=""
                            actived={true}
                            arrowActived={false}
                            underliningActived={false}
                            customClassName="font-interTight font-semibold text-base"
                        />
                        {/* <DefaultButton
                            text="Sign in"
                            link='/login'
                            customClassName="font-interTight font-semibold text-sm pl-3 pr-3 pt-1.5 pb-1.5 rounded-xl"
                        /> */}
                    </div>
                }
                
            </div>
            <div className={clsx(
                'absolute flex flex-col h-auto w-full bg-backgroundColor rounded-b-md',
                'transition-all duration-300',
                'overflow-hidden',
                !isSearchUnwrapped && '-mt-10 opacity-0 pointer-events-none',
                isSearchUnwrapped && 'mt-0 opacity-100'
            )}>
                <TopMenuSearch />
            </div>
        </div>,
        <div className={clsx(
            'flex flex-col p-8 gap-4',
            'w-[100%] h-screen bg-backgroundColor fixed',
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
                    onClick={() => toggleMenuStatus()}
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