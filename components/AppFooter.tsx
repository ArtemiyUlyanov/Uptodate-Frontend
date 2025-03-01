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

export const getAppFooterSections = (translate: (text: string) => string): AppFooterSection[] => [
    {
        name: translate('common.footer.sections.menu.name'),
        options: [
            {
                text: translate('common.footer.sections.menu.options.home'),
                link: `/`
            },
            {
                text: translate('common.footer.sections.menu.options.explore'),
                link: `/explore`
            },
            {
                text: translate('common.footer.sections.menu.options.about_us'),
                link: `/about-us/`
            },
            {
                text: translate('common.footer.sections.menu.options.categories'),
                link: `/categories/`
            }
        ]
    },
    {
        name: translate('common.footer.sections.policy_and_conditions.name'),
        options: [
            {
                text: translate('common.footer.sections.policy_and_conditions.options.privacy_policy'),
                link: `/`
            },
            {
                text: translate('common.footer.sections.policy_and_conditions.options.terms_of_service'),
                link: `/`
            },
            {
                text: translate('common.footer.sections.policy_and_conditions.options.cookie_policy'),
                link: `/`
            },
            {
                text: translate('common.footer.sections.policy_and_conditions.options.disclaimer'),
                link: `/`
            }
        ]
    },
    {
        name: translate('common.footer.sections.additionally.name'),
        options: [
            {
                text: translate('common.footer.sections.additionally.options.faq'),
                link: `/`
            },
            {
                text: translate('common.footer.sections.additionally.options.advertising'),
                link: `/`
            },
            {
                text: translate('common.footer.sections.additionally.options.sitemap'),
                link: `/`
            }
        ]
    },
]

const AppFooter: React.FC<AppFooterProps> = ({
    sectionTemplates
}) => {
    const { language, translate } = useDictionary();
    const dispatch = useDispatch();

    const sections = useMemo(() => 
        sectionTemplates.map((section) =>
            <div
                key={section.name} 
                className={clsx(
                    'flex flex-col items-start gap-2'
                )}
            >
                <p className={clsx(
                    'font-interTight font-semibold text-primaryText'
                )}>{section.name}</p>
                <div className={clsx(
                    'flex flex-col gap-1 items-start'
                )}>
                    {section.options.map(option =>
                        <DefaultLink 
                            key={option.text}
                            text={option.text}
                            link={option.link}
                            customClassName='font-interTight font-medium text-sm text-secondaryText'
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
            'border-t border-t-borderColor'
        )}>
            <div className={clsx(
                'flex flex-row gap-32'
            )}>
                <div className={clsx(
                    'flex flex-col items-start w-1/5 gap-2'
                )}>
                    <div className={clsx(
                        'h-5 fill-primaryText'
                    )}>
                        <UptodateIcon
                            className='w-auto'
                        />
                    </div>
                    <p className="font-interTight font-medium text-lg text-secondaryText">{translate('common.footer.slogan')}</p>
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
                    size='sm'
                    icon={
                        <LanguageIcon 
                            className="w-auto aspect-square fill-primaryText h-full"
                        />
                    }
                    classNames={{
                        trigger: 'text-primaryText',
                        unwrappingElement: 'fill-primaryText'
                    }}
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