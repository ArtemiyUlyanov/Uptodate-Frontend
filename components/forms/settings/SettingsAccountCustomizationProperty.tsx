import { useTimezones } from "@/hooks/models/useTimezones";
import { useUploader } from "@/hooks/uploader/useUploader";
import { TimezoneModel } from "@/models/timezone";
import { UserModel } from "@/models/user";
import { UserSettingsModel } from "@/models/user_settings";
import DefaultButton from "@/ui/buttons/DefaultButton";
import { FranceFlagIcon } from "@/ui/icons/FranceFlagIcon";
import { RussiaFlagIcon } from "@/ui/icons/RussiaFlagIcon";
import { TrashIcon } from "@/ui/icons/TrashIcon";
import { UKFlagIcon } from "@/ui/icons/UKFlagIcon";
import { UploadFileIcon } from "@/ui/icons/UploadFileIcon";
import { UserAvatarIcon } from "@/ui/icons/UserAvatarIcon";
import DefaultInput from "@/ui/inputs/DefaultInput";
import { Autocomplete, AutocompleteItem, AutocompleteSection, Button, Tooltip } from "@heroui/react";
import clsx from "clsx";
import { Dispatch, SetStateAction, useMemo, useState } from "react";

export type SettingsAccountCustomizationPropertyProps = React.HTMLProps<HTMLDivElement> & {
    user?: UserModel
    isUserChanged: boolean
    setIsUserChanged: Dispatch<SetStateAction<boolean>>
    settings: UserSettingsModel | undefined
    setSettings: Dispatch<SetStateAction<UserSettingsModel | undefined>>
}

export const SettingsAccountCustomizationProperty: React.FC<SettingsAccountCustomizationPropertyProps> = ({
    user,
    isUserChanged,
    setIsUserChanged,
    settings,
    setSettings
}) => {
    const { timezones } = useTimezones({});
    const groupedTimezones = useMemo(() => {
        return timezones?.reduce<Record<string, TimezoneModel[]>>((acc, timezone) => {
            if (!acc[timezone.continent]) {
                acc[timezone.continent] = [];
            }
    
            acc[timezone.continent].push(timezone);
            return acc;
        }, {});
    }, [timezones]);

    return (
        <div className="flex flex-col gap-2 pt-4 pb-4">
            <p className="font-interTight font-semibold text-sm text-secondaryText">Customization</p>
            <div className="flex flex-col items-start gap-4">
                <Autocomplete 
                    className={clsx(
                        "max-w-xs",
                        "font-interTight font-medium text-base text-primaryText"
                    )}
                    inputProps={{
                        classNames: {
                            base: "placeholder-red-500",
                            inputWrapper: "rounded-lg border border-borderColor data-[focus=true]:border-borderColor data-[focus-visible=true]:border-borderColor data-[hover=true]:border-borderColor data-[active=true]:border-borderColor outline-none ring-0 data-[focus=true]:outline-none"
                        }
                    }}
                    listboxProps={{
                        itemClasses: {
                            title: 'font-interTight font-medium text-primaryText',
                            base: 'data-[hover=true]:bg-emphasizingColor2',
                            selectedIcon: 'text-secondary'
                        }
                    }}
                    classNames={{
                        popoverContent: 'bg-emphasizingColor border border-borderColor',
                        selectorButton: 'text-roseColor'
                    }}
                    label={
                        <p className="font-interTight font-semibold text-secondaryText">Timezone</p>
                    }
                    variant="bordered"
                    placeholder="Select a timezone"
                    allowsEmptyCollection={false}
                    selectedKey={settings?.timezone}
                    onSelectionChange={(value) => setSettings(prev => {
                        setIsUserChanged(true);
                        if (prev == undefined) return prev;
                        return {...prev, timezone: value as string};
                    })}
                    defaultSelectedKey={settings?.timezone}
                >
                    {Object.entries(groupedTimezones || {}).map(([continent, timezones]) =>
                        <AutocompleteSection 
                            showDivider 
                            key={continent}
                            title={continent}
                            classNames={{
                                heading: 'font-interTight font-semibold text-secondaryText pt-2'
                            }}
                        >
                            {timezones.map(timezone => 
                                <AutocompleteItem key={timezone.fullName}>{timezone.fullName}</AutocompleteItem>
                            )}
                        </AutocompleteSection>
                    )}
                </Autocomplete>
                <Autocomplete 
                    className={clsx(
                        "max-w-xs",
                        "font-interTight font-medium text-base text-primaryText"
                    )}
                    inputProps={{
                        classNames: {
                            base: "placeholder-red-500",
                            inputWrapper: "rounded-lg border border-borderColor data-[focus=true]:border-borderColor data-[focus-visible=true]:border-borderColor data-[hover=true]:border-borderColor data-[active=true]:border-borderColor outline-none ring-0 data-[focus=true]:outline-none"
                        }
                    }}
                    listboxProps={{
                        itemClasses: {
                            title: 'font-interTight font-medium text-primaryText',
                            base: 'data-[hover=true]:bg-emphasizingColor2',
                            selectedIcon: 'text-secondary'
                        }
                    }}
                    classNames={{
                        popoverContent: 'bg-emphasizingColor border border-borderColor',
                        selectorButton: 'text-roseColor'
                    }}
                    label={
                        <p className="font-interTight font-semibold text-secondaryText">Language</p>
                    }
                    variant="bordered"
                    placeholder="Select a timezone"
                    allowsEmptyCollection={false}
                    selectedKey={settings?.language}
                    onSelectionChange={(value) => setSettings(prev => {
                        setIsUserChanged(true);
                        if (prev == undefined) return prev;
                        return {...prev, language: value as string};
                    })}
                    defaultSelectedKey={settings?.language}
                >
                    <AutocompleteItem
                        startContent={
                            <div className="h-4">
                                <UKFlagIcon />
                            </div>
                        }
                        key='en'
                    >
                        English
                    </AutocompleteItem>
                    <AutocompleteItem
                        startContent={
                            <div className="h-4">
                                <FranceFlagIcon />
                            </div>
                        }
                        key='fr'
                    >
                        Français (demo)
                    </AutocompleteItem>
                    <AutocompleteItem
                        startContent={
                            <div className="h-4">
                                <RussiaFlagIcon />
                            </div>
                        }
                        key='ru'
                    >
                        Russian
                    </AutocompleteItem>
                </Autocomplete>
            </div>
        </div>
    );
}