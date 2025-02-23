import { DashboardIcon } from "@/ui/icons/DashboardIcon";
import { DashboardUserArticlesTable } from "./DashboardUserArticlesTable";

export type DashboardProps = React.HTMLProps<HTMLDivElement>

export const Dashboard: React.FC<DashboardProps> = ({

}) => {
    return (
        <div className="flex flex-col gap-8 w-full">
            <div className="flex flex-row items-center gap-1.5">
                <div className="h-4">
                    <DashboardIcon wrapped={false} />
                </div>
                <p className="font-interTight font-semibold text-lg text-primaryText">Dashboard</p>
            </div>
            <DashboardUserArticlesTable />
        </div>
    );
}