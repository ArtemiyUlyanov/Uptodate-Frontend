import React from 'react'
import icon from '@/public/images/settings_icon.png';
import Image from 'next/image';
import clsx from 'clsx';

export type SettingsIconProps = React.ImgHTMLAttributes<HTMLElement>

export const SettingsIcon: React.FC<SettingsIconProps> = ({ ...props }) => {
  return (
    <Image
      src={icon}
      alt='Image is likely not to be supported'
      className={clsx(
        'w-[auto] h-[100%] object-contain select-none'
      )}
    />
  )
}