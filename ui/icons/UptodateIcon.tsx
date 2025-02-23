import React from 'react'
import icon from '@/public/images/uptodate_icon.png';
import Image from 'next/image';
import clsx from 'clsx';

export type UptodateIconProps = React.ImgHTMLAttributes<HTMLElement> & {
  className?: string
}

export const UptodateIcon: React.FC<UptodateIconProps> = ({
  className,
  ...props
}) => {
  return (
    <Image
      src={icon}
      alt='Image is likely not to be supported'
      className={clsx(
        'h-[100%] object-contain select-none',
        className
      )}
    />
  )
}