import clsx from "clsx";
import { LayoutProps } from "./layout.type";
import MenuPageLayout from "./MenuPageLayout";
import { useDictionary } from "@/hooks/useDictionary";

export type ArticlesListLayoutProps = LayoutProps;

export const ArticlesListLayout: React.FC<ArticlesListLayoutProps> = ({
    topMenu,
    footer,
    children
}) => {
    const { translate } = useDictionary();

    return (
        <MenuPageLayout
            topMenu={topMenu}
            footer={footer}
        >
            <div className={clsx(
                'flex flex-col gap-12 pl-32 pr-32 w-full'
            )}>
                <div className={clsx(
                    'flex flex-col items-center gap-4 sm:gap-6'
                )}>
                    <div className={clsx(
                        'flex flex-col items-center'
                    )}>
                        <p className={clsx(
                            'font-interTight font-semibold text-2xl text-center text-primaryText'
                        )}>
                            {translate('explore.explore_greetings_text')}
                        </p>
                        <p className={clsx(
                            'font-interTight font-medium text-lg text-center text-secondaryText'
                        )}>
                            {translate('explore.explore_greetings_subtext')}
                        </p>
                    </div>
                </div>
            </div>
            {children}
        </MenuPageLayout>
    );
}