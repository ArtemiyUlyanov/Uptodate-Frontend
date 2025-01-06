'use client';

import { LoginProvider } from "@/hooks/login/useLogin";
import { RootState } from "@/store/store";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export type LoginPageLayoutProps = React.HTMLProps<HTMLDivElement>

const LoginPageLayout: React.FC<LoginPageLayoutProps> = ({
    children,
    ...props
}) => {
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);
    const router = useRouter();

    useEffect(() => {
        if (isAuthenticated) {
            router.push('/explore');
        }
    }, [isAuthenticated, router])
    
    return (
        <div className={clsx(
            'flex flex-col justify-center items-center gap-8 sm:gap-16 w-full h-[100vh]'
        )}>
            <div className={clsx(
                'flex flex-col items-center gap-8 sm:gap-16 w-full h-auto'
            )}>
                {children}
            </div>
        </div>
    );
}

export default LoginPageLayout;