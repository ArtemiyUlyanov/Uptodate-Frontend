'use client';

import { useSearch } from "@/hooks/explore/useSearch";
import { RootState } from "@/store/store";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TopMenuContent from "./TopMenuContent";

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
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);
    const { articles } = useSearch();

    const dispatch = useDispatch();

    const [isProfileSettingsUnwrapped, setIsProfileSettingsUnwrapped] = useState<boolean>(false);
    const [menuStatus, setMenuStatus] = useState<boolean>(false);
    const [isSearchUnwrapped, setIsSearchUnwrapped] = useState<boolean>(false);
    
    const toggleMenuStatus = () => {
        setMenuStatus(prev => !prev);
    }

    useEffect(() => {
        setIsSearchUnwrapped(false);
    }, [articles]);

    return (
        <div 
            className={clsx(
                'fixed w-full z-[9999]',
                'transition-all duration-500',
                !isSearchUnwrapped && 'h-auto max-h-auto bg-black/0',
                isSearchUnwrapped && 'h-full max-h-full bg-black/15'
            )}
        >
            <div 
                className={clsx(
                    'flex w-full pr-16 pl-16 justify-between h-[60px] z-[9999] bg-backgroundColor',
                )}
            >
                <TopMenuContent
                    templates={templates}
                    onTogglingSearch={() => setIsSearchUnwrapped(prev => !prev)}
                />
            </div>
        </div>
    );
}

export default TopMenu;