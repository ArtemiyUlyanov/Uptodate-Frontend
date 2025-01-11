import { CloseMenuIcon } from "@/components/icons/CloseMenuIcon";
import DefaultLink from "@/components/links/DefaultLink";
import { setAuthenticationMenu } from "@/store/features/menu/authenticationMenuSlice";
import { RootState } from "@/store/store";
import clsx from "clsx";
import { use, useCallback, useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoginContainer from "./LoginContainer";
import RegisterContainer from "./RegisterContainer";

export type AuthContainerProps = React.HTMLProps<HTMLDivElement> & {
}

const AuthContainer: React.FC<AuthContainerProps> = ({

}) => {
    const dispatch = useDispatch();
    const { unwrappedLogin, unwrappedRegister } = useSelector((state: RootState) => state.authentication_menu);

    const isUnwrapped = () => {
        return unwrappedLogin || unwrappedRegister;
    }

    const loginContainerRef = useRef<HTMLDivElement>(null);
    const registerContainerRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (loginContainerRef.current && !loginContainerRef.current.contains(event.target as Node)
        && registerContainerRef.current && !registerContainerRef.current.contains(event.target as Node)) {
            dispatch(setAuthenticationMenu({unwrappedLogin: false, unwrappedRegister: false}));
        }
    };
    
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
    
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className={clsx(
            'top-0 fixed flex flex-row items-center justify-end w-full h-full z-[999999999999999]',
            'transition-all duration-200',
            isUnwrapped() && 'opacity-100 bg-black/15',
            !isUnwrapped() && 'opacity-0 bg-black/0 pointer-events-none'
        )}>
            <LoginContainer 
                ref={loginContainerRef}
            />
            <RegisterContainer
                ref={registerContainerRef}
            />
        </div>
    );
}

export default AuthContainer;