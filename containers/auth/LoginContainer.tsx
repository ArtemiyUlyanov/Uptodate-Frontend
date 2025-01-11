import { CloseMenuIcon } from "@/components/icons/CloseMenuIcon";
import BlueLink from "@/components/links/BlueLink";
import DefaultLink from "@/components/links/DefaultLink";
import { useLogin } from "@/hooks/login/useLogin";
import { useDictionary } from "@/hooks/useDictionary";
import { setAuthenticationMenu } from "@/store/features/menu/authenticationMenuSlice";
import { RootState } from "@/store/store";
import clsx from "clsx";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

export type LoginContainerProps = React.HTMLProps<HTMLDivElement>

const LoginContainer: React.FC<LoginContainerProps> = ({
    ...props
}) => {
    const dispatch = useDispatch();
    const { unwrappedLogin } = useSelector((state: RootState) => state.authentication_menu);

    const { isAuthenticated } = useSelector((state: RootState) => state.auth);

    const { usernameInput, passwordInput, loginButton, errors, executeLogin } = useLogin();

    const { translate } = useDictionary();

    const occuredErrors = useMemo(() => 
        Object.values(errors).filter(error => error.length > 0)
    , [errors]);

    useEffect(() => {
        if (isAuthenticated) {
            dispatch(setAuthenticationMenu({unwrappedLogin: false}));
        }
    }, [isAuthenticated]);

    return (
        <div
            className={clsx(
                'flex flex-col gap-8 justify-start absolute w-1/3 h-[95%] p-4 bg-backgroundColor',
                'rounded-l-md',
                'transition-all duration-500',
                !unwrappedLogin && '-right-1/3 ease-in',
                unwrappedLogin && 'right-0 ease-out'
            )}
            {...props}
        >
            <div className={clsx(
                'flex flex-row w-full justify-end'
            )}>
                <div 
                    className={clsx(
                        'w-3 aspect-square',
                        'transition-all duration-200',
                        'sm:hover:opacity-50',
                        'active:opacity-50 sm:active:opacity'
                    )}
                    onClick={() => dispatch(setAuthenticationMenu({unwrappedLogin: false, unwrappedRegister: false}))}
                >
                    <CloseMenuIcon />
                </div>
            </div>
            <div className={clsx(
                'relative w-full'
            )}>
                <form
                    className={clsx(
                        'flex flex-col gap-4'
                    )}
                    onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
                        event.preventDefault();
                        executeLogin();
                    }}
                >
                    <div className={clsx(
                        'flex flex-col'
                    )}>
                        <p className={clsx(
                            'font-interTight font-semibold text-2xl text-primaryText'
                        )}>{translate('common.login.login_form_greetings_text')}</p>
                        <div className={clsx(
                            'flex flex-row items-center gap-1'
                        )}>
                            <p className={clsx(
                                'font-interTight font-medium text-sm text-primaryText'
                            )}>{translate('common.login.login_form_greetings_subtext')}</p>
                            <BlueLink
                                text={translate('common.login.login_form_sign_up_link')}
                                link=''
                                onClick={(event: React.MouseEvent<HTMLAnchorElement>) => dispatch(setAuthenticationMenu({unwrappedLogin: false, unwrappedRegister: true}))}
                                customClassName={clsx(
                                    'font-interTight font-semibold text-sm text-redColor',
                                    history.length <= 0 && 'hidden'
                                )}
                                actived={true}
                            />
                        </div>
                    </div>
                    <div className={clsx(
                        'flex flex-col gap-4'
                    )}>
                        <div className={clsx(
                            'flex flex-col gap-1'
                        )}>
                            <p className={clsx(
                                'font-interTight font-semibold text-sm text-primaryText'
                            )}>{translate('common.login.fields.username.name')}</p>
                            {usernameInput}
                        </div>
                        <div className={clsx(
                            'flex flex-col gap-1'
                        )}>
                            <p className={clsx(
                                'font-interTight font-semibold text-sm text-primaryText'
                            )}>{translate('common.login.fields.password.name')}</p>
                            {passwordInput}
                        </div>
                    </div>
                    <div className={clsx(
                        'flex flex-col'
                    )}>
                        {occuredErrors.map((error, index) => 
                            <p 
                                key={index}
                                className={clsx(
                                    'font-interTight font-medium text-sm text-red-500'
                                )}
                            >{error}</p>
                        )}
                    </div>
                    {loginButton}
                </form>
            </div>
        </div>
    );
}

export default LoginContainer;