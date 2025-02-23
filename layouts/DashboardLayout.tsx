import clsx from "clsx";
import { LayoutProps } from "./layout.type";
import MenuLayout from "./MenuLayout";
import { useDictionary } from "@/hooks/useDictionary";
import { DashboardNavigation, getDashboardOptions } from "@/components/dashboard/DashboardNavigation";
import { DashboardIcon } from "@/ui/icons/DashboardIcon";

export type DashboardLayoutProps = LayoutProps & {
    navigation: React.ReactElement
};

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
    topMenu,
    footer,
    navigation,
    children
}) => {
    const { translate } = useDictionary();

    return (
        <MenuLayout
            topMenu={topMenu}
            footer={footer}
        >
            <div className="flex flex-row gap-8 w-3/4">
                {navigation}
                {children}
            </div>
        </MenuLayout>
    );
}