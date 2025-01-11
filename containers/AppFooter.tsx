import { FranceFlagIcon } from "@/components/icons/FranceFlagIcon";
import { LanguageIcon } from "@/components/icons/LanguageIcon";
import { RussiaFlagIcon } from "@/components/icons/RussiaFlagIcon";
import { UKFlagIcon } from "@/components/icons/UKFlagIcon";
import { UptodateIcon } from "@/components/icons/UptodateIcon";
import DefaultLink from "@/components/links/DefaultLink";
import DefaultOptionbar from "@/components/optionbars/DefaultOptionbar";
import { useDictionary } from "@/hooks/useDictionary";
import { setLanguage } from "@/store/features/language/languageSlice";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
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
                            customClassName='font-interTight font-medium'
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
            'flex flex-col gap-8',
        )}>
            <div className={clsx(
                'flex flex-row gap-4'
            )}>
                <div className={clsx(
                    'flex flex-col items-start w-1/5 gap-2'
                )}>
                    <div className={clsx(
                        'w-1/3'
                    )}>
                        <UptodateIcon
                            className='w-auto'
                        />
                    </div>
                </div>
                <div className={clsx(
                    'grid grid-cols-5 w-full'
                )}>
                    {sections}
                </div>
            </div>
            <div className={clsx(
                'flex flex-row pb-4'
            )}>
                <DefaultOptionbar 
                    y_axis="top"
                    x_axis="center"
                    icon={
                        <LanguageIcon 
                            className="w-auto h-full"
                        />
                    }
                    name={translate('common.footer.change_language_button')}
                    textClassName="text-sm"
                    options={[
                        {
                            name: "English",
                            icon: (
                                <UKFlagIcon className="w-auto h-full rounded-full" />
                            ),
                            selected: language == 'en',
                            action: () => dispatch(setLanguage({language: 'en'}))
                        },
                        {
                            name: "Français (demo)",
                            icon: (
                                <FranceFlagIcon className="w-auto h-full rounded-full" />
                            ),
                            selected: language == 'fr',
                            action: () => dispatch(setLanguage({language: 'fr'}))
                        },
                        {
                            name: "Русский",
                            icon: (
                                <RussiaFlagIcon className="w-auto h-full rounded-full" />
                            ),
                            selected: language == 'ru',
                            action: () => dispatch(setLanguage({language: 'ru'}))
                        }
                    ]}
                />
            </div>
        </div>
    );
}

export default AppFooter;