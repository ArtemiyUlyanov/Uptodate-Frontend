import React from 'react'
import Image, { StaticImageData } from 'next/image';
import checkbox_checked from '@/public/images/checkbox_checked.png'; 
import clsx from 'clsx';

export type CheckboxCheckedIconProps = React.ImgHTMLAttributes<HTMLElement> & {
    className?: string
}

export const CheckboxCheckedIcon: React.FC<CheckboxCheckedIconProps> = ({
    className,
    ...props
}) => {
  return (
    <Image
      src={checkbox_checked}
      alt='Image is likely not to be supported'
      className={clsx(
        'object-contain select-none',
        className
      )}
    />
  )
}