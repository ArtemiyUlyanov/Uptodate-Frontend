import { CloseMenuIcon } from "@/components/icons/CloseMenuIcon";
import BlueLink from "@/components/links/BlueLink";
import DefaultLink from "@/components/links/DefaultLink";
import { setAuthenticationMenu } from "@/store/features/menu/authenticationMenuSlice";
import { RootState } from "@/store/store";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";

export type RegisterContainerProps = React.HTMLProps<HTMLDivElement>

const RegisterContainer: React.FC<RegisterContainerProps> = ({
    ...props
}) => {
    const dispatch = useDispatch();
    const { unwrappedRegister } = useSelector((state: RootState) => state.authentication_menu);

    return (
        <div
            className={clsx(
                'flex flex-col gap-12 justify-start relative w-1/3 h-[95%] p-4 bg-backgroundColor',
                'rounded-l-md',
                'transition-all duration-500',
                !unwrappedRegister && '-right-1/3 ease-in',
                unwrappedRegister && 'right-0 ease-out'
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
                <div className={clsx(
                    'flex flex-col gap-4'
                )}>
                    <div className={clsx(
                        'flex flex-col gap-2'
                    )}>
                        <p className={clsx(
                            'font-interTight font-semibold text-2xl text-primaryText'
                        )}>Create your account</p>
                        <div className={clsx(
                            'flex flex-col items-start'
                        )}>
                            <p className={clsx(
                                'font-interTight font-medium text-sm text-primaryText'
                            )}>Become a part of a huge community of people who is always up-to-date</p>
                            <BlueLink
                                text='I already have an account'
                                link=''
                                onClick={(event: React.MouseEvent<HTMLAnchorElement>) => dispatch(setAuthenticationMenu({unwrappedLogin: true, unwrappedRegister: false}))}
                                customClassName={clsx(
                                    'font-interTight font-semibold text-sm',
                                    history.length <= 0 && 'hidden'
                                )}
                                actived={true}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegisterContainer;