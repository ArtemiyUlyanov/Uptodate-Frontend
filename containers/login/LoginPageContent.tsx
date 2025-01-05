'use client';

import TextButton from "@/components/buttons/TextButton";
import { UptodateIcon } from "@/components/icons/UptodateIcon";
import BlueLink from "@/components/links/BlueLink";
import { useLogin } from "@/hooks/login/useLogin";
import { RootState } from "@/store/store";
import clsx from "clsx";
import { useSelector } from "react-redux";

export type LoginPageContentProps = React.HTMLProps<HTMLDivElement>

const LoginPageContent: React.FC<LoginPageContentProps> = ({
}) => {
    const { usernameInput, passwordInput, loginButton, errors, executeLogin } = useLogin();

    return [
        <div className={clsx(
            'flex flex-col gap-8 w-[75%] sm:w-[50%] lg:w-[25%] p-6 rounded-md',
            'bg-emphasizingColor',
            'border border-borderColor'
        )}>
            <div className={clsx(
                'flex flex-col items-center gap-6',
            )}>
                <div className='w-auto h-5'>
                    <UptodateIcon
                        className='w-auto'
                    />
                </div>
                <div>
                    <p className={clsx(
                        'font-interTight font-semibold text-base text-center'
                    )}>Sharing your minds is the way to a success</p>
                    <p className={clsx(
                        'font-interTight font-medium text-base text-center text-secondaryText'
                    )}>Get logged-in and start getting people up-to-date</p>
                </div>
            </div>
            <form
                className={clsx(
                    'flex flex-col gap-4'
                )}
                onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
                    event.preventDefault();
                    executeLogin()
                }}
            >
                <div className={clsx(
                    'flex flex-col gap-2'
                )}>
                    {[usernameInput, passwordInput]}
                </div>
                <div className={clsx(
                    'flex flex-col gap-4'
                )}>
                    <div className={clsx(
                        'flex flex-col'
                    )}>
                        {Object.values(errors).filter(error => error.length > 0).map(error => 
                            <p className={clsx(
                                'font-interTight font-medium text-sm text-red-500'
                            )}>{error}</p>
                        )}
                    </div>
                    {loginButton}
                    <div>
                        <p className={clsx(
                            'flex flex-col items-start font-interTight font-medium text-sm'
                        )}>
                            Have not registered yet?
                            <BlueLink
                                text='Create an account'
                                link='/register'
                                actived={true}
                                arrowActived={true}
                                underliningActived={false}
                                className='font-medium text-base sm:text-sm'
                            />
                        </p>
                    </div>
                </div>
            </form>
        </div>,
        // <div className={clsx(
        //     'absolute bottom-0 right-0 p-4 space-y-2'
        // )}>
        //     {notifications}
        // </div>
    ];
}

export default LoginPageContent;