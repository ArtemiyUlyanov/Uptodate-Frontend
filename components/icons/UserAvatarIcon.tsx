import React from 'react'
import Image, { StaticImageData } from 'next/image';
import clsx from 'clsx';
import { Avatar } from '@nextui-org/react';

export type UserAvatarIconProps = React.ImgHTMLAttributes<HTMLElement> & {
    url: string,
    customClassName?: string
}

export const UserAvatarIcon: React.FC<UserAvatarIconProps> = ({
    url,
    customClassName,
    ...props 
}) => {
  return (
    <Avatar
      src={url}
      alt='Image is likely not to be supported'
      className={clsx(
        'select-none w-8 h-8',
        customClassName
      )}
    />
  )
}