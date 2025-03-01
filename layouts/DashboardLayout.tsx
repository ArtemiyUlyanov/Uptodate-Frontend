import clsx from "clsx";
import { LayoutProps } from "./layout.type";
import MenuLayout from "./MenuLayout";
import { useDictionary } from "@/hooks/useDictionary";
import { DashboardNavigation, getDashboardOptions } from "@/components/dashboard/DashboardNavigation";
import { DashboardIcon } from "@/ui/icons/DashboardIcon";
import DefaultLayout from "./DefaultLayout";

export type DashboardLayoutProps = LayoutProps & {
    navigation: React.ReactElement
};

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
    footer,
    navigation,
    children
}) => {
    const { translate } = useDictionary();

    return (
        <div className='relative flex flex-col justify-between items-center w-full min-h-[100vh]'>
            <div className={clsx(
                'relative flex flex-col items-center gap-8 w-full h-auto'
            )}>
                <div className={clsx(
                    'relative flex flex-col items-center w-full'
                )}>
                    <div className="relative flex flex-row w-full">
                        <div className="relative w-1/6 bg-emphasizingColor border-r border-r-borderColor">
                            {navigation}
                        </div>
                        <div className="relative w-5/6 min-h-[100vh]">
                            <div className="relative w-full h-full">
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}