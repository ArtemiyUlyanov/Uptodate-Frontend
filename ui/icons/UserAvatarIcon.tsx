import React from 'react'
import clsx from 'clsx';
import { Avatar } from '@nextui-org/react';
import Image from 'next/image';

export type UserAvatarIconProps = React.ImgHTMLAttributes<HTMLElement> & {
    url: string,
    size?: "sm" | "md" | "lg"
    customClassName?: string
}

export const UserAvatarIcon: React.FC<UserAvatarIconProps> = ({
    url,
    size,
    customClassName,
    ...props 
}) => {
  return (
    (size ?
      <Avatar
        src={url}
        alt='Image is likely not to be supported'
        className={clsx(
          'select-none',
          customClassName
        )}
        size={size}
      />
    :
      <Image
        src={url}
        alt='Image is likely not to be supported'
        className={clsx(
          'select-none',
          customClassName
        )}
        width={900}
        height={1600}
      />
    ))
}