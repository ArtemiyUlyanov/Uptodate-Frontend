import React from 'react'
import icon from '@/public/images/logout_icon.png';
import Image from 'next/image';
import clsx from 'clsx';

export type LogoutIconProps = React.ImgHTMLAttributes<HTMLElement> & {
  customClassName?: string
}

export const LogoutIcon: React.FC<LogoutIconProps> = ({ 
  customClassName,
  ...props 
}) => {
  return (
    <Image
      src={icon}
      alt='Image is likely not to be supported'
      className={clsx(
        'w-[auto] h-[100%] object-contain select-none',
        customClassName
      )}
    />
  )
}