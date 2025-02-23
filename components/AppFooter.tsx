import { useDictionary } from "@/hooks/useDictionary";
import { setLanguage } from "@/store/features/language/languageSlice";
import SelectableDropdown from "@/ui/dropdowns/SelectableDropdown";
import { FranceFlagIcon } from "@/ui/icons/FranceFlagIcon";
import { LanguageIcon } from "@/ui/icons/LanguageIcon";
import { RussiaFlagIcon } from "@/ui/icons/RussiaFlagIcon";
import { UKFlagIcon } from "@/ui/icons/UKFlagIcon";
import { UptodateIcon } from "@/ui/icons/UptodateIcon";
import DefaultLink from "@/ui/links/DefaultLink";
import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";
import { useDispatch } from "react-redux";

export type AppFooterProps = React.HTMLProps<HTMLDivElement> & {
    sectionTemplates: AppFooterSection[]
}

export type AppFooterSection = {
    name: string
    options: AppFooterOption[]
}

export type AppFooterOption = {
    text: string
    link: string
}

const AppFooter: React.FC<AppFooterProps> = ({
    sectionTemplates
}) => {
    const { language, translate } = useDictionary();
    const dispatch = useDispatch();

    const router = useRouter();
    const pathname = usePathname();

    const sections = useMemo(() => 
        sectionTemplates.map(section =>
            <div className={clsx(
                'flex flex-col items-start gap-2'
            )}>
                <p className={clsx(
                    'font-interTight font-semibold text-primaryText'
                )}>{section.name}</p>
                <div className={clsx(
                    'flex flex-col items-start'
                )}>
                    {section.options.map(option =>
                        <DefaultLink 
                            text={option.text}
                            link={option.link}
                            customClassName='font-interTight font-medium text-secondaryText'
                            actived={true}
                            underliningActived={false}
                            arrowActived={false}
                        />
                    )}
                </div>
            </div>
        )
    , [sectionTemplates])

    return (
        <div className={clsx(
            'flex flex-col w-full pl-16 pr-16 pt-8 pb-8 gap-8 bg-emphasizingColor',
        )}>
            <div className={clsx(
                'flex flex-row gap-32'
            )}>
                <div className={clsx(
                    'flex flex-col items-start w-1/5 gap-4'
                )}>
                    <div className={clsx(
                        'h-5'
                    )}>
                        <UptodateIcon
                            className='w-auto'
                        />
                    </div>
                    <p className="font-interTight font-medium text-secondaryText">{translate('common.footer.slogan')}</p>
                </div>
                <div className={clsx(
                    'flex flex-row justify-around w-full'
                )}>
                    {sections}
                </div>
            </div>
            <div className={clsx(
                'flex flex-row'
            )}>
                <SelectableDropdown 
                    name={translate('common.footer.change_language_button')}
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
            </div>
        </div>
    );
}

export default AppFooter;