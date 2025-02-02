import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export type ProtectedRouteProps = {
    children: React.ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
    children
}) => {
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated) {
            router.back();
        }
    });

    return isAuthenticated ? children : null;
}

export default ProtectedRoute;