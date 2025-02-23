import DefaultInput from "@/ui/inputs/DefaultInput";
import clsx from "clsx";
import React, { useState } from "react";
import { useTypewriter, Cursor } from "react-simple-typewriter";

export type DashboardCreateFormProps = React.HTMLProps<HTMLDivElement>

export const DashboardCreateForm: React.FC<DashboardCreateFormProps> = ({

}) => {
    const [headingPlaceholder] = useTypewriter({
        words: ["The EU raises the charging of import taxes as China is committed to get rid of the EU wares", "Top 10 places in Amsterdam to visit: the last one is the most wonderring", "Where to rent an apartment in Barcelona during a summer vacation"],
        loop: 0, 
        typeSpeed: 75,
        deleteSpeed: 50,
        delaySpeed: 1000,
    });

    const [heading, setHeading] = useState<string>('');

    return (
        <div className="flex flex-col gap-2">
            <DefaultInput
                // {...register('firstName', { required: translate('common.register.errors.first_name_field_incorrect') })}

                placeholder={headingPlaceholder}
                customClassName={clsx(
                    'w-full'
                )}
                inputClassName='text-base'
                fullBordered={true}
                value={heading}
                handleChange={setHeading}
                required
            />
            <p className="text-primaryText">{heading}</p>
        </div>
    );
}