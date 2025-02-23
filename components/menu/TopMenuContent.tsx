import LoginForm from "@/components/forms/LoginForm";
import { TopMenuProfileSettingsDropdown } from "@/components/menu/TopMenuProfileSettingsDropdown";
import { useDictionary } from "@/hooks/useDictionary";
import { setLanguage } from "@/store/features/language/languageSlice";
import { RootState } from "@/store/store";
import { Link } from "@heroui/react";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import SelectableDropdown from "../../ui/dropdowns/SelectableDropdown";
import { FranceFlagIcon } from "../../ui/icons/FranceFlagIcon";
import { LanguageIcon } from "../../ui/icons/LanguageIcon";
import { RussiaFlagIcon } from "../../ui/icons/RussiaFlagIcon";
import { UKFlagIcon } from "../../ui/icons/UKFlagIcon";
import { UptodateIcon } from "../../ui/icons/UptodateIcon";
import DefaultLink from "../../ui/links/DefaultLink";
import { TopMenuOption } from "./TopMenu";
import TopMenuSearch from "./TopMenuSearch";

export type TopMenuContentProps = React.HTMLProps<HTMLDivElement> & {
    optionTemplates: TopMenuOption[]
    onTogglingSearch: () => void
}

const TopMenuContent: React.FC<TopMenuContentProps> = ({
    optionTemplates,
    onTogglingSearch
}) => {
    const { language, translate } = useDictionary();
    const dispatch = useDispatch();

    const { isAuthenticated } = useSelector((state: RootState) => state.auth);

    return (
        <>
            <div className={clsx(
                'flex flex-row items-center w-auto h-full gap-8'
            )}>
                <Link
                    href="/explore" 
                    className={clsx(
                        'w-auto h-[30%]',
                        'hover:opacity-50',
                        'active:hover:opacity-50 sm:active:hover'
                    )}
                >
                    <UptodateIcon
                        className='w-auto'
                    />
                </Link>
                <div className={clsx(
                    'flex flex-row items-center gap-4 hidden md:flex'
                )}>
                    {optionTemplates.map((option) => 
                        <DefaultLink
                            key={option.key}
                            text={option.text}
                            link={option.link}
                            actived={!option.selected}
                            underliningActived={!option.selected}
                            customClassName={clsx(
                                'text-base font-semibold',
                                'transition-all duration-200',
                                option.selected && 'text-primaryText',
                                !option.selected && 'text-secondaryText hover:text-primaryText',
                                option.className
                            )}
                        />
                    )}
                </div>
            </div>,
            <div className={clsx(
                'flex flex-row items-center gap-6 w-auto h-[100%] hidden md:flex',
            )}>
                <TopMenuSearch />
                <SelectableDropdown 
                    selectedKeys={[language]}
                    componentSize={'sm'}
                    icon={
                        <LanguageIcon 
                            className="w-auto aspect-square fill-primaryColor h-full"
                        />
                    }
                    onSelected={(keys) => dispatch(setLanguage({language: Array.from(keys)[0]}))}
                    options={[
                        {
                            name: "English",
                            classNames: {title: 'text-primaryText'},
                            value: 'en',
                            icon: (
                                <div className={clsx(
                                    'w-4'
                                )}>
                                    <UKFlagIcon className="w-auto h-full rounded-full" />
                                </div>
                            )
                        },
                        {
                            name: "Français (demo)",
                            classNames: {title: 'text-primaryText'},
                            value: 'fr',
                            icon: (
                                <div className={clsx(
                                    'w-4'
                                )}>
                                    <FranceFlagIcon className="w-auto h-full rounded-full" />
                                </div>
                            )
                        },
                        {
                            name: "Русский",
                            classNames: {title: 'text-primaryText'},
                            value: 'ru',
                            icon: (
                                <div className={clsx(
                                    'w-4'
                                )}>
                                    <RussiaFlagIcon className="w-auto h-full rounded-full" />
                                </div>
                            )
                        },
                    ]}
                />
                {!isAuthenticated &&      
                    <LoginForm 
                        trigger={
                            (onClick) =>
                                <DefaultLink
                                    text={translate('common.menu.sign_in_button')}
                                    link=""
                                    onClick={onClick}
                                    actived={true}
                                    arrowActived={false}
                                    underliningActived={false}
                                    customClassName="font-interTight font-semibold text-base"
                                />
                        }
                    />
                }
                {isAuthenticated && 
                    <TopMenuProfileSettingsDropdown />
                }
            </div>
        </>
    )
}

export default TopMenuContent;