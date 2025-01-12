'use client';

import clsx from "clsx";
import { UptodateIcon } from "../icons/UptodateIcon";
import DefaultButton from "../buttons/DefaultButton";
import TransparentButton from "../buttons/TransparentButton";
import { useEffect, useRef, useState } from "react";
import IconInput from "../inputs/IconInput";
import { SearchIcon } from "../icons/SearchIcon";
import HoveredText from "../texts/HoveredText";
import TextButton from "../buttons/TextButton";
import { UserCoverIcon } from "../icons/UserAvatarIcon";
import { EllipsisIcon } from "../icons/EllipsisIcon";
import DefaultLink from "../links/DefaultLink";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { logout } from "@/store/features/auth/authSlice";
import { SettingsIcon } from "../icons/SettingsIcon";
import { LogoutIcon } from "../icons/LogoutIcon";
import TopMenuAccountOptionbar from "./TopMenuAccountOptionbar";
import TopMenuSearch from "./TopMenuSearch";
import { useSearch } from "@/hooks/explore/useSearch";
import TopMenuContent from "./TopMenuContent";
import { useTranslations } from "next-intl";

export type TopMenuProps = React.HTMLProps<HTMLDivElement[]> & {
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
    const { articles } = useSearch();

    const dispatch = useDispatch();

    const [isProfileSettingsUnwrapped, setIsProfileSettingsUnwrapped] = useState<boolean>(false);
    const [menuStatus, setMenuStatus] = useState<boolean>(false);
    const [isSearchUnwrapped, setIsSearchUnwrapped] = useState<boolean>(false);

    const menuContentRef = useRef<HTMLDivElement>(null); 
    const unwrappingSearchRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (unwrappingSearchRef.current && menuContentRef.current && !unwrappingSearchRef.current.contains(event.target as Node) && !menuContentRef.current.contains(event.target as Node)) {
            setIsSearchUnwrapped(false);
        }
    };
    
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
    
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    
    const toggleMenuStatus = () => {
        setMenuStatus(prev => !prev);
    }

    useEffect(() => {
        setIsSearchUnwrapped(false);
    }, [articles]);

    return [
        <div className={clsx(
            'fixed w-full z-[999999999]',
            'transition-all duration-500',
            !isSearchUnwrapped && 'h-auto max-h-auto bg-black/0',
            isSearchUnwrapped && 'h-full max-h-full bg-black/15'
        )}>
            <div 
                ref={menuContentRef} 
                className={clsx(
                    'flex w-full pr-8 pl-8 justify-between h-[60px] z-[9999] bg-backgroundColor',
                )}
            >
                <TopMenuContent
                    templates={templates}
                    onTogglingSearch={() => setIsSearchUnwrapped(prev => !prev)}
                />
            </div>
            <div
                ref={unwrappingSearchRef} 
                className={clsx(
                    'absolute flex flex-col h-auto w-full bg-backgroundColor rounded-b-md',
                    'transition-all duration-300',
                    'overflow-hidden',
                    !isSearchUnwrapped && '-mt-10 opacity-0 pointer-events-none',
                    isSearchUnwrapped && 'mt-0 opacity-100'
                )}
            >
                <TopMenuSearch
                    onPerformingSearch={() => setIsSearchUnwrapped(false)}
                />
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