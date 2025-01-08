import { LanguageIcon } from "@/components/icons/LanguageIcon";
import { RussiaFlagIcon } from "@/components/icons/RussiaFlagIcon";
import { UKFlagIcon } from "@/components/icons/UKFlagIcon";
import { UptodateIcon } from "@/components/icons/UptodateIcon";
import DefaultOptionbar from "@/components/optionbars/DefaultOptionbar";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export type AppFooterProps = React.HTMLProps<HTMLDivElement> & {

}

const AppFooter: React.FC<AppFooterProps> = ({

}) => {
    const translate = useTranslations('common.footer');

    const router = useRouter();
    const pathname = usePathname();

    const { lang } = useParams();

    return (
        <div className={clsx(
            'flex flex-col gap-8'
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
                    'grid grid-cols-3 w-full'
                )}>
                    <div className={clsx(
                        'flex flex-col items-start gap-2'
                    )}>
                        <p className={clsx(
                            'font-interTight font-semibold text-primaryText'
                        )}>Column #1</p>
                        <div className={clsx(
                            'flex flex-col items-start'
                        )}>
                            <p className={clsx(
                                'font-interTight font-medium text-primaryText'
                            )}>Column #1 Param #1</p>
                            <p className={clsx(
                                'font-interTight font-medium text-primaryText'
                            )}>Column #1 Param #2</p>
                            <p className={clsx(
                                'font-interTight font-medium text-primaryText'
                            )}>Column #1 Param #3</p>
                            <p className={clsx(
                                'font-interTight font-medium text-primaryText'
                            )}>Column #1 Param #4</p>
                        </div>
                    </div>
                    <div className={clsx(
                        'flex flex-col items-start gap-2'
                    )}>
                        <p className={clsx(
                            'font-interTight font-semibold text-primaryText'
                        )}>Column #2</p>
                        <div className={clsx(
                            'flex flex-col items-start'
                        )}>
                            <p className={clsx(
                                'font-interTight font-medium text-primaryText'
                            )}>Column #2 Param #1</p>
                            <p className={clsx(
                                'font-interTight font-medium text-primaryText'
                            )}>Column #2 Param #2</p>
                            <p className={clsx(
                                'font-interTight font-medium text-primaryText'
                            )}>Column #2 Param #3</p>
                            <p className={clsx(
                                'font-interTight font-medium text-primaryText'
                            )}>Column #2 Param #4</p>
                        </div>
                    </div>
                    <div className={clsx(
                        'flex flex-col items-start gap-2'
                    )}>
                        <p className={clsx(
                            'font-interTight font-semibold text-primaryText'
                        )}>Column #3</p>
                        <div className={clsx(
                            'flex flex-col items-start'
                        )}>
                            <p className={clsx(
                                'font-interTight font-medium text-primaryText'
                            )}>Column #3 Param #1</p>
                            <p className={clsx(
                                'font-interTight font-medium text-primaryText'
                            )}>Column #3 Param #2</p>
                            <p className={clsx(
                                'font-interTight font-medium text-primaryText'
                            )}>Column #3 Param #3</p>
                            <p className={clsx(
                                'font-interTight font-medium text-primaryText'
                            )}>Column #3 Param #4</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={clsx(
                'flex flex-row pb-4'
            )}>
                <DefaultOptionbar 
                    up={true}
                    icon={
                        <LanguageIcon 
                            className="w-auto h-full"
                        />
                    }
                    name={translate('change_language_button')}
                    options={[
                        {
                            name: "English",
                            icon: (
                                <div className={clsx(
                                    'h-4 shadow-lg',
                                    'rounded-full',
                                )}>
                                    <UKFlagIcon />                               
                               </div>
                            ),
                            selected: lang === 'en',
                            action: () => router.push(pathname.replace(/^\/(en|ru)\//, `/en/`))
                        },
                        {
                            name: "Русский",
                            icon: (
                                <div className={clsx(
                                    'h-4 shadow-lg',
                                    'rounded-full',
                                )}>
                                    <RussiaFlagIcon />                               
                               </div>
                            ),
                            selected: lang === 'ru',
                            action: () => router.push(pathname.replace(/^\/(en|ru)\//, `/ru/`))
                        }
                    ]}
                />
            </div>
        </div>
    );
}

export default AppFooter;