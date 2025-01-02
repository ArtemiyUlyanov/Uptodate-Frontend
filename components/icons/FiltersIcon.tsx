import React from 'react'
import Image, { StaticImageData } from 'next/image';
import clsx from 'clsx';

import filters_icon from '@/public/images/filters_icon_3.png';

export type FiltersIconProps = React.ImgHTMLAttributes<HTMLElement> & {
    className?: string
}

export const FiltersIcon: React.FC<FiltersIconProps> = ({
    className,
    ...props
}) => {
  return (
    <Image
      src={filters_icon}
      alt='Image is likely not to be supported'
      className={clsx(
        'select-none',
        className
      )}
    />
  )
}