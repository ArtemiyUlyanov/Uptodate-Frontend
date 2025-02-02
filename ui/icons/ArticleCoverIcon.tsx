import React from 'react'
import clsx from 'clsx';
import { Image } from '@nextui-org/react';

export type ArticleCoverIconProps = React.ImgHTMLAttributes<HTMLElement> & {
    url: string,
    className?: string
}

export const ArticleCoverIcon: React.FC<ArticleCoverIconProps> = ({
    url,
    className,
    ...props
}) => {
  return (
    <Image
      src={url}
      alt='Image is likely not to be supported'
      className={clsx(
        'select-none',
        className
      )}
      width={900}
      height={1600}
    />
  )
}