import { useSearch } from "@/hooks/explore/useSearch";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { TopMenuTemplate } from "./TopMenu";
import clsx from "clsx";
import { UptodateIcon } from "../icons/UptodateIcon";
import DefaultLink from "../links/DefaultLink";
import { UserCoverIcon } from "../icons/UserCoverIcon";
import { SearchIcon } from "../icons/SearchIcon";
import { Dispatch, SetStateAction } from "react";
import { useTranslations } from "next-intl";
import { useDictionary } from "@/hooks/useDictionary";

export type TopMenuContentProps = React.HTMLProps<HTMLDivElement[]> & {
    templates: TopMenuTemplate[]
    onTogglingSearch: () => void
}

const TopMenuContent: React.FC<TopMenuContentProps> = ({
    templates,
    onTogglingSearch
}) => {
    const { language, translate } = useDictionary();
    

    const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
    const { articles } = useSearch();

    return [
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
        </div>,
        (!isAuthenticated && 
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
                        onClick={onTogglingSearch}
                    />
                </div>
                <DefaultLink
                    text={translate('common.menu.sign_in_button')}
                    link=""
                    actived={true}
                    arrowActived={false}
                    underliningActived={false}
                    customClassName="font-interTight font-semibold text-base"
                />
            </div>
        )
    ];
}

export default TopMenuContent;