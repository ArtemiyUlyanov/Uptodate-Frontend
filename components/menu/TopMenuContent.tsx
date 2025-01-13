import { useSearch } from "@/hooks/explore/useSearch";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { TopMenuTemplate } from "./TopMenu";
import clsx from "clsx";
import { UptodateIcon } from "../icons/UptodateIcon";
import DefaultLink from "../links/DefaultLink";
import { SearchIcon } from "../icons/SearchIcon";
import { Dispatch, SetStateAction, use, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useDictionary } from "@/hooks/useDictionary";
import { setAuthenticationMenu } from "@/store/features/menu/authenticationMenuSlice";
import { PersonalAccountIcon } from "../icons/PersonalAccountIcon";
import UnwrappingContainer, { UnwrappingDefaultContainerButton, UnwrappingTransparentContainerButton } from "@/containers/UnwrappingContainer";
import { LogoutIcon } from "../icons/LogoutIcon";
import { useRouter } from "next/navigation";
import { SettingsIcon } from "../icons/SettingsIcon";
import DefaultButton from "../buttons/DefaultButton";
import RedButton from "../buttons/RedButton";
import { UserAvatarIcon } from "../icons/UserAvatarIcon";

export type TopMenuContentProps = React.HTMLProps<HTMLDivElement[]> & {
    templates: TopMenuTemplate[]
    onTogglingSearch: () => void
}

const TopMenuContent: React.FC<TopMenuContentProps> = ({
    templates,
    onTogglingSearch
}) => {
    const { language, translate } = useDictionary();
    const dispatch = useDispatch();

    const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
    const { articles } = useSearch();

    const router = useRouter();

    return [
        <div className={clsx(
            'flex flex-row items-center w-auto h-full gap-8'
        )}>
            <div className={clsx(
                'w-auto h-[30%]'
            )}>
                <UptodateIcon
                    className='w-auto'
                />
            </div>
            <div className={clsx(
                'flex flex-row items-center gap-4 hidden md:flex'
            )}>
                {templates.map((template, index) => 
                    <DefaultLink
                        key={index}
                        text={template.text}
                        link={template.link}
                        actived={!template.selected}
                        underliningActived={!template.selected}
                        customClassName={clsx(
                            'text-base font-semibold',
                            'transition-all duration-200',
                            template.selected && 'text-primaryText',
                            !template.selected && 'text-secondaryText hover:text-primaryText',
                            template.className
                        )}
                    />
                )}
            </div>
        </div>,
            <div className={clsx(
                'flex flex-row items-center gap-6 w-auto h-[100%] hidden md:flex',
            )}>
                <div className={clsx(
                    'h-4'
                )}>
                    <SearchIcon
                        className={clsx(
                            'fill-primaryColor',
                            'transition-all duration-200',
                            'sm:hover:opacity-50',
                            'active:opacity-50 sm:active:opacity'
                        )}
                        onClick={onTogglingSearch}
                    />
                </div>
                {!isAuthenticated &&      
                    <DefaultLink
                        text={translate('common.menu.sign_in_button')}
                        link=""
                        onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                            e.preventDefault();
                            dispatch(setAuthenticationMenu({unwrappedLogin: true, unwrappedRegister: false}));
                        }}
                        actived={true}
                        arrowActived={false}
                        underliningActived={false}
                        customClassName="font-interTight font-semibold text-base"
                    />
                }
                {isAuthenticated && 
                    <UnwrappingContainer
                        x_axis="left"
                        y_axis="bottom"
                        showUnwrappingIcon={false}
                        toggler={(
                            <div className={clsx(
                                'h-4'
                            )}>
                                <PersonalAccountIcon 
                                    className="w-auto h-full fill-primaryColor"
                                />
                            </div>
                        )}
                    >
                        <div className={clsx(
                            'flex flex-row items-center p-2 gap-2'
                        )}>
                            <div className={clsx(
                                'relative w-8 h-8 aspect-square overflow-hidden rounded-full'
                            )}>
                                <UserAvatarIcon
                                    url={'/api/files/get?path=' + (user?.icon)}
                                    size="sm"
                                    customClassName='w-full h-full object-cover'
                                />
                            </div>
                            <div className={clsx(
                                'flex flex-col'
                            )}>
                                <p className={clsx(
                                    'font-interTight font-semibold text-sm text-primaryText',
                                    'whitespace-nowrap'
                                )}>{`${user?.firstName} ${user?.lastName}`}</p>
                                <p className={clsx(
                                    'font-interTight font-medium text-sm text-secondaryText',
                                    'whitespace-nowrap'
                                )}>@{`${user?.username}`}</p>
                            </div>
                        </div>
                        <div className={clsx(
                            'flex flex-col gap-2'
                        )}>
                            <UnwrappingTransparentContainerButton
                                text="My account"
                                icon={
                                    <PersonalAccountIcon
                                        className="w-auto h-full fill-primaryColor"
                                    />
                                }
                                customClassName="pr-2 pl-2 pt-1 pb-1"
                                textClassName="text-primaryText"
                                onClickButton={() => router.push('/account/settings')}
                            />
                            <UnwrappingTransparentContainerButton
                                text="Settings"
                                icon={
                                    <SettingsIcon
                                        className="w-auto h-full fill-primaryColor"
                                    />
                                }
                                customClassName="pr-2 pl-2 pt-1 pb-1"
                                textClassName="text-primaryText"
                                onClickButton={() => router.push('/account/settings')}
                            />
                            {/* <UnwrappingContainerButton
                                text="Log out"
                                icon={
                                    <LogoutIcon 
                                        className="w-auto h-full"
                                    />
                                }
                                textClassName="text-red-500"
                                onClickButton={() => router.push('/logout')}
                            /> */}
                            <UnwrappingDefaultContainerButton
                                text={'Log out'}
                                onClickButton={() => router.push('/logout')}
                                textAlign="center"
                                customClassName="pr-2 pl-2 pt-1 pb-1"
                                textClassName="text-oppositeText"
                            />
                        </div>
                    </UnwrappingContainer>
                }
            </div>
    ];
}

export default TopMenuContent;