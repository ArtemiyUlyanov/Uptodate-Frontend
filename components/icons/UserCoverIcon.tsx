import React from 'react'
import Image, { StaticImageData } from 'next/image';
import clsx from 'clsx';

export type UserCoverIconProps = React.ImgHTMLAttributes<HTMLElement> & {
    url: string,
    className?: string
}

export const UserCoverIcon: React.FC<UserCoverIconProps> = ({
    url,
    className,
    ...props 
}) => {
  return (
    <img
      src={url}
      alt='Image is likely not to be supported'
      className={clsx(
        'select-none',
        className
      )}
    />
  )
}