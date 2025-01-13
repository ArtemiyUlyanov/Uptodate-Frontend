import React from 'react'
import clsx from 'clsx';
import { Avatar } from '@nextui-org/react';

export type UserAvatarIconProps = React.ImgHTMLAttributes<HTMLElement> & {
    url: string,
    size: "sm" | "md" | "lg" | undefined
    customClassName?: string
}

export const UserAvatarIcon: React.FC<UserAvatarIconProps> = ({
    url,
    size,
    customClassName,
    ...props 
}) => {
  return (
    <Avatar
      src={url}
      alt='Image is likely not to be supported'
      className={clsx(
        'select-none',
        customClassName
      )}
      size={size}
    />
  )
}