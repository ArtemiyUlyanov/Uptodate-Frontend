import { RootState } from "@/store/store";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export type ProtectedRouteProps = React.HTMLProps<HTMLDivElement>

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
    children
}) => {
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/login');
        }
    }, [isAuthenticated, router]);

    return isAuthenticated ? children : null;
}

export default ProtectedRoute;